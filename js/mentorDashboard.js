/************************************************
  GLOBAL MENTOR STUDENTS
************************************************/

let MENTOR_STUDENTS = [];



/************************************************
  LOAD DATA
************************************************/

window.onload = async function(){

    await fetchAllData();

    const mentor = JSON.parse(

        localStorage.getItem(
            "loggedFaculty"
        )

    );

    if(mentor){

        loadMentorDashboard(mentor);

    }
    else{

        window.location.href =
            "index.html";

    }

};



/************************************************
  LOAD COMPLETE DASHBOARD
************************************************/

function loadMentorDashboard(mentor){

    document.getElementById(
        "mentorDashboard"
    ).style.display = "block";


    /********************************************
      PROFILE CARD
    ********************************************/

    document.getElementById(
        "mentorAvatar"
    ).innerText =
        mentor.Name.charAt(0);

    document.getElementById(
        "mentorName"
    ).innerText =
        mentor.Name;

    document.getElementById(
        "mentorDept"
    ).innerText =
        mentor.Dept + " Department";

    document.getElementById(
        "mentorRole"
    ).innerText =
        mentor.Role;


    /********************************************
      FILTER ASSIGNED STUDENTS
    ********************************************/

    const students =
    getActiveStudents();

    MENTOR_STUDENTS =
        students.filter(student =>

            student.FacultyID ==
            mentor.FacultyID

        );


    /********************************************
      KPI CARDS
    ********************************************/

    renderMentorKPIs(
        MENTOR_STUDENTS
    );


    /********************************************
      STUDENT TABLE
    ********************************************/

    renderMentorStudentTable(
        MENTOR_STUDENTS
    );


    /********************************************
      CHARTS
    ********************************************/

    renderMentorCharts(
        MENTOR_STUDENTS
    );


    /********************************************
      RECOMMENDATIONS
    ********************************************/

    renderMentorRecommendations(
        MENTOR_STUDENTS
    );

    /********************************************
  CORRELATION ANALYSIS
********************************************/

renderCorrelationHeatmap(

    "mentorCorrelationHeatmap",

    MENTOR_STUDENTS

);


/********************************************
  PERFORMANCE HEATMAP
********************************************/

renderStudentPerformanceHeatmap(

    "mentorPerformanceHeatmap",

    MENTOR_STUDENTS

);

}



/************************************************
  KPI CARDS
************************************************/

function renderMentorKPIs(students){

    let totalScore = 0;

    let placementReady = 0;

    let highRisk = 0;


    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        totalScore +=
            analytics.score360;

        if(analytics.placement >= 70){

            placementReady++;

        }

        if(
            analytics.riskLevel ===
            "High Risk"
        ){

            highRisk++;

        }

    });


    let avg = students.length

        ?

        totalScore / students.length

        :

        0;


    document.getElementById(
        "assignedStudents"
    ).innerText =
        students.length;

    document.getElementById(
        "mentorHighRisk"
    ).innerText =
        highRisk;

    document.getElementById(
        "mentorPlacementReady"
    ).innerText =
        placementReady;

    document.getElementById(
        "mentorAverageScore"
    ).innerText =
        avg.toFixed(2);

    renderMentorTooltips(
    students,
    avg,
    placementReady,
    highRisk
);

}



/************************************************
  STUDENT TABLE
************************************************/

function renderMentorStudentTable(students){

    const tbody =
        document.getElementById(
            "mentorStudentBody"
        );

    tbody.innerHTML = "";


    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        let row = `

        <tr>

            <td>

                ${student.RollNo}

            </td>

            <td>

                ${student.Name}

            </td>

            <td>

                ${analytics.score360.toFixed(2)}

            </td>

            <td>

                ${analytics.placement.toFixed(2)}%

            </td>

            <td>

    ${getBestDomain(
        student.RollNo
    )}

</td>

            <td>

                ${analytics.riskLevel}

            </td>

            <td>

                <button
                    onclick="viewStudentDetails('${student.RollNo}')">

                    View

                </button>

            </td>

        </tr>

        `;

        tbody.innerHTML += row;

    });

}



/************************************************
  VIEW STUDENT DETAILS
************************************************/

function viewStudentDetails(
    rollNo
){

    const student =
        getStudentByRollNo(
            rollNo
        );

    if(!student){

        return;

    }

    const analytics =
        buildStudentAnalytics(
            student
        );

    const ml =
        generateMLAnalytics(
            student
        );

    document
    .getElementById(
        "studentDetailContent"
    )
    .innerHTML = `

    <h2>

        ${student.Name}

    </h2>

    <hr>

    <div class="grid">

        <div class="card">

            <h3>
                Student Information
            </h3>

            <p>
                Roll No:
                ${student.RollNo}
            </p>

            <p>
                Department:
                ${student.Dept}
            </p>

            <p>
                Section:
                ${student.Section}
            </p>

        </div>

        <div class="card">

            <h3>
                Performance
            </h3>

            <p>
                360° Score:
                ${analytics.score360.toFixed(2)}
            </p>

            <p>
                Placement:
                ${analytics.placement.toFixed(2)}%
            </p>

            <p>
                Risk:
                ${analytics.riskLevel}
            </p>

        </div>

    </div>

    <div class="card">

        <h3>
            ML Analytics
        </h3>

        <p>

            Placement Class:

            ${ml.placementClass}

        </p>

        <p>

            Weak Area:

            ${identifyWeakestArea(
                student
            )}

        </p>

        <p>

            Intervention:

            ${ml.intervention}

        </p>

    </div>

    `;

    document
    .getElementById(
        "studentDetailModal"
    )
    .style.display =
        "block";

}

