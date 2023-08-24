import axios from 'axios';
import { ref } from 'vue';
import { Post } from '../types/Post';

export default function useAdminPosts() {
  const posts = ref<Post[]>([]);
  const post = ref<Post>();

  const createPost = async (): Promise<Post> => {
    const response = await axios.post('/api/admin/posts');
    return response.data.data;
  }

  const fetchPosts = async (): Promise<void> => {
    const response = await axios.get('/api/admin/posts');
    posts.value = response.data.data;
  }
  
  const fetchPost = async (slug: string): Promise<void> => {
    let response = await axios.get(`/api/admin/posts/${slug}/edit`);
    post.value = response.data.data;
  }

  return {
    posts,
    post,
    createPost,
    fetchPosts,
    fetchPost,
  }
}