<template>
  <div class="text-center">
    <v-dialog v-model="dialogLogout" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="white" v-bind="attrs" v-on="on" outlined>
          Logout <v-icon small>logout</v-icon>
        </v-btn>
      </template>

      <v-card fluid>
        <v-app-bar class="blue" flat dark>
          <!-- <v-icon>person</v-icon> -->
          <v-toolbar-title class="text-uppercase white--text">
            <span class="font-weight-light"> Logging </span>
            out
          </v-toolbar-title>
        </v-app-bar>

        <v-card-text>
          <v-sheet class="pa-6"> Are you sure you want to log out? </v-sheet>
        </v-card-text>

        <!-- <v-alert class="mx-6" dense v-show="error.show" v-bind:state="error.state" >{{error.message}}</v-alert> -->
        <v-app-bar class="blue bottom" flat dark>
          <v-btn text @click="cancel()">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="yes()">Yes</v-btn>
        </v-app-bar>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import notify from "@/mixins/notify";
import firebase from "@/plugins/firebase";
// var fire = firebase.firestore();
var auth = firebase.auth();

export default {
  mixins: [notify],
 
  data() {
    return {
      dialogLogout: false,
    };
  },
  methods: {
    cancel() {
      this.dialogLogout = false;
    },
    yes() {
      this.dialogLogout = false;
      auth.signOut().then(
        () => {
          this.$store.dispatch("setUser", null);
          this.notifyOpen("Logging out successful", "success");
        },
        (error) => {
          this.notifyOpen(error, "error");
        }
      );
    },
  },
};
</script>