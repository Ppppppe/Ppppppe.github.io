var before_loadtime = new Date().getTime();

window.onload = Pageloadtime;

function Pageloadtime() {
    var aftr_loadtime = new Date().getTime();  
    pgloadtime = (aftr_loadtime - before_loadtime) / 1000;
    document.getElementById("loadtime").innerHTML = "Page load time is <font color='red'><b>" + pgloadtime + "</b></font> Seconds";  
}  

console.log(document.getElementById('history-page'));

console.log(document.location);
if (document.location.pathname == "/") {
    console.log("main-page");
    document.getElementById("main-page").style.color = "red";
}
    // main-page
    
if (document.location.pathname == "/HTML/history.html") {
    console.log("history-page");

    document.getElementById('history-page').style.color = "red";
}