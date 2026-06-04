/************************************************
  BUILD ML FEATURE VECTOR
************************************************/

function buildFeatureVector(student){

    const analytics =
        buildStudentAnalytics(student);

    const indices =
        analytics.indices;

    return {

        academic :
            indices.Academic,

        aptitude :
            indices.Aptitude,

        domain :
            indices.Domain,

        technical :
            indices.Technical,

        softSkill :
            indices.SoftSkill,

        internship :
            indices.Internship,

        attendance :
            indices.Attendance,

        engagement :
            indices.Engagement,

        cgpa :
            indices.CGPA,

        growth :
            indices.Growth

    };

}



/************************************************
  SIMPLE ML PLACEMENT PREDICTION
************************************************/

function predictPlacementProbability(student){

    const f =
        buildFeatureVector(student);

    let score = (

        0.25 * f.academic +

        0.20 * f.aptitude +

        0.15 * f.domain +

        0.10 * f.technical +

        0.10 * f.softSkill +

        0.10 * f.internship +

        0.05 * f.attendance +

        0.05 * f.engagement

    );

    return Math.min(
        100,
        Math.max(0,score)
    );

}



/************************************************
  PLACEMENT CLASSIFICATION
************************************************/

function classifyPlacement(student){

    const probability =
        predictPlacementProbability(student);

    if(probability >= 85){

        return "Highly Placeable";

    }

    if(probability >= 70){

        return "Placement Ready";

    }

    if(probability >= 50){

        return "Moderate Potential";

    }

    return "High Placement Risk";

}



/************************************************
  PERFORMANCE FORECAST
************************************************/

function forecastPerformance(student){

    const analytics =
        buildStudentAnalytics(student);

    const current =
        analytics.indices.CGPA;

    const growth =
        analytics.indices.Growth;

    let future = current;

    if(growth > 0){

        future += 5;

    }
    else if(growth < 0){

        future -= 5;

    }

    return {

        current :
            current,

        predicted :
            future

    };

}



/************************************************
  ML RISK SCORE
************************************************/

function predictRiskScore(student){

    const analytics =
        buildStudentAnalytics(student);

    const indices =
        analytics.indices;

    let risk = 0;


    /********************************************
      ACADEMIC
    ********************************************/

    if(indices.Academic < 60){

        risk += 25;

    }


    /********************************************
      APTITUDE
    ********************************************/

    if(indices.Aptitude < 60){

        risk += 20;

    }


    /********************************************
      ATTENDANCE
    ********************************************/

    if(indices.Attendance < 75){

        risk += 20;

    }


    /********************************************
      DOMAIN
    ********************************************/

    if(indices.Domain < 55){

        risk += 15;

    }


    /********************************************
      INTERNSHIP
    ********************************************/

    if(indices.Internship < 40){

        risk += 10;

    }


    /********************************************
      GROWTH
    ********************************************/

    if(indices.Growth < 0){

        risk += 10;

    }

    return Math.min(risk,100);

}



/************************************************
  ML RISK CLASSIFICATION
************************************************/

function classifyRisk(student){

    const risk =
        predictRiskScore(student);

    if(risk >= 70){

        return "Critical Risk";

    }

    if(risk >= 40){

        return "Moderate Risk";

    }

    return "Low Risk";

}



/************************************************
  STUDENT CLUSTERING
************************************************/

function clusterStudent(student){

    const analytics =
        buildStudentAnalytics(student);

    const score =
        analytics.score360;

    const placement =
        analytics.placement;

    if(score >= 85 && placement >= 85){

        return "Top Performer";

    }

    if(score >= 70){

        return "Placement Ready";

    }

    if(score >= 50){

        return "Average Performer";

    }

    return "At Risk";

}



/************************************************
  DOMAIN SPECIALIZATION PREDICTION
************************************************/

function predictBestDomain(student){

    const domain =
        calculateDomainIndex(
            student.RollNo
        );

    if(domain >= 85){

        return "Core Domain Specialist";

    }

    if(domain >= 70){

        return "Strong Domain Potential";

    }

    if(domain >= 50){

        return "Moderate Domain Readiness";

    }

    return "Domain Improvement Needed";

}



/************************************************
  IMPROVEMENT PRIORITY ENGINE
************************************************/

function identifyWeakestArea(student){

    const analytics =
        buildStudentAnalytics(student);

    const indices =
        analytics.indices;

    let weakest = "";

    let min = 999;

    Object.keys(indices).forEach(key => {

        if(indices[key] < min){

            min = indices[key];

            weakest = key;

        }

    });

    return weakest;

}



/************************************************
  SMART INTERVENTION ENGINE
************************************************/

function smartIntervention(student){

    const weakArea =
        identifyWeakestArea(student);

    switch(weakArea){

        case "Academic":

            return "Provide subject mentoring and remedial coaching.";

        case "Aptitude":

            return "Assign aptitude practice sessions.";

        case "Technical":

            return "Assign coding and project activities.";

        case "SoftSkill":

            return "Conduct communication and presentation training.";

        case "Attendance":

            return "Monitor attendance and mentor engagement.";

        case "Internship":

            return "Recommend internship opportunities.";

        default:

            return "Continuous performance monitoring recommended.";

    }

}



/************************************************
  ML ANALYTICS SUMMARY
************************************************/

function generateMLAnalytics(student){

    return {

        placementProbability :

            predictPlacementProbability(student),

        placementClass :

            classifyPlacement(student),

        riskScore :

            predictRiskScore(student),

        riskClass :

            classifyRisk(student),

        cluster :

            clusterStudent(student),

        domainPrediction :

            predictBestDomain(student),

        intervention :

            smartIntervention(student),

        performanceForecast :

            forecastPerformance(student)

    };

}



/************************************************
  TOP AI PREDICTED STUDENTS
************************************************/

function getTopPredictedStudents(students){

    return students
        .map(student => {

            return {

                student,

                probability :

                    predictPlacementProbability(
                        student
                    )

            };

        })
        .sort(
            (a,b)=>
                b.probability -
                a.probability
        );

}



/************************************************
  HIGH AI RISK STUDENTS
************************************************/

function getHighAIRiskStudents(students){

    return students.filter(student => {

        return (
            predictRiskScore(student) >= 70
        );

    });

}