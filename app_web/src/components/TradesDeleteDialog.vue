<template>
  <div class="text-center">
    <v-dialog v-model="dialogTradesDelete" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn  v-bind="attrs" v-on="on" dark outlined small>
          <v-icon>close</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="blue white--text"> Delete </v-card-title>
        <v-card-text>
          <v-form ref="form" class="pa-6">
            <v-row>
              <v-col>
                Are you sure you want to delete the records?
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="tradesDelete()"> Delete </v-btn>
          <v-btn color="primary" text @click="dialogTradesDelete = false">
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
    trade: Object,
  },
  data() {
    return {
      dialogTradesDelete: false,
    };
  },
  methods: {
    tradesDelete() {
      fire
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("trades")
        .doc(this.trade.id)
        .delete()
        .then(() => {
          this.notifyOpen("Deleted successfully!", "success");
        })
        .catch((error) => {
          //  console.log(error, "error");
          this.notifyOpen(error, "error");
        });
      this.dialogTradesDelete = false;
    },
  },
};
</script>