function pad(a) {
    return a<10?"0"+a: a
}

function range(a, t, e) {
    for(var r=[pad(a)], o=a;
    o<t;
    )o+=e,
    r.push(pad(o));
    return r
}

function drawUSRegionsMap() {
    var a=google.visualization.arrayToDataTable([["City", "Profile Visits", "Post Likes"], ["New York City", 276147, 12855], ["Los Angeles", 135241, 18421], ["Chicago", 9595, 1217], ["Austin", 9063, 13360], ["Washington", 276147, 12855], ["Colorado", 95975, 15217]]),
    t= {
        resolution:"provinces",
        region:"US",
        displayMode:"markers",
        legend:"none",
        colorAxis: {
            colors: ["#38a9ff", "#08ddc1"]
        }
    }
    ;
    new google.visualization.GeoChart(USMapChart).draw(a, t)
}

var twoBarChart=document.getElementById("two-bars-chart");
if(null!==twoBarChart)var ctx_tb=twoBarChart.getContext("2d"),
data_tb= {
    labels:range(2011, 2016, 1),
    datasets:[ {
        label: "Statistic 02", backgroundColor: "#ffdc1b", borderSkipped: "bottom", data: [43, 47, 38, 30, 47, 39]
    }
    ,
    {
        label: "Statistic 01", backgroundColor: "#ff5e3a", borderSkipped: "bottom", borderWidth: 0, data: [36, 30, 45, 50, 39, 41]
    }
    ]
}

,
twoBarChartEl=new Chart(ctx_tb, {
    type:"bar", data:data_tb, options: {
        legend: {
            display: !1
        }
        , tooltips: {
            mode: "index", intersect: !1
        }
        , responsive:!0, scales: {
            xAxes:[ {
                barPercentage:.7, gridLines: {
                    display: !1
                }
                , ticks: {
                    fontColor: "#888da8"
                }
            }
            ], yAxes:[ {
                stacked:!0, gridLines: {
                    display: !1
                }
                , ticks: {
                    beginAtZero: !0, fontColor: "#888da8"
                }
            }
            ]
        }
    }
}

);
var lineStackedChart=document.getElementById("line-stacked-chart");
if(null!==lineStackedChart)var ctx_ls=lineStackedChart.getContext("2d"),
data_ls= {
    labels:["Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"],
    datasets:[ {
        label: " - Favorites", backgroundColor: "rgba(57,169,255,0.35)", borderColor: "#38a9ff", borderWidth: 4, pointBorderColor: "#38a9ff", pointBackgroundColor: "#fff", pointBorderWidth: 4, pointRadius: 6, pointHoverRadius: 8, data: [98, 42, 38, 57, 82, 41, 36, 30, 45, 62, 64, 80]
    }
    ,
    {
        label: " - Visitors", backgroundColor: "rgba(8,221,123,0.2)", borderColor: "#08ddc1", borderWidth: 4, pointBorderColor: "#08ddc1", pointBackgroundColor: "#fff", pointBorderWidth: 4, pointRadius: 6, pointHoverRadius: 8, data: [78, 101, 80, 87, 120, 105, 110, 76, 101, 96, 100, 135]
    }
    ]
}

,
lineStackedEl=new Chart(ctx_ls, {
    type:"line", data:data_ls, options: {
        legend: {
            display: !1
        }
        , responsive:!0, scales: {
            xAxes:[ {
                gridLines: {
                    color: "#f0f4f9"
                }
                , ticks: {
                    fontColor: "#888da8"
                }
            }
            ], yAxes:[ {
                gridLines: {
                    display: !1
                }
                , ticks: {
                    beginAtZero: !0, fontColor: "#888da8"
                }
            }
            ]
        }
    }
}

);
var oneBarChart=document.getElementById("one-bar-chart");
if(null!==oneBarChart)var ctx_ob=oneBarChart.getContext("2d"),
data_ob= {
    labels:range(1, 31, 1),
    datasets:[ {
        backgroundColor: "#38a9ff", data: [9, 11, 8, 6, 13, 7, 7, 0, 9, 12, 7, 13, 12, 8, 1, 10, 9, 7, 3, 7, 10, 4, 14, 9, 6, 6, 11, 12, 3, 4, 2]
    }
    ,
    {
        backgroundColor: "#ebecf1", data: [11, 9, 12, 14, 7, 13, 13, 20, 11, 8, 13, 7, 8, 12, 19, 10, 11, 13, 17, 13, 10, 16, 6, 11, 14, 14, 9, 8, 17, 16, 18]
    }
    ]
}

