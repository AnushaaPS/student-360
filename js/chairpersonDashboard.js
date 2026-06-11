/************************************************
  GLOBAL CLASS STUDENTS
************************************************/

let CLASS_STUDENTS = [];



/************************************************
  LOAD DATA ON PAGE LOAD
************************************************/

window.onload = async function(){

    await fetchAllData();

    const chairperson = JSON.parse(

        localStorage.getItem(
            "loggedFaculty"
        )

    );

    if(chairperson){

        loadChairpersonDashboard();

    }
    else{

        window.location.href =
            "index.html";

    }

};



/************************************************
  LOAD COMPLETE DASHBOARD
************************************************/

function loadChairpersonDashboard(){

    document.getElementById(
        "chairpersonDashboard"
    ).style.display = "block";


    /********************************************
      GET LOGGED CHAIRPERSON
    ********************************************/

    const chairperson = JSON.parse(

        localStorage.getItem(
            "loggedFaculty"
        )

    );


    /********************************************
      PROFILE CARD
    ********************************************/

    document.getElementById(
        "cpAvatar"
    ).innerText =
        chairperson.Name.charAt(0);

    document.getElementById(
        "cpName"
    ).innerText =
        chairperson.Name;

    document.getElementById(
        "cpDept"
    ).innerText =
        chairperson.Dept + " Department";

    document.getElementById(
        "cpClass"
    ).innerText =
        "Year " +
        chairperson.Year +
        " - Section " +
        chairperson.Section;


    /********************************************
      FILTER STUDENTS
    ********************************************/

    let students =
    getActiveStudents();
    
    students = students.filter(student =>

        student.Dept ==
            chairperson.Dept

        &&

        String(student.Year) ==
            String(chairperson.Year)

        &&

        student.Section ==
            chairperson.Section

    );


    CLASS_STUDENTS = students;


    /********************************************
      KPI CARDS
    ********************************************/

    renderChairpersonKPIs(
        students
    );


    /********************************************
      CHARTS
    ********************************************/

    renderChairpersonCharts(
        students
    );


    /********************************************
      TABLES
    ********************************************/

    renderTopPerformers(
        students
    );

    renderHighRiskStudents(
        students
    );

    /********************************************
  CORRELATION ANALYSIS
********************************************/

renderCorrelationHeatmap(

    "cpCorrelationHeatmap",

    CLASS_STUDENTS

);


/********************************************
  PERFORMANCE HEATMAP
********************************************/

renderStudentPerformanceHeatmap(

    "cpPerformanceHeatmap",

    CLASS_STUDENTS

);

/********************************************
  DOMAIN DISTRIBUTION
********************************************/

createDomainDistributionChart(

    "domainDistributionChart",

    CLASS_STUDENTS

);

}



/************************************************
  KPI RENDERING
************************************************/

function renderChairpersonKPIs(students){

    const descriptive =
        descriptiveAnalysis(students);

    const placementReady =
        getPlacementReadyStudents(
            students
        );

    const highRisk =
        getHighRiskStudents(
            students
        );


    document.getElementById(
        "cpTotalStudents"
    ).innerText =
        students.length;

    document.getElementById(
        "cpAverageScore"
    ).innerText =
        descriptive.average360.toFixed(2);

    document.getElementById(
        "cpPlacementReady"
    ).innerText =
        placementReady.length;

    document.getElementById(
        "cpHighRisk"
    ).innerText =
        highRisk.length;

    renderChairpersonTooltips(
    students,
    descriptive,
    placementReady,
    highRisk
);

}



/************************************************
  CHART RENDERING
************************************************/

