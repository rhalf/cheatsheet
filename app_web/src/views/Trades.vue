<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card
          v-for="active in this.active"
          :key="active.id"
          :class="`${active.status} pa-1 ma-2`"
          dark
          elevation="3"
        >
          <v-row>
            <v-col>
              <div class="caption">StockCode</div>
              <div>{{ active.stockCode }}</div>
            </v-col>
            <v-col>
              <div class="caption">Shares</div>
              <div>{{ active.shares | toWhole }}</div>
            </v-col>

            <v-col>
              <div class="caption">Days</div>
              <div>
                {{ active.days | toWhole }}
              </div>
            </v-col>

            <!-- <v-col>
              <div class="caption">BuyDate</div>
              <div>{{ active.buyDate | toLocaleDate }}</div>
            </v-col> -->
            <v-col>
              <div class="caption">BuyAve</div>
              <div>{{ active.buyAve | toRoundOff4 }}</div>
            </v-col>
            <!-- <v-col>
              <div class="caption">BuyAmountGross</div>
              <div>{{ active.buyAmountGross | toRoundOff4 }}</div>
            </v-col> -->
            <v-col>
              <div class="caption">BuyAmountNet</div>
              <div>{{ active.buyAmountNet | toRoundOff4 }}</div>
            </v-col>
            <!-- <v-col>
              <div class="caption">SellDate</div>
              <div>{{ active.sellDate | toLocaleDate }}</div>
            </v-col> -->
            <v-col>
              <div class="caption">SellAve</div>
              <div>{{ active.sellAve | toRoundOff4 }}</div>
            </v-col>
            <!-- <v-col>
              <div class="caption">SellAmountGross</div>
              <div>{{ active.sellAmountGross | toRoundOff4 }}</div>
            </v-col> -->
            <v-col>
              <div class="caption">SellAmountNet</div>
              <div>{{ active.sellAmountNet | toRoundOff4 }}</div>
            </v-col>
            <!-- <v-col>
              <div class="caption">ProfitAmountGross</div>
              <div>{{ active.profitAmountGross | toRoundOff4 }}</div>
            </v-col> -->
            <v-col>
              <div class="caption">ProfitAmountNet</div>
              <div>{{ active.profitAmountNet | toRoundOff4 }}</div>
            </v-col>
            <v-col>
              <div class="caption">ProfitRate</div>
              <div>{{ active.profitAmountRate | toRoundOff2 }}%</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-tabs v-model="tab" background-color="blue" dark>
        <v-tab> Records </v-tab>
        <v-tab> Closed </v-tab>

        <v-tab-item>
          <!-- ========================================================================================Records -->
          <v-toolbar elevation="0">
            <trades-add-dialog></trades-add-dialog>
            <trades-truncate-dialog></trades-truncate-dialog>
            <v-btn class="blue" @click="refreshTrades()" dark fab small
              ><v-icon>refresh</v-icon></v-btn
            >
            <v-btn class="d-none d-lg-block blue" dark fab small>{{
              trades.length
            }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="blue" dark @click="prevTrades()"
              ><v-icon>mdi-arrow-left</v-icon></v-btn
            >
            <v-btn class="blue" dark
              >{{ tradesPageNumber }}/{{ tradesPages }}</v-btn
            >
            <v-btn class="blue" dark @click="nextTrades()"
              ><v-icon>mdi-arrow-right</v-icon></v-btn
            >
            <v-spacer></v-spacer>
            <v-btn outlined class="d-none d-lg-block blue green" dark>{{
              bought | toRoundOff4
            }}</v-btn>
            <v-btn outlined class="d-none d-lg-block red" dark>{{
              sold | toRoundOff4
            }}</v-btn>
            <v-btn outlined class="d-none d-lg-block blue" dark>{{
              (sold - bought) | toRoundOff4
            }}</v-btn>
          </v-toolbar>
          <v-row>
            <v-col>
              <v-card
                v-for="trade in paginatedTrades"
                :key="trade.id"
                :class="`${trade.transaction} pa-1 ma-2`"
                dark
                elevation="3"
              >
                <v-row>
                  <v-col>
                    <div class="caption">Date</div>
                    <div>{{ trade.date | toLocaleDate }}</div>
                  </v-col>
                  <!-- <v-col>
                    <div class="caption">Transaction</div>
                    <div v-text="trade.transaction"></div>
                  </v-col> -->
                  <v-col>
                    <div class="caption">Stock Code</div>
                    <div>{{ trade.stockCode }}</div>
                  </v-col>
                  <v-col>
                    <div class="caption">Price</div>
                    <div>{{ trade.price | toRoundOff4 }}</div>
                  </v-col>
                  <v-col>
                    <div class="caption">Shares</div>
                    <div>{{ trade.shares | toWhole }}</div>
                  </v-col>

                  <v-col>
                    <div class="caption">Fee (ComTax)</div>
                    <div>{{ trade.feeComTax | toRoundOff4 }}</div>
                  </v-col>
                  <v-col>
                    <div class="caption">Fee (Others)</div>
                    <div>{{ trade.feeOthers | toRoundOff4 }}</div>
                  </v-col>
                  <v-col>
                    <div class="caption">Amount (Gross)</div>
                    <div>{{ trade.amountGross | toRoundOff4 }}</div>
                  </v-col>

                  <v-col>
                    <div class="caption">Amount (Net)</div>
                    <div>{{ trade.amountNet | toRoundOff4 }}</div>
                  </v-col>

                  <v-col>
                    <div class="row col pa-1 ma-1">
                      <trades-update-dialog
                        :trade="trade"
                      ></trades-update-dialog>
                      <trades-delete-dialog
                        :trade="trade"
                      ></trades-delete-dialog>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item>
          <!-- ========================================================================================Closed -->
          <v-toolbar elevation="0">
            <v-btn class="blue" @click="refreshClosed()" dark fab small
              ><v-icon>refresh</v-icon></v-btn
            >
            <v-btn class="d-none d-lg-block blue" dark fab small>{{
              closed.length
            }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="blue" dark @click="prevClosed()"
              ><v-icon>mdi-arrow-left</v-icon></v-btn
            >
            <v-btn class="blue" dark
              >{{ this.closedPageNumber }}/{{ closedPages }}</v-btn
            >
            <v-btn class="blue" dark @click="nextClosed()"
              ><v-icon>mdi-arrow-right</v-icon></v-btn
            >

            <v-spacer></v-spacer>
            <v-btn outlined class="d-none d-lg-block green" dark>{{
              wins
            }}</v-btn>
            <v-btn outlined class="d-none d-lg-block red" dark>{{
              loses
            }}</v-btn>
            <v-btn outlined class="d-none d-lg-block blue" dark>{{
              round(profitAmountNet, 2) | toWhole
            }}</v-btn>
          </v-toolbar>
          <v-row>
            <v-col>
              <v-card
                v-for="closed in paginatedClosed"
                :key="closed.id"
                :class="`${closed.status} pa-1 ma-2`"
                dark
                elevation="3"
              >
                <v-row>
                  <v-col>
                    <div class="caption">StockCode</div>
                    <div>{{ closed.stockCode }}</div>
                  </v-col>
                  <v-col>
                    <div class="caption">Shares</div>
                    <div>{{ closed.shares | toWhole }}</div>
                  </v-col>
                  <v-col>
                    <div class="caption">Days</div>
                    <div>
                      {{ closed.days | toWhole }}
                    </div>
                  </v-col>
                  <!-- <v-col>
                    <div class="caption">BuyDate</div>
                    <div>{{ closed.buyDate | toLocaleDate }}</div>
                  </v-col> -->
                  <v-col>
                    <div class="caption">BuyAve</div>
                    <div>{{ closed.buyAve | toRoundOff4 }}</div>
                  </v-col>
                  <!-- <v-col>
                    <div class="caption">BuyAmountGross</div>
                    <div>{{ closed.buyAmountGross | toRoundOff4 }}</div>
                  </v-col> -->
                  <v-col>
                    <div class="caption">BuyAmountNet</div>
                    <div>{{ closed.buyAmountNet | toRoundOff4 }}</div>
                  </v-col>
                  <!-- <v-col>
                    <div class="caption">SellDate</div>
                    <div>{{ closed.sellDate | toLocaleDate }}</div>
                  </v-col> -->
                  <v-col>
                    <div class="caption">SellAve</div>
                    <div>{{ closed.sellAve | toRoundOff4 }}</div>
                  </v-col>
                  <!-- <v-col>
                    <div class="caption">SellAmountGross</div>
                    <div>{{ closed.sellAmountGross | toRoundOff4 }}</div>
                  </v-col> -->
                  <v-col>
                    <div class="caption">SellAmountNet</div>
                    <div>{{ closed.sellAmountNet | toRoundOff4 }}</div>
                  </v-col>
                  <!-- <v-col>
                    <div class="caption">ProfitAmountGross</div>
                    <div>{{ closed.profitAmountGross | toRoundOff4 }}</div>
                  </v-col> -->
                  <v-col>
                    <div class="caption">ProfitAmountNet</div>
                    <div>{{ closed.profitAmountNet | toRoundOff4 }}</div>
                  </v-col>
                  <v-col>
                    <div class="caption">ProfitRate</div>
                    <div>{{ closed.profitAmountRate | toRoundOff2 }}%</div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import TradesAddDialog from "@/components/TradesAddDialog";
import TradesTruncateDialog from "@/components/TradesTruncateDialog";
import TradesUpdateDialog from "@/components/TradesUpdateDialog";
import TradesDeleteDialog from "@/components/TradesDeleteDialog";

import notify from "@/mixins/notify";
import stocks from "@/mixins/stocks";

import firebase from "@/plugins/firebase";

var fire = firebase.firestore();
var auth = firebase.auth();

export default {
  components: {
    TradesAddDialog,
    TradesTruncateDialog,
    TradesUpdateDialog,
    TradesDeleteDialog,
  },
  mixins: [notify, stocks],
  created() {
    this.loadTrades();
  },
  data() {
    return {
      tab: [],
      tradesPageNumber: 1,
      tradesPageSize: 10,
      closedPageNumber: 1,
      closedPageSize: 10,
      trades: [],
      closed: [],
      active: [],
    };
  },
  methods: {
    refreshTrades() {
      this.trades = [];
      fire
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("trades")
        .orderBy("date", "desc")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            var data = doc.data();
            data.id = doc.id;
            this.trades.push(data);
          });
        });
    },
    loadTrades() {
      fire
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("trades")
        .orderBy("date", "asc")
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              var data = change.doc.data();
              data.id = change.doc.id;
              this.trades.unshift(data);
            }
            if (change.type === "modified") {
              this.trades.forEach((trade) => {
                if (trade.id == change.doc.id) {
                  var data = change.doc.data();
                  data.id = change.doc.id;
                  trade = data;
                }
              });
            }
            if (change.type === "removed") {
              for (var index = 0; index < this.trades.length; index++) {
                if (this.trades[index].id == change.doc.id) {
                  this.trades.splice(index, 1);
                }
              }
            }
          });
        });
    },
    refreshClosed() {
      this.closed = [];
      this.active = [];
      this.generateClosedTrades(this.closed, this.trades, this.active);
      console.log("refresh closed trades and active trades");
      this.loadStocks();
    },

    loadStocks() {},
    nextTrades() {
      var pages = this.trades.length / this.tradesPageSize;
      if (pages > this.tradesPageNumber) this.tradesPageNumber++;
    },
    prevTrades() {
      if (this.tradesPageNumber > 1) this.tradesPageNumber--;
    },
    nextClosed() {
      var pages = this.closed.length / this.closedPageSize;
      if (pages > this.closedPageNumber) this.closedPageNumber++;
    },
    prevClosed() {
      if (this.closedPageNumber > 1) this.closedPageNumber--;
    },
  },
  computed: {
    tradesPages() {
      return Math.ceil(this.trades.length / this.tradesPageSize);
    },
    paginatedTrades() {
      return this.trades.slice(
        (this.tradesPageNumber - 1) * this.tradesPageSize,
        this.tradesPageNumber * this.tradesPageSize
      );
    },
    closedPages() {
      return Math.ceil(this.closed.length / this.closedPageSize);
    },
    paginatedClosed() {
      return this.closed.slice(
        (this.closedPageNumber - 1) * this.closedPageSize,
        this.closedPageNumber * this.closedPageSize
      );
    },
    bought() {
      var total = 0;
      this.trades.forEach((trade) => {
        if (trade.transaction == "buy") total += trade.amountNet;
      });

      return total;
    },
    sold() {
      var total = 0;
      this.trades.forEach((trade) => {
        if (trade.transaction == "sell") total += trade.amountNet;
      });
      return total;
    },
    wins() {
      var total = 0;
      this.closed.forEach((close) => {
        if (close.status == "win") total += 1;
      });
      return total;
    },
    loses() {
      var total = 0;
      this.closed.forEach((close) => {
        if (close.status == "lose") total += 1;
      });
      return total;
    },
    profitAmountNet() {
      var total = 0;
      this.closed.forEach((close) => {
        total += close.profitAmountNet;
      });
      return total;
    },
  },
};
</script>

<style scoped>
.v-card.buy {
  border-left: 16px solid rgb(0, 128, 0);
  background: rgb(0, 160, 0);
}

.v-card.sell {
  border-left: 16px solid rgb(192, 0, 0);
  background: rgb(255, 0, 0);
}

.v-card.win {
  border-left: 16px solid rgb(0, 128, 0);
  background: rgb(0, 160, 0);
}

.v-card.lose {
  border-left: 16px solid rgb(192, 0, 0);
  background: rgb(255, 0, 0);
}
</style>

