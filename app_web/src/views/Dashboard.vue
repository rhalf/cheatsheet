<template>
  <v-container fluid class="pa-2 ma-2">
    <v-row>
      <v-col>
        <chart-pie
          v-if="cdFunds.labels.length > 0"
          :chart-data="cdFunds"
        ></chart-pie>
      </v-col> -->
      <v-spacer></v-spacer>
       <v-col>
        <chart-pie
          v-if="cdFunds.labels.length > 0"
          :chart-data="cdFunds"
        ></chart-pie>
      </v-col>
    </v-row>

    <v-row>
       <v-col>
        <chart-line
          v-if="cdFunds.labels.length > 0"
          :chart-data="cdFunds"
        ></chart-line>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <chart-area
          v-if="cdFunds.labels.length > 0"
          :chart-data="cdFunds"
        ></chart-area>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChartLine from "@/components/ChartLine";
import ChartArea from "@/components/ChartArea";
import ChartPie from "@/components/ChartPie";
import notify from "@/mixins/notify";
import chartDatas from "@/mixins/chartDatas";

// import firebase from "@/plugins/firebase";
// var fire = firebase.firestore();
// var auth = firebase.auth();
export default {
  components: { ChartLine, ChartArea, ChartPie },
  mixins: [notify, chartDatas],
};
</script>

