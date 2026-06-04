/************************************************
  HEATMAP COLOR GENERATOR
************************************************/

function getHeatmapColor(value){

    if(value >= 85){

        return "#16a34a";

    }

    if(value >= 70){

        return "#84cc16";

    }

    if(value >= 55){

        return "#eab308";

    }

    if(value >= 40){

        return "#f97316";

    }

    return "#dc2626";

}



/************************************************
  CORRELATION HEATMAP COLOR
************************************************/

function getCorrelationColor(value){

    value = Math.abs(value);

    if(value >= 0.8){

        return "#16a34a";

    }

    if(value >= 0.6){

        return "#84cc16";

    }

    if(value >= 0.4){

        return "#eab308";

    }

    if(value >= 0.2){

        return "#f97316";

    }

    return "#dc2626";

}



/************************************************
  STUDENT PERFORMANCE HEATMAP
************************************************/

function renderStudentPerformanceHeatmap(

    containerId,

    students

){

    const container =
        document.getElementById(
            containerId
        );

    let html = `

    <table>

        <thead>

            <tr>

                <th>Roll No</th>

                <th>Academic</th>

                <th>Domain</th>

                <th>Aptitude</th>

                <th>Technical</th>

                <th>Soft Skills</th>

                <th>Attendance</th>

                <th>360 Score</th>

            </tr>

        </thead>

        <tbody>

    `;


    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        const i =
            analytics.indices;

        html += `

        <tr>

            <td>

                ${student.RollNo}

            </td>

            <td style="background:${getHeatmapColor(i.Academic)}">

                ${i.Academic.toFixed(1)}

            </td>

            <td style="background:${getHeatmapColor(i.Domain)}">

                ${i.Domain.toFixed(1)}

            </td>

            <td style="background:${getHeatmapColor(i.Aptitude)}">

                ${i.Aptitude.toFixed(1)}

            </td>

            <td style="background:${getHeatmapColor(i.Technical)}">

                ${i.Technical.toFixed(1)}

            </td>

            <td style="background:${getHeatmapColor(i.SoftSkill)}">

                ${i.SoftSkill.toFixed(1)}

            </td>

            <td style="background:${getHeatmapColor(i.Attendance)}">

                ${i.Attendance.toFixed(1)}

            </td>

            <td style="background:${getHeatmapColor(analytics.score360)}">

                ${analytics.score360.toFixed(1)}

            </td>

        </tr>

        `;

    });


    html += `

        </tbody>

    </table>

    `;

    container.innerHTML = html;

}



/************************************************
  DEPARTMENT HEATMAP
************************************************/

function renderDepartmentHeatmap(

    containerId,

    students

){

    const container =
        document.getElementById(
            containerId
        );

    const departments =
        departmentAnalysis(students);

    let html = `

    <table>

        <thead>

            <tr>

                <th>Department</th>

                <th>Average Score</th>

            </tr>

        </thead>

        <tbody>

    `;


    Object.keys(departments).forEach(dept => {

        const score =
            departments[dept];

        html += `

        <tr>

            <td>

                ${dept}

            </td>

            <td style="background:${getHeatmapColor(score)}">

                ${score.toFixed(2)}

            </td>

        </tr>

        `;

    });


    html += `

        </tbody>

    </table>

    `;

    container.innerHTML = html;

}



/************************************************
  CORRELATION HEATMAP
************************************************/

function renderCorrelationHeatmap(

    containerId,

    students

){

    const container =
        document.getElementById(
            containerId
        );

    const data =
        generateHeatmapData(students);

    let html = `

    <table>

        <thead>

            <tr>

                <th>Feature Relationship</th>

                <th>Correlation</th>

                <th>Interpretation</th>

            </tr>

        </thead>

        <tbody>

    `;


    data.forEach(item => {

        html += `

        <tr>

            <td>

                ${item.factor}

            </td>

            <td style="background:${getCorrelationColor(item.value)}">

                ${item.value.toFixed(2)}

            </td>

            <td>

                ${interpretCorrelation(item.value)}

            </td>

        </tr>

        `;

    });


    html += `

        </tbody>

    </table>

    `;

    container.innerHTML = html;

}



/************************************************
  RISK HEATMAP
************************************************/

function renderRiskHeatmap(

    containerId,

    students

){

    const container =
        document.getElementById(
            containerId
        );

    let html = `

    <table>

        <thead>

            <tr>

                <th>Roll No</th>

                <th>Name</th>

                <th>Risk Score</th>

                <th>Risk Level</th>

            </tr>

        </thead>

        <tbody>

    `;


    students.forEach(student => {

        const risk =
            predictRiskScore(student);

        const level =
            classifyRisk(student);

        html += `

        <tr>

            <td>

                ${student.RollNo}

            </td>

            <td>

                ${student.Name}

            </td>

            <td style="background:${getHeatmapColor(100-risk)}">

                ${risk.toFixed(1)}

            </td>

            <td>

                ${level}

            </td>

        </tr>

        `;

    });


    html += `

        </tbody>

    </table>

    `;

    container.innerHTML = html;

}



/************************************************
  COURSE PERFORMANCE HEATMAP
************************************************/

function renderCourseHeatmap(

    containerId,

    students

){

    const container =
        document.getElementById(
            containerId
        );

    const courses =
        coursePerformanceAnalysis(
            students
        );

    let html = `

    <table>

        <thead>

            <tr>

                <th>Course</th>

                <th>Average Score</th>

            </tr>

        </thead>

        <tbody>

    `;


    courses.forEach(course => {

        html += `

        <tr>

            <td>

                ${course.courseName}

            </td>

            <td style="background:${getHeatmapColor(course.average)}">

                ${course.average.toFixed(2)}

            </td>

        </tr>

        `;

    });


    html += `

        </tbody>

    </table>

    `;

    container.innerHTML = html;

}



/************************************************
  PERFORMANCE MATRIX
************************************************/

function renderPerformanceMatrix(

    containerId,

    students

){

    const container =
        document.getElementById(
            containerId
        );

    let html = `

    <div class="grid">

    `;


    students.forEach(student => {

        const analytics =
            buildStudentAnalytics(student);

        html += `

        <div class="card"
             style="
                border-left:8px solid
                ${getHeatmapColor(
                    analytics.score360
                )};
             ">

            <h3>

                ${student.Name}

            </h3>

            <p>

                ${student.RollNo}

            </p>

            <p>

                Score:
                ${analytics.score360.toFixed(2)}

            </p>

            <p>

                Placement:
                ${analytics.placement.toFixed(2)}%

            </p>

        </div>

        `;

    });


    html += `

    </div>

    `;

    container.innerHTML = html;

}