function renderChairpersonCharts(students){

    /********************************************
      CLASS PERFORMANCE CHART
    ********************************************/

    createClassPerformanceChart(

        "cpDepartmentChart",

        students

    );


    /********************************************
      PLACEMENT READINESS
    ********************************************/

    createPlacementReadinessChart(

        "cpPlacementChart",

        students

    );


    /********************************************
      GROWTH ANALYSIS
    ********************************************/

    const growth =
        growthTrendAnalysis(students);

    createPieChart(

        "growthChart",

        [

            "Improving",

            "Declining",

            "Stable"

        ],

        [

            growth.improving,

            growth.declining,

            growth.stable

        ]

    );


    /********************************************
      RISK ANALYSIS
    ********************************************/

    const risk =
        riskDistribution(students);

    createPieChart(

        "riskChart",

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

}



/************************************************
  TOP PERFORMERS TABLE
************************************************/

function renderTopPerformers(students){

    const tbody =
        document.getElementById(
            "topPerformersBody"
        );

    tbody.innerHTML = "";


    const topStudents =
        getTopPerformers(students,10);


    topStudents.forEach((item,index)=>{

        let row = `

        <tr>

            <td>
                ${index+1}
            </td>

            <td>
                ${item.student.RollNo}
            </td>

            <td>
                ${item.student.Name}
            </td>

            <td>
                ${item.score.toFixed(2)}
            </td>

        </tr>

        `;

        tbody.innerHTML += row;

    });

}



/************************************************
  HIGH RISK TABLE
************************************************/

function renderHighRiskStudents(students){

    const tbody =
        document.getElementById(
            "highRiskBody"
        );

    tbody.innerHTML = "";


    const riskStudents =
        getHighRiskStudents(students);


    riskStudents.forEach(student => {

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

            <td class="low">
                ${analytics.riskLevel}
            </td>

        </tr>

        `;

        tbody.innerHTML += row;

    });

}



/************************************************
  DOWNLOAD TOP PERFORMERS REPORT
************************************************/

function downloadTopPerformersPDF(){

    generateTopPerformersPDF(
        CLASS_STUDENTS
    );

}



/************************************************
  DOWNLOAD FULL CLASS REPORT
************************************************/

function downloadClassReportPDF(){

    generateClassReportPDF(
        CLASS_STUDENTS
    );

}

let currentModule="";

function openModule(module){

    currentModule=module;

    document.getElementById(
        "moduleTitle"
    ).innerText=
    module.toUpperCase();

    loadDropdown(module);
}

function loadDropdown(module){

    const ddl=
    document.getElementById(
        "dynamicDropdown"
    );

    ddl.innerHTML="";

    let options=[];

    if(module=="cgpa"){

        options=[
        "Sem1",
        "Sem2",
        "Sem3",
        "Sem4",
        "Sem5",
        "Sem6",
        "Sem7",
        "Sem8"
        ];
    }

    if(module=="internal"){

        options=[
        "Cycle1",
        "Cycle2",
        "Assignment",
        "Model",
        "Lab"
        ];
    }

    options.forEach(item=>{

        ddl.innerHTML+=
        `<option>${item}</option>`;

    });
}

function downloadTemplate(){

    let data=[];

    const selected=
    document.getElementById(
        "dynamicDropdown"
    ).value;

    if(currentModule=="cgpa"){

        data=[
        {
            RollNo:"22UCS001",
            [selected]:"8.5"
        }
        ];
    }

    if(currentModule=="internal"){

        data=[
        {
            RollNo:"22UCS001",
            Semester:"5",
            CourseCode:"CS2201",
            CourseName:"AI",
            [selected]:"25"
        }
        ];
    }

    const ws=
    XLSX.utils.json_to_sheet(
        data
    );

    const wb=
    XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        wb,
        ws,
        "Template"
    );

    XLSX.writeFile(
        wb,
        currentModule+
        "_template.xlsx"
    );
}

function uploadExcelData(){

const file=
document.getElementById(
"excelFile"
).files[0];

if(!file){

alert("Select file");

return;
}

const reader=
new FileReader();

reader.onload=function(e){

const workbook=
XLSX.read(
e.target.result,
{type:"binary"}
);

const sheet=
workbook.Sheets[
workbook.SheetNames[0]
];

const data=
XLSX.utils.sheet_to_json(
sheet
);

sendUploadData(data);

};

reader.readAsBinaryString(
file
);

}

function sendUploadData(data){

fetch(API_URL,{

method:"POST",

body:JSON.stringify({

action:"uploadData",

module:currentModule,

column:
document.getElementById(
"dynamicDropdown"
).value,

data:data

})

})

.then(res=>res.json())

.then(res=>{

alert(
res.message
);

});

}

function toggleSidebar(){

    document
    .getElementById("sidebar")
    .classList.toggle("active");
}

function renderChairpersonTooltips(
    students,
    descriptive,
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
        "cpTotalStudentsTooltip"
    ).innerHTML = `

        <h4>
            Student Count
        </h4>

        Total Active Students
        in this Class

        <br><br>

        Count:
        ${students.length}

    `;


    document.getElementById(
        "cpAverageScoreTooltip"
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

        Class Average:

        ${descriptive.average360.toFixed(2)}

    `;


    document.getElementById(
        "cpPlacementReadyTooltip"
    ).innerHTML = `

        <h4>
            Placement Ready Students
        </h4>

        Students whose
        Placement Readiness
        is classified as:

        <br>

        Ready

        <br>

        Highly Ready

        <br><br>

        Count:

        ${placementReady.length}

    `;


    document.getElementById(
        "cpHighRiskTooltip"
    ).innerHTML = `

        <h4>
            High Risk Students
        </h4>

        Students classified
        as High Risk based on:

        <br>

        Academic

        <br>

        Aptitude

        <br>

        Attendance

        <br>

        Internship

        <br>

        Growth Trend

        <br><br>

        Count:

        ${highRisk.length}

    `;

}

function searchChairpersonStudents(){

    const keyword =

        document
        .getElementById(
            "cpStudentSearch"
        )
        .value
        .toLowerCase();

    const filtered =

        CLASS_STUDENTS.filter(

            student =>

                student.RollNo
                .toLowerCase()
                .includes(keyword)

                ||

                student.Name
                .toLowerCase()
                .includes(keyword)

        );

    renderSearchStudents(
        filtered
    );

}

function clearChairpersonSearch(){

    document
    .getElementById(
        "cpStudentSearch"
    ).value = "";

    document
    .getElementById(
        "cpSearchBody"
    ).innerHTML = "";

}

function renderSearchStudents(
    students
){

    const tbody =
        document.getElementById(
            "cpSearchBody"
        );

    tbody.innerHTML = "";

    students.forEach(student=>{

        const analytics =
            buildStudentAnalytics(
                student
            );

        tbody.innerHTML += `

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
                ${analytics.riskLevel}
            </td>

            <td>

                <button
                    onclick="viewCPStudentDetails('${student.RollNo}')">

                    View

                </button>

            </td>

        </tr>

        `;

    });

}

function viewCPStudentDetails(
    rollNo
){

    const student =
        getStudentByRollNo(
            rollNo
        );

    const analytics =
        buildStudentAnalytics(
            student
        );

    const placementClass =

    analytics.placement >= 80

    ? "Highly Ready"

    :

    analytics.placement >= 60

    ? "Ready"

    :

    analytics.placement >= 40

    ? "Emerging"

    :

    "Not Ready";


const intervention =

    analytics.riskLevel == "High Risk"

    ?

    "Immediate mentoring and improvement plan required"

    :

    analytics.riskLevel == "Moderate Risk"

    ?

    "Regular monitoring and skill enhancement recommended"

    :

    "Continue current performance";

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
                Year:
                ${student.Year}
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
            ${placementClass}
        </p>

        <p>

    Weak Area:

    ${
        Object.entries(
            analytics.indices
        )
        .sort(
            (a,b)=>a[1]-b[1]
        )[0][0]
    }

</p>

        <p>
            Intervention:
            ${intervention}
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

window.onclick = function(event){

    const modal =
        document.getElementById(
            "studentDetailModal"
        );

    if(event.target === modal){
        modal.style.display = "none";
    }
}
