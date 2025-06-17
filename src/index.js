import './styles.css'

import Todo from './todo'
import TodoManager from './todoManager';
import { createSpace, removeSpace } from "./space";

let createTodoBtn = document.querySelector("#create-todo-btn");
let cancelTodoBtn = document.querySelector("#cancel-todo-btn");
let todoForm = document.querySelector("#todo-form");

createTodoBtn.addEventListener("click", () => {
    let dialog = document.querySelector("#add-todo");
    dialog.showModal();
});

cancelTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let dialog = document.querySelector("#add-todo");
    dialog.close();
})

function addSpace(name, color) {
    let button = createSpace(name, color);
    let spacesSec = document.querySelector(".spaces");
    spacesSec.appendChild(button);
}

addSpace("personal", "blue");
addSpace("work", "red");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let formData = new FormData(todoForm);
    let title = formData.get("title");
    let description = formData.get("description");
    let space = formData.get("space");
    let priority = formData.get("priority");
    let dueDate = formData.get("due-date");

    let todo = new Todo(title, description, dueDate, priority, space);
    TodoManager.addTodo(todo);
    TodoManager.save();

    let contentSec = document.querySelector(".content");
    contentSec.appendChild(todo.card);
    let dialog = document.querySelector("#add-todo")
    dialog.close();
})