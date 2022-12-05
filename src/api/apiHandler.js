import axios from 'axios';

const apiHandler = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  withCredentials: true,
});

apiHandler.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

//! Error handling to use in the catch
function errorHandler(error) {
  if (error.data) {
    console.log(error.data && error.data.message);
    throw error;
  }
  throw error;
}

// apiHandler.signup = (userInfo) => {
// 	return apiHandler
// 		.post("/api/v1/auth/signup")
// 		.then((res) => res.data)
// 		.catch(errorHandler)
// }

const service = {
  // Service is spread to have access to the basics get/post...
  ...apiHandler,

  signup(userInfo) {
    return service
      .post('/api/v1/auth/signup', userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  isLoggedIn() {
    return service
      .get('/api/v1/auth/me')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post('/api/v1/auth/signin', userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getConversations() {
    return service
      .get('/api/v1/conversations')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // getAllTheCats() {
  // 	return service
  // 		.get("/api/cats")
  // 		.then((res) => res.data)
  // 		.catch(errorHandler);
  // },
};

// export default apiHandler

export default service;
