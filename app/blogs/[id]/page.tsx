'use client';
import '@ant-design/v5-patch-for-react-19'; 
import { useEffect, useState, useRef} from 'react';
import { useParams } from 'next/navigation';
import { Card, Spin, message, Typography, Alert } from 'antd';
import { getBlogById } from '../../../services/blogsApi';
import { useAuth } from '../../../context/AuthContext';

const { Title, Paragraph } = Typography;

const BlogDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const hasNotified = useRef(false);

  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await getBlogById(id as string);
      setBlog(data);

      const isAccessible = !data.paid || (user && user.subscription);
      if (data.paid && !(user && user.subscription) && !hasNotified.current) {
      message.info(
        'This is a paid blog. Only first three paid blogs are free to access. Upgrade to premium for more.'
      );
      hasNotified.current = true; 
    }
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

  return (
    <div className="p-6 flex justify-center">
      <Card style={{ maxWidth: 800, width: '100%' }}>
        <Title level={2}>{blog.title}</Title>
        <Paragraph type="secondary">{blog.excerpt}</Paragraph>
        <Paragraph strong>{blog.paid ? 'Paid Blog' : 'Free Blog'}</Paragraph>
          <Paragraph>{blog.content}</Paragraph>
          <Paragraph>
            Content is restricted. Upgrade to premium to read full blog.
          </Paragraph>
        
      </Card>
    </div>
  );
};

export default BlogDetailPage;
