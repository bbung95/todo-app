const listArea = document.querySelector(".list-area");
const listBox = document.querySelector(".todo-list");
const addBtn = document.querySelector(".add-btn");

let itemList = [];

const listEmptyCheck = () => {
    if (itemList.length > 0) {
        listArea.classList = "list-area";
    } else {
        listArea.classList = "list-area empty";
    }
};

const addTodoItem = () => {
    console.log(listArea.childNodes);

    // const li = document.createElement("li");
    // li.classList = "item";
    // li.innerHTML = `<img src="https://via.placeholder.com/26" />
    //                 <p>texttext</p>
    //                 <img src="https://via.placeholder.com/26" />`;

    // listBox.appendChild(li);
};

addBtn.addEventListener("click", addTodoItem);

const init = () => {
    const json = localStorage.getItem("todo-list");
    itemList = JSON.parse(json) ?? [];
    listEmptyCheck();
};

init();
