var jsonCart = [];

loadSecondNavBar();

function cancelOrder() {
  jsonCart = [];
  $("#rowCards").empty();
  var numberItems = document.getElementById("numberItems");
  numberItems.innerHTML = "&nbsp;&nbsp;" + 0 + " items";
  loadCart();
}

function addToJson(name, price) {
  var product = {
    Qty: 1,

    Description: name,

    UnitPrice: price,

    Amount: price,
  };

  let itsThere = false;
  for (orders in jsonCart) {
    let desc = jsonCart[orders].Description;

    if (name == desc) {
      jsonCart[orders].Qty = jsonCart[orders].Qty + 1;
      jsonCart[orders].Amount = jsonCart[orders].Amount * jsonCart[orders].Qty;
      itsThere = true;
      break;
    }
  }
  if (itsThere == false) {
    jsonCart.push(product);
  }
  var size = 0;
  for (orders in jsonCart) {
    size = size + jsonCart[orders].Qty;
  }
  var numberItems = document.getElementById("numberItems");
  numberItems.innerHTML = "&nbsp;&nbsp;" + size + " items";
}

function loadCart() {
  var rowCards = document.getElementById("rowCards");
  var productTag = document.getElementById("productChosen");
  productTag.innerText = "Order detail";

  var colDiv = document.createElement("DIV");
  colDiv.className = "col-sm-12 col-md-12 col-lg-12 col-xl-12";
  var table = document.createElement("TABLE");
  table.className = "table table-striped";
  table.id = "tableOrderDetail";
  rowCards.appendChild(colDiv);
  colDiv.appendChild(table);
  var thead = document.createElement("THEAD");
  var tr = document.createElement("TR");

  var th1 = document.createElement("TH");
  th1.setAttribute("scope", "col");
  th1.innerText = "Item";
  var th2 = document.createElement("TH");
  th2.setAttribute("scope", "col");
  th2.innerText = "Qty";
  var th3 = document.createElement("TH");
  th3.setAttribute("scope", "col");
  th3.innerText = "Description";
  var th4 = document.createElement("TH");
  th4.setAttribute("scope", "col");
  th4.innerText = "Unit Price";
  var th5 = document.createElement("TH");
  th5.setAttribute("scope", "col");
  th5.innerText = "Amount";
  var tbody = document.createElement("tbody");

  table.appendChild(thead);
  thead.appendChild(tr);
  table.appendChild(tbody);
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);

  var tableId = document
    .getElementById("tableOrderDetail")
    .getElementsByTagName("tbody")[0];

  let i = 0;
  let j = 1;
  var totalPrice = 0;
  for (orders in jsonCart) {
    let qty = jsonCart[orders].Qty;
    let desc = jsonCart[orders].Description;
    let up = jsonCart[orders].UnitPrice;
    let amount = jsonCart[orders].Amount;

    var row = tableId.insertRow(i);

    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    cell0.innerHTML = "<strong>" + j + "</strong>";
    cell1.innerHTML = qty;
    cell2.innerHTML = desc;
    cell3.innerHTML = up;
    cell4.innerHTML = amount;
    totalPrice = totalPrice + amount;
    i++;
    j++;
  }

  var colTotal = document.createElement("DIV");
  colTotal.className = "col-sm-12 col-md-9 col-lg-9 col-xl-9 text-left";
  var colButtons = document.createElement("DIV");
  colButtons.className = "col-sm-12 col-md-3 col-lg-3 col-xl-3";
  rowCards.appendChild(colTotal);

  var parrafoPrecio = document.createElement("P");
  var strongPrecio = document.createElement("STRONG");
  strongPrecio.innerText = "Total: $" + totalPrice;
  colTotal.appendChild(parrafoPrecio);
  parrafoPrecio.appendChild(strongPrecio);

  rowCards.appendChild(colButtons);
  var divFlexButtons = document.createElement("DIV");
  divFlexButtons.id = "divFlexButtons";
  divFlexButtons.className = "row";
  colButtons.appendChild(divFlexButtons);

  var colCancel = document.createElement("DIV");
  colCancel.className = "col-sm-4 col-md-4 col-lg-4 col-xl-4";
  var colConfirm = document.createElement("DIV");
  colConfirm.className = "col-sm-8 col-md-8 col-lg-8 col-xl-8";
  divFlexButtons.appendChild(colCancel);
  divFlexButtons.appendChild(colConfirm);

  var btnCancel = document.createElement("button");
  btnCancel.setAttribute("type", "button");
  btnCancel.className = "btn btn-outline-dark";
  btnCancel.setAttribute("data-toggle", "modal");
  btnCancel.setAttribute("data-target", "#exampleModal");
  btnCancel.id = "Cancel";

  btnCancel.innerText = "Cancel";
  colCancel.appendChild(btnCancel);

  var btnConfirm = document.createElement("button");
  btnConfirm.setAttribute("type", "button");
  btnConfirm.className = "btn btn-outline-dark";
  btnConfirm.id = "Confirm";

  btnConfirm.innerText = "Confirm order";
  colConfirm.appendChild(btnConfirm);
  //TODO: agregar eventListener

  btnConfirm.addEventListener(
    "click",
    function () {
      console.log(jsonCart);
    },
    false,
  );
}

