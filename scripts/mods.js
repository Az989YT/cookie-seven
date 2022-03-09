//STILL A WORK IN PROGRESS, ITS BEST NOT TO TEST THIS YOU SILLY PEEPS!!!

var txtFile = new XMLHttpRequest(); // code from google :)

function uploadHelper() {
    link = prompt('paste helper link here');

    if (link !== null) {
        txtFile.open("GET", link, true);
        txtFile.onreadystatechange = function() {
        if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
                if (txtFile.status === 200) {  // Makes sure it's found the file.
                    allText = txtFile.responseText;
                    lines = txtFile.responseText.split("\n"); // Will separate each line into an array
                }
            }
        }
        txtFile.send(null);
    }
    else {
        console.log('no link, cancelling')
    }
}

var customHelpers = {
    name: [],
    icon: [],
    power: [],
    basepower: [],
    total: [],
    basetotal: [],
    price: [],
    baseprice: [],

    purchase: function (index) {
        if (game.cookies >= customHelpers.price[index]) {
            game.cookies -= customHelpers.price[index];
            customHelpers.total[index] += 1;
            customHelpers.price[index] += customHelpers.baseprice[index] * 1.5;
            customHelpers.price[index] = Math.round(customHelpers.price[index]);
            display.updateScore();
            display.updateShop();
        }
    },
}

function hehe() {
    textFromFile = txtFile.responseText;
    console.log(JSON.parse(textFromFile).helpers);
    for (var prop in JSON.parse(textFromFile).helpers) {
        console.log(JSON.parse(textFromFile).helpers[prop]);
    }
}

function insertHelper() {
    textFromFile = txtFile.responseText;
    console.log(JSON.parse(textFromFile));

    customHelpers.name.push(JSON.parse(textFromFile).name);
    customHelpers.icon.push(JSON.parse(textFromFile).icon);
    customHelpers.power.push(JSON.parse(textFromFile).power);
    customHelpers.basepower.push(JSON.parse(textFromFile).power);
    customHelpers.total.push(0);
    customHelpers.basetotal.push(0);
    customHelpers.price.push(JSON.parse(textFromFile).price);
    customHelpers.baseprice.push(JSON.parse(textFromFile).price);

    for (i = 0; i < customHelpers.name.length; i++) {
        document.getElementById('helpers').innerHTML += '<table class="shopButton" onclick="customHelpers.purchase('+i+')"> <tr> <td id="image"><image src="images/'+customHelpers.icon[i]+'"></image></td> <td id="nameAndCost"> <p>'+customHelpers.name[i]+'</p> <p><span>'+display.prettify(customHelpers.price[i])+'</span> Cookies</p> </td> <td id="total"><span>'+customHelpers.total[i]+'</span></td> </tr> </table>'
    }
}