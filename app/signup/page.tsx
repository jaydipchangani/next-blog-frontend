'use client';
import '@ant-design/v5-patch-for-react-19'; 
import React, { useState, useContext } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await register(values.name, values.email, values.password);
      message.success('Account created successfully!');
      router.replace('/login');
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Sign Up" className="w-96">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
