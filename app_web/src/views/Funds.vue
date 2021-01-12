<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <chart-area v-if="chartData" :chart-data="chartData"></chart-area>
      </v-col>
    </v-row>

    <v-row>
      <v-tabs v-model="tab" background-color="blue" dark>
        <v-tab> Records </v-tab>
        <v-tab> Others </v-tab>
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-toolbar flat class="pt-0 mt-0">
                <funds-add-dialog></funds-add-dialog>
                <funds-truncate-dialog></funds-truncate-dialog>
                <v-btn class="blue" @click="refresh()" dark fab small
                  ><v-icon>refresh</v-icon></v-btn
                >
                <v-btn class="d-none d-lg-block blue" dark fab small>{{
                  funds.length
                }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="blue" dark @click="prev()"
                  ><v-icon>mdi-arrow-left</v-icon></v-btn
                >
                <v-btn class="blue" dark>{{ this.pageNumber }}</v-btn>
                <v-btn class="blue" dark @click="next()"
                  ><v-icon>mdi-arrow-right</v-icon></v-btn
                >
                <v-spacer></v-spacer>
                <v-btn class="d-none d-lg-block green" dark>{{
                  deposited | toMoney
                }}</v-btn>
                <v-btn class="d-none d-lg-block red" dark>{{
                  withdrawn | toMoney
                }}</v-btn>
                <v-btn class="d-none d-lg-block blue" dark>{{
                  (deposited - withdrawn) | toMoney
                }}</v-btn>
              </v-toolbar>
            </v-row>
            <!-- <v-card v-for="stock in allStocks" :key="stock.code">{{stock.code +" | "+ stock.name}}</v-card> -->

            <v-row>
              <v-col>
                <v-card
                  fluid
                  v-for="fund in paginatedFunds"
                  :key="fund.id"
                  :class="`${fund.transaction} pa-1 ma-2`"
                  dark
                  elevation="3"
                >
                  <v-row>
                    <v-col>
                      <div class="caption">Date</div>
                      <div>{{ fund.date | toLocaleDate }}</div>
                    </v-col>
                    <v-col>
                      <div class="caption">Transaction</div>
                      <div v-text="fund.transaction"></div>
                    </v-col>
                    <v-col>
                      <div class="caption">Amount</div>
                      <div>{{ fund.amount | toMoney }}</div>
                    </v-col>
                    <v-col>
                      <div class="caption">Fee</div>
                      <div>{{ fund.fee | toMoney }}</div>
                    </v-col>

                    <v-col>
                      <div class="row col pa-1 ma-1">
                        <funds-update-dialog :fund="fund"></funds-update-dialog>
                        <funds-delete-dialog :fund="fund"></funds-delete-dialog>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container> Nothing here! </v-container>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import FundsAddDialog from "@/components/FundsAddDialog";
import FundsTruncateDialog from "@/components/FundsTruncateDialog";
import FundsUpdateDialog from "@/components/FundsUpdateDialog";
import FundsDeleteDialog from "@/components/FundsDeleteDialog";

import ChartArea from "@/components/ChartArea";

import notify from "@/mixins/notify";
import stocks from "@/mixins/stocks";

import firebase from "@/plugins/firebase";

var fire = firebase.firestore();
var auth = firebase.auth();

export default {
  components: {
    FundsAddDialog,
    FundsTruncateDialog,
    FundsUpdateDialog,
    FundsDeleteDialog,
    ChartArea,
  },
  mixins: [notify, stocks],
  created() {
    this.load();
  },

  data() {
    return {
      tab: [],
      pageNumber: 1,
      pageSize: 10,
      funds: [],
      cdReady: false,
      cdFunds: {
        labels: [],
        datasets: [],
      },
    };
  },
  methods: {
    refresh() {
      this.funds = [];
      fire
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("funds")
        .orderBy("date", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            var data = doc.data();
            data.id = doc.id;
            this.funds.push(data);
          });
        });
    },
    load() {
      fire
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("funds")
        .orderBy("date", "asc")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              var data = change.doc.data();
              data.id = change.doc.id;
              this.funds.unshift(data);
            }
            if (change.type === "modified") {
              this.funds.forEach((fund) => {
                if (fund.id == change.doc.id) {
                  var data = change.doc.data();
                  data.id = change.doc.id;
                  fund = data;
                }
              });
            }
            if (change.type === "removed") {
              for (var index = 0; index < this.funds.length; index++) {
                if (this.funds[index].id == change.doc.id) {
                  this.funds.splice(index, 1);
                }
              }
            }
          });
        });
    },
    next() {
      var pages = this.funds.length / this.pageSize;
      if (pages > this.pageNumber) this.pageNumber++;
    },
    prev() {
      if (this.pageNumber > 1) this.pageNumber--;
    },
  },
  computed: {
    paginatedFunds() {
      return this.funds.slice(
        (this.pageNumber - 1) * this.pageSize,
        this.pageNumber * this.pageSize
      );
    },
    withdrawn() {
      var total = 0;
      this.funds.forEach((fund) => {
        if (fund.transaction == "withdraw") total += fund.amount;
      });

      return total;
    },
    deposited() {
      var total = 0;
      this.funds.forEach((fund) => {
        if (fund.transaction == "deposit") total += fund.amount;
      });
      return total;
    },
    chartData() {
      if (this.funds.length == 0) return;

      var funds = {
        labels: [],
        datasets: [],
      };
      //#####################################################
      var dataset = {
        label: "Funds",
        data: [],
      };
      var total = 0;
      // var lastLabel = this.$options.filters.toLocaleDate(this.funds[0].date);

      this.funds
        .slice()
        .reverse()
        .forEach((fund) => {
          if (fund.transaction == "deposit") total += fund.amount;
          if (fund.transaction == "withdraw") total -= fund.amount;

          var label = this.$options.filters.toLocaleDate(fund.date);

          if (!funds.labels.includes(label)) {
            funds.labels.push(label);
            dataset.data.push(total);
          }
        });

      dataset.borderColor = "blue";
      dataset.pointBackgroundColor = "blue";
      dataset.borderWidth = 2;
      dataset.pointBorderColor = "white";
      dataset.backgroundColor = "rgba(0, 0, 255, 0.3)";

      dataset.data.push(total);
      funds.datasets.push(dataset);
      //#####################################################
      return funds;
    },
  },
};
</script>
<style scoped>
.v-card.deposit {
  border-left: 16px solid rgb(0, 128, 0);
  background: rgb(0, 160, 0);
}

.v-card.withdraw {
  border-left: 16px solid rgb(192, 0, 0);
  background: rgb(255, 0, 0);
}
</style>

