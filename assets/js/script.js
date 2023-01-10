const listArea = document.querySelector(".list-area");
const listBox = document.querySelector(".todo-list");
const addBtn = document.querySelector(".add-btn");

let itemList = [];

const listRefresh = () => {
    let json = JSON.stringify(itemList);
    localStorage.setItem("todo-list", json);
    listEmptyCheck();
};

const listEmptyCheck = () => {
    if (itemList.length > 0) {
        listArea.classList = "list-area";

        listBox.innerHTML = "";
        itemList.forEach((item) => appendTodoEl(item));
    } else {
        listArea.classList = "list-area empty";
    }
};

const addTodoItem = () => {
    const id = Math.floor(Math.random() * 1000000);

    const obj = {
        id: id,
        todo: "",
        active: false,
    };

    itemList.push(obj);
    listRefresh();
};

const appendTodoEl = (obj) => {
    const radioImg = obj.active ? "/assets/icon/radio-fill.svg" : "/assets/icon/radio.svg";

    const li = document.createElement("li");
    li.classList = "item";
    li.dataset.id = obj.id;
    li.innerHTML = `<img class="radio-icon" data-active="${obj.active}" src="${radioImg}" onclick="onClickRadio(event);"/>
                    <input value="${obj.todo}" onkeyup="delay(function(){ onChangeTodoText(event) }, 100 );"/>
                    <img class="menu-icon" src="/assets/icon/menu.svg" onclick="onClickTodoRemove(event)" />`;
    listBox.appendChild(li);
};

const onClickRadio = (e) => {
    const el = e.target;
    const elId = el.parentNode.dataset.id;
    const active = el.dataset.active == "true" ? false : true;

    itemList.forEach((item) => {
        if (item.id == elId) {
            item.active = active;
        }
    });

    listRefresh();
};

const onChangeTodoText = (e) => {
    const el = e.target;
    const elId = el.parentNode.dataset.id;

    itemList.forEach((item) => {
        if (item.id == elId) {
            item.todo = el.value;
        }
    });

    let json = JSON.stringify(itemList);
    localStorage.setItem("todo-list", json);
};

// 키 이벤트 딜레이
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

const onClickTodoRemove = (e) => {
    const el = e.target.parentNode;
    itemList = itemList.filter((item) => item.id != el.dataset.id);
    listRefresh();
};

addBtn.addEventListener("click", addTodoItem);

const init = () => {
    const json = localStorage.getItem("todo-list");
    itemList = JSON.parse(json) ?? [];
    listEmptyCheck();
};

init();
