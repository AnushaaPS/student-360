/************************************************
  GOOGLE APPS SCRIPT API URL
************************************************/

const API_URL = "https://script.google.com/macros/s/AKfycbyWrJShUyKygS07jYxZhYDGULh780oWKRm3eEvt0gc3bP2v0t-P970zFI5O5GZxhO8Jiw/exec";


/************************************************
  PROJECT CONFIGURATION
************************************************/

const PROJECT_NAME = "Advanced 360° Student Analytics System";


/************************************************
  CHART COLORS
************************************************/

const CHART_COLORS = {

    primary : "#38bdf8",

    success : "#16a34a",

    warning : "#eab308",

    danger : "#dc2626",

    dark : "#1e293b"

};


/************************************************
  CATEGORY DISPLAY NAMES
************************************************/

const CATEGORY_LABELS = {

    Academic : "Academic Performance",

    Background : "Academic Background",

    Domain : "Domain Strength",

    Aptitude : "Aptitude",

    Technical : "Technical Skills",

    Internship : "Industry Exposure",

    SoftSkill : "Soft Skills",

    Attendance : "Attendance",

    Engagement : "Engagement"

};


/************************************************
  GRADE POINT MAPPING
************************************************/

const GRADE_POINTS = {

    "O" : 10,

    "A+" : 9,

    "A" : 8,

    "B+" : 7,

    "B" : 6,

    "C" : 5,

    "U" : 0

};


/************************************************
  DASHBOARD SETTINGS
************************************************/

const DASHBOARD_CONFIG = {

    defaultChartHeight : 400,

    maxRadarValue : 100,

    animationDuration : 1000

};


/************************************************
  TABLE PAGINATION
************************************************/

const TABLE_CONFIG = {

    rowsPerPage : 10

};


/************************************************
  DATE FORMAT
************************************************/

const DATE_FORMAT = "YYYY-MM-DD";


/************************************************
  DEPARTMENT COLORS
************************************************/

const DEPARTMENT_COLORS = {

    ECE : "#38bdf8",

    CSE : "#16a34a",

    EEE : "#eab308",

    MECH : "#dc2626",

    CIVIL : "#8b5cf6"

};


/************************************************
  LOGIN ROLES
************************************************/

const USER_ROLES = {

    student : "Student",

    faculty : "Faculty",

    chairperson : "Chairperson"

};


/************************************************
  LOADER HTML
************************************************/

const LOADER_HTML = `

<div class="loader"></div>

`;


/************************************************
  NO DATA MESSAGE
************************************************/

const NO_DATA_HTML = `

<div class="alert alert-warning">
    No Data Available
</div>

`;