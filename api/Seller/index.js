import ApiClient from '~/api/Client';

const sellerServiceEndpoint = 'v1/services/seller';
const sellerLocationEndpoint = 'v1/locations/seller';

export default {
    get(id) {
        return ApiClient.get(`${sellerServiceEndpoint}/${id}`);
    },
    add(data) {
        return ApiClient.post(endpoint, data);
    },
    remove(id) {
        return ApiClient.delete(`${endpoint}/${id}`);
    },

    addService(data) {
      return ApiClient.post(sellerServiceEndpoint, data);
    },

    removeService(id) {
      return ApiClient.delete(`v1/services/${id}/seller`);
    },

    addSellerLeadDeduct(params, data) {
      return ApiClient.post(`v1/seller/${params.seller_id}/lead/${params.lead_id}`, data);
    },

    addLocation(data) {
      return ApiClient.post(sellerLocationEndpoint, data);
    },

    removeLocation(id) {
      return ApiClient.delete(`v1/locations/${id}/seller`);
    },

    getSellerCredits(id) {
      return ApiClient.get(`v1/seller/${id}/credits`);
    },

}


