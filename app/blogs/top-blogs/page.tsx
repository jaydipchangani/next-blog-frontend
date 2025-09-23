"use client";

import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import BlogCard from "@/components/BlogCard";
import { fetchTopBlogs } from "@/services/blogsApi";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  paid: boolean;
  imageBase64?: string | null;
}

export default function TopBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          setError("You must be logged in to view top blogs.");
          setLoading(false);
          return;
        }

        const data = await fetchTopBlogs(token);
        setBlogs(data);
      } catch (err: any) {
        setError(err.message || "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:pl-36 pt-10">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          id={blog._id}
          title={blog.title}
          excerpt={blog.excerpt}
          paid={blog.paid}
          imageUrl={blog.imageBase64 || undefined}
        />
      ))}
    </div>
  );
}
