
$(document).ready(function() {
 
    var city = localStorage.getItem("city"); //récupere la variable localStorage ayant pour clé city
    var cardSelector = $("#card"); //met notre sélecteur dans une variable
   
    function getWeather() { // crée une fonction qui récupere la météo 
      if (city == null) { // teste si la variable city est nulle
        cardSelector.append("<p>Vous n'avez pas encore renseigné de ville.</p>"); // affiche un message dans la card
      } else { 
        $("#card *:not(div)").remove();
   
        var myAPPID = "c951c66741738c77617092b4e4bf769c"; //APPID pour OpenWeatherMap   
       
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?APPID=" + myAPPID + "&q=" + city +"&lang=fr&units=metric", function(result) { // met le résultat dans une variable result qui vaut le code JSON qu'on voit dans le navigateur
          var cityName = result.name.toUpperCase(); 
          var weatherType = result.weather[0].description; 
          var iconCode = result.weather[0].icon;
          var temp = Math.round(result.main.temp);
          var date = new Date(result.dt*1000); // multiplié par 1000 pour avoir le timestamp en millisecondes et pas en secondes
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var wind = result.wind.speed;
          var humidity = result.main.humidity;
   
          // remplit la card avec nos valeurs : la liste d'information, puis l'image avec le code icone
          cardSelector.append("<ul><li class='weatherTime'>Météo à "+hours+":"+minutes.substr(-2)+"</li><li class='cityName'>" + cityName + "</li><li>" + weatherType + "</li><li>" + temp + " &deg;C</li></ul>");
          cardSelector.append("<img src='img/" + iconCode + ".png' alt='Weather Icon' width='80px' height='80px'>");
          cardSelector.append("<table class='bordered'><tr><td><img src='img/wind.png' alt'wind icon' width='30px' height='30px'></td><td>" + wind + " km/h</td></tr><tr><td><img src='img/humidity.png' alt'wind icon' width='30px' height='30px'></td><td>"+ humidity +"%</td></tr></table>");
   
          // l'utilisateur voit les informations météo de sa ville
        });
      }
    }
   
    function submitForm() { // crée une fonction qui récupere la valeur du formulaire
      var mycity = $('input').val(); // récupere la valeur de notre input avec .val()
      if (mycity.length >= 3) { // si la variable est plus grande ou egale que 3 caracteres alors ...
        localStorage.setItem("city", mycity); //  crée une variable localStorage, avec pour clé city et comme valeur la ville de l'utilisateur
        city = mycity; // donne la ville à la variable city qui est utilisée dans la fonction getWeather
        getWeather();
      } else { // si le champ fait 2 caracteres ou moins on affiche une erreur
        alert('Veuillez remplir ce champ !');  
      }
    }
   
    $('#getWeather').on('touchstart', function() { // quand on commence à toucher le bouton avec l'id getWeather, alors ...
      submitForm(); // ... on appelle la fonction submitForm qui va traiter ce qu'il y a dans le champ de la ville
    });
   
    $('form').submit(function(event) { // quand on soumet le formulaire, alors ...
      event.preventDefault(); // ici on annule le comportement par défaut qui est de recharger la page quand on soumet un formulaire
      submitForm(); // ... on appelle la fonction submitForm qui va traiter ce qu'il y a dans le champ de la ville
    });
   
    getWeather(); // ici on appelle à l'allumage de l'application la fonction getWeather
  });