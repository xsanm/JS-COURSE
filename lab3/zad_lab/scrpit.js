import './game-animation.js';

const M = 10;


window.addEventListener('load', () => {
    const main = document.querySelector('main');
    for (let i = 0; i < M; i++) {
        const anim = document.createElement('game-animation');
        anim.points = 0;
        anim.timeout = 1000;
        anim.current = 0;
        main.appendChild(anim);
    }
    setTimeout(stopAnimation, 60000);
});


function stopAnimation() {
    let totalPoints = 0;
    document.querySelectorAll('game-animation').forEach((elem) => {
        totalPoints += parseInt(elem.points);
        elem.stop();
    });
    window.alert("Koniec, liczba punktow:" + totalPoints);
}