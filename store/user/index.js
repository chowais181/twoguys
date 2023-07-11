import User from '~/api/User'
import { make } from "vuex-pathify";
import {fetch, create, update, remove, find} from '~/mixins/store/CrudMixin'

export const state = () => ({
    user: {},
});

export const actions  = {

  async login({commit}, data){
    const response = await User.userLogin(data)

    if(response.data.success){
      commit("SET_USER", response.data.user)
    }

    return response
  },

  async fetchUser({commit}, id){
    const response = await User.find(id)

    if(response.data.success){
      commit("SET_USER", response.data.user)
    }

    return response
  },

  async createUser({commit}, data){
    const response = await User.add(data)
    return response
  },

  async fetchUserLocations({commit}, id){
    const response = await User.getUserLocations(id)
    return response
  },
  
}

export const getters = {
  ...make.getters(state),
}

export const mutations = {
    ...make.mutations(state),

    SET_USER(state, user){
      state.user = user
    },

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
