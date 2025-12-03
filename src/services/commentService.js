import axios from 'axios';

const API_URL = 'http://localhost:3001/comments'; // Pastikan port 3001

export const commentService = {
  // Ambil data
  getComments: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Gagal ambil komentar:", error);
      return [];
    }
  },

  // Kirim data
  postComment: async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      return response.data;
    } catch (error) {
      console.error("Gagal kirim komentar:", error);
      throw error;
    }
  }
};