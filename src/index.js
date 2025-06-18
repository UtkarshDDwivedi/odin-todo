import './styles.css'

import Todo from './todo'
import TodoManager from './todoManager';
import { createSpace, removeSpace } from "./space";

let createTodoBtn = document.querySelector("#create-todo-btn");
let cancelTodoBtn = document.querySelector("#cancel-todo-btn");
let todoForm = document.querySelector("#todo-form");

let createSpaceBtn = document.querySelector("#create-space-btn");
let cancelSpaceBtn = document.querySelector("#cancel-space-btn");
let removeSpaceBtns = document.querySelectorAll(".space-btn img");
let spaceForm = document.querySelector("#space-form");

document.addEventListener("DOMContentLoaded", () => {
    TodoManager.load();
    let contentSec = document.querySelector(".content");

    for (let space in TodoManager.spaces) {
        let color = TodoManager.spaces[space].color;
        addSpace(space, color);
        let todos = TodoManager.spaces[space].todos;
        for (let todo of todos) {
            contentSec.appendChild(todo.card);
            console.log("card appended");
        }
    }

    configDeleteSpace();
});

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

function configDeleteSpace() {
    removeSpaceBtns = document.querySelectorAll(".space-btn img");

    removeSpaceBtns.forEach(removeSpaceBtn => {
        removeSpaceBtn.addEventListener("click", () => {
            let confirmation = confirm("Warning!: This will delete the space and all the Todo(s) inside it.");
            if (confirmation) {
                removeSpace(removeSpaceBtn.parentElement);
                TodoManager.save();
            }
        })
    });
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
    todoForm.reset();
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

spaceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(spaceForm);
    let name = formData.get("space");
    name = name.trim();

    if (name in TodoManager.spaces) {
        alert(`A space named "${name}" already exists. Please choose a different name.`);
        return;
    }

    let color = formData.get("color");
    addSpace(name, color);
    TodoManager.save();

    let dialog = document.querySelector("#add-space");
    spaceForm.reset();

    configDeleteSpace();
    
    dialog.close();
})