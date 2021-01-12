<template>
  <div class="text-center">
    <v-dialog v-model="loginDialog" width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="white" v-bind="attrs" v-on="on" outlined>
          Login <v-icon small>login</v-icon>
        </v-btn>
      </template>

      <v-card fluid>
        <v-app-bar class="blue" flat dark>
          <!-- <v-icon>person</v-icon> -->
          <v-toolbar-title class="text-uppercase white--text">
            <span class="font-weight-light">Logging</span>
            in
          </v-toolbar-title>
        </v-app-bar>
        <v-form class="px-16 pt-6" ref="form" v-model="valid">
          <v-text-field
            type="email"
            v-model="email"
            label="E-mail"
            ref="email"
            counter="40"
            :rules="emailRules"
            required
          >
          </v-text-field>
          <v-text-field
            :append-icon="password_visibility ? 'visibility' : 'visibility_off'"
            @click:append="() => (password_visibility = !password_visibility)"
            :type="password_visibility ? 'password' : 'text'"
            v-model="password"
            label="Password"
            ref="password"
            counter="40"
            :rules="passwordRules"
            required
          >
          </v-text-field>
          <v-row>
            <v-spacer></v-spacer>
            <v-checkbox v-model="check" label="Remember Me?" text></v-checkbox>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <!-- <v-divider></v-divider>
          <v-container>
          <v-row>
            <v-col>
              <v-btn color="green" outlined  v-on:click="signGoogle()">
                <v-icon left>
                  mdi-google
                </v-icon>
                Sign in w/ Google?
              </v-btn>
            </v-col>
              <v-col>
              <v-btn color="blue" dark outlined v-on:click="signFacebook()">
                <v-icon left>
                  mdi-facebook
                </v-icon>
                Sign in w/ facebook?
              </v-btn>
            </v-col>
          </v-row>
        </v-container> -->

        <!-- <v-alert class="mx-6" dense v-show="error.show" v-bind:state="error.state" >{{error.message}}</v-alert> -->
        <v-app-bar class="blue bottom"  dark>
          <signup-dialog></signup-dialog>
          <v-spacer></v-spacer>
          <signup-dialog></signup-dialog>
          <v-spacer></v-spacer>
          <v-btn text @click="submit()">submit</v-btn>
        </v-app-bar>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SignupDialog from "@/components/SignupDialog";

import notify from "@/mixins/notify";
import firebase from "@/plugins/firebase";
var fire = firebase.firestore();
var auth = firebase.auth();

export default {
  components: { SignupDialog },
  mixins: [notify],
  created() {
    if (localStorage.getItem("check") == "true") this.check = true;
    else this.check = false;
    this.email = localStorage.getItem("email");
    this.password = localStorage.getItem("password");

    if (auth.currentUser) {
      if (auth.currentUser.emailVerified)
        this.$router
          .push("/dashboard")
          .catch((error) => this.notifyOpen(error, "error"));
    }
  },

  data() {
    return {
      loginDialog: false,
      valid: false,
      check: false,
      password_visibility: true,
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    signup() {
      this.$router
        .push("/signup")
        .catch((error) => this.notifyOpen(error, "error"));
    },
    submit: function () {
      this.$refs.form.validate();
      if (!this.valid) return;

      if (this.check) {
        localStorage.setItem("check", this.check);
        localStorage.setItem("email", this.email);
        localStorage.setItem("password", this.password);
      } else {
        localStorage.setItem("check", this.check);
        localStorage.setItem("email", "");
        localStorage.setItem("password", "");
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          const increment = firebase.firestore.FieldValue.increment(1);
          var docRef = fire.collection("users").doc(auth.currentUser.uid);
          docRef
            .update({ logins: increment, dtLogged: new Date().getTime() })
            .catch((error) => this.notifyOpen(error, "error"));

          if (!auth.currentUser.emailVerified) {
            this.notifyOpen("Email is not verified!", "success");
          }
        })
        .catch((error) => this.notifyOpen(error, "error"));
    },
    forgot: function () {
      if (!this.valid) return;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.notifyOpen(
            "Password reset has been sent to your email!",
            "success"
          );
        })
        .catch((error) => this.notifyOpen(error, "error"));
    },
  },
};
</script>