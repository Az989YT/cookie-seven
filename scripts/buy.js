function priceMath(x) {
    y = x.price + (x.baseprice * 1.5);
    y = Math.round(y);
    return y;
}

function buy(item) {
    if (player.cookies >= item.price ) {
        item.total += 1;
        player.cookies -= item.price;
        item.price = priceMath(item);

        cookies.innerHTML = prettify(player.cookies);
        updateHelpers();
        cpers.innerHTML = prettify(totalCps());
    }
}

function updateHelpers() {
    cursors.innerHTML = prettify(cursor.total);
    cursorP.innerHTML = prettify(cursor.price);

    grandmas.innerHTML = prettify(grandma.total);
    grandmaP.innerHTML = prettify(grandma.price);

    farms.innerHTML = prettify(farm.total);
    farmP.innerHTML = prettify(farm.price);

    factories.innerHTML = prettify(factory.total);
    factoryP.innerHTML = prettify(factory.price);
}