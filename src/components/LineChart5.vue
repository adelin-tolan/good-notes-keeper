<template>
  <div class="line-chart-5" ref="chartdiv5"></div>
</template>

<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

let root = null;
let series = null;

export default {
  name: "LineChart5",

  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },

  methods: {
    renderChart() {
      root = am5.Root.new(this.$refs.chartdiv5);

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          // panY: false,
          panY: true,
          panX: true,
          wheelX: "panX",
          wheelY: "zoomX",
          layout: root.verticalLayout,
          maxTooltipDistance: 0,
        })
      );

      let data = this.chartData;

      // Create Y-axis
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          extraTooltipPrecision: 1,
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Create X-Axis
      // let xAxis = chart.xAxes.push(
      //   am5xy.DateAxis.new(root, {
      //     baseInterval: { timeUnit: "day", count: 1 },
      //     renderer: am5xy.AxisRendererX.new(root, {}),
      //     categoryField: "date",
      //   })
      // );

      let xAxis = chart.xAxes.push(
        am5xy.GaplessDateAxis.new(root, {
          baseInterval: { timeUnit: "day", count: 1 },
          gridIntervals: [
            { timeUnit: "day", count: 1 },
            { timeUnit: "month", count: 1 },
          ],
          renderer: am5xy.AxisRendererX.new(root, {}),
          // categoryField: "date",
        })
      );
      xAxis.data.setAll(data);

      xAxis.get("dateFormats")["day"] = "MM/dd";
      xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

      series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Series",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          //   fill: am5.color(0x095256),
          //   stroke: am5.color(0x095256),
          //   connect: false,
        })
      );

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: series.get("fill"),
          }),
        });
      });

      series.strokes.template.setAll({
        // strokeWidth: 3,
        // strokeDasharray: [10, 5],
      });
      series.fills.template.setAll({
        // fillOpacity: 0.5,
        visible: true,
      });

      // series
      //   .get("tooltip")
      //   .label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");

      series.data.setAll(data);

      // Add legend
      //   let legend = chart.children.push(am5.Legend.new(root, {}));
      //   legend.data.setAll(chart.series.values);

      // Add cursor
      chart.set("cursor", am5xy.XYCursor.new(root, {}));

      //   this.root = root;
    },
  },

  watch: {
    chartData(values) {
      series.data.setAll(values);
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
.line-chart-5 {
  width: 100%;
  min-height: 160px;
}
</style>
