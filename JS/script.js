// let value = 'michael-jordan.jpg'
// const img1 = document.querySelector('#img1')
// img1.setAttribute('src', value);


const data = null;

const xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

var now = new Date();
var now_str = now.toISOString().slice(0,10);
var yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
var yesterday_str = yesterday.toISOString().slice(0,10);
console.log("yesterday: " + yesterday_str);
console.log("today :    " + now_str)
let q = "https://www.balldontlie.io/api/v1/games?start_date=" + yesterday_str + "&end_date=" + yesterday_str

xhr.open("GET", q);


xhr.send(data);
console.log(data);