// script.js

// seleciona os elementos do HTML com os quais vamos interagir
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Tenta carregar as tarefas do localStorage. Se não houver nada, começa com um array vazio
// JSON.parse() transforma o texto guardado de volta em um objeto/array JavaScript
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//Função para salvar as tarefas no localStorage
// JSON.stringify() transforma nosso array de tarefas em um string para poder ser guardado.
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
//Função para rendenizar (desenhar) a lista de tarefas na tela
function renderTasks() {
    // Limpa a lista atual para não duplicar itens
    taskList.innerHTML = '';

    // Para cada tarefa do nosso array, cria um elemento <li> e o adiciona na lista <ul>
    tasks.forEach((taskText, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        // O texto da tarefa
        const span = document.createElement('span');
        span.textContent = taskText;

        // Area para os botões da ação
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        //Botão de editar
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏'; //Icone de lapis
        editBtn.onclick = () => editTask (index);

        //Botão de remover
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '🗑'; //Icone de lixeira
        removeBtn.onclick = () => removeTask(index);

        //Adiciona os elementos na estrutura: <span> e botoes dentro do <li>
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(removeBtn);
        li.appendChild(span);
        li.appendChild(actionsDiv);

        //adiciona p item <li> completo na lista <ul>
        taskList.appendChild(li);

    });

}

//Função para adicionar uma nova tarefa
function addTask() {
    const taskText = taskInput.value.trim(); //pega o texto e remove espaços em branco
    if (taskText) { //Verifica se o texto esta vazio
        tasks.push(taskText); //Adiciona a nova tarefa ao nosso array
        taskInput.value = ''; //Limpa o campo de input
        saveTasks(); //Salva o array atualizado no localStorage
        renderTasks(); //Redesenha a lista na tela

    }
}

//Função para remover uma tarefa
 /**
  * Remove uma tarefa apos pedir confirmação ao usuario.
  * @param {number} index - a posição da tarefa a ser removida
  */
function removeTask(index) {
    //pega o texto da tarefa que sera excluida para usar na mensagem
    const taskText = tasks[index];

    //Cria a mensagem de confirmação, incluindo um emoji de alerta
    const confirmationMessage = `🤔Tem certeza que deseja remover a tarefa: "${taskText}"?`;
    //Exibe a caixa de dialogo de confirmação
    // O codigo dentro do "if" so sera executado se o usuario clicar em "OK"
    if (confirm(confirmationMessage)) {
        //Se o usuario confirmou:
        //Remove 1 item a partir do index do array
        tasks.splice(index, 1);

        //salva o novo estado do array no localStorage
        saveTasks();

        //Redesenha a lista na tela para refletir a remoção
        renderTasks();

    }
    //se o usuario clicar em "Cancelar", nada acontece e a função termina

}

//Função para editar uma tarefa
function editTask(index) {
    const currentTask = tasks[index];
    const newTaskText = prompt('📝Edite sua tarefa:', currentTask); //abre uma caixa de dialogo

    if (newTaskText !== null && newTaskText.trim() !== '') {
        tasks[index] = newTaskText.trim(); //atualiza a tarefa no array
        saveTasks();
        renderTasks();
    }
}

//Adiciona o "ouvinte de evento" para o botão. A função addTask sera chamado ao clicar
addTaskBtn.addEventListener('click', addTask);

//permite adicionar tarefa apertando "Enter" no teclado
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

//Rendeniza as tarefas que ja estavam salvas assim que a pagina carrega
renderTasks();