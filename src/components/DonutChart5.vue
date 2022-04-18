<template>
  <div class="chart-5" ref="chart5"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

let root = null;
let series = null;
let legend = null;

export default {
  name: "DonutChart5",

  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },

  methods: {
    renderChart() {
      root = am5.Root.new(this.$refs.chart5);
      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.horizontalLayout,
          innerRadius: am5.percent(40),
        })
      );

      let data = this.chartData;

      series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "value",
          categoryField: "category",
        })
      );
      series.data.setAll(data);

      series.slices.template.setAll({
        stroke: am5.color(0xffffff),
        strokeWidth: 1,
      });

      legend = chart.children.push(
        am5.Legend.new(root, {
          centerY: am5.percent(50),
          y: am5.percent(50),
          layout: root.verticalLayout,
        })
      );
      legend.data.setAll(series.dataItems);

      series.labels.template.set("forceHidden", true);
      series.ticks.template.set("visible", false);
    },
  },

  watch: {
    chartData(values) {
      series.data.setAll(values);
      legend.data.setAll(series.dataItems);
    },
  },

  mounted() {
    this.renderChart();
  },

  beforeDestroy() {
    if (root) {
      root.dispose();
    }
  },
};
</script>

<style lang="scss" scoped>
.chart-5 {
  width: 100%;
  min-height: 280px;
}
</style>
