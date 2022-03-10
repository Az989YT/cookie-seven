//STILL A WORK IN PROGRESS, ITS BEST NOT TO TEST THIS YOU SILLY PEEPS!!!

var txtFile = new XMLHttpRequest(); // code from google :)

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

function uploadMod(link) { //this is the function you should use to import your mods..
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

function parseHelpers() { //run this after eaach mod you import
    textFromFile = txtFile.responseText;
    for (var prop in JSON.parse(textFromFile).helpers) {
        console.log(JSON.parse(textFromFile).helpers[prop]);
        customHelpers.name.push(JSON.parse(textFromFile).helpers[prop].name);
        customHelpers.icon.push(JSON.parse(textFromFile).helpers[prop].icon);
        customHelpers.power.push(JSON.parse(textFromFile).helpers[prop].power);
        customHelpers.price.push(JSON.parse(textFromFile).helpers[prop].price);
        //repeats because funny
        customHelpers.basepower.push(JSON.parse(textFromFile).helpers[prop].power);
        customHelpers.baseprice.push(JSON.parse(textFromFile).helpers[prop].price);
        //zero values :)
        customHelpers.total.push(0);
        customHelpers.basetotal.push(0);
    }
}

function loadHelpers() { //NOTE, RUN THIS FUNCTION ONLY WHEN ALL OF YOUR MODS ARE LOADED!!
    display.updateShop();
}

function loadMod(link) {
    uploadMod(link);
    setTimeout(function() {
        parseHelpers();
        loadHelpers();
    }, 1000);
}

//if you are using tampermonkey or smth a js mod loader file should look something like this:
/*
    uploadMod('modlinkhere');
    parseHelpers();
    uploadMod('modlink2here);
    parseHelpers();
    loadHelpers();
*/
//at least i think so??