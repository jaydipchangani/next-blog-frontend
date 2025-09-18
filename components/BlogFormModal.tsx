'use client';
import '@ant-design/v5-patch-for-react-19';
import { Modal, Form, Input, Switch, Button,message } from 'antd';
import { useEffect } from 'react';
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface BlogFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  loading?: boolean;
}

const BlogFormModal: React.FC<BlogFormModalProps> = ({ visible, onCancel, onSubmit, initialValues, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
  if (!visible) return;

  if (initialValues) {
    const normalizedImage = Array.isArray(initialValues.image)
      ? initialValues.image
      : initialValues.image
      ? [initialValues.image]
      : [];

    form.setFieldsValue({
      ...initialValues,
      image: normalizedImage,
    });
  } else {
    form.resetFields();
  }
}, [initialValues, form, visible]);

  return (
    <Modal
      title={initialValues ? 'Edit Blog' : 'Add Blog'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onSubmit}>
  <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title is required' }]}>
    <Input />
  </Form.Item>

  <Form.Item label="Excerpt" name="excerpt">
    <Input />
  </Form.Item>

  <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Content is required' }]}>
    <Input.TextArea rows={4} />
  </Form.Item>

  <Form.Item label="Paid" name="paid" valuePropName="checked">
    <Switch />
  </Form.Item>

  <Form.Item
  label="Image"
  name="image"
  valuePropName="fileList"
  getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList || []}
>
  <Upload
    beforeUpload={(file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
      }
      return isImage ? false : Upload.LIST_IGNORE;
    }}
    listType="picture"
    maxCount={1}
    accept="image/*"
  >
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
</Form.Item>


  <Form.Item>
    <Button type="primary" htmlType="submit" loading={loading} block>
      {initialValues ? 'Update Blog' : 'Create Blog'}
    </Button>
  </Form.Item>
</Form>

    </Modal>
  );
};

export default BlogFormModal;
