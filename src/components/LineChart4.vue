<template>
  <div>
    <div ref="chartdiv4" class="line-chart-4" />
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

let chart = null;

export default {
  name: "LineChart4",

  props: {
    chartData: {
      type: Array,
      required: true,
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

  methods: {
    renderChart() {
      chart = am4core.create(this.$refs.chartdiv4, am4charts.XYChart);

      chart.paddingRight = 20;

      chart.data = this.chartData;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    },
  },
};
</script>

<style lang="scss" scoped>
.line-chart-4 {
  width: 100%;
  min-height: 160px;
}
</style>
