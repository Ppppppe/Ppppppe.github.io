var before_loadtime = new Date().getTime();

function OnLoadFuncs() {
    pageLoadTime();
    lightsUpNavigation();
}

function pageLoadTime() {
    var aftr_loadtime = new Date().getTime();  
    pgloadtime = (aftr_loadtime - before_loadtime) / 1000;
    document.getElementById("loadtime").innerHTML = "Page load time is <font color='red'><b>" + pgloadtime + "</b></font> Seconds";  
}  

function lightsUpNavigation() {
    console.log(document.location.pathname.slice(1));

    let nav = document.querySelector("#nav_to_light_up");
    console.log(nav);

    for (let i = 0; i < nav.getElementsByClassName("rim-navigation-item").length; i++) {
        let a = nav.getElementsByClassName("rim-navigation-item")[i];
        // console.log(a.getAttribute("href"));
        if (a.getAttribute("href") == document.location.pathname.slice(1)) {
            a.classList.add("rim-navigation-item_active");
        }
    }
}

window.onload = OnLoadFuncs;
console.log(" : ) ");