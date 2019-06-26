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
    editUser(state, data) {
        data.id = state.userId;
        let index = state.users.indexOf(state.users.find(user => user.id === state.userId));
        state.users[index] = data;
    },
    saveUserId(state, id) {
        state.userId = id;
    },
    logout(state) {
        state.userId = null;
    },
    deleteAccount(state) {
        let index = state.users.indexOf(state.users.find(user => user.id === state.userId));
        state.users.splice(index, 1);
        state.userId = null;
    },
  },
  getters: {
    id: state => state.id,
    users: state => state.users,
    userId: state => state.userId,
    getLoginedUserData: state => {
        let data = state.users.find(user => user.id === state.userId);
        if(data != undefined) {
            let accaunt_data = {
                avatar: data.avatar,
                info: {
                    firstName: data.firstName,
                    lastName:  data.lastName,
                    gender:    data.gender == "M" ? "Mail" : "Famail",
                    age:       data.age,
                    email:     data.email,
                }
            }
            return accaunt_data;
        }
        return data;
    },
    getUserByEmail: state => email => {
        return state.users.find(user => user.email === email);
    },
    emailExist: state => email => {
        return state.users.find(user => user.email === email) === undefined ? false : true;
    },
    emailExistEdit: state => email => {
        let user = state.users.find(user => user.email === email);
        return user === undefined ? false : true && user.id != state.userId;
    },
    login: state => data => {
        let user = state.users.find(user => user.email === data.email);
        if(user != undefined && user.password == data.password) {
            return {status: "success", userId: user.id};
        } else {
            return {status: "fail", userId: null};
        }
    },
  }
});