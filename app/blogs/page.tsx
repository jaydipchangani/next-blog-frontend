'use client';

import { useEffect, useState } from 'react';
import { message } from 'antd';
import { getUserBlogs } from '../../services/blogsApi';
import BlogCard from '../../components/BlogCard';
import DashboardLayout from './[id]/layout'; // user layout wraps this page

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getUserBlogs();
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

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              excerpt={blog.excerpt}
              paid={blog.paid}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default BlogsPage;
