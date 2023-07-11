import { make } from "vuex-pathify";
export const state = () => ({
  selectedCountryCode: [],
});
export const actions = {
  setCountryCode({ commit }, payload) {
    commit("SET_COUNTRY_CODE", payload);
    return payload;
  },
};
export const getters = {
  ...make.getters(state),
};

export const mutations = {
  ...make.mutations(state),

  SET_COUNTRY_CODE(state, data) {
    state.selectedCountryCode = data;
  },
};
