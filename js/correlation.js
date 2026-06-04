/************************************************
  PEARSON CORRELATION FUNCTION
************************************************/

function calculateCorrelation(x,y){

    const n = x.length;

    if(n === 0){

        return 0;

    }

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    let sumY2 = 0;

    for(let i=0; i<n; i++){

        sumX += x[i];

        sumY += y[i];

        sumXY += x[i] * y[i];

        sumX2 += x[i] * x[i];

        sumY2 += y[i] * y[i];

    }

    let numerator =

        (n * sumXY) -
        (sumX * sumY);

    let denominator = Math.sqrt(

        ((n * sumX2) - (sumX * sumX)) *

        ((n * sumY2) - (sumY * sumY))

    );

    if(denominator === 0){

        return 0;

    }

    return numerator / denominator;

}



/************************************************
  ATTENDANCE VS PERFORMANCE
************************************************/

function attendancePerformanceCorrelation(students){

    let attendance = [];
    let performance = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        attendance.push(

            analytics.indices.Attendance

        );

        performance.push(

            analytics.score360

        );

    });

    return calculateCorrelation(

        attendance,

        performance

    );

}



/************************************************
  APTITUDE VS PLACEMENT
************************************************/

function aptitudePlacementCorrelation(students){

    let aptitude = [];
    let placement = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        aptitude.push(

            analytics.indices.Aptitude

        );

        placement.push(

            analytics.placement

        );

    });

    return calculateCorrelation(

        aptitude,

        placement

    );

}



/************************************************
  BACKGROUND VS CGPA
************************************************/

function backgroundCGPACorrelation(students){

    let background = [];
    let cgpa = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        background.push(

            (

                Number(student.Tenth) +

                Number(student.Twelfth)

            ) / 2

        );

        cgpa.push(

            analytics.indices.CGPA

        );

    });

    return calculateCorrelation(

        background,

        cgpa

    );

}



/************************************************
  DOMAIN VS PLACEMENT
************************************************/

function domainPlacementCorrelation(students){

    let domain = [];
    let placement = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        domain.push(

            analytics.indices.Domain

        );

        placement.push(

            analytics.placement

        );

    });

    return calculateCorrelation(

        domain,

        placement

    );

}



/************************************************
  TECHNICAL VS PLACEMENT
************************************************/

function technicalPlacementCorrelation(students){

    let technical = [];
    let placement = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        technical.push(

            analytics.indices.Technical

        );

        placement.push(

            analytics.placement

        );

    });

    return calculateCorrelation(

        technical,

        placement

    );

}



/************************************************
  SOFT SKILLS VS PLACEMENT
************************************************/

function softSkillPlacementCorrelation(students){

    let soft = [];
    let placement = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        soft.push(

            analytics.indices.SoftSkill

        );

        placement.push(

            analytics.placement

        );

    });

    return calculateCorrelation(

        soft,

        placement

    );

}



/************************************************
  INTERNSHIP VS PLACEMENT
************************************************/

function internshipPlacementCorrelation(students){

    let internship = [];
    let placement = [];

    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        internship.push(

            analytics.indices.Internship

        );

        placement.push(

            analytics.placement

        );

    });

    return calculateCorrelation(

        internship,

        placement

    );

}



/************************************************
  CORRELATION INTERPRETATION
************************************************/

function interpretCorrelation(value){

    value = Math.abs(value);

    if(value >= 0.8){

        return "Very Strong Correlation";

    }

    if(value >= 0.6){

        return "Strong Correlation";

    }

    if(value >= 0.4){

        return "Moderate Correlation";

    }

    if(value >= 0.2){

        return "Weak Correlation";

    }

    return "Very Weak Correlation";

}



/************************************************
  COMPLETE CORRELATION MATRIX
************************************************/

function generateCorrelationMatrix(students){

    return {

        attendancePerformance : {

            value :

                attendancePerformanceCorrelation(
                    students
                ),

            interpretation :

                interpretCorrelation(

                    attendancePerformanceCorrelation(
                        students
                    )

                )

        },



        aptitudePlacement : {

            value :

                aptitudePlacementCorrelation(
                    students
                ),

            interpretation :

                interpretCorrelation(

                    aptitudePlacementCorrelation(
                        students
                    )

                )

        },



        backgroundCGPA : {

            value :

                backgroundCGPACorrelation(
                    students
                ),

            interpretation :

                interpretCorrelation(

                    backgroundCGPACorrelation(
                        students
                    )

                )

        },



        domainPlacement : {

            value :

                domainPlacementCorrelation(
                    students
                ),

            interpretation :

                interpretCorrelation(

                    domainPlacementCorrelation(
                        students
                    )

                )

        },



        technicalPlacement : {

            value :

                technicalPlacementCorrelation(
                    students
                ),

            interpretation :

                interpretCorrelation(

                    technicalPlacementCorrelation(
                        students
                    )

                )

        },



        softSkillPlacement : {

            value :

                softSkillPlacementCorrelation(
                    students
                ),

            interpretation :

                interpretCorrelation(

                    softSkillPlacementCorrelation(
                        students
                    )

                )

        },



        internshipPlacement : {

            value :

                internshipPlacementCorrelation(
                    students
                ),

            interpretation :

                interpretCorrelation(

                    internshipPlacementCorrelation(
                        students
                    )

                )

        }

    };

}



/************************************************
  CORRELATION HEATMAP DATA
************************************************/

function generateHeatmapData(students){

    const matrix =
        generateCorrelationMatrix(students);

    return [

        {

            factor :
                "Attendance vs Performance",

            value :
                matrix.attendancePerformance.value

        },

        {

            factor :
                "Aptitude vs Placement",

            value :
                matrix.aptitudePlacement.value

        },

        {

            factor :
                "Background vs CGPA",

            value :
                matrix.backgroundCGPA.value

        },

        {

            factor :
                "Domain vs Placement",

            value :
                matrix.domainPlacement.value

        },

        {

            factor :
                "Technical vs Placement",

            value :
                matrix.technicalPlacement.value

        },

        {

            factor :
                "Soft Skills vs Placement",

            value :
                matrix.softSkillPlacement.value

        },

        {

            factor :
                "Internship vs Placement",

            value :
                matrix.internshipPlacement.value

        }

    ];

}