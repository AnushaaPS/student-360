function getThresholds(metric){

    return (GLOBAL_DATA.THRESHOLD_CONFIG || [])
        .filter(t => t.Metric === metric);

}

function getActiveStudents(){

    return GLOBAL_DATA.STUDENT_MASTER.filter(

        student =>

            student.Status === "Active"

    );

}

function getActiveFaculty(){

    return GLOBAL_DATA.FACULTY_MASTER.filter(

        faculty =>

            faculty.Status === "Active"

    );

}

function getThresholdLabel(metric, value){

    const thresholds =
        GLOBAL_DATA.THRESHOLD_CONFIG || [];

    const match = thresholds.find(t =>

        t.Metric === metric &&

        Number(value) >= Number(t.MinValue) &&

        Number(value) < Number(t.MaxValue)

    );

    return match
        ? match.Label
        : "Unknown";

}

function getConfigValue(metric){

    const row =
        (GLOBAL_DATA.RECOMMENDATION_CONFIG || [])
        .find(r => r.Metric === metric);

    return row
        ? Number(row.Threshold)
        : 0;
}

/************************************************
  STUDENT ANALYTICS BUILDER
************************************************/

function buildStudentAnalytics(student){

    const rollNo = student.RollNo;

    const indices = {

        Academic : calculateAcademicIndex(rollNo),

        Aptitude : calculateAptitudeIndex(rollNo),

        Domain : calculateDomainIndex(rollNo),

        Technical : calculateTechnicalIndex(rollNo),

        SoftSkill : calculateSoftSkillIndex(rollNo),

        Internship : calculateInternshipIndex(rollNo),

        Attendance : calculateAttendanceIndex(rollNo),

        Engagement : calculateEngagementIndex(rollNo),

        CGPA : calculateCGPAIndex(rollNo),

        Growth : calculateGrowthIndex(rollNo)

    };


    const score360 = calculate360Score(indices);

    const placement = calculatePlacementReadiness(indices);

    const riskLevel = calculateRiskLevel(indices);


    return {

        score360,

        placement,

        riskLevel,

        risk : 100 - score360, // Inverse of 360 score for risk

        indices

    };

}



/************************************************
  ACADEMIC INDEX
************************************************/

function calculateAcademicIndex(rollNo){

    const internals = getInternalMarks(rollNo);

    const endSem = getEndSemData(rollNo);


    if(internals.length === 0 && endSem.length === 0) return 0;


    let totalInternal = 0;

    internals.forEach(row => {

        totalInternal += (

            Number(row.Cycle1) +

            Number(row.Cycle2) +

            Number(row.Assignment) +

            Number(row.Model) +

            Number(row.Lab)

        ) / 5;

    });


    let avgInternal = internals.length > 0 ? totalInternal / internals.length : 0;


    let totalEndSem = 0;

    endSem.forEach(row => {

        totalEndSem += (GRADE_POINTS[row.EndSemGrade] || 0) * 10;

    });


    let avgEndSem = endSem.length > 0 ? totalEndSem / endSem.length : 0;


    return (avgInternal * 0.4) + (avgEndSem * 0.6);

}



/************************************************
  APTITUDE INDEX
************************************************/

function calculateAptitudeIndex(rollNo){

    const data = getAptitudeData(rollNo);

    if(data.length === 0) return 0;


    let total = data.reduce((sum, row) => sum + Number(row.Score) || 0, 0);

    return total / data.length;

}



/************************************************
  DOMAIN INDEX
************************************************/

function calculateDomainIndex(rollNo){

    const endSem = getEndSemData(rollNo);

    if(endSem.length === 0) return 0;


    let total = 0;

    endSem.forEach(row => {

        total += (GRADE_POINTS[row.EndSemGrade] || 0) * 10;

    });


    return total / endSem.length;

}



/************************************************
  TECHNICAL INDEX
************************************************/

function calculateTechnicalIndex(rollNo){

    const data = getTechnicalSkills(rollNo);

    if(data.length === 0) return 0;


    let total = data.reduce((sum, row) => sum + Number(row.Level) || 0, 0);

    return total / data.length;

}



/************************************************
  SOFT SKILL INDEX
************************************************/

function calculateSoftSkillIndex(rollNo){

    const data = getSoftSkills(rollNo);

    if(!data) return 0;


    return (

    (Number(data.Communication)||0)+
    (Number(data.Leadership)||0)+
    (Number(data.Teamwork)||0)+
    (Number(data.Professionalism)||0)

)/4;

}



/************************************************
  INTERNSHIP INDEX
************************************************/

function calculateInternshipIndex(rollNo){

    const data = getInternshipData(rollNo);

    if(data.length === 0) return 0;


    let total = data.reduce((sum, row) => sum + Number(row.FeedbackScore) || 0, 0);

    return total / data.length;

}



