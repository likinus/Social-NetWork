import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '7aac75ff-fa17-40ac-a804-1c3e459af873',
  },
});

export const usersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  unfollowUser(id) {
    return instance.delete(`follow/${id}`).then((reponse) => reponse.data);
  },
  followUser(id) {
    return instance.post(`follow/${id}`).then((reponse) => reponse.data);
  },
};

export const profileAPI = {
  getProfile(userId) {
    return instance.get('profile/' + userId);
  },
  getStatus(userId) {
    return instance.get('profile/status/' + userId);
  },
  updateStatus(status) {
    return instance.put('profile/status/', { status: status });
  },
};

export const authAPI = {
  getAuthData() {
    return instance.get('auth/me').then((response) => response.data);
  },

  login(email, password, rememberMe = false) {
    return instance.post('auth/login', { email, password, rememberMe });
  },

  logout() {
    return instance.delete('auth/login');
  },
};
