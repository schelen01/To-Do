//pegando o token salvo na sessionStorage:
let tokenJwt = sessionStorage.getItem("jwt");

//no load da pag, caso o token nao seja encontrado, exibe um alerta e redireciona a pag de login:
onload = function () {

    if (!tokenJwt) {
        alert("Sem permisão para acessar a página, você será redirecionado");
        window.location.href = "index.html"
    } else {
        console.log(tokenJwt);
    }

    //ainda no load da pag, sao chamadas as funcoes abaixo para rebderizar na tela o nome do usuario, as tarefas que ele já tem criadas ou o skeleton e a foto do avatar:
    usuarioLogado();
    mostrarTarefas();
    avatar();
}

function usuarioLogado() {

    let urlEndPointGetMe = "https://ctd-todo-api.herokuapp.com/v1/users/getMe"

    let configuracaoRequisicaoGetMe = {
        method: "GET",
        headers: {
            "authorization": tokenJwt,
        },
    }

    fetch(urlEndPointGetMe, configuracaoRequisicaoGetMe)
        .then(resultado => {
            return resultado.json();

        })
        .then(resultado => {
            return resultado.firstName;

        })
        .then(firstName => {
            console.log(firstName);
            let nomeUsuarioLogado = document.getElementById("nomeUsuarioLogado");
            nomeUsuarioLogado.innerText = firstName;

        })
        .catch(
            erro => {
                console.log(erro);
            }
        );

}

//essa funcao faz um get na api e pega as tarefas já criadas pelo usuario, usando a funcao manipula tarefas, podemos escolher pra qual canto da lista ela vai, se pras completas ou pras pendentes:
function mostrarTarefas() {
    let urlEndPointTasks = "https://ctd-todo-api.herokuapp.com/v1/tasks"

    let configuracaoMostrarTarefas = {
        method: "GET",
        headers: {
            "authorization": tokenJwt,
        },
    }

    fetch(urlEndPointTasks, configuracaoMostrarTarefas)
        .then(resultado => {
            return resultado.json()
        })
        .then(resultado => {
            if (resultado.length > 0) {
                // Se existem tarefas cadastradas, esconde o skeleton após carregá-las
                let skeleton = document.getElementById("skeleton");
                skeleton.setAttribute('hidden', true);
            }
            manipulaTarefas(resultado);
        })
        .catch(
            erro => {
                console.log(erro);
            }
        );

}

function manipulaTarefas(listaTarefas) {
    for (let tarefa of listaTarefas) {
        if (tarefa.completed) {
            mostraTarefasTerminadas(tarefa);
        } else {
            mostraTarefasPendentes(tarefa);
        }
    }
}

let botaoAddTarefa = document.getElementById("botaoAddTarefa");

botaoAddTarefa.addEventListener("click", (evento) => {
    evento.preventDefault();


    let novaTarefa = document.getElementById("novaTarefa")

    let radioGrupo = document.getElementsByName("radioGrupo");

    let radioSelecionadoCompleta;

    if (novaTarefa.value != "") {

        //Verifico o radio selecionado:
        for (const radioButton of radioGrupo) {
            if (radioButton.checked) {
                radioSelecionadoCompleta = radioButton.value === 'Completa'
                break;
            }
        }

        //crio o objeto JS que será convertido em JSON:
        const obj = {
            description: novaTarefa.value,
            completed: radioSelecionadoCompleta
        };

        //converto o objeto em JSON:
        let objJson = JSON.stringify(obj);

        //salvo o endpoint da api numa variavel:
        let urlEndPointCriarTasks = "https://ctd-todo-api.herokuapp.com/v1/tasks"

        //crio o body da requisiçao de acordo com as informaçoes da API:
        let configuracaoCriarTarefas = {
            method: "POST",
            headers: {
                "authorization": tokenJwt,
                "content-type": "application/json"
            },
            body: objJson,
        }

        //busco a API e aloco a tarefa no seu devido lugar
        fetch(urlEndPointCriarTasks, configuracaoCriarTarefas)
            .then(resultado => {
                return resultado.json();

            })
            .then(resultado => {

                if (radioSelecionadoCompleta) {
                    mostraTarefasTerminadas(resultado);
                } else {
                    mostraTarefasPendentes(resultado);
                }

            })
            .catch(
                erro => {
                    console.log(erro);
                }
            );

        //para excluir o nome da tarefa recém inserida e deixar no input apenas o placeholder para o usuário ver:    
        novaTarefa.value = "";

    } else {
        evento.preventDefault();
        alert("A descrição da tarefa é obrigatória")
    }

});


function encerrarSessao(){

    
}