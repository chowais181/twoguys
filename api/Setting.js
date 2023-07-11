import ApiClient from '~/api/Client';

const endpoint = 'settings';

export default {
    get() {
        return ApiClient.get(endpoint);
    },
    find(id) {
      return ApiClient.get(`${endpoint}/${id}`);
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
}