function loadCards(name1) {
  loadJSON(
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json",
  ).then(
    function (response) {
      var jsonRestaurantes = response;
      var restaurantes = JSON.parse(jsonRestaurantes);

      var rowCards = document.getElementById("rowCards");
      var productTag = document.getElementById("productChosen");
      for (restaurante in restaurantes) {
        let name2 = restaurantes[restaurante].name;
        if (name2 == name1) {
          let products = restaurantes[restaurante].products;
          productTag.innerText = name2;
          for (product in products) {
            let productName = products[product].name;
            let productDesc = products[product].description;
            let productPrice = products[product].price;
            let productImage = products[product].image;

            var colDiv = document.createElement("DIV");
            colDiv.className =
              "col-sm-12 col-md-6 col-lg-3 col-xl-3 d-flex align-items-stretch";
            var card = document.createElement("DIV");
            card.className = "card";
            var img = document.createElement("IMG");
            img.className = "card-img-top";
            img.setAttribute("src", productImage);
            img.setAttribute("alt", productImage);
            var cardBody = document.createElement("DIV");
            cardBody.className = "card-body text-left";
            var cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.innerText = productName;
            var cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.innerText = productDesc;
            var cardPrice = document.createElement("h6");
            cardPrice.className = "card-title";
            cardPrice.innerText = "$" + productPrice;
            var btn = document.createElement("button");
            btn.setAttribute("type", "button");
            btn.className = "btn btn-dark";
            btn.id = productName;
            btn.innerText = "Add to car";

            btn.addEventListener(
              "click",
              function () {
                addToJson(productName, productPrice);
              },
              false,
            );

            rowCards.appendChild(colDiv);
            colDiv.appendChild(card);
            card.appendChild(img);
            card.appendChild(cardBody);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(btn);
          }
        }
      }
    },
    function (Error) {
      console.log(Error);
    },
  );
}

function loadSecondNavBar() {
  var btnCancel = document.getElementById("CancelOrder");
  btnCancel.addEventListener(
    "click",
    function () {
      cancelOrder();
    },
    false,
  );
  var cart = document.getElementById("Cart");
  cart.addEventListener(
    "click",
    function () {
      $("#rowCards").empty();
      loadCart();
    },
    false,
  );
  loadCards("Burguers");
  loadJSON(
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json",
  ).then(
    function (response) {
      var jsonRestaurantes = response;
      var restaurantes = JSON.parse(jsonRestaurantes);

      var navBar2 = document.getElementById("barranav2");

      for (restaurante in restaurantes) {
        let name = restaurantes[restaurante].name;
        var nameContent = document.createElement("a");
        nameContent.className = "navbar-brand nav-link";
        nameContent.innerText = name;
        nameContent.id = name;
        navBar2.appendChild(nameContent);

        nameContent.addEventListener(
          "click",
          function () {
            $("#rowCards").empty();
            loadCards(name);
          },
          false,
        );
      }
    },
    function (Error) {
      console.log(Error);
    },
  );
}

//función con promesa
function loadJSON(url) {
  return new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    req.open("GET", url);

    req.onload = function () {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject(Error("La url no se cargó; error code:" + req.statusText));
      }
    };
    req.onerror = function () {
      reject(Error("Error de red."));
    };

    req.send();
  });
}
