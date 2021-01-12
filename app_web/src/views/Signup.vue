<template>
  <v-container fluid fill-height class="grey lighten-3">
    <v-row>
      <v-col></v-col>
      <v-col>
        <v-card fluid width="600">
          <v-app-bar class="blue lighten-1" flat dark>
            <v-icon>person</v-icon>
            Sign up
          </v-app-bar>
          <v-form class="px-16 py-6" ref="form" v-model="valid">
            <v-text-field
              type="text"
              v-model="name"
              placeholder="Juan Dela Cruz"
              :rules="nameRules"
              label="Name"
              counter="40"
              required
            ></v-text-field>

            <v-text-field
              type="email"
              v-model="email"
              :rules="emailRules"
              placeholder="juandcruz@gmail.com"
              label="E-mail"
              counter="40"
              required
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="password1"
              :rules="password1Rules"
              label="Enter password"
              counter="40"
              required
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="password2"
              :rules="password2Rules"
              label="Retype password"
              counter="40"
              required
            ></v-text-field>

            <vue-tel-input
              autocomplete
              v-model="phone"
              enabledCountryCode
              validCharactersOnly
              maxLe="10"
              defaultCountry="Ph"
              mode="international"
              dynamicPlaceholder
              required
            ></vue-tel-input>
          </v-form>

          <v-app-bar class="blue lighten-1 overflow hidden bottom">
            <v-btn text @click="signin()" dark>Signin</v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="submit()" dark>submit</v-btn>
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

import firebase from "../plugins/firebase";

var fire = firebase.firestore();
var auth = firebase.auth();

export default {
  mixins: [notify],
  data() {
    return {
      valid: false,
      name: "",
      nameRules: [
        (v) => !!v || "First and Last Name is required",
        (v) =>
          v.length > 9 || "First and Last  must not be less than 10 characters",
      ],
      phone: "",
      password1: "",
      password2: "",
      password1Rules: [
        (v) => !!v || "Password is required",
        (v) => v.length > 5 || "Password must not be less than 6 characters",
      ],
      password2Rules: [
        (v) => !!v || "Password is required",
        () => this.checkPasswordMatch() || "Password didn't match",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    created() {
      if (firebase.auth().currentUser) {
        if (firebase.auth().currentUser.emailVerified)
          this.$router.push("/dashboard").catch((error) => this.notifyOpen(error, "error"));
      }
    },
    submit: function () {
      this.$refs.form.validate();
      if (!this.valid) return;
      if (this.phone.length < 11) {
        this.notifyOpen(
          "Phone number is empty or is less than 11 digits!",
          "warning"
        );
        return;
      }
      auth.createUserWithEmailAndPassword(this.email, this.password1).then(
        () => {
          auth.currentUser.sendEmailVerification();
          fire
            .collection("users")
            .doc(auth.currentUser.uid)
            .set({
              email: this.email,
              displayName: this.name,
              phoneNumber: this.phone,
              photoUrl: "",
              logins: 1,
              dtCreated: new Date().getTime(),
              dtModified: new Date().getTime(),
              dtLogged: new Date().getTime(),
              dtExpired: null,
              privilege: "user",
              disabled: "false",
              likes: 0,
            })
            .catch((error) => {
              this.notifyOpen(error, "error");
            });

          this.notifyOpen("Email has sent an email verification!", "success");
        }).catch((error) => this.notifyOpen(error, "error"));
    },
    signin: function () {
      this.$router.push("/").catch((error) => this.notifyOpen(error, "error"));
    },
    checkPasswordMatch: function () {
      return this.password1 === this.password2;
    },
  },
};
</script>