// js/theme.js

function applyTheme(){

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme === "light"){

        document.body.classList.add(
            "light-mode"
        );

        const btn =
            document.getElementById(
                "themeToggle"
            );

        if(btn) btn.innerHTML="☀️";
    }
}

function toggleTheme(){

    document.body.classList.toggle(
        "light-mode"
    );

    const isLight =
        document.body.classList.contains(
            "light-mode"
        );

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

    document.dispatchEvent(
        new Event("themeChanged")
    );

    const btn =
        document.getElementById(
            "themeToggle"
        );

    if(btn){

        btn.innerHTML =
            isLight ? "☀️" : "🌙";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        applyTheme();

        const btn =
            document.getElementById(
                "themeToggle"
            );

        if(btn){

            btn.addEventListener(
                "click",
                toggleTheme
            );
        }
    }
);
