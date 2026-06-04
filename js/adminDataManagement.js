/************************************************
  DOWNLOAD STUDENT TEMPLATE
************************************************/

function downloadStudentTemplate(){

    const data = [

        {

            RollNo : "22UCS113",

            Name : "Anushaa",

            Dept : "CSE",

            Year : "IV",

            Section : "C",

            Gender : "Female",

            DOB : "11-04-2005",

            FacultyID : "FAC001",

            Tenth : 91.2,

            Twelfth : 87.5,

            Email : "anushaa110405@gmail.com",

            Mobile : "9994299140",

            Password : "Anushaa1145#",

            Status : "Active"

        }

    ];

    exportTemplate(
        data,
        "Student_Template"
    );
}



/************************************************
  DOWNLOAD FACULTY TEMPLATE
************************************************/

function downloadFacultyTemplate(){

    const data = [

        {

            FacultyID : "FAC003",

            Name : "Alwyn",

            Dept : "CSE",

            Password : "Alwyn@123",

            Role : "Chairperson",

            Year : "IV",

            Section : "C",

            Status : "Active"

        }

    ];

    exportTemplate(
        data,
        "Faculty_Template"
    );
}



/************************************************
  DOWNLOAD COURSE TEMPLATE
************************************************/

function downloadCourseTemplate(){

    const data = [

        {

            RollNo : "22UCS113",

            Semester : 5,

            CourseCode : "CS2201",

            CourseName : "NLP"

        },

        {

            RollNo : "22UCS113",

            Semester : 5,

            CourseCode : "CS2202",

            CourseName : "ML"

        }

    ];

    exportTemplate(
        data,
        "Course_Template"
    );
}



/************************************************
  DOWNLOAD DOMAIN TEMPLATE
************************************************/

function downloadDomainTemplate(){

    const data = [

        {

            CourseCode : "EC301",

            CourseName : "DSP",

            Domain : "Signal Processing",

            DomainWeight : 0.3

        },

        {

            CourseCode : "EC302",

            CourseName : "VLSI",

            Domain : "VLSI",

            DomainWeight : 0.2

        }

    ];

    exportTemplate(
        data,
        "Domain_Mapping_Template"
    );

    alert(
`NOTE:

Domain Weight ranges from 0 - 1

Examples:
0.1 = Low Relevance
0.5 = Medium Relevance
1.0 = High Relevance`
    );
}



/************************************************
  EXPORT TEMPLATE
************************************************/

function exportTemplate(data,fileName){

    const worksheet = XLSX.utils.json_to_sheet(
        data
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,

        worksheet,

        "Template"

    );

    XLSX.writeFile(

        workbook,

        `${fileName}.xlsx`

    );

}



/************************************************
  READ XLSX FILE
************************************************/

function readExcelFile(file,callback){

    const reader =
        new FileReader();

    reader.onload = function(e){

        const data =
            new Uint8Array(
                e.target.result
            );

        const workbook =
            XLSX.read(data,{

                type : "array"

            });

        const sheetName =
            workbook.SheetNames[0];

        const worksheet =
            workbook.Sheets[sheetName];

        const json =
            XLSX.utils.sheet_to_json(
                worksheet
            );

        callback(json);

    };

    reader.readAsArrayBuffer(file);

}



/************************************************
  UPLOAD STUDENT DATA
************************************************/

async function uploadStudentData(){

    const file =
        document.getElementById(
            "studentUpload"
        ).files[0];

    if(!file){

        alert(
            "Select Student XLSX"
        );

        return;

    }


    readExcelFile(file, async function(data){

        try{

            const response =
                await fetch(API_URL,{

                    method : "POST",

                    body : JSON.stringify({

                        action :
                            "saveStudentData",

                        data : data

                    })

                });

            const result =
                await response.json();

            alert(result.message);

            await fetchAllData();

        }
        catch(error){

            console.error(error);

            alert(
                "Upload Failed"
            );

        }

    });

}


/************************************************
  UPLOAD FACULTY DATA
************************************************/

async function uploadFacultyData(){

    const file =
        document.getElementById(
            "facultyUpload"
        ).files[0];

    if(!file){

        alert(
            "Select Faculty XLSX"
        );

        return;

    }


    readExcelFile(file, async function(data){

        try{

            const response =
                await fetch(API_URL,{

                    method : "POST",

                    body : JSON.stringify({

                        action :
                            "saveFacultyData",

                        data : data

                    })

                });

            const result =
                await response.json();

            alert(result.message);

            await fetchAllData();

        }
        catch(error){

            console.error(error);

            alert(
                "Upload Failed"
            );

        }

    });

}



