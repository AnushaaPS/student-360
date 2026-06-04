/************************************************
  LOAD DATA ON PAGE LOAD
************************************************/

window.onload = async function(){

    const admin = JSON.parse(

        localStorage.getItem(
            "loggedFaculty"
        )

    );

    if(!admin){

        window.location.href =
            "index.html";

        return;

    }

    await fetchAllData();

    loadAdminDashboard();

};


/************************************************
  LOAD COMPLETE DASHBOARD
************************************************/

function loadAdminDashboard(){

    document.getElementById(
        "adminDashboard"
    ).style.display = "block";


    /********************************************
      GET ADMIN
    ********************************************/

    const admin = JSON.parse(

        localStorage.getItem(
            "loggedFaculty"
        )

    );


    /********************************************
      PROFILE CARD
    ********************************************/

    document.getElementById(
        "adminAvatar"
    ).innerText =
        admin.Name.charAt(0);

    document.getElementById(
        "adminName"
    ).innerText =
        admin.Name;


    /********************************************
      DATA
    ********************************************/

    const students =
    getActiveStudents();

const faculty =
    getActiveFaculty();

    const categories =
        getCategoryConfig();


    /********************************************
      KPI CARDS
    ********************************************/

    renderAdminKPIs(

        students,

        faculty,

        categories

    );


    /********************************************
      TABLES
    ********************************************/

    renderCategoryTable(
        categories
    );

    loadEngagementEvents();

    renderThresholds();

renderRecommendationConfig();

renderCalculationReference();

renderDetailedFormulas();

initializeCalculationAccordion();

renderDomainTable();

showAdminSection(
    "overviewSection");

}



/************************************************
  KPI CARDS
************************************************/

function renderAdminKPIs(

    students,

    faculty,

    categories

){

    const departments =
        getDepartments();


    document.getElementById(
        "adminTotalStudents"
    ).innerText =
        students.length;

    document.getElementById(
        "adminTotalFaculty"
    ).innerText =
        faculty.length;

    document.getElementById(
        "adminDepartments"
    ).innerText =
        departments.length;

    document.getElementById(
        "adminCategories"
    ).innerText =
        categories.length;

}



/************************************************
  STUDENT MANAGEMENT TABLE
************************************************/

function renderStudentManagement(students){

    const tbody =
document.getElementById(
    "adminStudentBody"
);

if(!tbody) return;

tbody.innerHTML = "";


    students.forEach(student => {

        let row = `

        <tr>

            <td>

                ${student.RollNo}

            </td>

            <td>

                ${student.Name}

            </td>

            <td>

                ${student.Dept}

            </td>

            <td>

                ${student.Year}

            </td>

        </tr>

        `;

        tbody.innerHTML += row;

    });

}



/************************************************
  FACULTY MANAGEMENT TABLE
************************************************/

function renderFacultyManagement(faculty){

    const tbody =
        document.getElementById(
            "adminFacultyBody"
        );

    if(!tbody) return;

    tbody.innerHTML = "";


    faculty.forEach(member => {

        let row = `

        <tr>

            <td>

                ${member.FacultyID}

            </td>

            <td>

                ${member.Name}

            </td>

            <td>

                ${member.Dept}

            </td>

        </tr>

        `;

        tbody.innerHTML += row;

    });

}



/************************************************
 CATEGORY CONFIG TABLE
************************************************/

function renderCategoryTable(categories){

    const tbody =
        document.getElementById(
            "categoryTableBody"
        );

    tbody.innerHTML = "";


    categories.forEach(cat => {

        let row = `

        <tr>

            <td>

                ${cat.CategoryName || cat.x}

            </td>

            <td>

                <input
                    type="number"
                    value="${cat.Weight}"
                    id="weight_${cat.CategoryName}"
                    step="0.01"
                >

            </td>

            <td>

                <select
                    id="status_${cat.CategoryName}"
                >

                    <option value="Yes"
                        ${cat.Enabled === "Yes" ? "selected" : ""}
                    >

                        Enabled

                    </option>

                    <option value="No"
                        ${cat.Enabled === "No" ? "selected" : ""}
                    >

                        Disabled

                    </option>

                </select>

            </td>

            <td>

                <button
                    onclick="updateCategory('${cat.CategoryName}')"
                >

                    Update

                </button>

            </td>

        </tr>

        `;

        tbody.innerHTML += row;

    });

}



/************************************************
  SYSTEM SUMMARY
************************************************/

