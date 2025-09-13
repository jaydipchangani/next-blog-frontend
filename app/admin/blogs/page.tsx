'use client';
import '@ant-design/v5-patch-for-react-19'; 
import { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { getAllBlogs, deleteBlog, createBlog, updateBlog } from '../../../services/blogsApi';
import BlogFormModal from '../../../components/BlogFormModal';
import ProtectedRoute from '@/components/ProtectedRoute';

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

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Excerpt', dataIndex: 'excerpt', key: 'excerpt' },
    { title: 'Paid', dataIndex: 'paid', key: 'paid', render: (val: boolean) => (val ? 'Yes' : 'No') },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" onClick={() => handleOpenModal(record)}>Edit</Button>
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record._id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ProtectedRoute role='admin'>

    <div className="p-6">
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => handleOpenModal()}>New Blog</Button>
      </Space>
      <Table rowKey="_id" columns={columns} dataSource={blogs} loading={loading} />

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
