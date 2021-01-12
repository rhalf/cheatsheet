// import notify from "@/mixins/notify";
import firebase from "@/plugins/firebase";

var fire = firebase.firestore();
var auth = firebase.auth();


export default {
  beforeCreate() {
    this.funds = [];
    fire
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("funds")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            var data = change.doc.data();
            data.id = change.doc.id;
            this.funds.push(data);
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
          if (change.type === "deleted") {
            for (var index = 0; index < this.funds.length; index++) {
              if (this.funds[index].id == change.doc.id) {
                this.funds.splice(index, 1);
              }
            }
          }
        });
      this.generate()
      });
  },

  data() {
    return {
      funds: [],
      cdFunds: {
        labels: [],
        datasets: []
      }
    }
  },
  methods: {
    generate() {
      this.funds.forEach((fund) => {
        this.cdFunds.labels.push(
          this.$options.filters.toLocaleDate(fund.date)
        );
      });
      //#####################################################
      var dataset = {
        label: "Funds",
        data: []
      };
      var total = 0;
      this.funds.forEach((fund) => {
        if (fund.transaction == "deposit") total += fund.amount;
        if (fund.transaction == "withdraw") total -= fund.amount;
        dataset.data.push(total);
      });
      this.cdFunds.datasets.push(dataset);
      //#####################################################
      return this.cdFunds
    }
  }
}