/************************************************
  ATTENDANCE INDEX
************************************************/

function calculateAttendanceIndex(rollNo){

    const data = getAttendanceData(rollNo);

    if(!data) return 0;


    return Number(data.Percentage) || 0;

}



/************************************************
  ENGAGEMENT INDEX
************************************************/

function calculateEngagementIndex(rollNo){

    const data = getEngagementData(rollNo);

    if(!data) return 0;

    let total = 0;
    let count = 0;

    Object.keys(data).forEach(key => {

        if(key === "RollNo") return;

        const value = Number(data[key]);

        if(!isNaN(value)){

            total += value;
            count++;

        }

    });

    return count > 0
        ? total / count
        : 0;
}



/************************************************
  CGPA INDEX
************************************************/

function calculateCGPAIndex(rollNo){

    const data = getCGPAData(rollNo);

    if(data.length === 0) return 0;


    const row = data[0];

    let total = 0;

    let count = 0;


    for(let i=1; i<=8; i++){

        if(row[`Sem${i}`]){

            total += Number(row[`Sem${i}`]);

            count++;

        }

    }


    const avgCGPA = count > 0 ? total / count : 0;

    return avgCGPA * 10; // Convert to 100 scale

}



/************************************************
  GROWTH INDEX
************************************************/

function calculateGrowthIndex(rollNo){

    const data = getCGPAData(rollNo);

    if(data.length === 0) return 0;


    const row = data[0];

    let semesters = [];


    for(let i=1; i<=8; i++){

        if(row[`Sem${i}`]){

            semesters.push(Number(row[`Sem${i}`]));

        }

    }


    if(semesters.length < 2) return 0;


    const first = semesters[0];

    const last = semesters[semesters.length - 1];


    return (last - first) * 10;

}



/************************************************
  360 SCORE CALCULATION
************************************************/

function calculate360Score(indices){

    const categories =
        GLOBAL_DATA.CATEGORY_CONFIG || [];

    let score = 0;

    categories.forEach(cat => {

        if(cat.Enabled !== "Yes") return;

        const categoryName =

            cat.CategoryName ||

            cat.x;

        score +=

            (Number(
                indices[categoryName]
            ) || 0)

            *

            Number(
                cat.Weight || 0
            );

    });

    return score;

}



/************************************************
  PLACEMENT READINESS
************************************************/

function calculatePlacementReadiness(indices){

    return (

        (indices.Academic || 0) * 0.20 +

        (indices.Aptitude || 0) * 0.25 +

        (indices.Technical || 0) * 0.20 +

        (indices.SoftSkill || 0) * 0.15 +

        (indices.Internship || 0) * 0.10 +

        (indices.Domain || 0) * 0.10

    );

}



/************************************************
  RISK LEVEL CLASSIFICATION
************************************************/

function calculateRiskLevel(indices){

    const score360 =
        calculate360Score(indices);

    return getThresholdLabel(

        "Risk",

        score360

    );

}



/************************************************
  COURSE PERFORMANCE ANALYSIS
************************************************/

function analyzeCoursePerformance(rollNo){

    const internals = getInternalMarks(rollNo);

    const endSem = getEndSemData(rollNo);

    let results = [];


    internals.forEach(intRow => {

        const esRow = endSem.find(e => e.CourseCode === intRow.CourseCode);

        if(esRow){

            const intAvg = (

                Number(intRow.Cycle1) +

                Number(intRow.Cycle2) +

                Number(intRow.Assignment) +

                Number(intRow.Model) +

                Number(intRow.Lab)

            ) / 5;


            const esGradeScore = (GRADE_POINTS[esRow.EndSemGrade] || 0) * 10;


            results.push({

                courseCode : intRow.CourseCode,

                courseName : intRow.CourseName,

                internal : intAvg,

                endSem : esGradeScore,

                gap : Math.abs(intAvg - esGradeScore)

            });

        }

    });


    return results;

}

/************************************************
 GET UNIQUE DEPARTMENTS
************************************************/

function getDepartments(){

    if(
        !GLOBAL_DATA ||
        !GLOBAL_DATA.STUDENT_MASTER
    ){
        return [];
    }

    const departments =
        GLOBAL_DATA.STUDENT_MASTER.map(
            student => student.Dept
        );

    return [...new Set(departments)];
}

/************************************************
 GET CATEGORY CONFIG
************************************************/

function getCategoryConfig(){

    return GLOBAL_DATA.CATEGORY_CONFIG || [];
}

/************************************************
 GET ALL STUDENTS
************************************************/

function getAllStudents(){

    return GLOBAL_DATA.STUDENT_MASTER || [];
}