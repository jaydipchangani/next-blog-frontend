import { Card, Tag } from 'antd';
import  Link from 'next/link' 

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  paid: boolean;
  imageUrl?: string;
}

const BlogCard = ({ id, title, excerpt, paid, imageUrl }: BlogCardProps) => {
  return (
    <Link href={`/blogs/${id}`}>
      <Card
        hoverable
        className="transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        title={title}
        extra={paid ? <Tag color="red">Paid</Tag> : <Tag color="green">Free</Tag>}
        cover={
          imageUrl ? (
            <img
              alt={title}
              src={imageUrl}
              style={{ height: 200, objectFit: 'cover' }}
            />
          ) : null
        }
      >
        <p className="text-gray-600 excerpt" >{excerpt}</p>
      </Card>
    </Link>
  );
};

export default BlogCard;
