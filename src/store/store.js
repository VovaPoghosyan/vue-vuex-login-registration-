import Vue from 'vue'
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    id: 1,
    users: [],
    userId: null,
  },
  plugins: [createPersistedState()],
  mutations: {
    addUser(state, data) {
        data.id = state.id++;
        state.users.push(data);
    },
  },
  getters: {
    id: state => state.id,
    users: state => state.users,
    getLoginedUserData: state => {
        return state.users.find(user => user.id === state.userId);
    },
    getUserByEmail: state => email => {
        return state.users.find(user => user.email === email);
    },
    emailExist: state => email => {
        return state.users.find(user => user.email === email) === undefined ? false : true;
    },
    login: state => data => {
        let user = state.users.find(user => user.email === data.email);
        console.log(data, 'data.id');
        if(user != undefined && user.password == data.password) {
            state.userId = user.id;
            return true;
        } else {
            return false;
        }
    },
  }
});