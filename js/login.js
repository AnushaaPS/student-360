/***********************************************
  INITIALIZE
************************************************/

window.onload = async function(){

    await fetchAllData();

};



/***********************************************
  SMART LOGIN
************************************************/

function smartLogin(){

    const userID =
        document.getElementById("userID")
        .value
        .trim();

    const password =
        document.getElementById("password")
        .value
        .trim();



    /*******************************************
      STUDENT LOGIN
    *******************************************/

    const student =
GLOBAL_DATA.STUDENT_MASTER.find(
    s =>
    s.RollNo === userID &&
    s.Password === password
);

if(student){

    if(student.Status !== "Active"){

        alert("Your account is inactive. Contact Admin.");

        return;
    }

    localStorage.setItem(
        "loggedStudent",
        JSON.stringify(student)
    );

    window.location.href = "student.html";

    return;
}



    /*******************************************
      FACULTY LOGIN
    *******************************************/

    const faculty =
GLOBAL_DATA.FACULTY_MASTER.find(
    f =>
    f.FacultyID === userID &&
    f.Password === password
);

if(faculty){

    if(faculty.Status !== "Active"){

        alert("Your account is inactive. Contact Admin.");

        return;
    }

    localStorage.setItem(
        "loggedFaculty",
        JSON.stringify(faculty)
    );

    switch(faculty.Role){

        case "Faculty":
            window.location.href = "faculty.html";
            break;

        case "Mentor":
            window.location.href = "mentor.html";
            break;

        case "Chairperson":
            window.location.href = "chairperson.html";
            break;

        case "Admin":
            window.location.href = "admin.html";
            break;

        default:
            alert("Invalid Role");
    }

    return;
}


    /*******************************************
      INVALID LOGIN
    *******************************************/

    alert(
        "Invalid User ID or Password"
    );

}