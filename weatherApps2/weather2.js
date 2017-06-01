/* data link
/searching by city name
"http://api.openweathermap.org/data/2.5/weather?lat=49.422332&lon=20.0332132&APPID=c46a632da27f87f7efe0ff1745ef7149"
"http://api.openweathermap.org/data/2.5/weather?q="+input+"&APPID="+id+""
/searching by coords
"http://api.openweathermap.org/data/2.5/weather?lat="+lat +"&lon="+long+"&APPID="+id+""*/
    

var lat,long,latDisp,longDisp,
    weatherData, json,
    cityName,
    temp,tempC,tempArr,
    currentConditions,icon,backGroudImage,
    date,dateArr,dayArr;
    
var input = document.querySelector("input").value;

var id = "c46a632da27f87f7efe0ff1745ef7149";

var days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

var months = [ "STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"]

var conditions = [
    {
    "description": "bezchmurne niebo",
    "backgrounds": 'img/backgrounds/clear-sky.jpg',
    "icon": "img/icons/png/sunny.png"    
    },
    {
    "description": "pochmurnie",
    "backgrounds": 'img/backgrounds/few-clouds.jpg',
    "icon": "img/icons/png/003-cloudy-4.png"    
    },
    {
    "description": "lekki deszcz",
    "backgrounds": 'img/backgrounds/shower-rain.jpeg',
    "icon": "img/icons/png/038-rain-1.png"    
    },
    {
    "description": "deszczowo",
    "backgrounds": 'img/backgrounds/rain.jpg',
    "icon": "img/icons/png/040-rain.png"    
    },
    {
    "description": "burze",
    "backgrounds": 'img/backgrounds/thunderstorm.jpg',
    "icon": "img/icons/png/041-storm.png"    
    },
    {
    "description": "opady śniegu",
    "backgrounds": 'img/backgrounds/snow.jpg',
    "icon": "img/icons/png/008-snow-1.png"    
    },
    {
    "description": "mgła",
    "backgrounds": 'img/backgrounds/mist.jpg',
    "icon": "img/icons/png/015-clouds-3.png"    
    }   
];
var weatherIconArr = document.querySelectorAll(".weather img");

/*function switchWeather (){
     switch (currentConditions) {
    case 'clear':
        $(weatherIconArr[i]).attr("src", conditions[0].icon );
        $("#description1").html(conditions[0].description);
        backGroudImage = conditions[0].backgrounds;
        break;
    case 'clouds':
        $(weatherIconArr[i]).attr("src", conditions[1].icon );
        $("#description1").html(conditions[1].description);
        backGroudImage = conditions[1].backgrounds;
        break;
    case 'drizzle':
        $(weatherIconArr[i]).attr("src", conditions[2].icon );
        $("#description1").html(conditions[2].description);
        backGroudImage = conditions[2].backgrounds;
        break;
    case 'rain':
        $(weatherIconArr[i]).attr("src", conditions[3].icon );
        $("#description1").html(conditions[3].description);
        backGroudImage = conditions[3].backgrounds;
        break;
    case 'thunderstorm':
        $(weatherIconArr[i]).attr("src", conditions[4].icon );
        $("#description1").html(conditions[4].description);
        backGroudImage = conditions[4].backgrounds;
        break;
    case 'snow':
        $(weatherIconArr[i]).attr("src", conditions[5].icon );
        $("#description1").html(conditions[5].description);
        backGroudImage = conditions[5].backgrounds;
        break;6
    case 'atmosphere':
        $(weatherIconArr[i]).attr("src", conditions[6].icon );
        $("#description1").html(conditions[6].description);
        backGroudImage = conditions[6].backgrounds;
        break;
             
}
};*/

getWeather();   



function getWeather(){ 

function getLocation(){
if (navigator.geolocation){
    
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            latDisp = (Math.round(lat*1000))/1000;
            longDisp = (Math.round(long*1000))/1000;
        
 
    findByCoords();
    findByInput();
             });
        };
   
};