/************************************************
  UPLOAD COURSE DATA
************************************************/

async function uploadCourseData(){

    const file =
        document.getElementById(
            "courseUpload"
        ).files[0];

    if(!file){

        alert(
            "Select Course XLSX"
        );

        return;

    }


    readExcelFile(file, async function(data){

        try{

            const response =
                await fetch(API_URL,{

                    method : "POST",

                    body : JSON.stringify({

                        action :
                            "saveCourseData",

                        data : data

                    })

                });

            const result =
                await response.json();

            alert(result.message);

            await fetchAllData();

        }
        catch(error){

            console.error(error);

            alert(
                "Upload Failed"
            );

        }

    });

}



/************************************************
  UPLOAD DOMAIN DATA
************************************************/

async function uploadDomainData(){

    const file =
        document.getElementById(
            "domainUpload"
        ).files[0];

    if(!file){

        alert(
            "Select Domain XLSX"
        );

        return;

    }


    readExcelFile(file, async function(data){

        try{

            const response =
                await fetch(API_URL,{

                    method : "POST",

                    body : JSON.stringify({

                        action :
                            "saveDomainData",

                        data : data

                    })

                });

            const result =
                await response.json();

            alert(result.message);

            await fetchAllData();

        }
        catch(error){

            console.error(error);

            alert(
                "Domain Upload Failed"
            );

        }

    });

}



/************************************************
  ADD ENGAGEMENT EVENT
************************************************/

async function addEngagementEvent(){

    const eventName =
        document.getElementById(
            "eventName"
        ).value.trim();

    const marks =
        Number(

            document.getElementById(
                "eventMarks"
            ).value

        );


    if(!eventName || !marks){

        alert(
            "Enter Event Details"
        );

        return;

    }


    try{

        const response =
            await fetch(API_URL,{

                method : "POST",

                body : JSON.stringify({

                    action :
                        "addEngagementEvent",

                    eventName :
                        eventName,

                    marks :
                        marks

                })

            });

        const result =
            await response.json();

        alert(result.message);

        await fetchAllData();


        /************************************
          CLEAR INPUTS
        ************************************/

        document.getElementById(
            "eventName"
        ).value = "";

        document.getElementById(
            "eventMarks"
        ).value = "";

    }
    catch(error){

        console.error(error);

        alert(
            "Failed To Add Event"
        );

    }

}

/************************************************
  UPDATE ENGAGEMENT EVENT
************************************************/

async function updateEngagementEvent(
    eventName
){

    const marks =
        document.getElementById(
            `mark_${eventName}`
        ).value;


    try{

        const response =
            await fetch(API_URL,{

                method : "POST",

                body : JSON.stringify({

                    action :
                        "updateEngagementEvent",

                    eventName :
                        eventName,

                    marks :
                        marks

                })

            });

        const result =
            await response.json();

        alert(result.message);

        await fetchAllData();

        loadEngagementEvents();

    }
    catch(error){

        console.error(error);

    }

}



/************************************************
  DELETE ENGAGEMENT EVENT
************************************************/

async function deleteEngagementEvent(
    eventName
){

    const confirmDelete =
        confirm(

            `Delete ${eventName} ?`

        );

    if(!confirmDelete) return;


    try{

        const response =
            await fetch(API_URL,{

                method : "POST",

                body : JSON.stringify({

                    action :
                        "deleteEngagementEvent",

                    eventName :
                        eventName

                })

            });

        const result =
            await response.json();

        alert(result.message);

        await fetchAllData();

        loadEngagementEvents();

    }
    catch(error){

        console.error(error);

    }

}

/************************************************
 ADD CATEGORY
************************************************/

