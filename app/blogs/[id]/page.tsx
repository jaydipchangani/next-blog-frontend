'use client';
import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState, useRef } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await getBlogById(id as string);
      setBlog(data);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <Spin className="flex justify-center items-center h-screen" />;

  if (!blog) return <Alert message="Blog not found" type="error" />;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '5px',
          backgroundColor: '#1890ff',
          width: `${scrollProgress}%`,
          zIndex: 9999,
          transition: 'width 0.2s ease-out',
        }}
      />

      <div className="p-0 flex justify-center lg:p-6">
        <Card style={{ maxWidth: 800, width: '100%' }}>
          <Title level={2}>{blog.title}</Title>
          <Paragraph type="secondary" className="text-justify">
            {blog.excerpt}
          </Paragraph>
          <Paragraph strong>{blog.paid ? 'Paid Blog' : 'Free Blog'}</Paragraph>

        {blog.imageBase64 && (
          <img
            src={blog.imageBase64}
            alt={blog.title}
            style={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
        )}

        <Paragraph className='text-justify whitespace-pre-line'>{blog.content}</Paragraph>
      </Card>
    </div>
  </>
  );
};

export default BlogDetailPage;