function closeStudentModal(){

    document
    .getElementById(
        "studentDetailModal"
    )
    .style.display =
        "none";

}

function clearMentorSearch(){

    document.getElementById(
        "mentorStudentSearch"
    ).value = "";

    renderMentorStudentTable(
        MENTOR_STUDENTS
    );

}

function searchMentorStudents(){

    const keyword =

        document
        .getElementById(
            "mentorStudentSearch"
        )
        .value
        .toLowerCase();

    const filtered =

        MENTOR_STUDENTS.filter(

            student =>

                student.RollNo
                .toLowerCase()
                .includes(keyword)

                ||

                student.Name
                .toLowerCase()
                .includes(keyword)

        );

    renderMentorStudentTable(
        filtered
    );

}


/************************************************
  CHARTS
************************************************/

function renderMentorCharts(students){

    const risk =
        riskDistribution(students);

    createPieChart(

        "mentorRiskChart",

        [

            "High Risk",

            "Moderate Risk",

            "Safe"

        ],

        [

            risk.high,

            risk.moderate,

            risk.safe

        ]

    );


    const performance =
        performanceDistribution(students);

    createPieChart(

        "mentorPlacementChart",

        [

            "Industry Ready",

            "Placement Ready",

            "Average",

            "High Risk"

        ],

        [

            performance.excellent,

            performance.good,

            performance.average,

            performance.poor

        ]

    );

}



/************************************************
  RECOMMENDATIONS
************************************************/

function renderMentorRecommendations(students){

    const container =
        document.getElementById(
            "mentorRecommendations"
        );

    let html = "";


    students.forEach(student => {

        const ml =
            generateMLAnalytics(student);

        html += `

        <div class="analytics-box">

            <h3>

                ${student.Name}
                (${student.RollNo})

            </h3>

            <p>

                Weak Area:
                ${identifyWeakestArea(student)}

            </p>

            <p>

                Intervention:
                ${ml.intervention}

            </p>

            <p>

                Placement Prediction:
                ${ml.placementClass}

            </p>

        </div>

        `;

    });

    container.innerHTML = html;

}



/************************************************
  EXPORT MENTOR REPORT
************************************************/

function exportMentorReport(){

    generateFacultySummaryPDF(
        MENTOR_STUDENTS
    );

}

function renderMentorTooltips(
    students,
    avg,
    placementReady,
    highRisk
){

    const analyticsList =
        students.map(
            s => buildStudentAnalytics(s)
        );

    const avgAcademic =
        analyticsList.reduce(
            (sum,a)=>sum+a.indices.Academic,
            0
        ) / students.length;

    const avgDomain =
        analyticsList.reduce(
            (sum,a)=>sum+a.indices.Domain,
            0
        ) / students.length;

    const avgAptitude =
        analyticsList.reduce(
            (sum,a)=>sum+a.indices.Aptitude,
            0
        ) / students.length;

    const avgTechnical =
        analyticsList.reduce(
            (sum,a)=>sum+a.indices.Technical,
            0
        ) / students.length;

    const avgSoftSkill =
        analyticsList.reduce(
            (sum,a)=>sum+a.indices.SoftSkill,
            0
        ) / students.length;

    const avgAttendance =
        analyticsList.reduce(
            (sum,a)=>sum+a.indices.Attendance,
            0
        ) / students.length;

    const avgInternship =
        analyticsList.reduce(
            (sum,a)=>sum+a.indices.Internship,
            0
        ) / students.length;

    const avgEngagement =
        analyticsList.reduce(
            (sum,a)=>sum+a.indices.Engagement,
            0
        ) / students.length;



    document.getElementById(
        "assignedStudentsTooltip"
    ).innerHTML = `

    <h4>
        Assigned Students
    </h4>

    Students mapped to your

    Faculty ID

    <br><br>

    Count:

    ${students.length}

    `;



    document.getElementById(
        "mentorHighRiskTooltip"
    ).innerHTML = `

    <h4>
        High Risk Identification
    </h4>

    Academic

    <br>

    Aptitude

    <br>

    Attendance

    <br>

    Domain

    <br>

    Internship

    <br>

    Growth Trend

    <br><br>

    High Risk Students:

    ${highRisk}

    `;



    document.getElementById(
        "mentorPlacementReadyTooltip"
    ).innerHTML = `

    <h4>
        Placement Ready
    </h4>

    Students having

    Placement Score

    ≥ 70

    <br><br>

    Count:

    ${placementReady}

    `;



    document.getElementById(
        "mentorAverageScoreTooltip"
    ).innerHTML = `

    <h4>
        Average 360° Score
    </h4>

    Academic:
    ${avgAcademic.toFixed(2)}

    <br>

    Domain:
    ${avgDomain.toFixed(2)}

    <br>

    Aptitude:
    ${avgAptitude.toFixed(2)}

    <br>

    Technical:
    ${avgTechnical.toFixed(2)}

    <br>

    Soft Skill:
    ${avgSoftSkill.toFixed(2)}

    <br>

    Internship:
    ${avgInternship.toFixed(2)}

    <br>

    Attendance:
    ${avgAttendance.toFixed(2)}

    <br>

    Engagement:
    ${avgEngagement.toFixed(2)}

    <br><br>

    Average 360° Score:

    ${avg.toFixed(2)}

    `;

}