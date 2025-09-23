import axios from './api';

interface GetAllBlogsParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const getAllBlogs = async (params?: GetAllBlogsParams) => {
  const res = await axios.get('/blogs', { params });
  return res.data; 
};

export const getUserBlogs = async (params?: { page?: number; search?: string; sort?: string }) => {
  const res = await axios.get('/blogs', {
    params: {
      page: params?.page || 1,
      search: params?.search || '',
      sort: params?.sort || 'asc',
    },
  });
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

export async function fetchTopBlogs(token: string) {
  const res = await axios.get("/blogs/top/views", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

