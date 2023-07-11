import Seller from '~/api/Seller'
import { make } from "vuex-pathify";

export const state = () => ({
  items: [],
});

export const actions = {

  async fetchSellerServices({ commit }, id) {
    try {
      let response = await Seller.get(id)
      console.info('seller-services', response)
      return response
    } catch (error) {
      console.error(error)
    }
  },

  async fetchSellerLeads({ commit }, id) {
    try {
      let response = await Lead.getSellerLeads(id)
      return response
    } catch (error) {
      console.error(error)
    }
  },

  async removeSellerService({ commit }, id) {
    try {
      let response = await Seller.removeService(id)
      return response
    } catch (error) {
      console.error(error)
    }
  },

  async addSellerService({ commit }, data) {
    try {
      let response = await Seller.addService(data)
      return response
    } catch (error) {
      console.error(error)
    }
  },

  async addSellerLeadDeductCredit({ commit }, data) {
    try {
      let response = await Seller.addSellerLeadDeduct(data.params, data.data)
      return response
    } catch (error) {
      console.error(error)
    }
  },

  async removeSellerLocation({ commit }, id) {
    try {
      let response = await Seller.removeLocation(id)
      return response
    } catch (error) {
      console.error(error)
    }
  },

  async addSellerLocation({ commit }, data) {
    try {
      let response = await Seller.addLocation(data)
      return response
    } catch (error) {
      console.error(error)
    }
  },

}

export const getters = {
  ...make.getters(state),
}

export const mutations = {
  ...make.mutations(state),

  SET_ITEMS(state, data) {
    state.items = data;
  },
  SET_ITEM(state, data) {
    state.items.push(data);
  },
  REMOVE_ITEM(state, id) {
    state.items.splice(state.items.findIndex(items => items.id === id), 1);
  },
  UPDATE_ITEM(state, data) {
    state.items.splice(state.items.findIndex(items => items.id === data.id), 1, data);
  },
};
