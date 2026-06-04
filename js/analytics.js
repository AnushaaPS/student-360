/************************************************
  DESCRIPTIVE ANALYSIS
************************************************/

function descriptiveAnalysis(students){

    let total360 = 0;

    let totalPlacement = 0;

    let totalRisk = 0;

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        total360 += analytics.score360;

        totalPlacement += analytics.placement;

        totalRisk += analytics.risk;

    });

    return {

        average360 :
            total360 / students.length,

        averagePlacement :
            totalPlacement / students.length,

        averageRisk :
            totalRisk / students.length

    };

}



/************************************************
  DEPARTMENT ANALYSIS
************************************************/

function departmentAnalysis(students){

    let departmentMap = {};

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        if(!departmentMap[student.Dept]){

            departmentMap[student.Dept] = [];

        }

        departmentMap[student.Dept].push(
            analytics.score360
        );

    });

    let result = {};

    Object.keys(departmentMap).forEach(dept => {

        let avg =

            departmentMap[dept].reduce(
                (a,b)=>a+b,0
            ) / departmentMap[dept].length;

        result[dept] = avg;

    });

    return result;

}



/************************************************
  HIGH RISK STUDENTS
************************************************/

function getHighRiskStudents(students){

    return students.filter(student => {

        const analytics =
            buildStudentAnalytics(student);

        return analytics.riskLevel === "High Risk";

    });

}



/************************************************
  PLACEMENT READY STUDENTS
************************************************/

function getPlacementReadyStudents(students){

    return students.filter(student => {

        const analytics =
            buildStudentAnalytics(student);

        return analytics.placement >= 70;

    });

}



/************************************************
  TOP PERFORMERS
************************************************/

function getTopPerformers(students,limit=10){

    return students
        .map(student => {

            const analytics =
                buildStudentAnalytics(student);

            return {

                student,

                score :
                    analytics.score360

            };

        })
        .sort((a,b)=>b.score-a.score)
        .slice(0,limit);

}



/************************************************
  LOW PERFORMERS
************************************************/

function getLowPerformers(students,limit=10){

    return students
        .map(student => {

            const analytics =
                buildStudentAnalytics(student);

            return {

                student,

                score :
                    analytics.score360

            };

        })
        .sort((a,b)=>a.score-b.score)
        .slice(0,limit);

}



/************************************************
  ATTENDANCE VS PERFORMANCE
************************************************/

function attendanceVsPerformance(students){

    let data = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        data.push({

            attendance :
                analytics.indices.Attendance,

            performance :
                analytics.score360

        });

    });

    return data;

}



/************************************************
  APTITUDE VS PLACEMENT
************************************************/

function aptitudeVsPlacement(students){

    let data = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        data.push({

            aptitude :
                analytics.indices.Aptitude,

            placement :
                analytics.placement

        });

    });

    return data;

}



/************************************************
  10TH/12TH VS CGPA
************************************************/

function backgroundVsCGPA(students){

    let data = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        data.push({

            background :

                (
                    Number(student.Tenth) +

                    Number(student.Twelfth)

                ) / 2,

            cgpa :
                analytics.indices.CGPA

        });

    });

    return data;

}



/************************************************
  INTERNAL VS END SEM GAP
************************************************/

function internalVsEndSem(students){

    let gaps = [];

    students.forEach(student => {

        const analysis =
            analyzeCoursePerformance(
                student.RollNo
            );

        analysis.forEach(course => {

            gaps.push({

                course :
                    course.courseName,

                gap :
                    course.gap

            });

        });

    });

    return gaps;

}



/************************************************
  COURSE PERFORMANCE ANALYSIS
************************************************/

function coursePerformanceAnalysis(students){

    let courseMap = {};

    students.forEach(student => {

        const analysis =
            analyzeCoursePerformance(
                student.RollNo
            );

        analysis.forEach(course => {

            if(!courseMap[course.courseCode]){

                courseMap[course.courseCode] = {

                    name :
                        course.courseName,

                    scores : []

                };

            }

            courseMap[
                course.courseCode
            ].scores.push(
                course.endSem
            );

        });

    });

    let result = [];

    Object.keys(courseMap).forEach(code => {

        const course =
            courseMap[code];

        let avg =

            course.scores.reduce(
                (a,b)=>a+b,0
            ) / course.scores.length;

        result.push({

            courseCode :
                code,

            courseName :
                course.name,

            average :
                avg

        });

    });

    return result;

}



/************************************************
  GROWTH TREND ANALYSIS
************************************************/

function growthTrendAnalysis(students){

    let improving = 0;

    let declining = 0;

    let stable = 0;

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        const growth =
            analytics.indices.Growth;

        if(growth > 0){

            improving++;

        }
        else if(growth < 0){

            declining++;

        }
        else{

            stable++;

        }

    });

    return {

        improving,

        declining,

        stable

    };

}



/************************************************
  DOMAIN ANALYSIS
************************************************/

function domainAnalysis(students){

    let domains = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        domains.push({

            rollNo :
                student.RollNo,

            domain :
                analytics.indices.Domain

        });

    });

    return domains;

}



/************************************************
  PERFORMANCE DISTRIBUTION
************************************************/

function performanceDistribution(students){

    let excellent = 0;
    let good = 0;
    let average = 0;
    let poor = 0;

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        const score =
            analytics.score360;

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

    return {

        excellent,
        good,
        average,
        poor

    };

}



/************************************************
  RISK DISTRIBUTION
************************************************/

function riskDistribution(students){

    let high = 0;
    let moderate = 0;
    let safe = 0;

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        if(analytics.riskLevel === "High Risk"){

            high++;

        }
        else if(
            analytics.riskLevel === "Moderate Risk"
        ){

            moderate++;

        }
        else{

            safe++;

        }

    });

    return {

        high,
        moderate,
        safe

    };

}



/************************************************
  SEMESTER TREND ANALYSIS
************************************************/

function semesterTrendAnalysis(rollNo){

    const rows =
        getCGPAData(rollNo);

    if(rows.length === 0){

        return [];

    }

    const row = rows[0];

    let trend = [];

    Object.keys(row).forEach(key => {

        if(key !== "RollNo"){

            trend.push({

                semester : key,

                cgpa :
                    Number(row[key])

            });

        }

    });

    return trend;

}



/************************************************
  PLACEMENT PROBABILITY MODEL
************************************************/

function placementProbabilityModel(student){

    const analytics =
        buildStudentAnalytics(student);

    return {

        rollNo :
            student.RollNo,

        probability :
            analytics.placement

    };

}