let nomeInput = document.getElementById("nome");
let sobrenomeInput = document.getElementById("sobrenome");
let emailInput = document.getElementById("email");
let senhaInput = document.getElementById("senha");
let repeteSenha = document.getElementById("repeteSenha");
let checkTermos = document.getElementById("checkbox");


//pegando a URL inserida pelo usuario e guardando na localStorage:
let avatar = document.getElementById("avatar");
localStorage.setItem("avatar", avatar.value);

let nomeValidacao = document.getElementById("nomeValidacao");
let sobrenomeValidacao = document.getElementById("sobrenomeValidacao");
let emailValidacao = document.getElementById("emailValidacao");
let senhaValidacao = document.getElementById("senhaValidacao");
let repeteSenhaValidacao = document.getElementById("repeteSenhaValidacao");
let botaoSignup = document.getElementById("botaoSignup");
let termosValidacao = document.getElementById("termosValidacao");

let nomeEValido = false;
let sobrenomeEValido = false;
let emailEValido = false;
let senhaEValida = false;
let repeteSenhaEValida = false;
let checkEValido = false;

let nomeSignupNormalizado;
let sobrenomeSignupNormalizado;
let emailSignupNormalizado;
let senhaSignupNormalizado;

const usuarioSignup = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}


botaoSignup.addEventListener('click', function (evento) {

    evento.preventDefault();


    if (validaTelaDeSignup()) {

        nomeSignupNormalizado = retiraEspacosDeUmValorInformado(nomeInput.value);
        sobrenomeSignupNormalizado = retiraEspacosDeUmValorInformado(sobrenomeInput.value);
        emailSignupNormalizado = retiraEspacosDeUmValorInformado(emailInput.value);
        senhaSignupNormalizado = retiraEspacosDeUmValorInformado(senhaInput.value);
        let emailSignupNormalizado2 = converteValorRecebidoEmMinusculo(emailSignupNormalizado);

        usuarioSignup.firstName = nomeSignupNormalizado;
        usuarioSignup.lastName = sobrenomeSignupNormalizado;
        usuarioSignup.email = emailSignupNormalizado2;
        usuarioSignup.password = senhaSignupNormalizado;

        let usuarioSignupJson = JSON.stringify(usuarioSignup);

        let urlEndPointSignup = "https://ctd-todo-api.herokuapp.com/v1/users"

        let configuracaoRequisicao = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: usuarioSignupJson
        }

        exibirSpinner();

        fetch(urlEndPointSignup, configuracaoRequisicao)
            .then(resultado => {
                if (resultado.status == 201) {
                    return resultado.json();
                }
                throw resultado;
            }).then(resultado => {
                setTimeout(() => {
                    signupSucesso(resultado.jwt);
                }, 2500);

            }
            ).catch(
                erro => {
                    console.log(erro);
                }
            );


        function signupSucesso(jwtRecebido) {
            console.log(jwtRecebido);
            ocultarSpinner();
            alert("Usuário criado com sucesso");
            window.location.href = "index.html";
        }


    } else {
        evento.preventDefault();
        alert("Campos inválidos");
        senhaInput.value = "";
        repeteSenha.value = "";
    }

});

function validaNome() {
    if (nomeInput.value != "") {

        nomeValidacao.innerText = ""
        nomeInput.style.border = ``
        nomeEValido = true;
    } else {

        nomeValidacao.innerText = "Campo obrigatório"
        nomeValidacao.style.color = "#E01E1E"
        nomeValidacao.style.fontSize = "8"
        nomeValidacao.style.fontWeight = "bold"
        nomeInput.style.border = `1px solid #E01E1E`
        nomeEValido = false;
    }
    validaTelaDeSignup();
}

nomeInput.addEventListener("input", () => {
    validaNome();
})

nomeInput.addEventListener("blur", () => {
    validaNome();
})


