import axios from 'axios';

// Create API service with default config
const apiService = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 30000, // 30 seconds for timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Sport training plan API
export const sportTrainingApi = {
  createPlan: (data) => {
    return apiService.post('/sports/training-plan', data);
  }
};

// Workout plan API
export const workoutPlanApi = {
  createPlan: (data) => {
    return apiService.post('/workouts/plan', data);
  }
};

// Add response interceptor for error handling
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API Error:', error);
    
    // Custom error message based on status code
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 429) {
        return Promise.reject(new Error('Too many requests. Please try again later.'));
      } else if (error.response.status >= 500) {
        return Promise.reject(new Error('Server error. Please try again later.'));
      } else if (error.response.data && error.response.data.detail) {
        return Promise.reject(new Error(error.response.data.detail));
      }
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject(new Error('No response from server. Please check your internet connection.'));
    }
    
    return Promise.reject(error);
  }
);

export default apiService;