export let barChartView = {
  templateUrl: 'templates/views/bar-chart-view.html',
  bindings: {
    title: '@',
    labels: '=',
    data: '=',
    series: '=',
    options: '='
  }
};
