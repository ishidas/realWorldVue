import axios from 'axios';

const apiClient = axios.create({
  baseURL:         'http://localhost:3000',
  withCredentials: false,
  headers:         {
    Accept:         'accplication/json',
    'Content-Type': 'application/json'
  }
});

export default {
  getEvents() {
    return apiClient.get('/events');
  },

  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  }
};
