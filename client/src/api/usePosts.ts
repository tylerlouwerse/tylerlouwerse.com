import axios from 'axios';
import { ref } from 'vue';
import { Post } from '../types/Post';

export default function usePosts() {
  const posts = ref<Post[]>([]);
  const post = ref<Post>();

  const fetchPosts = async (): Promise<void> => {
    let response = await axios.get('api/posts');
    posts.value = response.data.data;
  }

  const fetchPost = async (slug: string): Promise<void> => {
    let response = await axios.get(`api/posts/${slug}`);
    post.value = response.data.data;
  }

  return {
    posts,
    post,
    fetchPosts,
    fetchPost,
  }
}