<template>
  <v-container fluid>
    <v-row>
      <!-- <v-btn class="blue white--text" small>
          <v-icon small>refresh</v-icon>
        </v-btn> -->
      <v-menu
        v-model="datepickerMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            class="mx-6 my-1"
            v-model="date"
            label="Click desired Date"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            hide-details
          ></v-text-field>
        </template>
        <v-date-picker
          elevation="1"
          v-model="date"
          @click:date="searchDate"
        ></v-date-picker>
      </v-menu>

      <v-text-field
        class="mx-6 my-1"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        hide-details
      >
      </v-text-field>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :search="search"
          :headers="headers"
          :items="datas"
          :items-per-page="12"
          :multiSort="true"
          class="black--text"
          :custom-filter="datasFilter"
          :mobile-breakpoint="0"
          :loading="load"
          loading-text="Loading... Please wait"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus',
          }"
        >
          <template v-slot:item="props">
            <tr>
              <!-- <td>{{  props.item.id }}</td> -->
              <td>{{ (props.item.ts * 1000) | toDateTime }}</td>
              <td>{{ props.item.te | toDouble }}</td>
              <td>{{ props.item.td | toDouble }}</td>
              <td>{{ props.item.ph | toDouble }}</td>
              <td>{{ props.item.or | toDouble }}</td>
              <td>{{ props.item.ec | toDouble }}</td>
              <td>{{ props.item.sa | toDouble }}</td>
              <td>{{ props.item.do | toDouble }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import notify from "@/mixins/notify";
import firebase from "@/plugins/firebase";

var database = firebase.database();
var devicesRef = database.ref("/devices/");
var datasRef = database.ref("/devices/0/datas");

export default {
  mixins: [notify],
  created() {
    devicesRef.once("value").then(
      (snapshot) => {
        // if (!snapshot) return;
        this.devices = snapshot.val();
      }).catch((error) => this.notifyOpen(error, "error"));

    datasRef.on(
      "value",
      (snapshot) => {
        // if (!snapshot) return;
        this.toDatas(snapshot.val());
        this.load = false;
      },
      function (error) {
        this.notifyOpen(error, "error");
        this.load = false;
      }
    );
  },
  data() {
    return {
      devices: [],
      datas: [],
      search: "",
      load: true,
      date: "",
      datepickerMenu: false,
    };
  },
  methods: {
    toDatas(pObj) {
      this.datas = Object.keys(pObj).map((cObj) => {
        if (pObj[cObj]) pObj[cObj].id = cObj;
        return pObj[cObj];
      });
    },
    searchDate() {
      this.search = new Date(this.date).toLocaleDateString();
    },
    datasFilter(item, search, filter) {
      if (isNaN(search)) {
        if (this.$options.filters.toDateTime(item).includes(search))
          return filter;
      } else if (!isNaN(item)) {
        if (this.$options.filters.toDouble(item).toString().includes(search))
          return filter;
      }
    },
  },
  computed: {
    headers() {
      return [
        // { text: 'Id', align : 'start', sortable: true, value: 'id' },
        { text: "Timestamp", value: "ts", sortable: true, type: Date },
        { text: "Temperature(°c)", value: "te" },
        { text: "Turbidity(ntu)", value: "td" },
        { text: "Acidity(ph)", value: "ph" },
        { text: "Redox(mV)", value: "or" }, // Oxidation-Reduction Potential
        { text: "Electric Conductivity(μS/cm)", value: "ec" },
        { text: "Salinity(ppt)", value: "sa" }, // (ppt) or percentage (%)
        { text: "Dissolve Oxygen(mg/L)", value: "do" }, // mg/L or ppm
      ];
    },
  },
};
</script>

<style scoped>
thead td {
  background-color: rgba(128, 192, 255, 0.2);
}
tbody tr:nth-of-type(even) {
  background-color: rgba(128, 192, 255, 0.2);
}
</style>