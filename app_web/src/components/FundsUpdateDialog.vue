<template>
  <div class="text-center">
    <v-dialog v-model="dialogFundsUpdate" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn  v-bind="attrs" v-on="on" dark outlined small>
          <v-icon>edit</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title :class="`${fund.transaction} white--text`"> Update </v-card-title>
        <v-card-text>
          <v-form ref="form" class="pa-6" v-model="valid">
            <v-row>
              <v-col>
                <v-radio-group
                  row
                  mandatory
                  v-model="fund.transaction"
                  required
                >
                  Transaction :
                  <v-radio label="Deposit" value="deposit"></v-radio>
                  <v-radio label="Withdraw" value="withdraw"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="number"
                  :rules="amountRules"
                  v-model.number="fund.amount"
                  label="Amount"
                  placeholder="10,000.00"
                  clearable
                  text
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  v-model.number="fund.fee"
                  label="Fee"
                  placeholder="12.00 (Optional)"
                  clearable
                  text
                  required
                  value="0"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-menu
                  v-model="datePickerMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Click desired Date"
                      append-icon="mdi-calendar"
                      :rules="dateRules"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    elevation="1"
                    v-model="date"
                    @change="datePickerMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="fundsUpdate()"> Update </v-btn>
          <v-btn color="primary" text @click="dialogFundsUpdate = false">
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
  created() {
    this.date = this.$options.filters.toLocaleDate(this.fund.date);
  },
  mounted() {},
  mixins: [notify],
  props: {
    fund: Object,
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
      dialogFundsUpdate: false,
    };
  },
  methods: {
    fundsUpdate() {
      this.$refs.form.validate();
      if (!this.valid) return;

      this.fund.date = new Date(this.date).getTime();
      fire
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("funds")
        .doc(this.fund.id)
        .update(this.fund)
        .then(() => {
          this.notifyOpen("Updated successfully!", "success");
        })
        .catch((error) => {
          this.notifyOpen(error, "error");
        });
      this.dialogFundsUpdate = false;
    },
  },
};
</script>

<style scoped>
.deposit {
  background-color: green !important;
}
.withdraw {
  background-color: red !important;
}
</style>