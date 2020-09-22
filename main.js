loadSecondNavBar();

function loadCards(){
    loadJSON('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json').then(function(response) {

        var jsonRestaurantes = response;
        var restaurantes = JSON.parse(jsonRestaurantes);

        var navBar2 = document.getElementById('rowCards');

        for (restaurante in restaurantes){
            let name = restaurantes[restaurante].name;
            var nameContent = document.createElement("a");
            nameContent.className = 'navbar-brand nav-link';
            nameContent.innerText = name;
            navBar2.appendChild(nameContent);
            //TODO ADD EVENT LISTENERS
        }

    }, function(Error) {
        console.log(Error);
    });
}

function loadSecondNavBar(){

    loadJSON('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json').then(function(response) {

        var jsonRestaurantes = response;
        var restaurantes = JSON.parse(jsonRestaurantes);

        var navBar2 = document.getElementById('barranav2');

        for (restaurante in restaurantes){
            let name = restaurantes[restaurante].name;
            var nameContent = document.createElement("a");
            nameContent.className = 'navbar-brand nav-link';
            nameContent.innerText = name;
            navBar2.appendChild(nameContent);
            //TODO ADD EVENT LISTENERS
        }

    }, function(Error) {
        console.log(Error);
    });
}

//función con promesa
function loadJSON(url) {

    return new Promise(function(resolve, reject) {
  
      let req = new XMLHttpRequest();
      req.open('GET', url);
    
      req.onload = function() {
        if (req.status === 200) {
  
          resolve(req.response);
        } else {
  
          reject(Error('La url no se cargó; error code:' + req.statusText));
        }
      };
      req.onerror = function() {
  
          reject(Error('Error de red.'));
      };
  
      req.send();
    });
}


