/************************************************
  MAIN RECOMMENDATION ENGINE
************************************************/

function getRecommendations(indices){

    let recommendations = [];

    const academicLabel =
    getThresholdLabel(
        "Academic",
        indices.Academic
    );

const placementLabel =
    getThresholdLabel(
        "Placement",
        calculatePlacementReadiness(indices)
    );

const domainLabel =
    getThresholdLabel(
        "Domain",
        indices.Domain
    );

    /********************************************
      ACADEMIC RECOMMENDATIONS
    ********************************************/

    if(

    academicLabel === "Critical"

    ||

    academicLabel === "Needs Improvement"

){

    recommendations.push(

        "Improve academic performance by focusing on weak subjects."

    );

}

    if(

    indices.CGPA

    <

    getConfigValue("CGPA")

){

        recommendations.push(

            "Increase semester CGPA through consistent preparation."

        );

    }


    /********************************************
      ATTENDANCE RECOMMENDATIONS
    ********************************************/

    if(

    indices.Attendance

    <

    getConfigValue("Attendance")

){

        recommendations.push(

            "Attendance is below required threshold. Improve class participation."

        );

    }


    /********************************************
      DOMAIN RECOMMENDATIONS
    ********************************************/

    if(

    domainLabel === "Beginner"

){

    recommendations.push(

        "Strengthen core domain knowledge through projects, certifications and practical learning."

    );

}


    /********************************************
      APTITUDE RECOMMENDATIONS
    ********************************************/

    if(

    indices.Aptitude

    <

    getConfigValue("Aptitude")

){

        recommendations.push(

            "Practice aptitude daily to improve placement readiness."

        );

    }


    /********************************************
      TECHNICAL SKILL RECOMMENDATIONS
    ********************************************/

    if(

    indices.Technical

    <

    getConfigValue("Technical")

){

        recommendations.push(

            "Improve programming and technical skills through coding practice."

        );

    }


    /********************************************
      INTERNSHIP RECOMMENDATIONS
    ********************************************/

    if(

    indices.Internship

    <

    getConfigValue("Internship")

){

        recommendations.push(

            "Apply for internships to improve industry exposure."

        );

    }


    /********************************************
      SOFT SKILL RECOMMENDATIONS
    ********************************************/

    if(

    indices.SoftSkill

    <

    getConfigValue("SoftSkill")

){

        recommendations.push(

            "Improve communication and leadership skills through presentations and group activities."

        );

    }


    /********************************************
      ENGAGEMENT RECOMMENDATIONS
    ********************************************/

    if(

    indices.Engagement

    <

    getConfigValue("Engagement")

){

        recommendations.push(

            "Participate in hackathons, paper presentations, and club activities."

        );

    }


    /********************************************
      GROWTH RECOMMENDATIONS
    ********************************************/

    if(

    indices.Growth

    <

    getConfigValue("GrowthDecline")

){

        recommendations.push(

            "Your academic growth trend is declining. Focus on continuous improvement."

        );

    }


    /********************************************
      HIGH PERFORMANCE SUGGESTIONS
    ********************************************/

    if(

    indices.Academic

    >

    getConfigValue("AcademicHigh")

    &&

    indices.Technical

    >

    getConfigValue("TechnicalHigh")

){

        recommendations.push(

            "Excellent performance. Focus on research projects and advanced certifications."

        );

    }


    /********************************************
      PLACEMENT READINESS
    ********************************************/

    const placementScore =
        calculatePlacementReadiness(indices);

    if(

    placementLabel === "Not Ready"

    ||

    placementLabel === "Emerging"

){

    recommendations.push(

        "Improve placement readiness through aptitude practice, coding exercises and mock interviews."

    );

}


    /********************************************
      FINAL DEFAULT MESSAGE
    ********************************************/

    if(recommendations.length === 0){

        recommendations.push(

            "Excellent overall performance. Maintain consistency and continue skill development."

        );

    }

    return recommendations;

}



/************************************************
  DOMAIN CAREER SUGGESTIONS
************************************************/

function getDomainCareerSuggestion(domainScore){

    const label =
        getThresholdLabel(

            "Domain",

            domainScore

        );

    switch(label){

        case "Advanced":

            return "Strong domain expertise detected. Suitable for core industry roles.";

        case "Intermediate":

            return "Good domain understanding. Continue advanced learning.";

        default:

            return "Domain knowledge requires improvement.";

    }

}



/************************************************
  PLACEMENT READINESS MESSAGE
************************************************/

function getPlacementMessage(score){

    return getThresholdLabel(

        "Placement",

        score

    );

}



/************************************************
  RISK MESSAGE
************************************************/

function getRiskMessage(riskLevel){

    return riskLevel;

}



/************************************************
  SUBJECT IMPROVEMENT SUGGESTION
************************************************/

function getSubjectSuggestion(gap){

    const highGap =
        getConfigValue(
            "SubjectGapHigh"
        );

    const lowGap =
        getConfigValue(
            "SubjectGapLow"
        );

    if(gap > highGap){

        return "Focus on end semester exam preparation.";

    }

    if(gap < lowGap){

        return "Good consistency between internal and end semester performance.";

    }

    return "Moderate improvement required.";

}



/************************************************
  GROWTH MESSAGE
************************************************/

function getGrowthMessage(growth){

    if(growth > 0){

        return "Positive growth trend detected.";

    }

    if(growth < 0){

        return "Negative growth trend detected.";

    }

    return "Stable academic trend.";

}