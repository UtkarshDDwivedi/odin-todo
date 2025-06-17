import './styles.css'

import Todo from './todo'
import TodoManager from './todoManager';
import { createSpace, removeSpace } from "./space";

let createTodoBtn = document.querySelector("#create-todo-btn");
let cancelTodoBtn = document.querySelector("#cancel-todo-btn");
let todoForm = document.querySelector("#todo-form");

let createSpaceBtn = document.querySelector("#create-space-btn");
let cancelSpaceBtn = document.querySelector("#cancel-space-btn");
let spaceForm = document.querySelector("#space-form");

document.addEventListener("load", ()=>{

})

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

createSpaceBtn.addEventListener("click", () => {
    let dialog = document.querySelector("#add-space");
    dialog.showModal();
})

cancelSpaceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let dialog = document.querySelector("#add-space");
    dialog.close();
})

spaceForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    let formData = new FormData(spaceForm);
    let name = formData.get("space");
    let color = formData.get("color");
    addSpace(name, color);

    let dialog = document.querySelector("#add-space");
    dialog.close();
})