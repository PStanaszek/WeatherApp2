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
function switchWeather(){
     switch (currentConditions) {
    case 'clear':
        $("#weather img").attr("src", conditions[0].icon );
        $("#description1").html(conditions[0].description);
        backGroudImage = conditions[0].backgrounds;
        break;
    case 'clouds':
        $("#weather img").attr("src", conditions[1].icon );
        $("#description1").html(conditions[1].description);
        backGroudImage = conditions[1].backgrounds;
        break;
    case 'drizzle':
        $("#weather img").attr("src", conditions[4].icon );
        $("#description1").html(conditions[4].description);
        backGroudImage = conditions[4].backgrounds;
        break;
    case 'rain':
        $("#weather img").attr("src", conditions[5].icon );
        $("#description1").html(conditions[5].description);
        backGroudImage = conditions[5].backgrounds;
        break;
    case 'thunderstorm':
        $("#weather img").attr("src", conditions[6].icon );
        $("#description1").html(conditions[6].description);
        backGroudImage = conditions[6].backgrounds;
        break;
    case 'snow':
        $("#weather img").attr("src", conditions[7].icon );
        $("#description1").html(conditions[7].description);
        backGroudImage = conditions[7].backgrounds;
        break;
    case 'atmosphere':
        $("#weather img").attr("src", conditions[8].icon );
        $("#description1").html(conditions[8].description);
        backGroudImage = conditions[8].backgrounds;
        break;
             
}
};

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
        
      /*  tempArr = document.querySelectorAll("#current-temp");*/
        tempArr = $('div[class="temp"]'); 
        
        dateArr = $("[class=date]");
        dayArr = document.querySelectorAll(".day");
        
        for ( var i = 0; i < 5 ; i++){
            temp = json.list[i].temp.day;
            tempCround = (Math.round(temp*10))/10;
            
            
            
            $(tempArr[i]).html(tempCround + " &#186 C");
            var a = (day+1) + i;
            if(a > 6){
             a = 0;
         
            }
            console.log(a+b);
            var b = days[a];
           
            day_number += i;
            $(dateArr[i]).text(day_number + "." + month_number);
            $(dayArr[i]).text(b);
            
           
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



