<template>
  <BarChart v-bind="barChartProps" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "BarChartStats",
  props: ["labels", "data"],
  components: { BarChart },
  setup(props) {
    const stats = computed<ChartData<"bar">>(() => ({
      labels: props.labels,
      datasets: [
        {
          data: props.data,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    }));

    const options = computed<ChartOptions<"bar">>(() => ({
      plugins: {
        legend: { display: false },
        title: {
          display: false,
        },
      },
    }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData: stats,
      options,
    });

    return {
      stats,
      options,
      barChartRef,
      barChartProps,
    };
  },
});
</script>
