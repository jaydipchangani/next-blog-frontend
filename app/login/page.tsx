'use client';

import React, { useState, useContext } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  //console.log('AuthContext:', login); // <-- add this
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
  //console.log('Form values:', values); // <-- add this
  try {
    setLoading(true);
    await login(values.email, values.password);
    message.success('Logged in successfully!');
  } catch (err: any) {
    console.error(err);
    message.error(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Login" className="w-96">
        <Form layout="vertical" onFinish={onFinish}>
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
      Login
    </Button>
  </Form.Item>
</Form>

      </Card>
    </div>
  );
};

export default LoginPage;
