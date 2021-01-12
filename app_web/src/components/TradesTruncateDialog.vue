<template>
  <div class="text-center">
    <v-dialog v-model="dialogFundsTruncate" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="blue" v-bind="attrs" v-on="on" dark fab small>
          <v-icon>close</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="blue white--text"> Truncate </v-card-title>
        <v-card-text>
          <v-form ref="form" class="pa-6" v-model="valid">
            <v-row>
              <v-col>
                Are you sure you want to truncate Trades?
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="tradesTruncate()"> Truncate </v-btn>
          <v-btn color="primary" text @click="dialogFundsTruncate = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "../plugins/firebase";
import notify from "@/mixins/notify";
var fire = firebase.firestore();
var auth = firebase.auth();

export default {
  created() {},
  mixins: [notify],
  props: {
    // method: { type: Function },
  },
  data() {
    return {
      amountRules: [
        (v) => !!v || "Amount is required!",
        (v) => v > 0 || "Amount should not be equal to zero!",
      ],
      dateRules: [(v) => !!v || "Date is required!"],
      valid: false,
      date: "",
      datePickerMenu: false,
      dialogFundsTruncate: false,
      fund: {
        transaction: "Deposit",
        amount: 1000,
        tax: 0,
      },
    };
  },
  methods: {
    tradesTruncate() {
      fire
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("trades")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete();
          });
          this.notifyOpen("Trades successfully truncated", "success");
        })
        .catch((error) => {
          this.notifyOpen(error, "error");
        });
      this.dialogFundsTruncate = false;
    },
  },
};
</script>