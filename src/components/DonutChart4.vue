<template>
  <div class="chart-4" ref="chart4"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

let chart = null;

export default {
  name: "DonutChart4",

  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },

  methods: {
    renderChart() {
      chart = am4core.create(this.$refs.chart4, am4charts.PieChart);

      chart.data = this.chartData;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "value";
      pieSeries.dataFields.category = "category";
      chart.innerRadius = am4core.percent(40);
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 1;

      chart.legend = new am4charts.Legend();
      chart.legend.position = "right";

      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
    },
  },

  watch: {
    chartData(values) {
      chart.data = values;
    },
  },

  mounted() {
    this.renderChart();
  },

  beforeDestroy() {
    if (chart) {
      chart.dispose();
    }
  },
};
</script>

<style lang="scss" scoped>
.chart-4 {
  max-width: 600px;
  min-height: 280px;
}
</style>
