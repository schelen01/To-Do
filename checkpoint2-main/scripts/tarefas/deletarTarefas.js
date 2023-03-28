function deletarTarefa(idTarefa, tarefaCompleta) {
    let tokenJwt = sessionStorage.getItem("jwt");


    //salvo o endpoint da api numa variavel:
    let urlEndPointDeletarTasks = `https://ctd-todo-api.herokuapp.com/v1/tasks/${idTarefa}`

    //crio o body da requisiçao de acordo com as informaçoes da API:
    let configuracaoDeletarTarefas = {
        method: "DELETE",
        headers: {
            "authorization": tokenJwt,
        },

    }

    //busco a API e deleto a tarefa 
    fetch(urlEndPointDeletarTasks, configuracaoDeletarTarefas)
        .then(() => {
            const tarefaRemover = document.getElementById(idTarefa)
            if (tarefaCompleta) {
                tarefasTerminadas.removeChild(tarefaRemover)
            } else {
                tarefasPendentes.removeChild(tarefaRemover)
            }
        })
        .catch(
            erro => {
                console.log(erro);
            }
        );
}

