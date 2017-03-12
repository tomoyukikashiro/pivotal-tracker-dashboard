import {oneMetricView} from './one-metric.view';
import {chartView} from './chart.view';
import {dashboardIterationStats} from './dashboard.iteration.stats';
import {barChartView} from './bar-chart.view';

export default angular.module('dashboardViews', [])
  .component('oneMetricView', oneMetricView)
  .component('chartView', chartView)
  .component('barChartView', barChartView)
  .component('dashboardIterationStats', dashboardIterationStats);
