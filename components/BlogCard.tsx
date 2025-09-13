'use client';
import '@ant-design/v5-patch-for-react-19'; 
import Link from 'next/link';
import { Card, Tag } from 'antd';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  paid: boolean;
}

const BlogCard = ({ id, title, excerpt, paid }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${id}`}>
      <Card
        hoverable
        className="transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        title={title}
        extra={paid ? <Tag color="red">Paid</Tag> : <Tag color="green">Free</Tag>}
      >
        <p className="text-gray-600">{excerpt}</p>
      </Card>
    </Link>
  );
};

export default BlogCard;
