import Services from '~/api/Service'
import { make } from "vuex-pathify";

export const state = () => ({
  items: [],
});

export const actions = {

  async fetchServices({ commit }) {
    try {
      let response = await Services.get()
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
