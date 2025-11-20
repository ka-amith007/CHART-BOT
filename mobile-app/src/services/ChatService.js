import axios from 'axios';
import { API_URL, ENDPOINTS } from '../config';

class ChatService {
  constructor() {
    this.userId = `user_${Date.now()}`;
  }

  async sendMessage(message) {
    try {
      const response = await axios.post(`${API_URL}${ENDPOINTS.CHAT}`, {
        message,
        userId: this.userId,
      }, {
        timeout: 30000,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to send message');
    }
  }

  async sendFileMessage(message, fileUri, fileName, fileType) {
    try {
      const formData = new FormData();
      formData.append('message', message);
      formData.append('userId', this.userId);
      formData.append('file', {
        uri: fileUri,
        name: fileName,
        type: fileType,
      });

      const response = await axios.post(`${API_URL}${ENDPOINTS.CHAT_WITH_FILE}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to send file');
    }
  }

  async getHistory() {
    try {
      const response = await axios.get(`${API_URL}${ENDPOINTS.HISTORY}/${this.userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch history');
    }
  }

  async clearHistory() {
    try {
      await axios.delete(`${API_URL}${ENDPOINTS.HISTORY}/${this.userId}`);
    } catch (error) {
      throw new Error('Failed to clear history');
    }
  }
}

export default new ChatService();
