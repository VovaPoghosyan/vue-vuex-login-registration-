import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    id: 1,
    users: []
  },
  plugins: [createPersistedState()],
  mutations: {
    addUser(state, data) {
        data.id = state.id++;
        state.users.push(data);
        console.log('state.users', state.users);
    },
  },
  getters: {
    id: state => state.id,
    users: state => state.users,
    getUserById: state => id => {
        return state.users.find(user => user.id === id);
    },
    getUserByEmail: state => email => {
        return state.users.find(user => user.email === email);
    },
    emailExist: state => email => {
        return state.users.find(user => user.email === email) === undefined ? false : true;
    },
  }
});