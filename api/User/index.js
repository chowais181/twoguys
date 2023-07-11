import ApiClient from '~/api/Client'

const endpoint = 'v1/users'
const loginEndpoint = 'v1/user/login'

export default {
  get(data) {
    return ApiClient.get(endpoint, data);
  },
  add(data) {
    return ApiClient.post(endpoint, data);
  },
  update(data) {
    return ApiClient.patch(`${endpoint}/${data.id}`, data);
  },
  remove(id) {
    return ApiClient.delete(`${endpoint}/${id}`);
  },
  find(id) {
    return ApiClient.get(`${endpoint}/${id}`);
  },

  userLogin(data) {
    return ApiClient.post(loginEndpoint, data);
  },

  getUserLocations(id) {
    return ApiClient.get(`v1/seller/${id}/locations`);
  },

}


