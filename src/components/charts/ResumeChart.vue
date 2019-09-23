<template>
  <v-card class="ld-modal">
    <v-layout wrap row align-center>
      <v-flex xs12 pa-3>
        <v-layout wrap row align-center>
          <v-flex xs12>
            <div class="subtitle mainText" :class="`${item.textColor}--text`">
              {{ item.title }} <b>{{ item.count }}</b>
            </div>
          </v-flex>
          <v-flex xs12>
            <basic-chart
              type="bar"
              :options="options"
              :series="series"
              height="96"
            ></basic-chart>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import BasicChart from "@/components/charts/BasicChart";

export default {
  name: "Chart",
  props: ["type", "item", "series", "color", "height"],

  components: {
    BasicChart
  },
  computed: {
    options() {
      return {
        grid: {
          show: false
        },
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },

        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          crosshairs: {
            show: false
          },
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          show: false,
          showAlways: false,

          crosshairs: {
            show: false
          },
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          title: {
            text: "1"
          }
        },
        colors: [this.color],
        plotOptions: {
          bar: {
            distributed: true
          }
        }
      };
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.mainText {
  word-wrap: break-word;
}
@media (max-width: 480px) {
  .mainText {
    /* font-size: 16px !important; */
  }
}
</style>
