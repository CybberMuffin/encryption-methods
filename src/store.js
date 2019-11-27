import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    plainText: "hello world",
    cipherText: ""
  },
  getters: {},
  mutations: {
    setPlain: (state, payload) => (state.plainText = payload),
    swapText: state => {
      let temp = state.plainText;
      state.plainText = state.cipherText;
      state.cipherText = temp;
    },
    set: (state, { key, value }) => (state[key] = value)
  },
  actions: {}
});