getLocation();

};





    function findByCoords(){                                       
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat +"&lon="+long+"&APPID="+id+"&units=metric&cnt=5",function(json){
            
        console.log(json);
        
        date = json.list[0].dt; 
        var d = new Date();
        var t = new Date(d.getTime()+1000*60*60*24);
        console.log(t);
        
        var day = d.getDay();
        
        var day_number = d.getDate();
        var month_number = d.getMonth() + 1;
        
        var day_name = days[day];
        
        
        $(".date").text(day_number + "." + month_number);
        $(".day").text(day_name);
       
        cityName = json.city.name;
        $("#location").text(cityName);
        temp = json.list[0].temp.day
        
        tempCround = (Math.round(temp*10))/10;
        $("#current-temp").html(tempCround + " &#186 C");
    
        
        /*temperature */
        dayTempArr = document.querySelectorAll(".temp-day"); 
        nightTempArr = document.querySelectorAll(".temp-night"); 
        dateArr = document.querySelectorAll(".date");
        dayArr = document.querySelectorAll(".day");
        /*temperature*/
        
        for ( var i = 0; i < 5 ; i++){
            /*temperature*/
            tempDay = json.list[i].temp.max;
            tempNight = json.list[i].temp.min;
            $(dayTempArr[i]).html(Math.round(tempDay) + " &#186 C");
            $(nightTempArr[i]).html(Math.round(tempNight) + " &#186 C");
            /*temperature*/
            
            /*date*/
            var dateCalc = new Date(d.getTime()+(1000*60*60*24*i));
            var numberOfday =dateCalc.getDate()+1;
            var numberOfmonth = dateCalc.getMonth();
            var nameOfmonth = months[numberOfmonth];
            $(dateArr[i]).text(numberOfday + " " + nameOfmonth);
            /*date*/
            
            /*day of the week*/
            var dayCalc = day+1 + i;
            var dayNum = dayCalc;
            if (dayCalc > 6){
                dayNum = i-2;
            } 
            var dayName = days[dayNum];
            $(dayArr[i]).text(dayName);
            
            /*day of the week*/
            
            currentConditions = json.list[i].weather[0].main.toLowerCase();
            
            function switchWeather (){
    switch (currentConditions) {
    case 'clear':
        $(weatherIconArr[i]).attr("src", conditions[0].icon );
        $("#description1").html(conditions[0].description);
        backGroudImage = conditions[0].backgrounds;
        break;
    case 'clouds':
        $(weatherIconArr[i]).attr("src", conditions[1].icon );
        $("#description1").html(conditions[1].description);
        backGroudImage = conditions[1].backgrounds;
        break;
    case 'drizzle':
        $(weatherIconArr[i]).attr("src", conditions[2].icon );
        $("#description1").html(conditions[2].description);
        backGroudImage = conditions[2].backgrounds;
        break;
    case 'rain':
        $(weatherIconArr[i]).attr("src", conditions[3].icon );
        $("#description1").html(conditions[3].description);
        backGroudImage = conditions[3].backgrounds;
        break;
    case 'thunderstorm':
        $(weatherIconArr[i]).attr("src", conditions[4].icon );
        $("#description1").html(conditions[4].description);
        backGroudImage = conditions[4].backgrounds;
        break;
    case 'snow':
        $(weatherIconArr[i]).attr("src", conditions[5].icon );
        $("#description1").html(conditions[5].description);
        backGroudImage = conditions[5].backgrounds;
        break;6
    case 'atmosphere':
        $(weatherIconArr[i]).attr("src", conditions[6].icon );
        $("#description1").html(conditions[6].description);
        backGroudImage = conditions[6].backgrounds;
        break;
             
}
}

            
            
            switchWeather();
            
            
            
           
            
           
        }
        

        
        currentConditions = json.list[0].weather[0].main.toLowerCase();
        console.log(currentConditions);
        switchWeather();
        $("body").css({"background-image": "url(" + backGroudImage + ")"});
        
        });
       
       
       

    }; 
    
            
    function findByInput(){
    
        $("button").on("click", function(e){
          

        input = document.querySelector("input").value; 

        $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="+input+"&APPID="+id+"&units=metric&cnt=5",function(json){
         
            console.log(json);    
        cityName = json.city.name;
        $("#location").text(cityName);
        temp = json.list[0].temp.day
        tempC = temp-273.15;
        tempCround = (Math.round(tempC*10))/10;
        $("#current-temp").html(tempCround + " &#186 C");
        currentConditions = json.list[0].weather[0].main.toLowerCase();
        console.log(currentConditions);
        switchWeather();
        $("body").css({"background-image": "url(" + backGroudImage + ")"});
        
        });
       
    });
}                                              



