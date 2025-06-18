import TodoManager from "./todoManager"
import deleteImg from "./assets/remove.png"

export function createSpace(name, color) {
    TodoManager.addSpace(name, color);
``
    let spaceOptions = document.querySelector("#space-select");
    let newOption = document.createElement("option");
    newOption.textContent = name;
    newOption.value = name;
    spaceOptions.appendChild(newOption);

    let button = document.createElement("button");
    let colorDiv = document.createElement("div");
    colorDiv.style.backgroundColor = color;
    colorDiv.classList.add("space-color");
    let deleteBtn = document.createElement("img");
    deleteBtn.src = deleteImg;
    deleteBtn.alt = "Delete";

    button.appendChild(colorDiv);
    button.append(name);
    button.appendChild(deleteBtn);

    button.classList.add("btn");
    button.classList.add("space-btn");
    button.id = name;

    return button;
}

export function removeSpace(SpaceBtn) {
    let spaceOptions = document.querySelectorAll("#space-select option");
    spaceOptions.forEach(option => {
        if (option.value == SpaceBtn.id) {
            option.remove();
        }
    })

    delete TodoManager.spaces[SpaceBtn.id];
    SpaceBtn.remove();
}