function validaSobrenome() {
    if (sobrenomeInput.value != "") {

        sobrenomeValidacao.innerText = ""
        sobrenomeInput.style.border = ``
        sobrenomeEValido = true;
    } else {

        sobrenomeValidacao.innerText = "Campo obrigatório"
        sobrenomeValidacao.style.color = "#E01E1E"
        sobrenomeValidacao.style.fontSize = "8"
        sobrenomeValidacao.style.fontWeight = "bold"
        sobrenomeInput.style.border = `1px solid #E01E1E`
        sobrenomeEValido = false;
    }
    validaTelaDeSignup();
}

sobrenomeInput.addEventListener("input", () => {
    validaSobrenome();
})

sobrenomeInput.addEventListener("blur", () => {
    validaSobrenome();
})


function validaEmail() {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(emailInput.value)) {

        emailValidacao.innerText = ""
        emailInput.style.border = ``
        emailEValido = true;
    } else {

        emailValidacao.innerText = "E-mail inválido"
        emailValidacao.style.color = "#E01E1E"
        emailValidacao.style.fontSize = "8"
        emailValidacao.style.fontWeight = "bold"
        emailInput.style.border = `1px solid #E01E1E`
        emailEValido = false;
    }
    validaTelaDeSignup();
}


emailInput.addEventListener("input", () => {
    validaEmail();
})

emailInput.addEventListener("blur", () => {
    validaEmail();
})

function validaSenha() {
    if (/[0-9a-zA-Z$*&@#]{8,}/.test(senhaInput.value)) {

        senhaValidacao.innerText = ""
        senhaInput.style.border = ``
        senhaEValida = true;
    } else {

        senhaValidacao.innerText = "A senha deve conter no mínimo 8 caracteres"
        senhaValidacao.style.color = "#E01E1E"
        senhaValidacao.style.fontSize = "8"
        senhaValidacao.style.fontWeight = "bold"
        senhaInput.style.border = `1px solid #E01E1E`
        senhaEValida = false;

        validaTelaDeSignup();
    }
}

senhaInput.addEventListener("input", () => {
    validaSenha();
})

senhaInput.addEventListener("blur", () => {
    validaSenha();
})

function validaRepeteSenha() {
    if (repeteSenha.value == senhaInput.value) {

        repeteSenhaValidacao.innerText = ""
        repeteSenha.style.border = ``
        repeteSenhaEValida = true;
    } else {

        repeteSenhaValidacao.innerText = "As senhas não conferem"
        repeteSenhaValidacao.style.color = "#E01E1E"
        repeteSenhaValidacao.style.fontSize = "8"
        repeteSenhaValidacao.style.fontWeight = "bold"
        repeteSenha.style.border = `1px solid #E01E1E`
        repeteSenhaEValida = false;
    }
    validaTelaDeSignup();
}

repeteSenha.addEventListener("input", () => {
    validaRepeteSenha();
})

repeteSenha.addEventListener("blur", () => {
    validaRepeteSenha();
})

function validaLieConcordo() {

    if (checkTermos.checked) {
        termosValidacao.innerText = ""
        checkEValido = true;
    }
    else {
        termosValidacao.innerText = "É necessário ler e concordar com os termos"
        termosValidacao.style.color = "#E01E1E"
        termosValidacao.style.fontSize = "7"
        termosValidacao.style.fontWeight = "bold"
        checkEValido = false;
    }
    validaTelaDeSignup();
}

checkTermos.addEventListener("input", () => {
    validaLieConcordo();
})

checkTermos.addEventListener("blur", () => {
    validaLieConcordo();
})

function validaTelaDeSignup() {
    if (nomeEValido && sobrenomeEValido && emailEValido && senhaEValida && repeteSenhaEValida && checkEValido) {
        botaoSignup.removeAttribute('disabled')
        botaoSignup.innerText = "Criar conta"
        return true
    } else {
        botaoSignup.setAttribute('disabled', true);
        botaoSignup.innerText = "Bloqueado"
        return false
    }
}


