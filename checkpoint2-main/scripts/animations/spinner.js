// puxar os elementos do htlm:
let spinner = document.createElement("div");
let body = document.querySelector("body");
let left = document.querySelector(".left");
let right = document.querySelector(".right");

//exibir spinner


function exibirSpinner() {

    spinner.classList.add("loader");

    left.classList.add("hidden");
    right.classList.add("hidden");


    body.appendChild(spinner);
}

//ocultar spinner

function ocultarSpinner() {

    left.classList.remove("hidden");
    right.classList.remove("hidden");

    body.removeChild(spinner);
}