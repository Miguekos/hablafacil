<template>
  <div class="example">
    <apexcharts
      :type="type"
      :options="options"
      :series="series"
      :height="height"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Chart",
  props: ["type", "options", "series", "height"],

  components: {
    apexcharts: VueApexCharts
  },
  data: function() {
    return {};
  }
};
</script>
