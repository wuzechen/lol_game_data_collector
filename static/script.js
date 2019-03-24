document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('bar', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
    var radar_option = {
        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: '被験者とロールモデルの比較',
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
        },

        legend: {
            align: 'bottom',
        }
    };
    var fit_rate_option = {
        chart: {
            type: 'solidgauge',
            height: '110%'
        },
        title: {
            text: 'Activity',
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
          enabled: false
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                    .setOpacity(0.3)
                    .get(),
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                 dataLabels: {
                    enabled: true,
                    y: -40,
                    borderWidth: 0,
                    backgroundColor: 'none',
                    useHTML: true,
                    shadow: false,
                    style: {
                      fontSize: '16px'
                    },
                    formatter: function() {
                      return '<div style="width:100%;text-align:center;"><span style="font-size:1.2em;font-weight:bold;">' + this.point.series.name + '</span><br/><span style="font-size:3em;color:' + Highcharts.getOptions().colors[0] + ';font-weight:bold;">' + Highcharts.numberFormat(this.y, 0) + '%</span>';
                    }
                  },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },

        lang: {
            noData: "No data to display"
        },
        noData: {
            style: {
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#333333'
            }
        },
         series: [{
            name: 'no data',
            borderColor: Highcharts.getOptions().colors[0],
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: 1
            }]
        }],
    };

    var ca = Highcharts.chart('ca', radar_option);
    var wm = Highcharts.chart('wm', radar_option);
    var ss = Highcharts.chart('ss', radar_option);
    var fit_rate = Highcharts.chart('fit_rate', fit_rate_option);
    requestCategories(ca, wm, ss);
    requestData(ca, wm, ss);
    requestFitRateData(fit_rate);
});

function requestCategories(ca, wm, ss) {
    $.ajax({
        url: '/api/categories',
        type: "GET",
        dataType: "json",
        success: function (data) {
            ca.xAxis[0].setCategories(data.ca);
            wm.xAxis[0].setCategories(data.wm);
            ss.xAxis[0].setCategories(data.ss);
        }
    });
}

function requestData(ca, wm, ss) {
    $.ajax({
        url: '/api/dummydata/1',
        type: "GET",
        dataType: "json",
        success: function(data) {
            $.each(data, function(i, d) {
                console.log(d.name);
                console.log(d.test_scores.ca);
                ca.addSeries({"name":d.name,"data":d.test_scores.ca}, false);
                wm.addSeries({"name":d.name,"data":d.test_scores.wm}, false);
                ss.addSeries({"name":d.name,"data":d.test_scores.ss}, false);
            });
            ca.redraw(true);
            wm.redraw(true);
            ss.redraw(true);
        },
        cache: false
    });
}

function requestFitRateData(fit_rate) {
    $.ajax({
        url: '/api/dummy/fit_rate/1',
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            fit_rate.addSeries({
            name: data.name,
            borderColor: Highcharts.getOptions().colors[0],
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: data.data
            }]
            });
        }
    });
}

