"use strict";

const input = document.querySelector(".todo__input"),
  formAdd = document.querySelector(".todo__field"),
  clearBtn = document.querySelector(".todo__manage--btn"),
  itemList = document.querySelector(".todo__list"),
  sum = document.querySelector(".todo__manage--sum"),
  todos = [];

sum.textContent = 0;

function sumChange() {
  sum.innerHTML = todos.length;
}

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  let newTask = input.value;

  if (!newTask) {
    alert("Input task please");
  }

  if (newTask) {
    if (newTask.length > 19) {
      newTask = `${newTask.substring(0, 20)}...`;
    }

    todos.push(newTask);

    createTasks(todos, itemList);
    sumChange();
  }

  e.target.reset();
});

function createTasks(arr, list) {
  list.innerHTML = "";

  arr.forEach((item) => {
    list.innerHTML += `
    <li class="todo__item">
    <input class="todo__text" type="text" value="${item}" readonly />

          <div class="todo__btns-inner">
            <button class="btn-reset todo__btn todo__btn--edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path
                  d="M18.414 2c-.256 0-.512.098-.707.293l-2 2-1.414 1.414L3 17v4h4L21.707 6.293c.391-.391.391-1.024 0-1.414l-2.586-2.586A.9973.9973 0 0 0 18.414 2zm0 2.414 1.172 1.172-1.293 1.293-1.172-1.172 1.293-1.293zm-2.707 2.707 1.172 1.172L6.1718 19H5v-1.1719l10.707-10.707z"
                />
              </svg>
            </button>
            <button class="btn-reset todo__btn todo__btn--delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                <path
                  d="M15 4c-.5234 0-1.0586.1836-1.4375.5625C13.1835 4.9415 13 5.4765 13 6v1H7v2h1v16c0 1.6445 1.3555 3 3 3h12c1.6445 0 3-1.3555 3-3V9h1V7h-6V6c0-.5234-.1836-1.0586-.5625-1.4375C20.0585 4.1835 19.5235 4 19 4Zm0 2h4v1h-4Zm-5 3h14v16a.997.997 0 0 1-1 1H11a.997.997 0 0 1-1-1Zm2 3v11h2V12Zm4 0v11h2V12Zm4 0v11h2V12Z"
                />
              </svg>
            </button>
          </div>
    </li>`;
  });

  document.querySelectorAll(".todo__btn--edit").forEach((item, i) => {
    item.addEventListener("click", () => {
      let taskItem = item.parentElement.parentElement.firstElementChild;

      item.classList.toggle("btn-active");

      if (item.classList.contains("btn-active")) {
        taskItem.removeAttribute("readonly");
        taskItem.focus();
      } else {
        taskItem.setAttribute("readonly", "readonly");
        if (taskItem.value.length > 19) {
          taskItem.value = `${taskItem.value.substring(0, 20)}...`;
        }
      }
    });
  });

  document.querySelectorAll(".todo__btn--delete").forEach((item, i) => {
    item.addEventListener("click", () => {
      item.parentElement.remove();
      todos.splice(i, 1);
      createTasks(todos, itemList);
      sumChange();
    });
  });
}

clearBtn.addEventListener("click", () => {
  itemList.innerHTML = "";
  todos.splice(0, todos.length);
  sumChange();
});

createTasks(todos, itemList);