function generateSystemSummary(){

    const students =
    getActiveStudents();

const faculty =
    getActiveFaculty();

    const categories =
        GLOBAL_DATA.CATEGORY_CONFIG;

    return {

        students :
            students.length,

        faculty :
            faculty.length,

        departments :
            getDepartments().length,

        categories :
            categories.length

    };

}



/************************************************
 LOAD ENGAGEMENT EVENTS
************************************************/

async function loadEngagementEvents(){

    const tbody =
        document.getElementById(
            "engagementEventBody"
        );


    /********************************************
     CLEAR OLD ROWS
    ********************************************/

    tbody.innerHTML = "";


    try{

        const response =
            await fetch(API_URL,{

                method : "POST",

                body : JSON.stringify({

                    action :
                        "getEngagementHeaders"

                })

            });


        const result =
            await response.json();


        if(
            result.status !== "success"
        ){
            return;
        }


        const headers =
            result.headers || [];


        /****************************************
         REMOVE ROLLNO
        ****************************************/

        const eventHeaders =
            headers.filter(
                h => h !== "RollNo"
            );


        /****************************************
         REMOVE DUPLICATES
        ****************************************/

        const uniqueHeaders =
            [...new Set(eventHeaders)];


        /****************************************
         RENDER TABLE
        ****************************************/

        uniqueHeaders.forEach(header => {

            let eventName = header;

            let marks = "";


            const match =
                header.match(
                    /(.*)\((.*)\)/
                );


            if(match){

                eventName =
                    match[1].trim();

                marks =
                    match[2]
                        .replace(")","")
                        .trim();

            }


            tbody.innerHTML += `

            <tr>

                <td>

                    ${eventName}

                </td>

                <td>

                    <input
                        type="number"
                        value="${marks}"
                        id="mark_${eventName}"
                    >

                </td>

                <td>

                    <button
                        onclick="updateEngagementEvent('${eventName}')"
                    >

                        Update

                    </button>

                    <button
                        onclick="deleteEngagementEvent('${eventName}')"
                        style="
                            background:red;
                            margin-left:10px;
                        "
                    >

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    }
    catch(error){

        console.error(error);

    }

}


function renderThresholds(){

    const tbody =
        document.getElementById(
            "thresholdTableBody"
        );

    if(!tbody) return;

    tbody.innerHTML = "";

    (GLOBAL_DATA.THRESHOLD_CONFIG || [])
        .forEach((row,index)=>{

        tbody.innerHTML += `

            <tr>

                <td>${row.Metric}</td>

                <td>
                    <input
                        value="${row.MinValue}"
                        id="min_${index}">
                </td>

                <td>
                    <input
                        value="${row.MaxValue}"
                        id="max_${index}">
                </td>

                <td>
                    <input
                        value="${row.Label}"
                        id="label_${index}">
                </td>

                <td>

                    <button
                        onclick="updateThreshold(${index})">

                        Update

                    </button>

                </td>

            </tr>

        `;

    });

}

function renderRecommendationConfig(){

    const tbody =
        document.getElementById(
            "recommendationConfigBody"
        );

    if(!tbody) return;

    tbody.innerHTML = "";

    (GLOBAL_DATA.RECOMMENDATION_CONFIG || [])
        .forEach((row,index)=>{

        tbody.innerHTML += `

            <tr>

                <td>${row.Metric}</td>

                <td>

                    <input
                        value="${row.Threshold}"
                        id="rec_${index}">

                </td>

                <td>

                    <button
                        onclick="updateRecommendationConfig(${index})">

                        Update

                    </button>

                </td>

            </tr>

        `;

    });

}

function renderCalculationReference(){

    const thresholds =
        GLOBAL_DATA.THRESHOLD_CONFIG || [];

    renderMetricThreshold(
        "Risk",
        "riskFormula",
        thresholds
    );

    renderMetricThreshold(
        "Placement",
        "placementFormula",
        thresholds
    );

    renderMetricThreshold(
        "Domain",
        "domainFormula",
        thresholds
    );

    renderMetricThreshold(
        "Academic",
        "academicFormula",
        thresholds
    );

}

function renderMetricThreshold(
    metric,
    containerId,
    thresholds
){

    const container =
        document.getElementById(
            containerId
        );

    if(!container) return;

    container.innerHTML = "";

    thresholds
    .filter(
        t => t.Metric === metric
    )
    .forEach(t=>{

        container.innerHTML += `

        <p>

            ${t.MinValue}
            -
            ${t.MaxValue}

            :

            ${t.Label}

        </p>

        `;

    });

}

function renderDetailedFormulas(){

    const categories =
    GLOBAL_DATA.CATEGORY_CONFIG || [];

let formula =
    "360° Score = ";

formula += categories
    .filter(c => c.Enabled === "Yes")
    .map(c => {

        const name =
            c.CategoryName || c.x;

        return `${name} × ${c.Weight}`;

    })
    .join(" + ");

document.getElementById(
    "score360Formula"
).innerHTML = `<p>${formula}</p>`;

    document.getElementById(
        "formulaReference"
    ).innerHTML = `

        <p>

            Academic =
            (Average Internal × 0.4)
            +
            (Average End Semester × 0.6)

        </p>

        <p>

            Aptitude =
            Average(Aptitude Scores)

        </p>

        <p>

            Domain =
            Average(End Semester Grade Points)

        </p>

        <p>

            Technical =
            Average(Technical Skill Levels)

        </p>

        <p>

            Soft Skill =
            (Communication +
            Leadership +
            Teamwork +
            Professionalism) / 4

        </p>

        <p>

            Internship =
            Average(Feedback Scores)

        </p>

        <p>

            Attendance =
            Attendance Percentage

        </p>

        <p>

            Engagement =
            Average(All Event Scores)

        </p>

        <p>

            CGPA =
            Average(Sem1...Sem8) × 10

        </p>

        <p>

            Growth =
            (Last Semester CGPA
            -
            First Semester CGPA)
            × 10

        </p>

    `;

    document.getElementById(
        "placementCalculation"
    ).innerHTML = `

        <p>

        Placement Readiness =

        Academic × 0.20

        +

        Aptitude × 0.25

        +

        Technical × 0.20

        +

        SoftSkill × 0.15

        +

        Internship × 0.10

        +

        Domain × 0.10

        </p>

    `;

    document.getElementById(
        "mlPlacementFormula"
    ).innerHTML = `

        <p>

        ML Placement Probability =

        Academic × 0.25

        +

        Aptitude × 0.20

        +

        Domain × 0.15

        +

        Technical × 0.10

        +

        SoftSkill × 0.10

        +

        Internship × 0.10

        +

        Attendance × 0.05

        +

        Engagement × 0.05

        </p>

    `;

    document.getElementById(
        "riskCalculation"
    ).innerHTML = `

        <p>

        Academic Score below 60
Risk Contribution = 25 points </p>

        <p>

Aptitude Score below 60
Risk Contribution = 20 points </p>

        <p>

Attendance below 75%
Risk Contribution = 20 points </p>

        <p>

Domain Score below 55
Risk Contribution = 15 points </p>

        <p>

Internship Score below 40
Risk Contribution = 10 points </p>

        <p>

Negative Academic Growth Trend
Risk Contribution = 10 points

        </p>

    `;

    document.getElementById(
        "recommendationRules"
    ).innerHTML = `

        <p>

        Attendance Threshold =
        ${getConfigValue("Attendance")}

        </p>

        <p>

        Aptitude Threshold =
        ${getConfigValue("Aptitude")}

        </p>

        <p>

        Technical Threshold =
        ${getConfigValue("Technical")}

        </p>

        <p>

        Internship Threshold =
        ${getConfigValue("Internship")}

        </p>

        <p>

        Soft Skill Threshold =
        ${getConfigValue("SoftSkill")}

        </p>

        <p>

        Engagement Threshold =
        ${getConfigValue("Engagement")}

        </p>

        <p>

        CGPA Threshold =
        ${getConfigValue("CGPA")}

        </p>

    `;

}

function initializeCalculationAccordion(){

    document
    .querySelectorAll(".calc-btn")
    .forEach(btn=>{

        btn.addEventListener(
            "click",
            function(){

                this.nextElementSibling
                .classList
                .toggle("active");

            }
        );

    });

}

function renderDomainTable(){

    const tbody =
        document.getElementById(
            "domainTableBody"
        );

    if(!tbody) return;

    tbody.innerHTML="";

    const domains =
        GLOBAL_DATA
        .COURSE_DOMAIN_MAP || [];

    const uniqueDomains =
        [...new Map(

            domains.map(d=>[
                d.Domain,
                d
            ])

        ).values()];

    uniqueDomains.forEach(domain=>{

        tbody.innerHTML += `

        <tr>

            <td>
                ${domain.Domain}
            </td>

            <td>

                <input
                    type="number"
                    step="0.01"
                    id="domainWeight_${domain.Domain}"
                    value="${domain.DomainWeight}">
            </td>

            <td>

                <button
                    onclick="updateDomainWeightUI('${domain.Domain}')">

                    Update

                </button>

            </td>

        </tr>

        `;

    });

}