,
oneBarEl=new Chart(ctx_ob, {
    type:"bar", data:data_ob, options: {
        deferred: {
            delay: 200
        }
        , tooltips: {
            enabled: !1
        }
        , legend: {
            display: !1
        }
        , responsive:!0, scales: {
            xAxes:[ {
                stacked:!0, barPercentage:.6, gridLines: {
                    display: !1
                }
                , ticks: {
                    fontColor: "#888da8"
                }
            }
            ], yAxes:[ {
                stacked:!0, gridLines: {
                    color: "#f0f4f9"
                }
                , ticks: {
                    beginAtZero: !0, fontColor: "#888da8"
                }
            }
            ]
        }
    }
}

);
var lineGraphicChart=document.getElementById("line-graphic-chart");
if(null!==lineGraphicChart)var ctx_lg=lineGraphicChart.getContext("2d"),
data_lg= {
    labels:["Aug 8",
    "Aug 15",
    "Aug 21",
    "Aug 28",
    "Sep 4",
    "Sep 11",
    "Sep 19",
    "Sep 26",
    "Oct 3",
    "Oct 10",
    "Oct 16",
    "Oct 23",
    "Oct 30"],
    datasets:[ {
        label: " - Favorites", backgroundColor: "rgba(255,215,27,0.6)", borderColor: "#ffd71b", borderWidth: 4, pointBorderColor: "#ffd71b", pointBackgroundColor: "#fff", pointBorderWidth: 4, pointRadius: 0, pointHoverRadius: 8, data: [98, 42, 38, 57, 82, 41, 36, 30, 45, 62, 64, 80, 68]
    }
    ,
    {
        label: " - Visitors", backgroundColor: "rgba(255,94,58,0.6)", borderColor: "#ff5e3a", borderWidth: 4, pointBorderColor: "#ff5e3a", pointBackgroundColor: "#fff", pointBorderWidth: 4, pointRadius: 0, pointHoverRadius: 8, data: [78, 101, 80, 87, 120, 105, 110, 76, 101, 96, 100, 115, 135]
    }
    ]
}

,
lineGraphicEl=new Chart(ctx_lg, {
    type:"line", data:data_lg, options: {
        deferred: {
            delay: 300
        }
        , legend: {
            display: !1
        }
        , responsive:!0, scales: {
            xAxes:[ {
                gridLines: {
                    color: "#f0f4f9"
                }
                , ticks: {
                    fontColor: "#888da8"
                }
            }
            ], yAxes:[ {
                gridLines: {
                    display: !1
                }
                , ticks: {
                    beginAtZero: !0, fontColor: "#888da8"
                }
            }
            ]
        }
    }
}

);
var pieColorChart=document.getElementById("pie-color-chart");
if(null!==pieColorChart)var ctx_pc=pieColorChart.getContext("2d"),
data_pc= {
    labels:["Status Updates",
    "Multimedia",
    "Shared Posts",
    "Blog Posts"],
    datasets:[ {
        data: [8.247, 5.63, 1.498, 1.136], borderWidth: 0, backgroundColor: ["#7c5ac2", "#08ddc1", "#ff5e3a", "#ffd71b"]
    }
    ]
}

,
pieColorEl=new Chart(ctx_pc, {
    type:"doughnut", data:data_pc, options: {
        deferred: {
            delay: 300
        }
        , cutoutPercentage:93, legend: {
            display: !1
        }
        , animation: {
            animateScale: !1
        }
    }
}

);
!function(a) {
    "use strict";
    var t=a(".pie-chart");
    t.appear( {
        force_process: !0
    }
    ),
    t.on("appear", function() {
        var t=a(this);
        if(!t.data("inited")) {
            var e=t.data("startcolor"), r=t.data("endcolor"), o=100*t.data("value");
            t.circleProgress( {
                thickness:16, size:360, startAngle:-Math.PI/4*2, emptyFill:"#ebecf1", lineCap:"round", fill: {
                    gradient: [r, e], gradientAngle: Math.PI/4
                }
            }
            ).on("circle-animation-progress", function(a, e) {
                t.find(".content").html(parseInt(o*e, 10)+"<span>%</span>")
            }
            ), t.data("inited", !0)
        }
    }
    )
}