async function addCategory(){

    const categoryName =
        document
            .getElementById(
                "categoryName"
            )
            .value
            .trim();

    const weight =
        document
            .getElementById(
                "categoryWeight"
            )
            .value;

    const enabled =
        document
            .getElementById(
                "categoryEnabled"
            )
            .value;


    if(
        !categoryName ||
        !weight
    ){

        alert(
            "Enter all fields"
        );

        return;

    }


    try{

        const response =
            await fetch(API_URL,{

                method : "POST",

                body : JSON.stringify({

                    action : "addCategory",

                    categoryName :
                        categoryName,

                    weight :
                        weight,

                    enabled :
                        enabled

                })

            });

        const result =
            await response.json();


        alert(result.message);


        if(result.status === "success"){

    /********************************
     REFRESH GLOBAL DATA
    ********************************/

    await fetchAllData();


    /********************************
     RE-RENDER TABLE
    ********************************/

    renderCategoryTable(
        getCategoryConfig()
    );


    /********************************
     CLEAR INPUTS
    ********************************/

    document.getElementById(
        "categoryName"
    ).value = "";

    document.getElementById(
        "categoryWeight"
    ).value = "";


    document.getElementById(
        "categoryEnabled"
    ).value = "Yes";

}

    }
    catch(error){

        console.error(error);

    }

}

/************************************************
 UPDATE CATEGORY
************************************************/

async function updateCategory(
    categoryName
){

    const weight =
        document.getElementById(
            `weight_${categoryName}`
        ).value;

    const enabled =
        document.getElementById(
            `status_${categoryName}`
        ).value;


    try{

        const response =
            await fetch(API_URL,{

                method : "POST",

                body : JSON.stringify({

                    action :
                        "updateCategory",

                    categoryName :
                        categoryName,

                    weight :
                        weight,

                    enabled :
                        enabled

                })

            });

        const result =
            await response.json();

        alert(result.message);

        await fetchAllData();

        renderCategoryTable(
            getCategoryConfig()
        );

    }
    catch(error){

        console.error(error);

    }

}

/************************************************
 DELETE CATEGORY
************************************************/

async function deleteCategory(
    categoryName
){

    const confirmDelete =
        confirm(

            `Delete ${categoryName} ?`

        );

    if(!confirmDelete) return;


    try{

        const response =
            await fetch(API_URL,{

                method : "POST",

                body : JSON.stringify({

                    action :
                        "deleteCategory",

                    categoryName :
                        categoryName

                })

            });

        const result =
            await response.json();

        alert(result.message);

        await fetchAllData();

        renderCategoryTable(
            getCategoryConfig()
        );

    }
    catch(error){

        console.error(error);

    }

}

function searchStudent(){

    const rollNo =
        document.getElementById(
            "searchRollNo"
        ).value.trim();

    const student =
        GLOBAL_DATA.STUDENT_MASTER.find(
            s => s.RollNo === rollNo
        );

    if(!student){

        alert("Student Not Found");

        return;
    }

    renderStudentEditor(student);

}

function renderStudentEditor(student){

    document.getElementById(
        "studentDetailsContainer"
    ).innerHTML = `

    <div class="grid">

        <input value="${student.RollNo}" disabled>

        <input id="stName"
               value="${student.Name}">

        <input id="stDept"
               value="${student.Dept}">

        <input id="stYear"
               value="${student.Year}">

        <input id="stSection"
               value="${student.Section}">

        <input id="stEmail"
               value="${student.Email}">

        <input id="stMobile"
               value="${student.Mobile}">

        <select id="stStatus">

            <option value="Active"
            ${student.Status==="Active"?"selected":""}>

                Active

            </option>

            <option value="Inactive"
            ${student.Status==="Inactive"?"selected":""}>

                Inactive

            </option>

        </select>

        <button
            onclick="updateStudent('${student.RollNo}')">

            Update Student

        </button>

    </div>

    `;
}

function searchFaculty(){

    const facultyID =
        document.getElementById(
            "searchFacultyID"
        ).value.trim();

    const faculty =
        GLOBAL_DATA.FACULTY_MASTER.find(
            f => f.FacultyID === facultyID
        );

    if(!faculty){

        alert("Faculty Not Found");

        return;
    }

    renderFacultyEditor(faculty);

}

function renderFacultyEditor(faculty){

    document.getElementById(
        "facultyDetailsContainer"
    ).innerHTML = `

    <div class="grid">

        <input
            value="${faculty.FacultyID}"
            disabled>

        <input
            id="fcName"
            value="${faculty.Name}">

        <input
            id="fcDept"
            value="${faculty.Dept}">

        <input
            id="fcRole"
            value="${faculty.Role}">

        <input
            id="fcYear"
            value="${faculty.Year}">

        <input
            id="fcSection"
            value="${faculty.Section}">

        <select id="fcStatus">

            <option value="Active"
            ${faculty.Status==="Active"?"selected":""}>
                Active
            </option>

            <option value="Inactive"
            ${faculty.Status==="Inactive"?"selected":""}>
                Inactive
            </option>

        </select>

        <button
            onclick="updateFaculty('${faculty.FacultyID}')">

            Update Faculty

        </button>

    </div>

    `;
}


