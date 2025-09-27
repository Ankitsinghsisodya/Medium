import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchblog = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBlog(response?.data?.blog);
      setLoading(false);
    };
    fetchblog();
  }, [id]);

  return {
    loading,
    blog,
  };
};
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchblogs = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/blog`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBlogs(response?.data?.blog);
      setLoading(false);
    };
    fetchblogs();
  }, []);

  return {
    loading,
    blogs,
  };
};
