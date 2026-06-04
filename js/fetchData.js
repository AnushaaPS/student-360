/************************************************
  GLOBAL DATA STORAGE
************************************************/

let GLOBAL_DATA = {};



/************************************************
  FETCH ALL DATA FROM BACKEND
************************************************/

async function fetchAllData() {

    try {

        showLoader();

        const response =
            await fetch(API_URL);

        const result =
            await response.json();

        console.log(result);

        if(result.status !== "success"){

            throw new Error("API Error");

        }

        GLOBAL_DATA =
            result.data || {};


        /****************************************
          REQUIRED SHEETS
        ****************************************/

        const requiredSheets = [

            "STUDENT_MASTER",

            "FACULTY_MASTER",

            "COURSE_INTERNALS",

            "COURSE_ENDSEM",

            "INTERNSHIP",

            "SEMESTER_CGPA",

            "APTITUDE",

            "TECHNICAL_SKILLS",

            "SOFT_SKILLS",

            "ATTENDANCE",

            "ENGAGEMENT",

            "CATEGORY_CONFIG",

            "COURSE_DOMAIN_MAP",

            "PLACEMENT_DATA",

            "THRESHOLD_CONFIG",

            "RECOMMENDATION_CONFIG"

        ];


        /****************************************
          CREATE EMPTY ARRAY IF MISSING
        ****************************************/

        requiredSheets.forEach(sheet => {

            if(!GLOBAL_DATA[sheet]){

                GLOBAL_DATA[sheet] = [];

            }

        });

        console.log("GLOBAL DATA:", GLOBAL_DATA);

        hideLoader();

        return GLOBAL_DATA;

    }
    catch(error){

        console.error("Fetch Error:", error);

        hideLoader();

        alert(
            "Unable to fetch data from server"
        );

    }

}



/************************************************
  GET STUDENT BY ROLL NUMBER
************************************************/

function getStudentByRollNo(rollNo){

    return GLOBAL_DATA.STUDENT_MASTER.find(
        s => s.RollNo == rollNo
    );

}



/************************************************
  VALIDATE STUDENT LOGIN
************************************************/

function validateStudentLogin(rollNo, password){

    return GLOBAL_DATA.STUDENT_MASTER.find(

        s =>

            s.RollNo == rollNo &&

            s.Password == password

    );

}



/************************************************
  VALIDATE FACULTY LOGIN
************************************************/

function validateFacultyLogin(facultyID, password){

    return GLOBAL_DATA.FACULTY_MASTER.find(

        f =>

            f.FacultyID == facultyID &&

            f.Password == password

    );

}



/************************************************
  SAFE DATA GETTERS
************************************************/

function getCGPAData(rollNo){

    return GLOBAL_DATA.SEMESTER_CGPA.filter(
        row => row.RollNo == rollNo
    );

}


function getInternalMarks(rollNo){

    return GLOBAL_DATA.COURSE_INTERNALS.filter(
        row => row.RollNo == rollNo
    );

}


function getEndSemData(rollNo){

    return GLOBAL_DATA.COURSE_ENDSEM.filter(
        row => row.RollNo == rollNo
    );

}


function getAptitudeData(rollNo){

    return GLOBAL_DATA.APTITUDE.filter(
        row => row.RollNo == rollNo
    );

}


function getTechnicalSkills(rollNo){

    return GLOBAL_DATA.TECHNICAL_SKILLS.filter(
        row => row.RollNo == rollNo
    );

}


function getInternshipData(rollNo){

    return GLOBAL_DATA.INTERNSHIP.filter(
        row => row.RollNo == rollNo
    );

}


function getSoftSkills(rollNo){

    return GLOBAL_DATA.SOFT_SKILLS.find(
        row => row.RollNo == rollNo
    ) || {};

}


function getAttendanceData(rollNo){

    return GLOBAL_DATA.ATTENDANCE.find(
        row => row.RollNo == rollNo
    ) || {};

}


function getEngagementData(rollNo){

    return GLOBAL_DATA.ENGAGEMENT.find(
        row => row.RollNo == rollNo
    ) || {};

}


function getPlacementData(rollNo){

    return GLOBAL_DATA.PLACEMENT_DATA.find(
        row => row.RollNo == rollNo
    ) || {};

}


function getCategoryConfig(){

    return GLOBAL_DATA.CATEGORY_CONFIG || [];

}


function getDomainMap(){

    return GLOBAL_DATA.COURSE_DOMAIN_MAP || [];

}


function getAllStudents(){

    return GLOBAL_DATA.STUDENT_MASTER || [];

}



/************************************************
  LOADER
************************************************/

function showLoader(){

    const loader =
        document.getElementById("loader");

    if(loader){

        loader.innerHTML =
            LOADER_HTML;

    }

}


function hideLoader(){

    const loader =
        document.getElementById("loader");

    if(loader){

        loader.innerHTML = "";

    }

}