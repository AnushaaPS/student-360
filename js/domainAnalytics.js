/************************************************
  GET COURSE DOMAIN MAP
************************************************/

function getCourseDomainMap(){

    return GLOBAL_DATA
        .COURSE_DOMAIN_MAP || [];

}



/************************************************
  GET STUDENT COURSE DATA
************************************************/

function getStudentCourseData(rollNo){

    const internals =
        GLOBAL_DATA
        .COURSE_INTERNALS || [];

    const endSem =
        GLOBAL_DATA
        .COURSE_ENDSEM || [];


    let courses = [];


    internals.forEach(course => {

        if(course.RollNo == rollNo){

            const endData =
                endSem.find(e =>

                    e.RollNo ==
                        rollNo

                    &&

                    e.CourseCode ==
                        course.CourseCode

                );


            let internalAvg = (

                Number(course.Cycle1 || 0)

                +

                Number(course.Cycle2 || 0)

                +

                Number(course.Assignment || 0)

                +

                Number(course.Model || 0)

                +

                Number(course.Lab || 0)

            ) / 5;


            let endScore =
                convertGradeToScore(

                    endData
                    ?
                    endData.EndSemGrade
                    :
                    "B"

                );


            let finalScore = (

                internalAvg * 0.4

                +

                endScore * 0.6

            );


            courses.push({

                CourseCode :
                    course.CourseCode,

                CourseName :
                    course.CourseName,

                Score :
                    finalScore

            });

        }

    });

    return courses;

}



/************************************************
  GRADE TO NUMERIC SCORE
************************************************/

function convertGradeToScore(grade){

    const gradeMap = {

        "O"  : 95,

        "A+" : 90,

        "A"  : 85,

        "B+" : 80,

        "B"  : 75,

        "C"  : 65,

        "U"  : 40

    };

    return gradeMap[grade] || 60;

}



/************************************************
  CALCULATE DOMAIN SCORES
************************************************/

function calculateDomainScores(rollNo){

    const courseMap =
        getCourseDomainMap();

    const studentCourses =
        getStudentCourseData(rollNo);


    let domainScores = {};


    studentCourses.forEach(course => {

        const mapping =
            courseMap.find(m =>

                m.CourseCode ==
                    course.CourseCode

            );


        if(mapping){

            const domain =
                mapping.Domain;

            const weight =
                Number(
                    mapping.DomainWeight
                );


            const weightedScore =
                course.Score * weight;


            if(!domainScores[domain]){

                domainScores[domain] = 0;

            }

            domainScores[domain] +=
                weightedScore;

        }

    });


    return domainScores;

}



/************************************************
  GET TOP DOMAINS
************************************************/

function getTopDomains(rollNo, limit=3){

    const scores =
        calculateDomainScores(rollNo);


    let sorted = Object.entries(scores)

        .sort((a,b)=>

            b[1] - a[1]

        )

        .slice(0,limit);


    return sorted.map(item => ({

        domain : item[0],

        score  : item[1]

    }));

}



/************************************************
  GET BEST DOMAIN
************************************************/

function getBestDomain(rollNo){

    const top =
        getTopDomains(
            rollNo,
            1
        );

    if(top.length > 0){

        return top[0].domain;

    }

    return "General";

}



/************************************************
  GET DOMAIN READINESS
************************************************/

function getDomainReadiness(rollNo){

    const topDomains =
        getTopDomains(
            rollNo,
            3
        );


    return topDomains.map(d => {

    const level =
        getThresholdLabel(

            "Domain",

            Number(d.score)

        );

    return {

        domain :
            d.domain,

        score :
            Number(
                d.score
            ).toFixed(2),

        readiness :
            level

    };

});

}



/************************************************
  RENDER DOMAIN ANALYTICS
************************************************/

function renderDomainAnalytics(rollNo){

    const container =
        document.getElementById(
            "careerDomainAnalytics"
        );

    if(!container){

        return;

    }


    const domains =
        getDomainReadiness(
            rollNo
        );


    let html = "";


    domains.forEach((d,index)=>{

        html += `

        <div class="analytics-box">

            <h3>

                ${index+1}.
                ${d.domain}

            </h3>

            <p>

                Domain Score:
                ${d.score}

            </p>

            <p>

                Readiness:
                ${d.readiness}

            </p>

        </div>

        `;

    });


    container.innerHTML = html;

}



/************************************************
  DOMAIN DISTRIBUTION
************************************************/

function getDomainDistribution(students){

    let distribution = {};


    students.forEach(student => {

        const domain =
            getBestDomain(
                student.RollNo
            );


        if(!distribution[domain]){

            distribution[domain] = 0;

        }

        distribution[domain]++;

    });


    return distribution;

}



/************************************************
  CREATE DOMAIN DISTRIBUTION CHART
************************************************/

function createDomainDistributionChart(

    canvasID,

    students

){

    const distribution =
        getDomainDistribution(
            students
        );


    const labels =
        Object.keys(distribution);

    const values =
        Object.values(distribution);


    createPieChart(

        canvasID,

        labels,

        values

    );

}



/************************************************
  DOMAIN RECOMMENDATIONS
************************************************/

function getDomainRecommendations(rollNo){

    const domains =
        getTopDomains(
            rollNo,
            3
        );


    return domains.map(d =>

        `Recommended Career Path:
         ${d.domain}`

    );

}