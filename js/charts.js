/************************************************
  DESTROY EXISTING CHART
************************************************/

function destroyChart(chartId){

    const existingChart =
        Chart.getChart(chartId);

    if(existingChart){

        existingChart.destroy();

    }

}



/************************************************
  RADAR CHART
************************************************/

function createRadarChart(chartId, indices){

    destroyChart(chartId);

    const ctx =
        document.getElementById(chartId);

    const radarChart = new Chart(ctx,{

        type : "radar",

        data : {

            labels : [

                "Academic",

                "Domain",

                "Aptitude",

                "Technical",

                "Soft Skills",

                "Internship",

                "Attendance",

                "Engagement"

            ],

            datasets : [{

                label : "360° Analysis",

                data : [

                    indices.Academic,

                    indices.Domain,

                    indices.Aptitude,

                    indices.Technical,

                    indices.SoftSkill,

                    indices.Internship,

                    indices.Attendance,

                    indices.Engagement

                ],

                backgroundColor :
                    "rgba(56,189,248,0.2)",

                borderColor :
                    "#38bdf8",

                borderWidth : 2,

                pointBackgroundColor :
                    "#38bdf8"

            }]

        },

        options : {

    responsive : true,

    layout : {
    padding : 40
},

    plugins : {

        legend : {

            labels : {

                color: getChartTextColor()

            }

        }

    },

    scales : {

        r : {

            min : 0,
            max : 100,

            ticks : {

                color : getChartTextColor(),
                backdropColor : "transparent"

            },

            pointLabels:{
    display:true,
    color: getChartTextColor(),
    font:{
        size:16,
        weight:"600"
    },
    padding:20
},

            grid : {

                color : getChartGridColor()

            },

            angleLines : {

                color : getChartGridColor()

            }

        }

    }

}

    });

    setTimeout(() => {

    const chart = Chart.getChart(chartId);

    if(chart){

        chart.options.scales.r.pointLabels.display = true;

        chart.options.scales.r.pointLabels.color = "red";

        chart.options.scales.r.pointLabels.font = {
            size:20,
            weight:"bold"
        };

        chart.update();

    }

},100);

}

document.addEventListener(
    "themeChanged",
    () => {

        loadStudentDashboard();

    }
);


/************************************************
  CGPA TREND LINE CHART
************************************************/

function createCGPATrendChart(chartId, cgpaRow){

    destroyChart(chartId);

    const ctx =
        document.getElementById(chartId);

    let labels = [];
    let values = [];

    Object.keys(cgpaRow).forEach(key => {

        if(key !== "RollNo"){

            labels.push(key);

            values.push(
                Number(cgpaRow[key])
            );

        }

    });

    new Chart(ctx, {

        type : "line",

        data : {

            labels : labels,

            datasets : [{

                label : "CGPA Trend",

                data : values,

                borderColor :
                    "#38bdf8",

                backgroundColor :
                    "rgba(56,189,248,0.2)",

                tension : 0.3,

                fill : true

            }]

        },

        options : {

            responsive : true,

            plugins : {

                legend : {

                    labels : {

                        color : getChartTextColor()

                    }

                }

            },

            scales : {

                x : {

                    ticks : {

                        color : getChartTextColor()

                    }

                },

                y : {

                    ticks : {

                        color : getChartTextColor()

                    }

                }

            }

        }

    });

}



/************************************************
  BAR CHART
************************************************/

function createBarChart(
    chartId,
    labels,
    values,
    title
){

    destroyChart(chartId);

    const ctx =
        document.getElementById(chartId);

    new Chart(ctx, {

        type : "bar",

        data : {

            labels : labels,

            datasets : [{

                label : title,

                data : values,

                backgroundColor :
                    "#38bdf8"

            }]

        },

        options : {

            responsive : true,

            plugins : {

    legend : {

        labels : {

            color : getChartTextColor()

        }

    }

},

scales : {

    x : {

        ticks : {

            color : getChartTextColor()

        },

        grid : {

            color : getChartGridColor()

        }

    },

    y : {

        ticks : {

            color : getChartTextColor()

        },

        grid : {

            color : getChartGridColor()

        }

    }

}
        }

    });

}



/************************************************
  PIE CHART
************************************************/

