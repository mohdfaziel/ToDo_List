let addBtn = document.getElementById("add");
let todo = document.getElementById("todo");
let todoList = document.getElementsByClassName("taskList")[0];
let id = 1;
let data = JSON.parse(localStorage.getItem("ToDo's")) || [];
function addingToUi() {
    todoList.innerHTML = "";
    id=1;
    data.map((item,idx) =>
    {
        let newTodo = document.createElement('div');
        newTodo.setAttribute('class', 'task');
        newTodo.setAttribute('id', id);
        newTodo.innerHTML =
        `
                    <div class="goal">${item.todoVal}</div>
                    <div class="actions">
                    <input type="checkbox" onchange=taskCompleted(${id},${idx}) value="#" id="checkbox">
                    <img src="icons8-cancel-48.png" width="35px" height="35px" onclick=removeTodo(${id},${idx}) id="removeTask" alt="">
                    </div>
        `
        let check = newTodo.getElementsByTagName('input')[0];
        if(data[idx].Completed)
        {
            check.checked = true;
        }
        if(check.checked)
        {
            newTodo.classList.toggle("opcty");
        }
        id++;
        todoList.append(newTodo);
    })
}
function addingTodos() {
    if(todo.value.trim()=="")
        {
            todo.value = "";
            todo.style.outline = "1px solid red";
            return;
        }
        todo.style.outline = "";
    data.push({todoVal:todo.value,Completed:false});
    todo.value = "";
    localStorage.setItem("ToDo's", JSON.stringify(data));
    addingToUi();
}
function removeTodo(todoId,idx) {
    let div = document.getElementById(todoId);
    data.splice(idx,1);
    localStorage.setItem("ToDo's", JSON.stringify(data));
    div.remove();
    addingToUi();
}
function taskCompleted(todoId,idx) {
    let div = document.getElementById(todoId);
    div.classList.toggle("opcty");
    data[idx].Completed = !data[idx].Completed;
    localStorage.setItem("ToDo's", JSON.stringify(data));
}
addBtn.addEventListener('click', () => {
    addingTodos();
});
addingToUi();
