'use client';
import '@ant-design/v5-patch-for-react-19'; 
import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Divider, Progress } from 'antd';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {
  const { register, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const checkPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[@$!%*?&]/.test(pwd)) score += 1;
    setStrength(score);
  };

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
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              value={password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                checkPasswordStrength(val);
              }}
            />
          </Form.Item>

          {password && (
            <Progress
              percent={(strength / 5) * 100}
              size="small"
              status={strength < 4 ? 'exception' : 'success'}
              showInfo={false}
            />
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <Divider>Or</Divider>

        <Button
          type="default"
          className="w-full flex justify-center items-center"
          onClick={() => loginWithGoogle()}
        >
          Continue with Google
        </Button>

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
