var game = {
    cookies: 0,
    totalCookies: 0,
    totalClicks: 0,
    power: 1,
    version: '0.0.1',
}

var helpers = {
    name: [
        'Cursor',
        'Grandma',
        'Farm',
        'Factory',
        'Cookie Gun',
        'Boat Shipment',
    ],
    icon: [
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
    ],
    power: [1, 5, 10, 25, 35, 50,],
    total: [0, 0, 0, 0, 0, 0,],
    basetotal: [0, 0, 0, 0, 0, 0,],
    price: [10, 100, 250, 1000, 1600, 2800,],
    baseprice: [10, 100, 250, 1000, 1600, 2800],
}

var display = {
    updateScore: function() {
        document.getElementById('cookies').innerHTML = this.prettify(game.cookies);
        document.getElementById('cpers').innerHTML = this.prettify(this.totalCPS());
        document.title = this.prettify(game.cookies) + " Cookies | CC:7"
    },

    updateVersion: function() {
        document.getElementById('version').innerHTML = game.version;
    },

    updateShop: function() {
        document.getElementById('shop').innerHTML = "";
        for (i = 0; i < helpers.name.length; i++) {
            document.getElementById('shop').innerHTML += '<table class="shopButton" onclick="purchase('+i+')"> <tr> <td id="image"><image src="images/'+helpers.icon[i]+'"></image></td> <td id="nameAndCost"> <p>'+helpers.name[i]+'</p> <p><span>'+this.prettify(helpers.price[i])+'</span> Cookies</p> </td> <td id="total"><span>'+helpers.total[i]+'</span></td> </tr> </table>'
        }
    },

    load: function() {
        this.updateScore();
        this.updateShop();
        this.updateVersion();
    },

    totalCPS: function() {
        var cookiesPerSecond = 0;
        for (i = 0; i < helpers.name.length; i++) {
            cookiesPerSecond += helpers.power[i] * helpers.total[i];
        }
        return cookiesPerSecond
    },

    prettify: function(x) {
        y = x.toLocaleString();
        return y
    }
}

window.setInterval(function CPS() {
    game.cookies += display.totalCPS();
    game.totalCookies += display.totalCPS();
    display.updateScore();
}, 1000)

function increment() {
    game.cookies += game.power;
    game.totalCookies += game.power;
    game.totalClicks += 1;
    display.updateScore();
}

function purchase(index) {
    if (game.cookies >= helpers.price[index]) {
        game.cookies -= helpers.price[index];
        helpers.total[index] += 1;
        helpers.price[index] += helpers.baseprice[index] * 1.5;
        helpers.price[index] = Math.round(helpers.price[index]);
        display.updateScore();
        display.updateShop();
    }
}

function nullFix(x) { 
    if (JSON.parse(localStorage.getItem(x)) === null || JSON.parse(localStorage.getItem(x)) === undefined)
    {
      y = y + 0;
    }
    else
    {
      y = JSON.parse(localStorage.getItem(x));
    }
    return y
}

function save(message) {
    localStorage.setItem('cookies', JSON.stringify(game.cookies));
    localStorage.setItem('totalCookies', JSON.stringify(game.totalCookies));
    localStorage.setItem('totalClicks', JSON.stringify(game.totalClicks));
    localStorage.setItem('power', JSON.stringify(game.power));
    localStorage.setItem('helperTotal', JSON.stringify(helpers.total));
    localStorage.setItem('helperPrice', JSON.stringify(helpers.price));

    window.alert(message);
}

function load(message) {
    game.cookies = nullFix('cookies');
    game.totalCookies = nullFix('totalCookies');
    game.totalClicks = nullFix('totalClicks');
    game.power = nullFix('power');
    helpers.total = nullFix('helperTotal');
    helpers.price = nullFix('helperPrice');

    display.load();
    window.alert(message);
}

function remove(message) {
    var choice = confirm('Are you sure you want to delete your data?');
    if (choice) {
        localStorage.setItem('cookies', JSON.stringify(0));
        localStorage.setItem('totalCookies', JSON.stringify(0));
        localStorage.setItem('totalClicks', JSON.stringify(0));
        localStorage.setItem('power', JSON.stringify(1));
        localStorage.setItem('helperTotal', JSON.stringify(helpers.basetotal));
        localStorage.setItem('helperPrice', JSON.stringify(helpers.baseprice));

        load(message);
    }
}

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

window.onbeforeunload = closingCode;
function closingCode(){
    save();
    return null;
}