async function updateStudent(rollNo){

    const response =
        await fetch(API_URL,{
            method:"POST",
            body:JSON.stringify({

                action:"updateStudent",

                rollNo:rollNo,

                name:
                    document.getElementById("stName").value,

                dept:
                    document.getElementById("stDept").value,

                year:
                    document.getElementById("stYear").value,

                section:
                    document.getElementById("stSection").value,

                email:
                    document.getElementById("stEmail").value,

                mobile:
                    document.getElementById("stMobile").value,

                status:
                    document.getElementById("stStatus").value
            })
        });

    const result =
        await response.json();

    alert(result.message);

    await fetchAllData();
}

async function updateFaculty(facultyID){

    const response =
        await fetch(API_URL,{
            method:"POST",
            body:JSON.stringify({

                action:"updateFaculty",

                facultyID:facultyID,

                name:
                    document.getElementById("fcName").value,

                dept:
                    document.getElementById("fcDept").value,

                role:
                    document.getElementById("fcRole").value,

                year:
                    document.getElementById("fcYear").value,

                section:
                    document.getElementById("fcSection").value,

                status:
                    document.getElementById("fcStatus").value
            })
        });

    const result =
        await response.json();

    alert(result.message);

    await fetchAllData();
}

/************************************************
 UPDATE THRESHOLD
************************************************/

async function updateThreshold(index){

    const row =
        GLOBAL_DATA.THRESHOLD_CONFIG[index];

    const minValue =
        document.getElementById(
            `min_${index}`
        ).value;

    const maxValue =
        document.getElementById(
            `max_${index}`
        ).value;

    const label =
        document.getElementById(
            `label_${index}`
        ).value;

    const response =
        await fetch(API_URL,{

            method : "POST",

            body : JSON.stringify({

                action : "updateThreshold",

                metric : row.Metric,

                oldLabel : row.Label,

                minValue : minValue,

                maxValue : maxValue,

                label : label

            })

        });

    const result =
        await response.json();

    alert(result.message);

    await fetchAllData();

    renderThresholds();

}


/************************************************
 DELETE THRESHOLD
************************************************/

async function deleteThreshold(index){

    const row =
        GLOBAL_DATA.THRESHOLD_CONFIG[index];

    if(
        !confirm(
            `Delete ${row.Metric} - ${row.Label}?`
        )
    ){
        return;
    }

    const response =
        await fetch(API_URL,{

            method : "POST",

            body : JSON.stringify({

                action : "deleteThreshold",

                metric : row.Metric,

                label : row.Label

            })

        });

    const result =
        await response.json();

    alert(result.message);

    await fetchAllData();

    renderThresholds();

}


/************************************************
 UPDATE RECOMMENDATION CONFIG
************************************************/

async function updateRecommendationConfig(index){

    const row =
        GLOBAL_DATA.RECOMMENDATION_CONFIG[index];

    const threshold =
        document.getElementById(
            `rec_${index}`
        ).value;

    const response =
        await fetch(API_URL,{

            method : "POST",

            body : JSON.stringify({

                action :
                    "updateRecommendationConfig",

                metric :
                    row.Metric,

                threshold :
                    threshold

            })

        });

    const result =
        await response.json();

    alert(result.message);

    await fetchAllData();

    renderRecommendationConfig();

}

async function addDomain(){

    const domain =
        document.getElementById(
            "newDomain"
        ).value.trim();

    const weight =
        Number(

            document.getElementById(
                "newDomainWeight"
            ).value

        );

    if(!domain){

        alert("Enter Domain");

        return;

    }

    const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"addDomain",

                domain:domain,

                weight:weight

            })

        });

    const result =
        await response.json();

    alert(result.message);

    await fetchAllData();

    renderDomainTable();

}

async function updateDomainWeightUI(domain){

    const weight =
        document.getElementById(

            `domainWeight_${domain}`

        ).value;

    const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"updateDomainWeight",

                domain:domain,

                weight:weight

            })

        });

    const result =
        await response.json();

    alert(result.message);

    await fetchAllData();

    renderDomainTable();

}

async function deleteDomainUI(domain){

    if(!confirm(
        `Delete ${domain}?`
    )) return;

    const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"deleteDomain",

                domain:domain

            })

        });

    const result =
        await response.json();

    alert(result.message);

    await fetchAllData();

    renderDomainTable();

}