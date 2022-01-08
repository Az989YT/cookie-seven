var game = {
    cookies: 0,
    totalCookies: 0,
    totalClicks: 0,
    power: 1,
    version: '0.0.0',

    increment: function() {
        this.cookies += this.power;
        this.totalCookies += this.power;
        this.totalClicks += 1;
        display.updateScore();
    },
}

var helpers = {
    name: [
        'Cursor',
        'Grandma',
        'Farm',
        'Factory',
    ],
    icon: [
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
        'placeholder.png',
    ],
    power: [1, 5, 10, 25,],
    total: [0, 0, 0, 0,],
    price: [10, 100, 250, 1000,],
    baseprice: [10, 100, 250, 1000],

    purchase: function(index) {
        if (game.cookies >= this.price[index]) {
            game.cookies -= this.price[index];
            this.total[index] += 1;
            this.price[index] += this.baseprice[index] * 1.5;
            this.price[index] = Math.round(this.price[index]);
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
        document.getElementById('shop').innerHTML = "";
        for (i = 0; i < helpers.name.length; i++) {
            document.getElementById('shop').innerHTML += '<table class="shopButton" onclick="helpers.purchase('+i+')"> <tr> <td id="image"><image src="images/'+helpers.icon[i]+'"></image></td> <td id="nameAndCost"> <p>'+helpers.name[i]+'</p> <p><span>'+helpers.price[i]+'</span> Cookies</p> </td> <td id="total"><span>'+helpers.total[i]+'</span></td> </tr> </table>'
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