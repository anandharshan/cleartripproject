//templating
var source   = document.getElementById("entry-template").innerHTML;
Handlebars.registerHelper ("flighticonhelper", function (aln) {
   if (aln == "Air India") {
       return "air" ;
   }
   else if (aln == "SpiceJet" || aln=="JetKonnect" || aln=="Jet Airways") {
       return "kf" ;
   }
   else if (aln == "IndiGo") {
       return "indigo" ;
   }
   else if (aln == "GoAir"){
       return "go" ;
   }
}); 
var template = Handlebars.compile(source);
renderFlightsDetails(jsonobj.FLIGHTS);

function renderFlightsDetails(flightDetailsArray){
	var htmlConstruct = template(flightDetailsArray);
	document.getElementById("trip1-list").innerHTML = htmlConstruct;
	document.getElementById("trip2-list").innerHTML = htmlConstruct;
	makeDefaultSelection();
}

AddEvent(document.getElementById("filterbutton"),"click",showandhidefiltersection);
AddEvent(document.getElementById("applyFilter"),"click",filterAndRender);
AddEvent(document.getElementById("trip1-list"),"click",changetoandfro); 
AddEvent(document.getElementById("trip2-list"),"click",changetoandfro); 

function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function changetoandfro(ev){
	//var target = ev.target || ev.srcElement;
	setClassOfselectDiv(ev);
	calculateAndChangeTotal();
}

function calculateAndChangeTotal(){
	var farebefore = document.getElementById("totalfare").value;
	var totalfare = 0, toFare=0, froFare=0 ;
	var toTrip = getElementsByClassName(document.getElementById("trip1-list"),"selected");
	var froTrip = getElementsByClassName(document.getElementById("trip2-list"),"selected");
	if(toTrip[0] != undefined){
		toFare = toTrip[0].getElementsByClassName("fare")[0].textContent;
	}
	if(froTrip[0] != undefined){
		froFare = froTrip[0].getElementsByClassName("fare")[0].textContent;	
	}
	totalfare = parseInt(toFare) +  parseInt(froFare) ;
	document.getElementById("totalfare").textContent = "Rs. " + totalfare;
}

function makeDefaultSelection(){
	document.getElementById("trip1-list").childNodes[1].className="selected";
	document.getElementById("trip2-list").childNodes[1].className="selected";
	calculateAndChangeTotal();
}

function setClassOfselectDiv(ev){
var target = ev.target || ev.srcElement;
var sourceElementClass = target.className;
if(target.id == "trip1-list" || target.id == "trip1-list"){
	return false;
}
var selecteddivs = getElementsByClassName(ev.currentTarget,"selected");
if(selecteddivs.length != 0){selecteddivs[0].className = "";}
if(target.tagName == "LI"){
	if(target.className.indexOf("selected")== -1)
		{target.className += "selected";}
}
else if(sourceElementClass == "flight-details" || sourceElementClass == "trip-fare" || sourceElementClass == "fare" || sourceElementClass == "departs" || sourceElementClass == "arrives" || sourceElementClass == "cb" || (sourceElementClass.indexOf("flight-icons")!= -1)){
	if(target.parentNode.className.indexOf("selected")== -1){
		target.parentNode.className += "selected";
	} 
}
else if(sourceElementClass == "time" || sourceElementClass == "name" ||sourceElementClass == "duration" ||sourceElementClass == "cbid"){
	if(target.parentNode.parentNode.className.indexOf("selected")== -1){
		target.parentNode.parentNode.className += "selected"; 
	}
}
}

function covertDatetomillisecs(){
	var date = new Date(2013,11,25,7,15,56);
	var milliseconds = date.getTime();
}

function filterAndRender(){
	renderFlightsDetails(filterFlights());
}

//underscore modules
function filterFlights(){
	var filterfunction = "function test(){ return( _.filter(jsonobj.FLIGHTS, function(flight){ return false"
	if(document.getElementById("AI").checked || document.getElementById("IC").checked || document.getElementById("G8").checked || document.getElementById("6E").checked || document.getElementById("9W").checked || document.getElementById("9W-K").checked || document.getElementById("S2").checked || document.getElementById("IT").checked ||  document.getElementById("IT-RED").checked || document.getElementById("SG").checked ){
	if(document.getElementById("AI").checked){
		filterfunction += "|| flight.aln==\"Air India\"";
	}
	if(document.getElementById("IC").checked){
		filterfunction += "|| flight.aln==\"Air India IC\"";
	}
	if(document.getElementById("G8").checked){
		filterfunction += "|| flight.aln==\"GoAir\"";
	}
	if(document.getElementById("6E").checked){
		filterfunction += "|| flight.aln==\"IndiGo\"";
	}
	if(document.getElementById("9W").checked){
		filterfunction += "|| flight.aln==\"Jet Airways\"";
	}
	if(document.getElementById("9W-K").checked){
		filterfunction += "|| flight.aln==\"Jet Airways Konnect\"";
	}
	if(document.getElementById("S2").checked){
		filterfunction += "|| flight.aln==\"JetLite\"";
	}
	if(document.getElementById("IT").checked){
		filterfunction += "|| flight.aln==\"Kingfisher\"";
	}
	if(document.getElementById("IT-RED").checked){
		filterfunction += "|| flight.aln==\"Kingfisher Red\"";
	}
	if(document.getElementById("SG").checked){
		filterfunction += "|| flight.aln==\"SpiceJet\"";
	}
	}else{
		filterfunction += "|| flight ";
	}
	filterfunction += "; }))}";
	eval(filterfunction);
	var flightresult = test();
	return flightresult;
}

_.chain(flightresult).filter( function(flight){ return false|| flight.aln=="Air India"|| flight.aln=="Air India IC"|| flight.aln=="GoAir"|| flight.aln=="IndiGo"|| flight.aln=="Jet Airways"|| flight.aln=="SpiceJet"; }).sortBy(function(flightresult){ return parseInt(flightresult.pr)}).value();
