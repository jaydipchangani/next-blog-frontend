import axios from './api';

export const getAllBlogs = async () => {
  const res = await axios.get('/blogs');
  return res.data;
};

export const getUserBlogs = async () => {
  const res = await axios.get('/blogs');
  return res.data;
};

export const createBlog = async (data: { title: string; excerpt?: string; content: string; paid: boolean }) => {
  const res = await axios.post('/blogs', data);
  return res.data;
};

export const updateBlog = async (id: string, data: any) => {
  const res = await axios.patch(`/blogs/${id}`, data);
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await axios.delete(`/blogs/${id}`);
  return res.data;
};

export const getBlogById = async (id: string) => {
  const res = await axios.get(`/blogs/${id}`);
  return res.data;
};
