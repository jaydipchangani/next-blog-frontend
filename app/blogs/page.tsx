'use client';

import { useEffect, useState, useContext } from 'react';
import { Card, Row, Col, message } from 'antd';
import Link from 'next/link';
import { getUserBlogs } from '../../services/blogsApi';
import { AuthContext } from '../../context/AuthContext';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const { user } = useContext(AuthContext);

  const fetchBlogs = async () => {
    try {
      const data = await getUserBlogs();
      setBlogs(data);
    } catch (err) {
      message.error('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      <Row gutter={[16, 16]}>
        {blogs.map((blog) => (
          <Col span={8} key={blog._id}>
            <Link href={`/blogs/${blog._id}`}>
              <Card
                title={blog.title}
                bordered={true}
                hoverable
              >
                <p>{blog.excerpt}</p>
                <p>{blog.paid ? '(Paid Blog)' : '(Free Blog)'}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogsPage;
