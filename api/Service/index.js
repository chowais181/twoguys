import ApiClient from '~/api/Client';

const endpoint = 'v1/services';

export default {
    get() {
        return ApiClient.get(endpoint);
    },
    add(data) {
        return ApiClient.post(endpoint, data);
    },
    remove(id) {
        return ApiClient.delete(`${endpoint}/${id}`);
    },
}


