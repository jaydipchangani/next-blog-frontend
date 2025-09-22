'use client';
import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Row, Col, Input } from 'antd';
import { getAllBlogs, deleteBlog, createBlog, updateBlog } from '../../../services/blogsApi';
import BlogFormModal from '../../../components/BlogFormModal';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { SorterResult } from 'antd/es/table/interface'; 

const { Search } = Input;

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // state for server-side table control
  const [pagination, setPagination] = useState<{ current: number; pageSize: number; total?: number }>({
    current: 1,
    pageSize: 10,
  });
  const [sorter, setSorter] = useState<{ field?: string; order?: 'asc' | 'desc' }>({});
  const [searchText, setSearchText] = useState<string>('');

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs({
        search: searchText,
        sortBy: sorter.field || 'createdAt',
        sortOrder: sorter.order || 'desc',
        page: pagination.current,
        limit: pagination.pageSize,
      });

      const blogsWithImages = response.data.map((blog: any) => ({
        ...blog,
        imageBase64: blog.image && blog.imageType ? `data:${blog.imageType};base64,${blog.image}` : null,
      }));

      setBlogs(blogsWithImages);
      setPagination(prev => ({ ...prev, total: response.total }));
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [pagination.current, pagination.pageSize, sorter, searchText]);

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id);
      message.success('Blog deleted!');
      fetchBlogs();
    } catch (err) {
      message.error('Failed to delete blog');
    }
  };

  const handleOpenModal = (blog?: any) => {
    if (blog && blog.imageBase64) {
      setEditingBlog({
        ...blog,
        image: [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: blog.imageBase64,
          },
        ],
      });
    } else {
      setEditingBlog(null);
    }
    setModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      setModalLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);
      if (values.excerpt) formData.append("excerpt", values.excerpt);
      formData.append("content", values.content);
      formData.append("paid", values.paid ? "true" : "false");

      if (values.image && values.image.length > 0) {
        const fileObj = values.image[0].originFileObj;
        if (fileObj) {
          formData.append("image", fileObj);
        }
      }

      if (editingBlog) {
        await updateBlog(editingBlog._id, formData);
        message.success("Blog updated!");
      } else {
        await createBlog(formData);
        message.success("Blog created!");
      }

      setModalVisible(false);
      fetchBlogs();
    } catch (err) {
      console.error("Form submit error:", err);
      message.error("Failed to save blog");
    } finally {
      setModalLoading(false);
    }
  };

  const handleTableChange = (
    pag: TablePaginationConfig,
    _: any,
    sort: SorterResult<any> | SorterResult<any>[],
  ) => {
    setPagination({ current: pag.current || 1, pageSize: pag.pageSize || 10 });
    if (!Array.isArray(sort)) {
      if (sort.order) {
        setSorter({ field: sort.field as string, order: sort.order === 'ascend' ? 'asc' : 'desc' });
      } else {
        setSorter({});
      }
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Excerpt',
      dataIndex: 'excerpt',
      key: 'excerpt',
      responsive: ['md', 'lg'],
      ellipsis: true,
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
      render: (val: boolean) => (val ? 'Yes' : 'No'),
      sorter: true,
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space wrap>
          <Button type="primary" size="small" onClick={() => handleOpenModal(record)} style={{ width: 60 }}>Edit</Button>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record._id)} >
            <Button danger size="small" style={{ width: 60 }}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg'],
    },
  ];

  return (
    <ProtectedRoute role='admin'>
      <div className=" overflow-hidden pt-20 pb-5 pr-5 pl-5 sm:pl-0 md:pl-68 ">
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Button type="primary" block onClick={() => handleOpenModal()} style={{ width: '100%', maxWidth: '100px' }}>New Blog</Button>
          </Col>
          <Col xs={24} sm={12}>
            <Search
              placeholder="Search blogs"
              onSearch={val => { setSearchText(val); setPagination(prev => ({ ...prev, current: 1 })); }}
              enterButton
              allowClear
            />
          </Col>
        </Row>

        <div style={{ overflowX: 'auto', marginTop: 16 ,width:"99%"}}>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={blogs}
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[1]} of ${total} records`,
            }}
            onChange={handleTableChange}
            scroll={{ y: 500 }}
          />
        </div>

        <BlogFormModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleSubmit}
          initialValues={editingBlog}
          loading={modalLoading}
        />
      </div>
    </ProtectedRoute>
  );
};

export default AdminBlogsPage;
