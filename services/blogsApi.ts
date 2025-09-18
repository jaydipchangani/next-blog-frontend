import axios from './api';

export const getAllBlogs = async () => {
  const res = await axios.get('/blogs');
  return res.data;
};

export const getUserBlogs = async () => {
  const res = await axios.get('/blogs');
  return res.data;
};

export const createBlog = async (formData: FormData) => {
  const res = await axios.post('/blogs', formData, {
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};



export const updateBlog = async (id: string, formData: FormData) => {
  const res = await axios.patch(`/blogs/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
