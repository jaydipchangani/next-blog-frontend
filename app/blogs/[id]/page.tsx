'use client';

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import { Card, Spin, message, Typography, Alert } from 'antd';
import { getBlogById } from '../../../services/blogsApi';
import { useAuth } from '../../../context/AuthContext';

const { Title, Paragraph } = Typography;

const BlogDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await getBlogById(id as string);
      setBlog(data);
    } catch (err) {
      message.error('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);

  if (loading) return <Spin className="flex justify-center items-center h-screen" />;

  if (!blog) return <Alert message="Blog not found" type="error" />;

  const isAccessible = !blog.paid || (user && user.subscription);

  return (
    <div className="p-6 flex justify-center">
      <Card style={{ maxWidth: 800, width: '100%' }}>
        <Title level={2}>{blog.title}</Title>
        <Paragraph type="secondary">{blog.excerpt}</Paragraph>
        <Paragraph strong>{blog.paid ? 'Paid Blog' : 'Free Blog'}</Paragraph>

        {isAccessible ? (
          <Paragraph>{blog.content}</Paragraph>
        ) : (
          <Alert message="This is a paid blog. Please subscribe to read the full content." type="warning" />
        )}
      </Card>
    </div>
  );
};

export default BlogDetailPage;
