

function get_url_games_by_date(date){
    let date_str = date;
	// let yesterday = new Date();
	// yesterday.setDate(yesterday.getDate() - 1);
	// let date_str = yesterday.toISOString().slice(0,10);
	// console.log(date_str)
	let url = "https://www.balldontlie.io/api/v1/games?start_date=" + date_str + "&end_date=" + date_str
	return url;
}

function pause2s() {  
    return new Promise((res) => setTimeout(res, 2000));
}

async function get_games(date){

    // await pause2s();
	
	let response = await fetch(get_url_games_by_date(date));

	if (response.ok) {
	  let json = await response.json();
	  console.log(json.data);
      return json.data;
	} else {
	  alert("Ошибка HTTP: " + response.status);
	}
}

function get_cell_1(text){
    let a = document.createElement('div');
    a.classList.add("league-table__team-name");
    a.classList.add("borderElement");
    a.classList.add("borderElement__purple");
    a.classList.add("sports-team-name");
    a.textContent = text;
    return a;
}
function get_cell_2(text){
    let a = document.createElement('div');
    a.classList.add("league-table__total-games-played");
    a.classList.add("borderElement");
    a.classList.add("borderElement__purple");
    a.classList.add("sports-team-name");
    a.textContent = text;
    return a;
}
function get_cell_3(text){
    let a = document.createElement('div');
    a.classList.add("league-table__total-wins");
    a.classList.add("borderElement");
    a.classList.add("borderElement__orange");
    let b = document.createElement('p');
    b.textContent = text;
    // b.classList.add("vertical-align");
    a.appendChild(b);
    return a;
}

function get_cell_4(text){
    let a = document.createElement('div');
    a.classList.add("league-table__total-losses");
    a.classList.add("borderElement");
    a.classList.add("borderElement__orange");
    a.textContent = text;
    return a;
}

function generate(date, num) {
    let games;
    get_games(date).then((res) => {
        games = res;
        console.log(games[0].home_team.city);

        let grid_conteiner = document.createElement('div');
        grid_conteiner.classList.add("league-table");
        grid_conteiner.classList.add("cell-text");

        for (let i = 0; (i < games.length & (i < num)); i++) {
            grid_conteiner.appendChild(get_cell_1(games[i].home_team.full_name));
            grid_conteiner.appendChild(get_cell_2(games[i].visitor_team.full_name));
            grid_conteiner.appendChild(get_cell_3(games[i].home_team_score));
            grid_conteiner.appendChild(get_cell_4(games[i].visitor_team_score));
        }


        let outer_div = document.getElementById("generated-form");
        outer_div.removeChild(outer_div.firstChild);
        outer_div.appendChild(grid_conteiner);
    });
}  


function generate_form(A) {
    generate(document.querySelector("#date-of-games").value, document.querySelector("#number-of-games").value);
}