<template>
  <v-container>
    <v-app-bar flat height="50" app dark class="blue">
      <v-app-bar-nav-icon
        v-if="user"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <!-- <v-icon>mdi-notebook</v-icon> -->
      <v-toolbar-title class="text-uppercase white--text">
        {{ $store.getters.app.name }}
        <!-- <span class="font-weight-light"> {{ $store.getters.app.name }}</span>
        {{ $store.getters.app.vers }} -->
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn> -->
      <!-- <v-btn icon>
        <img
          src="https://lipis.github.io/flag-icon-css/flags/4x3/ph.svg"
          height="24px"
          width="24px"
        />
      </v-btn> -->

      <login-dialog v-if="!user"></login-dialog>
      <logout-dialog v-if="user"></logout-dialog>
    </v-app-bar>

    <v-navigation-drawer
      v-if="user"
      v-model="drawer"
      app
      dark
      class="blue"
      width="300"
    >
      <template v-slot:prepend>
        <v-list-item three-line>
          <v-list-item-avatar>
            <!-- <img v-if="user" v-bind:src="user.photoURL" onerror="./assets/user.png"> -->
            <img src="../assets/user.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user.displayName }}</v-list-item-title>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
            <v-list-item-title>{{ user.privilege }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
import notify from "@/mixins/notify";

import loginDialog from "../components/LoginDialog";
import logoutDialog from "../components/LogoutDialog";

// import firebase from "../plugins/firebase";
// var fire = firebase.firestore();
// var auth = firebase.auth();

export default {
  components: { loginDialog, logoutDialog },
  mixins: [notify],

  created() {},
  mounted() {},
  data() {
    return {
      drawer: false,
      links: this.$store.getters.links,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {},
};
</script>