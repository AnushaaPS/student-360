/************************************************
  LOAD DATA
************************************************/

window.onload = async function(){

    await fetchAllData();

    const student = JSON.parse(

        localStorage.getItem(
            "loggedStudent"
        )

    );

    if(student){

        document.getElementById(
            "dashboardSection"
        ).style.display = "block";

        loadStudentDashboard(student);

    }
    else{

        window.location.href =
            "index.html";

    }

}



/************************************************
  LOAD STUDENT DASHBOARD
************************************************/

function loadStudentDashboard(student){

    const analytics =
        buildStudentAnalytics(student);

    const indices =
        analytics.indices;



    /********************************************
      PROFILE
    ********************************************/

    document.getElementById(
        "studentName"
    ).innerText = student.Name;

    document.getElementById(
        "studentDept"
    ).innerText =
        `${student.Dept} Department`;

    document.getElementById(
        "studentYear"
    ).innerText =
        `Year ${student.Year} - Section ${student.Section}`;

    document.getElementById(
        "avatar"
    ).innerText =
        student.Name.charAt(0);



    /********************************************
      KPI
    ********************************************/

    document.getElementById(
        "score360"
    ).innerText =
        analytics.score360.toFixed(2);

    document.getElementById(
        "placementScore"
    ).innerText =
        analytics.placement.toFixed(2) + "%";

    document.getElementById(
        "riskLevel"
    ).innerText =
        analytics.riskLevel;

    document.getElementById(
        "cgpaIndex"
    ).innerText =
        indices.CGPA.toFixed(2);

    renderStudentTooltips(
    analytics,
    indices
);

    /********************************************
      RISK COLOR
    ********************************************/

    const risk =
        document.getElementById(
            "riskLevel"
        );

    if(analytics.riskLevel === "High Risk"){

        risk.style.color = "#ef4444";

    }
    else if(
        analytics.riskLevel ===
        "Moderate Risk"
    ){

        risk.style.color = "#facc15";

    }
    else{

        risk.style.color = "#22c55e";

    }



    /********************************************
      RADAR CHART
    ********************************************/

    createRadarChart(
    "radarChart",
    indices
);



    /********************************************
      COURSE ANALYSIS
    ********************************************/

    renderCourseAnalysis(student.RollNo);



    /********************************************
      ANALYTICS
    ********************************************/

    renderAnalytics(indices);



    /********************************************
      RECOMMENDATIONS
    ********************************************/

    renderRecommendations(indices);



    /********************************************
      GROWTH ANALYSIS
    ********************************************/

    renderGrowthAnalysis(indices);



    /********************************************
      CORRELATION
    ********************************************/

    renderCorrelationHeatmap(

        "studentCorrelationHeatmap",

        [student]

    );



    /********************************************
      HEATMAP
    ********************************************/

    renderStudentPerformanceHeatmap(

        "studentPerformanceHeatmap",

        [student]

    );



    /********************************************
      DOMAIN INTELLIGENCE
    ********************************************/

    renderDomainAnalytics(
        student.RollNo
    );

}


/************************************************
  COURSE ANALYSIS
************************************************/

function renderCourseAnalysis(rollNo){

    const analysis =
        analyzeCoursePerformance(
            rollNo
        );

    const tbody =
        document.getElementById(
            "courseTableBody"
        );

    tbody.innerHTML = "";

    analysis.forEach(course => {

        tbody.innerHTML += `

        <tr>

            <td>
                ${course.courseName}
            </td>

            <td>
                ${course.internal.toFixed(2)}
            </td>

            <td>
                ${course.endSem.toFixed(2)}
            </td>

            <td>
                ${course.gap.toFixed(2)}
            </td>

        </tr>

        `;

    });

}



/************************************************
  ANALYTICS
************************************************/

function renderAnalytics(indices){

    document.getElementById(
        "academicAnalytics"
    ).innerText = `

Academic Performance Index:
${indices.Academic.toFixed(2)}

CGPA Index:
${indices.CGPA.toFixed(2)}

Attendance:
${indices.Attendance.toFixed(2)}%

`;



    document.getElementById(
        "domainAnalytics"
    ).innerText = `

Domain Strength:
${indices.Domain.toFixed(2)}

Technical Skills:
${indices.Technical.toFixed(2)}

Aptitude:
${indices.Aptitude.toFixed(2)}

`;

}



/************************************************
  RECOMMENDATIONS
************************************************/

function renderRecommendations(indices){

    const list =
        document.getElementById(
            "recommendationList"
        );

    list.innerHTML = "";

    const recommendations =
        getRecommendations(indices);

    recommendations.forEach(rec => {

        list.innerHTML += `

        <li>${rec}</li>

        `;

    });

}



/************************************************
  GROWTH ANALYSIS
************************************************/

function renderGrowthAnalysis(indices){

    let text = "";

    if(indices.Growth > 0){

        text =

        "Your academic growth trend is positive. Performance is improving steadily.";

    }
    else if(indices.Growth < 0){

        text =

        "Growth trend indicates decline. Focus on consistency.";

    }
    else{

        text =

        "Academic performance is stable.";

    }

    document.getElementById(
        "growthAnalysis"
    ).innerText = text;

}

function renderStudentTooltips(
    analytics,
    indices
){

    document.getElementById(
        "score360Tooltip"
    ).innerHTML = `

    <h4>
        360° Score Calculation
    </h4>

    Academic:
    ${indices.Academic.toFixed(2)}
    <br>

    Domain:
    ${indices.Domain.toFixed(2)}
    <br>

    Aptitude:
    ${indices.Aptitude.toFixed(2)}
    <br>

    Technical:
    ${indices.Technical.toFixed(2)}
    <br>

    Internship:
    ${indices.Internship.toFixed(2)}
    <br>

    Soft Skill:
    ${indices.SoftSkill.toFixed(2)}
    <br>

    Attendance:
    ${indices.Attendance.toFixed(2)}
    <br>

    Engagement:
    ${indices.Engagement.toFixed(2)}
    <br><br>

    Final Score:

    ${analytics.score360.toFixed(2)}

    `;



    document.getElementById(
        "placementTooltip"
    ).innerHTML = `

    <h4>
        Placement Formula
    </h4>

    Academic × 20%
    <br>

    Aptitude × 25%
    <br>

    Technical × 20%
    <br>

    Soft Skill × 15%
    <br>

    Internship × 10%
    <br>

    Domain × 10%
    <br><br>

    Placement Readiness:

    ${analytics.placement.toFixed(2)}%

    `;



    document.getElementById(
        "riskTooltip"
    ).innerHTML = `

    <h4>
        Risk Analysis
    </h4>

    Academic:
    ${indices.Academic.toFixed(2)}
    <br>

    Aptitude:
    ${indices.Aptitude.toFixed(2)}
    <br>

    Attendance:
    ${indices.Attendance.toFixed(2)}
    <br>

    Domain:
    ${indices.Domain.toFixed(2)}
    <br>

    Internship:
    ${indices.Internship.toFixed(2)}
    <br>

    Growth:
    ${indices.Growth.toFixed(2)}
    <br><br>

    Classification:

    ${analytics.riskLevel}

    `;



    document.getElementById(
        "cgpaTooltip"
    ).innerHTML = `

    <h4>
        CGPA Analysis
    </h4>

    CGPA Index:

    ${indices.CGPA.toFixed(2)}

    <br><br>

    Growth:

    ${indices.Growth.toFixed(2)}

    <br><br>

    Formula:

    Average(Sem1...Sem8)
    × 10

    `;

}
