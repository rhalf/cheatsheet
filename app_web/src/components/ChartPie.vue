<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  mounted() {
    this.gradient1 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient1.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient1.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient1.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    this.renderChart(
      {
        labels: ["DITO", "PHA", "APL", "Free"],
        datasets: [
          {
            backgroundColor: ["red", "green", "blue", "gray"],
            data: [40, 20, 10, 10]
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>