// Function that collects the information about the movies running the day the function is called and prints them in a table. 
// The theater in the fuction is the id number of the theater the movies are collected from
function chooseTheater(theater) {
    // new variable for the current date
    var currentDate = new Date();
    // Calls for the current day number and puts it in a decimal form for the variant 
    var day = String(currentDate.getDate()).padStart(2, '0');
    // Calls for the current month number and puts it in a decimal form for the variant 
    var month = String(currentDate.getMonth()+1).padStart(2, '0');
    // Calls for the current year
    var year = currentDate.getFullYear();

    // Variant that formats the day, month and year in a DD.MM.YYYY format, which is a requirement to get the movies for the current date 
    currentDate = day + '.' + month + '.' + year;

    // Creates a variant for the finnkino XML site with the theater id and current date
    var site = 'https://www.finnkino.fi/xml/Schedule/?area=' + theater + '&dt=' + currentDate;
    // Creates an AJAX request
    var xmlHTTP = new XMLHttpRequest();
    // Gets information from the Finnkino site
    xmlHTTP.open("GET", site, true);
    // Handles the response to the request
    xmlHTTP.onreadystatechange=function() {
        // Proceedes if the operation and the response is OK
        if (xmlHTTP.readyState==4 && xmlHTTP.status==200) {
            var xmlDoc = xmlHTTP.responseXML;
            // Gets data from the Finnkino XML with the "Show" tag
            var movieInfo = xmlDoc.getElementsByTagName("Show");
            // Creates a table
            var table = "<table>";
            // Adds cells and rows to the table for each movie and their picture, title, the start and the end of the show, 
            // the production year and the rating pictures. The tags for these are found in the Finnkino XML
            for (var i = 0; i < movieInfo.length; i++) {
                table += '<tr>';
                table += '<td><img src="' + movieInfo[i].getElementsByTagName("EventSmallImagePortrait")[0].innerHTML + '"></td>';
                table += '<td>' + movieInfo[i].getElementsByTagName("Title")[0].innerHTML + '</td>';
                table += '<td>' + movieInfo[i].getElementsByTagName("dttmShowStart")[0].innerHTML + " - " + movieInfo[i].getElementsByTagName("dttmShowEnd")[0].innerHTML + '</td>';
                table += '<td>' + movieInfo[i].getElementsByTagName("ProductionYear")[0].innerHTML + '</td>';
                table += '<td><img src="' + movieInfo[i].getElementsByTagName("RatingImageUrl")[0].innerHTML + '"></td>';
                table += '</tr>';
            }
            table += "</table>";
            // Adds the table in the movieResults div
            document.getElementById('movieResults').innerHTML = table;
        }
    };
    // Sends the request
    xmlHTTP.send();
}