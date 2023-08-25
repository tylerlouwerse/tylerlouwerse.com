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
  
  const fetchPost = async (uuid: string): Promise<void> => {
    let response = await axios.get(`/api/admin/posts/${uuid}/edit`);
    post.value = response.data.data;
  }

  const patchPost = async (uuid: string) => {
    await axios.patch(`/api/admin/posts/${uuid}`, post.value);
  }

  const destroyPost = async (uuid: string) => {
    await axios.delete(`/api/admin/posts/${uuid}`);
  }

  return {
    posts,
    post,
    createPost,
    destroyPost,
    fetchPosts,
    fetchPost,
    patchPost,
  }
}