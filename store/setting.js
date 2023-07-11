import Setting from '~/api/Setting.js'
import { make } from "vuex-pathify";
import {find} from '~/mixins/store/CrudMixin'

const api = Setting

export const state = () => ({
    items: [],
    item: {}
});

export const actions  = {
  findItem({commit}, id){
    return find(api, id, true, commit)
  },

}

export const mutations = {
    ...make.mutations(state),

    SET_FIND(state, data) {
        state.item = data;
    },
};
