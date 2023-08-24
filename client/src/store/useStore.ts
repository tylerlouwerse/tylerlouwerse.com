import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
  authenticated: boolean;
  user: null;
}

export const useStore = defineStore('main', {
  state: (): State => {
    return {
      authenticated: false,
      user: null,
    }
  },
  actions: {
    async authenticate() {
      try {
        const response = await axios.get('/api/user');
        console.log(response);
        this.authenticated = true;
        this.user = response.data;
      } catch(e) {
        this.authenticated = false;
        this.user = null;
      }
    },
    async login(credentials: { email: string, password: string }) {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/login', credentials);

      this.authenticate();
    }
  }
})