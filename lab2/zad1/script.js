//let str = window.prompt("Tekst1");
//console.log(typeof(str));

let inputs = document.getElementsByTagName('input');

console.log(inputs);


inputs[2].addEventListener('click', () => {
    console.log(inputs[0].value);
    console.log(typeof(inputs[0].value));
    console.log(inputs[1].value);
    console.log(typeof(inputs[1].value));
});