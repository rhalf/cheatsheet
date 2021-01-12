<template>
  <v-container fluid fill-height class="">
    <v-row>
      <v-col></v-col>
      <v-col>
        <v-card fluid width="600">
          <v-app-bar class="blue lighten-1" flat dark>
            <!-- <v-icon>person</v-icon> -->
            <v-toolbar-title class="text-uppercase white--text">
              <span class="font-weight-light"> {{$store.getters.app.name}}</span>
              {{$store.getters.app.vers}}
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
              :append-icon="
                password_visibility ? 'visibility' : 'visibility_off'
              "
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
              <v-checkbox
                v-model="check"
                label="Remember Me?"
                text
              ></v-checkbox>
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
          <v-app-bar class="blue lighten-1 overflow hidden bottom" flat dark>
            <v-btn text @click="signup()">Signup</v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="forgot()">Forgot</v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="submit()">submit</v-btn>
          </v-app-bar>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row></v-row>
  </v-container>
</template>

<script>
import notify from "@/mixins/notify";
import firebase from "@/plugins/firebase";
var fire = firebase.firestore();
var auth = firebase.auth();

export default {
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
  mounted() {
    if (this.$refs) {
      this.$refs.email.focus();
    }
  },
  data() {
    return {
      valid: false,
      check: false,
      password_visibility: true,
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required"
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    // signGoogle: function () {
    //   var provider = new auth.GoogleAuthProvider();
    //   auth.signInWithRedirect(provider);

    //   auth.getRedirectResult().then(function(result) {
    //     if (result.credential) {
    //       // This gives you a Google Access Token. You can use it to access the Google API.
    //       var token = result.credential.accessToken;
    //       console.log("toker", token);
    //     }
    //     // The signed-in user info.
    //     // var user = result.user;
    //      console.log("user", result.user);

    //   }).catch(function(error) {
    //   this.$store.dispatch("snackbarOpen", {
    //     message: "Google signin is not yet ready!",
    //     status: "error",
    //     visible: true,
    //   });
    // },
    // signFacebook() {
    //   this.$store.dispatch("snackbarOpen", {
    //     message: "Facebook signin is not yet ready!",
    //     status: "error",
    //     visible: true,
    //   });
    // },
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

          if (auth.currentUser.emailVerified) {
            this.$router
              .push("/dashboard")
              .catch((error) => this.notifyOpen(error, "error"));
          } else {
            this.notifyOpen("Email is not verified!", "warning");
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