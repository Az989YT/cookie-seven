function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
}

var cur_stage = 'Loading News...';

var stage_zero = [
    'You feel like making cookies.',
    'Cookies are calling your name.',
    'You feel as though the world depends on you making cookies.',
    'Cookies are inevitable.',
    'Make cookies. NOW! DO IT OR PERISH IN COOKIE HELL FOREVER!!'
];

var stage_one = [
    'Your cookies don\'t taste very good.',
    'Your first batch goes in the garbage, even the rats avoid it.',
    'Your neighbors have moved to avoid the stench of your cookies.',
    'The neighborhood protests against your cookies.',
    'The local news describes your cookies as a biohazard.',
    'Your cookies seem to frown at you.',
    '\"Maybe it\'s the recipe\" you tell yourself.',
    'You hope your next batch is not a failure.',
    'For the love of cookies, improve your cookies!',
    'Are you trying to be funny?',
    'It\'s like you want your cookies to undersell.',
    'Your cookie habits confuse the local bakery.'
];

var stage_two = [
    'People begin to like your cookies.',
    'A line stretches across your lawn, waiting for more cookies.',
    'Your neighborhood has flyers advertising your cookies.',
    'Not a single cookie is left in the trash.',
    'The smell of cookies fills the neighborhood.',
    'You see your cookies on a billboard.',
    'Your family calls asking for free cookies.',
    'You forget how many batches you\'ve made in the past hour.',
    'Brands want to sponsor you.',
    'Your cookies attract some of the local bakery\'s customers.'
];

window.setTimeout(function news(){ // IT CHANGES LETS GOOOOOOOOOO
    var scroll = document.getElementById('news');
    window.setInterval(function newsUpdate(){
        if (player.total <= 0)
        {
            cur_stage = stage_zero;
            console.log("news is stage 0");
        }

        if (player.total >= 1 && player.total < 250)
        {
            cur_stage = stage_one;
            console.log("news is stage 1");
        }

        if (player.total >= 250 && player.total < 1000)
        {
            cur_stage = stage_two;
            console.log("news is stage 2");
        }

        if (player.total >= 1000 && player.total < 5000)
        {
            cur_stage = stage_three;
            console.log("news is stage 3");
        }

        if (player.total >= 5000)
        {
            cur_stage = stage_four;
            console.log("news is stage 4");
        }

        scroll.innerHTML = get_random(cur_stage);
    }, 5000);
}, 1000);