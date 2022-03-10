var game = {
    cookies: 0,
    totalCookies: 0,
    totalClicks: 0,
    power: 1,
    version: '0.0.2',

    
    increment: function () {
        game.cookies += game.power;
        game.totalCookies += game.power;
        game.totalClicks += 1;
        display.updateScore();
    },
}


// might add mod/custom helper support??? feels like itd be fun ngl
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
    basepower: [1, 5, 10, 25, 35, 50,],
    total: [0, 0, 0, 0, 0, 0,],
    basetotal: [0, 0, 0, 0, 0, 0,],
    price: [10, 100, 250, 1000, 1600, 2800,],
    baseprice: [10, 100, 250, 1000, 1600, 2800,],

    purchase: function (index) {
        if (game.cookies >= helpers.price[index]) {
            game.cookies -= helpers.price[index];
            helpers.total[index] += 1;
            helpers.price[index] += helpers.baseprice[index] * 1.5;
            helpers.price[index] = Math.round(helpers.price[index]);
            display.updateScore();
            display.updateShop();
        }
    },
}

// could possibly make this automatic... im lazy
var upgrades = {
    name: [
        'Upgrade Cursors',
        'Upgrade Grandmas',
        'Upgrade Farms',
        'Upgrade Factories',
        'Upgrade Cookie Guns',
        'Upgrade Boat Shipments',
    ],
    icon: [
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
    ],
    powermult: 1.5,
    total: [0, 0, 0, 0, 0, 0,],
    basetotal: [0, 0, 0, 0, 0, 0,],
    price: [1000, 10000, 25000, 100000, 160000, 280000,],
    baseprice: [1000, 10000, 25000, 100000, 160000, 280000,],

    purchase: function (index) {
        if (game.cookies >= upgrades.price[index]) {
            game.cookies -= upgrades.price[index];
            upgrades.total[index] += 1;
            upgrades.price[index] += upgrades.baseprice[index] * 5;
            upgrades.price[index] = Math.round(upgrades.price[index]);
            helpers.power[index] *= upgrades.powermult;
            helpers.power[index] = Math.round(helpers.power[index])
            display.updateScore();
            display.updateShop();
        }
    },
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
        document.getElementById('helpers').innerHTML = "";
        for (i = 0; i < helpers.name.length; i++) {
            document.getElementById('helpers').innerHTML += '<table class="shopButton" onclick="helpers.purchase('+i+')"> <tr> <td id="image"><image src="images/'+helpers.icon[i]+'"></image></td> <td id="nameAndCost"> <p>'+helpers.name[i]+'</p> <p><span>'+this.prettify(helpers.price[i])+'</span> Cookies</p> </td> <td id="total"><span>'+helpers.total[i]+'</span></td> </tr> </table>'
        }

        document.getElementById('upgrades').innerHTML = "";
        for (i = 0; i < upgrades.name.length; i++) {
            document.getElementById('upgrades').innerHTML += '<table class="shopButton" onclick="upgrades.purchase('+i+')"> <tr> <td id="image"><image src="images/'+upgrades.icon[i]+'"></image></td> <td id="nameAndCost"> <p>'+upgrades.name[i]+'</p> <p><span>'+this.prettify(upgrades.price[i])+'</span> Cookies</p> </td> <td id="total"><span>'+upgrades.total[i]+'</span></td> </tr> </table>'
        }

        if (customHelpers.name.length !== 0) {
            for (i = 0; i < customHelpers.name.length; i++) {
                document.getElementById('helpers').innerHTML += '<table class="shopButton" onclick="customHelpers.purchase('+i+')"> <tr> <td id="image"><image src="images/'+customHelpers.icon[i]+'"></image></td> <td id="nameAndCost"> <p>'+customHelpers.name[i]+'</p> <p><span>'+display.prettify(customHelpers.price[i])+'</span> Cookies</p> </td> <td id="total"><span>'+customHelpers.total[i]+'</span></td> </tr> </table>'
            }
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
        if (customHelpers.name.length !== 0) {
            for (i = 0; i < customHelpers.name.length; i++) {
                cookiesPerSecond += customHelpers.power[i] * customHelpers.total[i];
            }
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

window.setInterval(function autoSave() {  //autosave for mobile peeps
    save();
}, 600000)

function nullFix(x) { // gets yo thing from localstorage and if its null it dont change
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

function save() {
    localStorage.setItem('cookies', JSON.stringify(game.cookies));
    localStorage.setItem('totalCookies', JSON.stringify(game.totalCookies));
    localStorage.setItem('totalClicks', JSON.stringify(game.totalClicks));
    localStorage.setItem('power', JSON.stringify(game.power));
    localStorage.setItem('helperTotal', JSON.stringify(helpers.total));
    localStorage.setItem('helperPrice', JSON.stringify(helpers.price));
    localStorage.setItem('helperPower', JSON.stringify(helpers.power));
    localStorage.setItem('upgradeTotal', JSON.stringify(upgrades.total));
    localStorage.setItem('upgradePrice', JSON.stringify(upgrades.price));
    localStorage.setItem('version', JSON.stringify(game.version));
}

function saveMessage(message) {
    save();
    window.alert(message);
}


function load(message) {
    ver = nullFix('version') // version checker now so saves dont break between versions!!!!
    if (ver == '0.0.1' || ver == null) 
    {
        game.cookies = nullFix('cookies');
        game.totalCookies = nullFix('totalCookies');
        game.totalClicks = nullFix('totalClicks');
        game.power = nullFix('power');
        for (i = 0; i < helpers.name.length; i++) {
            for (i = 0; i < nullFix('helperTotal').length; i++) {
               helpers.total[i] = nullFix('helperTotal')[i];
            }  
            for (i = 0; i < nullFix('helperPrice').length; i++) {
                helpers.price[i] = nullFix('helperPrice')[i];
            }
        }  
    }
    else if (ver == '0.0.2')
    {
        game.cookies = nullFix('cookies');
        game.totalCookies = nullFix('totalCookies');
        game.totalClicks = nullFix('totalClicks');
        game.power = nullFix('power');
        for (i = 0; i < helpers.name.length; i++) {
            for (i = 0; i < nullFix('helperTotal').length; i++) {
                helpers.total[i] = nullFix('helperTotal')[i];
            }  
            for (i = 0; i < nullFix('helperPrice').length; i++) {
                helpers.price[i] = nullFix('helperPrice')[i];
            }        
            for (i = 0; i < nullFix('helperPower').length; i++) {
                helpers.power[i] = nullFix('helperPower')[i];
            }  
        }
        for (i = 0; i < upgrades.name.length; i++) {
            for (i = 0; i < nullFix('upgradeTotal').length; i++) {
                upgrades.total[i] = nullFix('upgradeTotal')[i]; 
            }  
            for (i = 0; i < nullFix('upgradePrice').length; i++) {
                upgrades.price[i] = nullFix('upgradePrice')[i];
            }
        }
    }

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
        localStorage.setItem('helperPower', JSON.stringify(helpers.basepower));
        localStorage.setItem('upgradeTotal', JSON.stringify(upgrades.basetotal));
        localStorage.setItem('upgradePrice', JSON.stringify(upgrades.baseprice));
        localStorage.setItem('version', JSON.stringify(game.version));

        load(message);
    }
}

function downloadSave() { //mmm code from google
    saveMessage('Download Starting...'); 
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(btoa(JSON.stringify(localStorage)));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "save" + ".cc7");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function loadSave() {
    const [file] = document.querySelector('input[type=file]').files;
    const reader = new FileReader();
  
    reader.addEventListener("load", () => { 
        var saveData = reader.result;
        var parsedData = JSON.parse(atob(saveData));

        // version check but for save file
        if (JSON.parse(parsedData.version) == '0.0.1') 
        {
            game.cookies = parseInt(parsedData.cookies, 10);
            game.totalCookies = parseInt(parsedData.totalCookies, 10);
            game.totalClicks = parseInt(parsedData.totalClicks, 10);
            game.power = parseInt(parsedData.power, 10);
            helpers.total = JSON.parse(parsedData.helperTotal);
            helpers.price = JSON.parse(parsedData.helperPrice);
        }
        else if (JSON.parse(parsedData.version) == '0.0.2')
        {
            game.cookies = parseInt(parsedData.cookies, 10);
            game.totalCookies = parseInt(parsedData.totalCookies, 10);
            game.totalClicks = parseInt(parsedData.totalClicks, 10);
            game.power = parseInt(parsedData.power, 10);
            helpers.total = JSON.parse(parsedData.helperTotal);
            helpers.price = JSON.parse(parsedData.helperPrice);
            helpers.power = JSON.parse(parsedData.helperPower);
            upgrades.total = JSON.parse(parsedData.upgradeTotal);
            upgrades.price = JSON.parse(parsedData.upgradePrice);
        }
        console.trace(parsedData);
        display.load();
        saveMessage('Save Loaded');
    }, false);
  
    if (file) {
      reader.readAsText(file);
    }
}

window.onbeforeunload = closingCode; //saves game on close
function closingCode(){
    save();
    return null;
}