(jQuery);
var USMapChart=document.getElementById("us-chart-map");
null!==USMapChart&&(google.charts.load("current", {
    packages: ["geochart"]
}

), google.charts.setOnLoadCallback(drawUSRegionsMap));
var lineChart=document.getElementById("line-chart");
if(null!==lineChart)var ctx_lc=lineChart.getContext("2d"),
data_lc= {
    labels:["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"],
    datasets:[ {
        label: " - Comments", borderColor: "#ffdc1b", borderWidth: 4, pointBorderColor: "#ffdc1b", pointBackgroundColor: "#fff", pointBorderWidth: 4, pointRadius: 6, pointHoverRadius: 8, fill: !1, lineTension: 0, data: [96, 63, 136, 78, 111, 83, 101, 83, 102, 61, 45, 135]
    }
    ,
    {
        label: " - Likes", borderColor: "#08ddc1", borderWidth: 4, pointBorderColor: "#08ddc1", pointBackgroundColor: "#fff", pointBorderWidth: 4, pointRadius: 6, pointHoverRadius: 8, fill: !1, lineTension: 0, data: [118, 142, 119, 123, 165, 139, 145, 116, 152, 123, 139, 195]
    }
    ]
}

,
lineChartEl=new Chart(ctx_lc, {
    type:"line", data:data_lc, options: {
        legend: {
            display: !1
        }
        , responsive:!0, scales: {
            xAxes:[ {
                ticks: {
                    fontColor: "#888da8"
                }
                , gridLines: {
                    color: "#f0f4f9"
                }
            }
            ], yAxes:[ {
                gridLines: {
                    color: "#f0f4f9"
                }
                , ticks: {
                    beginAtZero: !0, fontColor: "#888da8"
                }
            }
            ]
        }
    }
}

);
var pieSmallChart=document.getElementById("pie-small-chart");
if(null!==pieSmallChart)var ctx_sc=pieSmallChart.getContext("2d"),
data_sc= {
    labels:["Yearly Likes",
    "Yearly Comments"],
    datasets:[ {
        data: [65.048, 42.973], borderWidth: 0, backgroundColor: ["#08ddc1", "#ffdc1b"]
    }
    ]
}

,
pieSmallEl=new Chart(ctx_sc, {
    type:"doughnut", data:data_sc, options: {
        deferred: {
            delay: 300
        }
        , cutoutPercentage:93, legend: {
            display: !1
        }
        , animation: {
            animateScale: !1
        }
    }
}

);
var twoBar2Chart=document.getElementById("two-bar-chart-2");
if(null!==twoBar2Chart)var ctx_tb2=twoBar2Chart.getContext("2d"),
data_tb2= {
    labels:range(2011, 2016, 1),
    datasets:[ {
        label: "Facebook", backgroundColor: "#2f5b9d", borderSkipped: "bottom", data: [43, 47, 38, 30, 47, 39]
    }
    ,
    {
        label: "Twitter", backgroundColor: "#38bff1", borderSkipped: "bottom", borderWidth: 0, data: [36, 30, 45, 50, 39, 41]
    }
    ]
}

,
twoBar2ChartEl=new Chart(ctx_tb2, {
    type:"bar", data:data_tb2, options: {
        legend: {
            display: !1
        }
        , tooltips: {
            mode: "index", intersect: !1
        }
        , responsive:!0, scales: {
            xAxes:[ {
                barPercentage:.5, gridLines: {
                    display: !1
                }
                , ticks: {
                    fontColor: "#888da8"
                }
            }
            ], yAxes:[ {
                gridLines: {
                    display: !1
                }
                , ticks: {
                    beginAtZero: !0, fontColor: "#888da8"
                }
            }
            ]
        }
    }
}

);
var radarChart=document.getElementById("radar-chart");
if(null!==radarChart)var ctx_rc=radarChart.getContext("2d"),
data_rc= {
    datasets:[ {
        data: [11, 16, 26], backgroundColor: ["#38a9ff", "#ff5e3a", "#ffdc1b"]
    }
    ],
    labels:["Blue",
    "Orange",
    "Yellow"]
}

,
radarChartEl=new Chart(ctx_rc, {
    type:"pie", data:data_rc, options: {
        deferred: {
            delay: 300
        }
        , legend: {
            display: !1
        }
        , scale: {
            gridLines: {
                display: !1
            }
            , ticks: {
                beginAtZero: !0
            }
            , reverse:!1
        }
        , animation: {
            animateScale: !0
        }
    }
}

);
