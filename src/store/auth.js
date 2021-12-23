import firebase from "firebase/compat/app";
import { register } from "register-service-worker";
import "firebase/compat/auth";
import "firebase/compat/database";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },

    async register({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill: 10000,
            name: name
          });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },

    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async logout() {
      await firebase.auth().signOut();
    }
  }
};
