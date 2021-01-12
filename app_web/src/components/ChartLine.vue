<script>
import { Line, mixins } from "vue-chartjs";
export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  mounted() {
    this.chartData.datasets[0].borderColor = "blue";
    this.chartData.datasets[0].pointBackgroundColor = "blue";
    this.chartData.datasets[0].borderWidth = 2;
    this.chartData.datasets[0].pointBorderColor = "white";
    this.chartData.datasets[0].backgroundColor ="transparent";
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
    });
  },
};
</script>