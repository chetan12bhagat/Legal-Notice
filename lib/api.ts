const API_BASE_URL = 'http://localhost:5000';

export interface User {
  email: string;
  role: 'user' | 'lawyer';
  name?: string;
  token?: string;
}

export const api = {
  sendOtp: async (email: string, role: string) => {
    const response = await fetch(`${API_BASE_URL}/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    });
    return response.json();
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    return response.json();
  },

  getLawyers: async () => {
    const response = await fetch(`${API_BASE_URL}/lawyers`);
    return response.json();
  },

  getLawyerById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/lawyers`);
    const lawyers = await response.json();
    return lawyers.find((l: any) => l.id === id);
  },

  getPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    return response.json();
  },

  createPost: async (postData: any) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  updateLawyerProfile: async (profileData: any) => {
    const response = await fetch(`${API_BASE_URL}/lawyers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    return response.json();
  },

  submitCase: async (caseData: any) => {
    const response = await fetch(`${API_BASE_URL}/submit-case`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData),
    });
    return response.json();
  }
};
