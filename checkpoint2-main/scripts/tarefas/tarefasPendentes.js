let tarefasPendentes = document.querySelector(".tarefas-pendentes");

function mostraTarefasPendentes(tarefa) {
    let liTarefasPendentes = document.createElement("li");
    liTarefasPendentes.classList.add("tarefa");
    liTarefasPendentes.setAttribute("id", tarefa.id)

    liTarefasPendentes.innerHTML =
        `            
        <div class="not-done"></div>
        <div class="descricao">
            <p class="nome">${tarefa.description}</p>
            <p class="timestamp"><i class="far fa-calendar-alt"></i>${tarefa.createdAt}</p>
         </div>
        <div id="completar">
            <img src="/ToDo-App/assets/completar.png" onclick="alterarStatus(${tarefa.id}, '${tarefa.description}', ${tarefa.completed})" onclick="mostraTarefasTerminadas()">
            <div id="comentarioTerminar">Terminar tarefa</div>
        </div>
        <div class="lixeira">
            <img src="/ToDo-App/assets/bin.png" onclick="deletarTarefa(${tarefa.id}, ${tarefa.completed})">
            <div class="comentarioApagarTarefa">Apagar tarefa</div>
        </div>
                  
    `
    //como a tarefa.description é uma string, ela teve que ser concatenada com o resto com aspas sinmples

    tarefasPendentes.appendChild(liTarefasPendentes)
}

