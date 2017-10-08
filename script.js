window.onload = init();

function init(){
  var d = document;
  var searchBtn = d.getElementById("search-btn");
  var closeBtn = d.getElementById("close-btn");
  var searchForm = d.getElementById("search-form");
  searchBtn.addEventListener("click", revealSearch, false);
  closeBtn.addEventListener("click", hideSearch, false);
  searchForm.addEventListener("submit", function(e){
    getData();
    e.preventDefault();
  });
}

function revealSearch(){
  // console.log("here");
  var searchBox = document.getElementById("search-box");
  var searchBtn = document.getElementById("search-btn");
  var closeBtn = document.getElementById("close-btn");
  var randomBtnWrap = document.getElementById("random-btn-wrap");
  searchBox.classList.add("reveal-me");
  searchBtn.classList.add("move-me-right");
  randomBtnWrap.classList.add("move-me-left");
  closeBtn.classList.add("reveal-x","rotate");
  searchBtn.removeEventListener("click", revealSearch, false);
  searchBtn.addEventListener("click", getData, false);
  searchBox.focus();
}

function hideSearch() {
  var searchBox = document.getElementById("search-box");
  var searchBtn = document.getElementById("search-btn");
  var closeBtn = document.getElementById("close-btn");
  var randomBtnWrap = document.getElementById("random-btn-wrap");
  searchBox.classList.remove("reveal-me");
  searchBtn.classList.remove("move-me-right");
  randomBtnWrap.classList.remove("move-me-left");
  closeBtn.classList.remove("reveal-x", "rotate");
  searchBtn.removeEventListener("click", getData, false);
  searchBtn.addEventListener("click", revealSearch, false);
}

function getData() {
  var searchBox = document.getElementById("search-box");
  var searchWrap = document.getElementById("search-wrap");
  var appTitle = document.getElementById("app-title");
  var wikiurl = "http://davidbeczuk.com/fcc/qwiki.php?query="
	var limit = 9;
  var searchTerm = document.getElementById("search-box");
	var query = wikiurl + searchTerm.value + "&limit=" + limit; 
  var myRequest = new Request(query);
  console.log(query);
  
  fetch(myRequest).then(function(response) {
		response.json().then(function(json){
			processData(json);
		});
	});
  appTitle.classList.remove("abs-center");
  searchWrap.classList.add("move-search-wrap");
}

function processData(data) {
  var output = document.getElementById("result");
  output.innerHTML = "";
	console.log(data);
	for(var i=0; i < data.query.search.length; i++) {
		output.innerHTML += "<li class='animate'>" + "<a href='https://en.wikipedia.org/wiki/" + data.query.search[i].title + "' target='_blank'>" + data.query.search[i].title + "<p>" + data.query.search[i].snippet + "</p></a></li>";
	}
}