function createPieChart(
    chartId,
    labels,
    values
){

    destroyChart(chartId);

    const ctx =
        document.getElementById(chartId);

    new Chart(ctx, {

        type : "pie",

        data : {

            labels : labels,

            datasets : [{

                data : values,

                backgroundColor : [

                    "#16a34a",

                    "#eab308",

                    "#dc2626",

                    "#38bdf8"

                ]

            }]

        },

        options : {

            responsive : true,

plugins : {

    legend : {

        labels : {

            color : getChartTextColor()

        }

    }

}

        }

    });

}



/************************************************
  APTITUDE TREND CHART
************************************************/

function createAptitudeTrendChart(
    chartId,
    aptitudeRows
){

    destroyChart(chartId);

    const ctx =
        document.getElementById(chartId);

    let labels =
        aptitudeRows.map(r => r.TestName);

    let values =
        aptitudeRows.map(r => Number(r.Score));

    new Chart(ctx, {

        type : "line",

        data : {

            labels : labels,

            datasets : [{

                label : "Aptitude Trend",

                data : values,

                borderColor :
                    "#16a34a",

                backgroundColor :
                    "rgba(22,163,74,0.2)",

                tension : 0.3,

                fill : true

            }]

        },

        options : {

            responsive : true,

            plugins : {

                legend : {

                    labels : {

                        color : getChartTextColor()

                    }

                }

            },

            scales : {

                x : {

                    ticks : {

                        color : getChartTextColor()

                    }

                },

                y : {

                    ticks : {

                        color : getChartTextColor()

                    }

                }

            }

        }

    });

}



/************************************************
  HEATMAP TABLE
************************************************/

function generateHeatmapClass(value){

    if(value >= 80){

        return "heat-high";

    }

    if(value >= 60){

        return "heat-medium";

    }

    return "heat-low";

}



/************************************************
  DEPARTMENT PERFORMANCE CHART
************************************************/

function createDepartmentPerformanceChart(
    chartId,
    students
){

    let deptMap = {};

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        if(!deptMap[student.Dept]){

            deptMap[student.Dept] = [];

        }

        deptMap[student.Dept].push(
            analytics.score360
        );

    });

    let labels = [];
    let values = [];

    Object.keys(deptMap).forEach(dept => {

        labels.push(dept);

        let avg =

            deptMap[dept].reduce(
                (a,b)=>a+b,0
            ) / deptMap[dept].length;

        values.push(avg);

    });

    createBarChart(

        chartId,

        labels,

        values,

        "Department Performance"

    );

}



/************************************************
  PLACEMENT READINESS CHART
************************************************/

function createPlacementReadinessChart(
    chartId,
    students
){

    let excellent = 0;
    let good = 0;
    let average = 0;
    let poor = 0;

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        const score =
            analytics.placement;

        if(score >= 85){

            excellent++;

        }
        else if(score >= 70){

            good++;

        }
        else if(score >= 50){

            average++;

        }
        else{

            poor++;

        }

    });

    createPieChart(

        chartId,

        [

            "Industry Ready",

            "Placement Ready",

            "Average",

            "High Risk"

        ],

        [

            excellent,

            good,

            average,

            poor

        ]

    );

}



/************************************************
  COURSE GAP CHART
************************************************/

function createCourseGapChart(
    chartId,
    courseAnalysis
){

    let labels =
        courseAnalysis.map(
            c => c.courseName
        );

    let gaps =
        courseAnalysis.map(
            c => c.gap
        );

    createBarChart(

        chartId,

        labels,

        gaps,

        "Internal vs End Sem Gap"

    );

}

/************************************************
  CLASS PERFORMANCE CHART
************************************************/

function createClassPerformanceChart(
    canvasID,
    students
){

    const labels = [];

    const scores = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        labels.push(
            student.RollNo
        );

        scores.push(
            analytics.score360
        );

    });

    createBarChart(

        canvasID,

        labels,

        scores,

        "360° Score"

    );

}

function getChartTextColor(){

    return document.body.classList.contains(
        "light-mode"
    )
        ? "#334155"
        : "#94a3b8";
}

function getChartGridColor(){

    return document.body.classList.contains(
        "light-mode"
    )
        ? "#cbd5e1"
        : "rgba(255,255,255,.12)";
}
