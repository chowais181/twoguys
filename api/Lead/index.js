import ApiClient from '~/api/Client';

const endpoint = 'v1/leads';

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

    getSellerLeads(id){
      return ApiClient.get(`v1/leads/seller/${id}`);
    },

    getSellerLeadExist(params){
      return ApiClient.get(`v1/seller/${params.seller_id}/lead/${params.lead_id}/exist`);
    },

    getSellerCriteriaLeads(params){
      return ApiClient.get(`v1/seller/${params.seller_id}/criteria/leads`);
    }
}


