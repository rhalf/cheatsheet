<template>
  <div class="text-center">
    <v-dialog v-model="dialogTradesAdd" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue" v-bind="attrs" v-on="on" dark fab small>
          <v-icon>add</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title :class="`${trade.transaction} white--text`">
          Add
        </v-card-title>
        <v-card-text>
          <v-form ref="form" class="pa-6" v-model="valid">
            <v-row>
              <v-col>
                <v-radio-group
                  row
                  mandatory
                  v-model="trade.transaction"
                  required
                >
                  Transaction :
                  <v-radio label="Buy" value="buy"></v-radio>
                  <v-radio label="Sell" value="sell"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-autocomplete
                  :rules="stockCodeRules"
                  label="Stock Code"
                  v-model="trade.stockCode"
                  :items="stocks"
                  item-text="code"
                  item-value="code"
                  clearable
                  required
                ></v-autocomplete>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="stockName"
                  type="text"
                  label="Stock Name (Readonly)"
                  readonly
                  text
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="number"
                  :rules="priceRules"
                  v-model.number="trade.price"
                  label="Price"
                  placeholder="10,000.00"
                  clearable
                  text
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  :rules="sharesRules"
                  v-model.number="trade.shares"
                  label="Shares"
                  placeholder="100,000"
                  clearable
                  text
                  required
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
            <v-row>
              <v-col>
                <v-text-field
                  type="number"
                  v-model.number="trade.feeOthers"
                  label="Fee Others"
                  placeholder="0.00"
                  text
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  v-model.number="trade.feeComTax"
                  label="Fee ComTax (Readonly)"
                  placeholder="12,000.00"
                  text
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="number"
                  v-model.number="trade.amountGross"
                  label="Gross Amount (Readonly)"
                  placeholder="100,000"
                  text
                  readonly
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  v-model.number="trade.amountNet"
                  label="Net Amount (Readonly)"
                  placeholder="100,000"
                  text
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="tradesAdd()"> Add </v-btn>
          <v-btn color="primary" text @click="dialogTradesAdd = false">
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
import stocks from "@/mixins/stocks";
var fire = firebase.firestore();
var auth = firebase.auth();

export default {
  created() {
    this.date = this.$options.filters.toLocaleDate(new Date().getTime());
  },
 updated() {
       if (this.trade.transaction == "buy") {
      this.trade.feeComTax = this.getBuyingFee(
        this.trade.price,
        this.trade.shares
      );
      this.trade.amountGross = this.trade.price * this.trade.shares;
      this.trade.amountNet = this.getBuyingAmountNet(
        this.trade.price,
        this.trade.shares,
        this.trade.feeOthers
      );
    }
    if (this.trade.transaction == "sell") {
      this.trade.feeComTax = this.getSellingFee(
        this.trade.price,
        this.trade.shares
      );
      this.trade.amountGross = this.trade.price * this.trade.shares;
      this.trade.amountNet = this.getSellingAmountNet(
        this.trade.price,
        this.trade.shares,
        this.trade.feeOthers
      );
    }
    this.stockName = this.getStock(this.trade.stockCode).name;

  },
  mounted() {},
  mixins: [notify, stocks],
  props: {
    // method: { type: Function },
  },
  data() {
    return {
      tab: [],
      stockCodeRules: [(v) => !!v || "StockCode is required!"],
      stockNameRules: [(v) => !!v || "StockName is required!"],
      priceRules: [
        (v) => !!v || "Price is required!",
        (v) => v > 0 || "Price should not be equal to zero!",
      ],
      sharesRules: [
        (v) => !!v || "Share is required!",
        (v) => v > 0 || "Share should not be equal to zero!",
      ],
      feeRules: [(v) => !!v || "Fee is required!"],
      dateRules: [(v) => !!v || "Date is required!"],
      valid: false,
      date: "",
      datePickerMenu: false,
      dialogTradesAdd: false,
      stockName: "",
      trade: {
        transaction: "buy",
        shares: 0,
        price: 0,
        feeOthers: 0,
      },
    };
  },
  methods: {
    tradesAdd() {
      this.$refs.form.validate();
      if (!this.valid) return;

      this.trade.date = new Date(this.date).getTime();
      fire
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("trades")
        .add(this.trade)
        .then(() => {
          this.notifyOpen("Trade added successfully!", "success");
        })
        .catch((error) => {
          this.notifyOpen(error, "error");
        });
      this.dialogTradesAdd = false;
    },
  },
  computed: {},
};
</script>

<style scoped>
.buy {
  background-color: green !important;
}
.sell {
  background-color: red !important;
}
</style>