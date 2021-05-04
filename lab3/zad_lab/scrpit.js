import './game-animation.js';

const M = 10;



// document.getElementById('next-photo').addEventListener('click', () => {
//     document.querySelectorAll('game-animation').forEach((elem) => {
//         elem.current = 1 + parseInt(elem.current);
//     });
// });

document.getElementById('next-photo').addEventListener('click', () => {
    document.querySelectorAll('game-animation').forEach((elem) => {
        elem.setInterv();
        //elem.setAction();
    });
});

window.addEventListener('load', () => {
    const main = document.querySelector('main');
    for (let i = 0; i < M; i++) {
        const anim = document.createElement('game-animation');
        anim.points = 0;
        anim.timeout = 1000;
        anim.current = 0;

        main.appendChild(anim);
    }
});