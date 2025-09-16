'use client';
import '@ant-design/v5-patch-for-react-19'; 
import { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message, Row, Col } from 'antd';
import { getAllBlogs, deleteBlog, createBlog, updateBlog } from '../../../services/blogsApi';
import BlogFormModal from '../../../components/BlogFormModal';
import ProtectedRoute from '@/components/ProtectedRoute';
import type { ColumnsType } from 'antd/es/table';

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (err) {
      message.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
    setEditingBlog(blog || null);
    setModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      setModalLoading(true);
      if (editingBlog) {
        await updateBlog(editingBlog._id, values);
        message.success('Blog updated!');
      } else {
        await createBlog(values);
        message.success('Blog created!');
      }
      setModalVisible(false);
      fetchBlogs();
    } catch (err) {
      message.error('Failed to save blog');
    } finally {
      setModalLoading(false);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
      <div className="p-4 md:p-6">
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Button type="primary" block onClick={() => handleOpenModal()} style={{ width: '100%', maxWidth: '100px' }}>New Blog</Button>
          </Col>
        </Row>

        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={blogs}
            loading={loading}
            pagination={{ pageSize: 5 }}
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
