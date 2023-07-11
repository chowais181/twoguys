import Product from '~/api/Product'
import { make } from "vuex-pathify";
import { fetch, create, update, remove, find } from '~/mixins/store/CrudMixinSimple'
import { findIndex } from "lodash"
import Vue from 'vue';

const api = Product

export const state = () => ({
  items: [],
  orderItems: {}
});
export const actions = {
  fetchItems({ commit }, params = { params: { per_page: 10 } }) {
    return fetch({ api, params, commit_key: 'SET_ITEMS' }, commit)
  },
  createItem({ commit }, data) {
    return create({ api, data, commit_key: 'SET_ITEM' }, commit)
  },
  updateItem({ commit }, data) {
    return update({ api, data, commit_key: 'UPDATE_ITEM' }, commit)
  },
  deleteItem({ commit }, id) {
    return remove({ api, id, commit_key: 'REMOVE_ITEM' }, commit)
  },
  fetchOrderItems({ commit }, params = { per_page: 10 }) {
    return fetch({ api, params: { params } }, commit).then(
      res => {
        commit('SET_ORDER_ITEMS', { id: params['category.id'], items: res.data })
      }
    )
  }
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
  SET_ORDER_ITEMS(state, data) {
    Vue.set(state.orderItems, data.id, data)
  },
  ADD_ORDER_ITEMS(state, data) {
    if (state.orderItems[data.id]) {
      Vue.set(state.orderItems[data.id], 'items', state.orderItems[data.id].items.concat(data.items))
    }
  },
};
