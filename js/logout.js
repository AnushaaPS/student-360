function logout(){

    localStorage.removeItem(
        "loggedStudent"
    );

    localStorage.removeItem(
        "loggedFaculty"
    );

    window.location.href =
        "index.html";

}