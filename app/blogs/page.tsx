'use client';

import { useEffect, useState } from 'react';
import { message, Input, Select, Pagination } from 'antd';
import { getUserBlogs } from '../../services/blogsApi';
import BlogCard from '../../components/BlogCard';
import DashboardLayout from './layout';

const { Search } = Input;
const { Option } = Select;

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10); 
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchBlogs = async (pageNum = 1, search = '', sort = 'asc') => {
    try {
      setLoading(true);
      const response = await getUserBlogs({
        page: pageNum,
        search,
        sort,
      });

      const blogsWithImage = response.data.map((blog: any) => ({
        ...blog,
        imageUrl: blog.imageBase64 || null,
      }));

      setBlogs(blogsWithImage);
      setTotal(response.total || 0);
      setPage(response.page || 1);
    } catch (err) {
      message.error('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page, searchTerm, sortOrder);
  }, [page, searchTerm, sortOrder]);

  return (
    <DashboardLayout>
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Search
          placeholder="Search blogs..."
          allowClear
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: 250 }}
        />
        <Select
          value={sortOrder}
          style={{ width: 180 }}
          onChange={(value) => setSortOrder(value)}
        >
          <Option value="asc">Sort by Title (A → Z)</Option>
          <Option value="desc">Sort by Title (Z → A)</Option>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                excerpt={blog.excerpt}
                paid={blog.paid}
                imageUrl={blog.imageUrl}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Pagination
              current={page}
              total={total}
              pageSize={pageSize}
              showSizeChanger={false}
              onChange={(p) => setPage(p)}
            />
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default BlogsPage;
