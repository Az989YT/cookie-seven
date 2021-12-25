var player = {
    name:'Player',
    cookies:0,
    power:1,
    total:0,
}

function increment() {
    player.cookies += player.power;
    player.total += player.power;
    cookies.innerHTML = prettify(player.cookies);
}
function prettify(x) {
    y = Number(x).toLocaleString();
    return y;
}

function cps(helper) {
    x = helper.power * helper.total;
    return x;
}

function totalCps() {
    x = cps(cursor) + cps(grandma) + cps(farm) + cps(factory);
    return x;
}

window.setInterval(
    function helperBake() {
        player.cookies += totalCps();
        player.total += totalCps();
        cookies.innerHTML = prettify(player.cookies);
    }, 1000
);