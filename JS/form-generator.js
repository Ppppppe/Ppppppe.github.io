

function get_url_games_by_date(date){
    let date_str = date;
	// let yesterday = new Date();
	// yesterday.setDate(yesterday.getDate() - 1);
	// let date_str = yesterday.toISOString().slice(0,10);
	// console.log(date_str)
	let url = "https://www.balldontlie.io/api/v1/games?start_date=" + date_str + "&end_date=" + date_str;
    let url1 = "https://www.balldontlie.io/api/v31";
	return url;
}

function pause() {  
    return new Promise((res) => setTimeout(res, 2000));
}

async function get_games(date, isNoConnection){
    let noConnection = document.getElementById("no-connection");
    let preloader = document.getElementById("preloader");
    preloader.style.display = "block";
    noConnection.style.display = "none";
    await pause();
	
	let response = await fetch(get_url_games_by_date(date));

    preloader.style.display = "none";

	if ((response.ok) && (!isNoConnection)) {
        let json = await response.json();
        toastr.success("Расписание успешно загрузилось  :)");
        // console.log(json.data);
        return json.data;
	} else {
        toastr.error("С вашим соединением что-то не так((");
        // alert("Ошибка HTTP: " + response.status);
        noConnection.style.display = "block";
	}
}

function get_cell_1(text){
    let a = document.createElement('div');
    a.classList.add("timetable-hometeam");
    a.classList.add("borderElement");
    a.classList.add("borderElement__purple");
    a.classList.add("sports-team-name");
    a.textContent = text;
    return a;
}
function get_cell_2(text){
    let a = document.createElement('div');
    a.classList.add("timetable-guest");
    a.classList.add("borderElement");
    a.classList.add("borderElement__purple");
    a.classList.add("sports-team-name");
    a.textContent = text;
    return a;
}
function get_cell_3(text){
    let a = document.createElement('div');
    a.classList.add("timetable-hometeam-score");
    a.classList.add("borderElement");
    a.classList.add("borderElement__orange");
    let b = document.createElement('p');
    b.textContent = text;
    a.appendChild(b);
    return a;
}

function get_cell_4(text){
    let a = document.createElement('div');
    a.classList.add("timetable-guest-score");
    a.classList.add("borderElement");
    a.classList.add("borderElement__orange");
    let b = document.createElement('p');
    b.textContent = text;
    a.appendChild(b);
    return a;
}

function get_cell_overtime(text){
    let a = document.createElement('div');
    a.classList.add("timetable-overtime");
    a.classList.add("borderElement");
    a.classList.add("borderElement__light");
    a.textContent = text;
    return a;
}

function generate(date, num, noConnection, showOvertime) {
    let games;
    let divForTable = document.getElementById("generated-form");
    divForTable.removeChild(divForTable.firstChild);
    get_games(date, noConnection).then((res) => {
        games = res;

        let grid_conteiner = document.createElement('div');
        grid_conteiner.classList.add("timetable");
        grid_conteiner.classList.add("cell-text");
        console.log(games);
        if (games != null) {
            if (games.length == 0) {
                grid_conteiner.appendChild(get_cell_1("Игр нет"));
            }
            else {
                for (let i = 0; (i < games.length & (i < num)); i++) {
                    grid_conteiner.appendChild(get_cell_1(games[i].home_team.full_name));
                    grid_conteiner.appendChild(get_cell_3(games[i].home_team_score));
                    grid_conteiner.appendChild(get_cell_4(games[i].visitor_team_score));
                    grid_conteiner.appendChild(get_cell_2(games[i].visitor_team.full_name));
                    if ((games[i].period > 4) && (showOvertime)) {
                        grid_conteiner.appendChild(get_cell_overtime((games[i].period - 4 + "OT")));
                    }
                }
            }
        }

        // let divForTable = document.getElementById("generated-form");
        // divForTable.removeChild(divForTable.firstChild);
        divForTable.appendChild(grid_conteiner);
    });
}  


function generate_form() {
    generate(
        document.getElementById("date-of-games").value, 
        document.getElementById("number-of-games").value, 
        document.getElementById("show-no-connection").checked, 
        document.getElementById("show-overtime").checked
    );
}

function setLocalValues() {

    let inputFields = document.getElementsByTagName("input");
    for (const iterator of inputFields) {
        if (iterator.type == "submit")
            continue;
        let storageValue = localStorage.getItem(iterator.id);
        if (iterator.type == "checkbox")
            iterator.checked = (storageValue === 'true');
        else
            iterator.value = storageValue;
    }
}

function saveLocalValues() {
    let inputFields = document.getElementsByTagName("input");

    for (const iterator of inputFields) {
        localStorage.setItem(iterator.id, iterator.type == "checkbox" ? iterator.checked : iterator.value);
    }
}