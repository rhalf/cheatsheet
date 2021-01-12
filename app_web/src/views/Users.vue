<template>
  <v-container fluid>
    <v-row>
      <!-- <v-btn class="blue white--text" small>
          <v-icon small>refresh</v-icon>
        </v-btn> -->
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
              <td>{{ props.item.displayName }}</td>
              <td>{{ props.item.email }}</td>
              <td>{{ props.item.phoneNumber }}</td>
              <td>{{ props.item.disabled }}</td>
              <td>{{ props.item.privilege }}</td>
              <td>{{ props.item.likes }}</td>
              <td>{{ props.item.dtCreated | toDateTime }}</td>
              <td>{{ props.item.dtModified | toDateTime }}</td>
              <td>{{ props.item.dtExpired | toDouble }}</td>
              <td>{{ props.item.dtLogged | toDateTime }}</td>
              <td>{{ props.item.logins }}</td>
            </tr>
          </template>
          -->
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import notify from "@/mixins/notify"
import firebase from "../plugins/firebase";
var fire = firebase.firestore();
var usersRef = fire.collection("users");

export default {
  mixins : [notify],
  created() {
    usersRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var user = doc.data();
          user.id = doc.id;
          this.datas.push(user);
        });
        this.load = false;
      })
      .catch((error) => this.notifyOpen(error, "error"));
  },
  data() {
    return {
      datas: [],
      search: "",
      load: true,
      date: "",
      datepickerMenu: false,
    };
  },
  methods: {
    searchDate() {
      this.search = new Date(this.date).toLocaleDateString();
    },
    datasFilter(item, search, filter) {
      if (isNaN(search)) {
        if (this.$options.filters.toDateTime(item).includes(search))
          return filter;
        else 
        if (item.includes(search)) return filter;
      } else !isNaN(item);
      if (this.$options.filters.toDouble(item).toString().includes(search))
        return filter;
    },
  },
  computed: {
    headers() {
      return [
        {
          text: "Display Name",
          value: "displayName",
          sortable: true,
          type: Date,
        },
        { text: "Email", value: "email" },
        { text: "PhoneNumber", value: "phoneNumber" },
        { text: "Disabled", value: "disabled" },
        { text: "Privilege", value: "privilege" }, // Oxidation-Reduction Potential
        { text: "Likes", value: "likes" },
        { text: "DtCreated", value: "dtCreated" }, // (ppt) or percentage (%)
        { text: "DtModified", value: "dtModified" }, // mg/L or ppm
        { text: "DtExpired", value: "dtExpired" }, // mg/L or ppm
        { text: "DtLogged", value: "dtLogged" }, // mg/L or ppm
        { text: "Logins", value: "logins" }, // mg/L or ppm
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