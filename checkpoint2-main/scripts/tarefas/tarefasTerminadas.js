let tarefasTerminadas = document.querySelector(".tarefas-terminadas");


function mostraTarefasTerminadas(tarefa) {
    let liTarefas = document.createElement("li");
    liTarefas.classList.add("tarefa");
    liTarefas.setAttribute("id", tarefa.id)

    liTarefas.innerHTML =
        `
        <div class="done"></div>
        <div class="descricao">
            <p class="nome">${tarefa.description}</p>
            <p class="timestamp"><i class="far fa-calendar-alt"></i>${tarefa.createdAt}</p>
        </div>
        <div id="enviarPendente">
            <img src="/ToDo-App/assets/reload.png" onclick="alterarStatus(${tarefa.id}, '${tarefa.description}', ${tarefa.completed})" onclick="mostraTarefasPendentes()">
            <div id="comentarioMarcarComoPendente">Mover para tarefas pendentes</div>
        </div>   
        <div class="lixeira">
            <img src="/ToDo-App/assets/bin.png" onclick="deletarTarefa(${tarefa.id}, ${tarefa.completed})">
            <div class="comentarioApagarTarefa">Apagar tarefa</div>
        </div>      
    `
    tarefasTerminadas.appendChild(liTarefas)
}
