const listArea = document.querySelector(".list-area");
const listBox = document.querySelector(".todo-list");
const addBtn = document.querySelector(".add-btn");

let itemList = [];

const localStorageListUpdate = () => {
    let json = JSON.stringify(itemList);
    localStorage.setItem("todo-list", json);
};

// todo-list re-rendering
const listRefresh = () => {
    localStorageListUpdate();
    listEmptyCheck();
};

// todo-list check
const listEmptyCheck = () => {
    if (itemList.length > 0) {
        listArea.classList = "list-area";

        listBox.innerHTML = "";
        itemList.forEach((item) => appendTodoEl(item));
    } else {
        listArea.classList = "list-area empty";
    }
};

// todo 추가
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

// todo element create
const appendTodoEl = (obj) => {
    const radioImg = obj.active ? "/assets/icon/radio-fill.svg" : "/assets/icon/radio.svg";

    const li = document.createElement("li");
    li.classList = "item";
    li.dataset.id = obj.id;
    li.role = "listitem";
    li.innerHTML = `<a href="#" onclick="onClickRadio(event)"><img class="radio-icon" data-active="${obj.active}" src="${radioImg}" /></a>
                    <input value="${obj.todo}" onkeyup="delay(function(){ onChangeTodoText(event) }, 100 );"/>
                    <a href="#" onclick="onClickTodoRemove(event)"><img class="menu-icon" src="/assets/icon/menu.svg" /></a>`;
    listBox.appendChild(li);
};

// todo radio check
const onClickRadio = (e) => {
    const el = e.target;
    const elId = el.parentNode.parentNode.dataset.id;
    const active = el.dataset.active == "true" ? false : true;
    el.dataset.active = active;

    itemList.forEach((item) => {
        if (item.id == elId) {
            item.active = active;
        }
    });

    el.src = active ? "/assets/icon/radio-fill.svg" : "/assets/icon/radio.svg";
    localStorageListUpdate();
};

// todo-text keyup-event
const onChangeTodoText = (e) => {
    const el = e.target;
    const elId = el.parentNode.dataset.id;

    itemList.forEach((item) => {
        if (item.id == elId) {
            item.todo = el.value;
        }
    });
    localStorageListUpdate();
};

// 키 이벤트 딜레이
var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

// todo remove
const onClickTodoRemove = (e) => {
    const el = e.target.parentNode.parentNode;
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
