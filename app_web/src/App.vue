<template>
  <v-app>
    <v-main>
      <navbar></navbar>
      <router-view></router-view>
    </v-main>
    <notify></notify>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Notify from "@/components/Notify";
import firebase from "@/plugins/firebase";

var fire = firebase.firestore();
var auth = firebase.auth();

export default {
  name: "App",
  components: { Navbar, Notify },

  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        var docRef = fire.collection("users").doc(user.uid);
        docRef
          .get()
          .then((doc) => {
            this.$store.dispatch("setUser", doc.data());
            this.user = this.$store.getters.user;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  },
};
</script>
