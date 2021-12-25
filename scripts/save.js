function nullFix(x, y) { 
    if (JSON.parse(localStorage.getItem(x)) === null)
    {
      y += 0;
    }
    else
    {
      y = JSON.parse(localStorage.getItem(x));
    }
    
    return y;
  }

function save(message) {
    localStorage.setItem('playerData', JSON.stringify(player));
    localStorage.setItem('cursorData', JSON.stringify(cursor));
    localStorage.setItem('grandmaData', JSON.stringify(grandma));
    localStorage.setItem('farmData', JSON.stringify(farm));
    localStorage.setItem('factoryData', JSON.stringify(factory));

    window.alert(message);
}

function load(message) {
    player = nullFix('playerData');
    cursor = nullFix('cursorData');
    grandma = nullFix('grandmaData');
    farm = nullFix('farmData');
    factory = nullFix('factoryData');

    cookies.innerHTML = prettify(player.cookies);
    powernum.innerHTML = prettify(player.power);

    cursors.innerHTML = prettify(cursor.total);
    grandmas.innerHTML = prettify(grandma.total);
    farms.innerHTML = prettify(farm.total);
    factories.innerHTML = prettify(factory.total);

    cursorP.innerHTML = prettify(cursor.price);
    grandmaP.innerHTML = prettify(grandma.price);
    farmP.innerHTML = prettify(farm.price);
    factoryP.innerHTML = prettify(factory.price);

    cpers.innerHTML = prettify(totalCps());

    window.alert(message);
}

function remove(message) {
    localStorage.removeItem('playerData');
    localStorage.removeItem('cursorData');
    localStorage.removeItem('grandmaData');
    localStorage.removeItem('farmData');
    localStorage.removeItem('factoryData');

    player = {
        name:'Player',
        cookies:0,
        power:1,
        total:0,
    }

    cursor = {
        total:0,
        power: 1,
        price: 10,
        baseprice: 10,
    }
    
    grandma = {
        total: 0,
        power: 5,
        price: 100,
        baseprice: 100,
    }
    
    farm = {
        total: 0,
        power: 10,
        price: 250,
        baseprice: 250,
    }
    
    factory = {
        total: 0,
        power: 20,
        price: 1000,
        baseprice: 1000,
    }

    window.alert(message);
    location.reload();
}
window.onbeforeunload = function() {
    save();
}