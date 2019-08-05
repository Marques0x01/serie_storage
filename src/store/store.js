import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
const firebase = require('../config/firebaseConfig')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    drawer: false,
    loading: false
  },
  getters: {
    currentUser: state => state.currentUser,
    userProfile: state => state.userProfile,
    loading: state => state.loading
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    setUserProfile(state, payload) {
      state.userProfile = payload;
    },

    TOOGLE_DRAWER: state => (state.drawer = !state.drawer)

  },
  actions: {
    login({ state, commit, dispatch }, user) {
      state.loading = true;
      firebase.auth.signInWithEmailAndPassword(user.email, user.password).then(response => {
        commit("setCurrentUser", response)
        dispatch("fetchUserProfile")
        router.push("home")
      }).catch(err => console.log(err))
        .finally(() => state.loading = false)
    },

    fetchUserProfile({ commit, state }) {
      state.loading = true;

      firebase.usersCollection.doc(state.currentUser.user.uid).get().then(response => {
        commit("setUserProfile", response.data())
      }).catch(err => console.log(err))

      state.loading = false;
    },

    logout({ state, commit }) {
      state.loading = true;
      firebase.auth.signOut().then(() => {
        commit("setCurrentUser", null)
        commit("setUserProfile", {})
        router.push("login")
      }).catch(err => console.log(err))
        .finally(() => state.loading = false)
    },

    signUp({ state, commit, dispatch }, user) {
      state.loading = true;
      firebase.auth.createUserWithEmailAndPassword(user.email, user.password).then(response => {
        commit("setCurrentUser", response)
        firebase.usersCollection.doc(response.user.uid).set({
          name: user.name,
          email: user.email,
          items: [],
          role: "USER"
        }).then(res => {
          dispatch("logout")
        }).catch(err => console.log(err))
          .finally(() => state.loading = false)
      })
    },

    addItem({ state, dispatch }, item) {
      state.loading = true;
      let items = state.userProfile.items;

      let isRepeated = !!items.find(data => data.title.toLowerCase() === item.title.toLowerCase());

      if (isRepeated) {
        console.log("Repeated");
        return false;
      }

      items.push(item)
      firebase.usersCollection
        .doc(state.currentUser.user.uid)
        .update({ items: items });
      dispatch("fetchUserProfile")
      state.loading = false;

    },

    deleteItem({ state, dispatch }, item) {
      state.loading = true;
      let items = state.userProfile.items;

      item.forEach(data => {
        let index = items.indexOf(data);
        items.splice(index, 1);
      });

      firebase.usersCollection
        .doc(state.currentUser.user.uid)
        .update({ items: items });
      dispatch("fetchUserProfile")
      state.loading = false;
    },

    deleteAllItems({ state, dispatch }) {
      state.loading = true;

      firebase.usersCollection
        .doc(state.currentUser.user.uid)
        .update({ items: [] })
      dispatch("fetchUserProfile")
      state.loading = false;
    }
  }
})