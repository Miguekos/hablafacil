<template>
  <v-card class="ld-modal">
    <basic-chart
      type="bar"
      :options="options"
      :series="data.series"
      :height="data.height"
    ></basic-chart>
  </v-card>
</template>

<script>
import BasicChart from "@/components/charts/BasicChart";

export default {
  name: "Chart",
  props: ["type", "item", "data", "color"],

  components: {
    BasicChart
  },
  computed: {},
  data() {
    return {
      options: {
        colors: ["#ff5722", "#bf360c", "#424242", "#bdbdbd"],
        endingShape: "rounded",
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "10px",
            colors: ["#fff"]
          }
        },
        stroke: {
          show: false,
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: this.data.categories,
          labels: {
            style: {
              fontSize: "10px",
              fontFamily: "Helvetica, Arial, sans-serif",
              cssClass: "apexcharts-xaxis-label"
            }
          }
        }
      }
    };
  }
};
</script>
