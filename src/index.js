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

let tasks = document.querySelectorAll(".task-btn");
let spaces = document.querySelectorAll(".space-btn");
let allSpacesBtn = document.querySelector("#all-spaces");

let activeTask = document.querySelector("#today-btn");
let activeSpace = document.querySelector("#all-spaces");

let titleElement = document.querySelector(".left .title");

function setActiveTask(task) {
    activeTask.classList.remove("btn-active");
    activeTask = task;
    activeTask.classList.add("btn-active");

    titleElement.textContent = task.dataset.title;
    console.log(titleElement);
}

function setActiveSpace(space) {
    activeSpace.classList.remove("btn-active");
    activeSpace = space;
    activeSpace.classList.add("btn-active");
}

document.addEventListener("DOMContentLoaded", () => {
    TodoManager.load();

    for (let space in TodoManager.spaces) {
        let color = TodoManager.spaces[space].color;
        addSpace(space, color);
    }
    setActiveTask(document.querySelector("#pending-btn"));
    setActiveSpace(document.querySelector("#all-spaces"));
    TodoManager.displayCards(activeTask, activeSpace);

    configSpaces();
    configTodos();
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

function configSpaces() {
    const spacesSection = document.querySelector(".spaces");

    spacesSection.addEventListener("click", (e) => {
        const button = e.target.closest(".space-btn");
        if (!button) return;

        if (!e.target.matches("img")) {
            setActiveSpace(button);
            TodoManager.displayCards(activeTask, activeSpace);
        }

        if (e.target.tagName === "IMG") {
            const confirmation = confirm("Warning!: This will delete the space and all the Todo(s) inside it.");
            if (confirmation) {
                removeSpace(button);
                TodoManager.save();
                TodoManager.displayCards(activeTask, activeSpace);
            }
        }
    });
}


function configTodos() {
    let content = document.querySelector(".content");

    content.addEventListener("click", (e) => {
        const card = e.target.closest(".card");

        if (!card) return;

        if (e.target.classList.contains("remove-todo-btn")) {
            e.stopPropagation();
            let confirmation = confirm("Warning!: This will delete the todo permanently.");
            if (confirmation) {
                TodoManager.removeTodo(card);
                TodoManager.save();
                TodoManager.displayCards(activeTask, activeSpace);
            }
        }

        if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
            e.stopPropagation();
            TodoManager.toggleStatus(card);
            TodoManager.save();
            TodoManager.displayCards(activeTask, activeSpace);
        }

        if (!e.target.closest(".remove-todo-btn") && !(e.target.tagName === "INPUT" && e.target.type === "checkbox")) {
            let sidebar = TodoManager.getSidebar(card);
            let rightSec = document.querySelector(".right");
            rightSec.innerHTML = '';
            rightSec.appendChild(sidebar);

            let editTodoDoneBtn = document.querySelector("#edit-todo-done");
            let editTodoForm = document.querySelector(".right form");

            editTodoDoneBtn.addEventListener("click", () => {
                rightSec.innerHTML = '';
            });

            editTodoForm.addEventListener("submit", (e) => {
                e.preventDefault();
                let formData = new FormData(editTodoForm);
                let title = formData.get("title");
                let description = formData.get("description");
                let space = formData.get("space");
                let priority = formData.get("priority");
                let dueDate = formData.get("due-date");

                let todo = TodoManager.getTodo(card);
                todo.title = title;
                todo.description = description;
                todo.space = space;
                todo.priority = priority;
                todo.dueDate = dueDate;

                TodoManager.save();
                TodoManager.displayCards(activeTask, activeSpace);

                rightSec.innerHTML = '';
            });
        }
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

    TodoManager.displayCards(activeTask, activeSpace);

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

    setActiveSpace(document.querySelector(`#${name}`));
    TodoManager.displayCards(activeTask, activeSpace);

    let dialog = document.querySelector("#add-space");
    spaceForm.reset();

    dialog.close();
})

tasks.forEach(task => {
    task.addEventListener("click", () => {
        setActiveTask(task);
        TodoManager.displayCards(activeTask, activeSpace);
    })
})

allSpacesBtn.addEventListener("click", () => {
    setActiveSpace(allSpacesBtn);
    TodoManager.displayCards(activeTask, activeSpace);
})