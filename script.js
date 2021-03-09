let textInput = document.querySelector("#text-input");
let button = document.querySelector(".btn.add");
let todolist = document.querySelector("#todos");
let radioButtons = document.getElementsByName("importance");

//--------------- variables --------------//

window.onload = function () {
  fetchTodos();
};

function getImportance() {
  let importance;
  radioButtons.forEach((radio) => {
    if (radio.checked) {
      importance = radio.value;
    }
  });
  return importance;
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  let importance = getImportance();
  let text = textInput.value;
  if (textInput.value) {
    addTodo(text, importance);
    textInput.value = "";
  }
});

function renderTodos(todos) {
  todolist.innerHTML = "";
  todos.forEach(({ todo, importance, _id }) => {
    let li = document.createElement("li");
    li.className = importance;
    li.innerHTML = `<span>${todo}</span>
                  <label class="cblabel">
                      <input data-id=${_id} type="checkbox" />
                      <div class="check">
                        <span class="center"></span>
                      </div>
                  </label>`;

    todolist.appendChild(li);
  });
}

function fetchTodos() {
  axios
    .get("https://proatik-server.herokuapp.com/todos")
    .then((response) => {
      renderTodos(response.data);
      accrelerate();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function addTodo(text, importance) {
  axios
    .post("https://proatik-server.herokuapp.com/todos", {
      todo: text,
      completed: false,
      importance,
    })
    .then((response) => {
      fetchTodos();
    })
    .catch((error) => {
      console.log(error);
    });
}

function accrelerate() {
  let checkboxes = document.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach((cb) => {
    cb.addEventListener("change", (e) => {
      e.preventDefault();
      deleteTodo(cb.dataset.id);
    });
  });
}

function deleteTodo(id) {
  axios
    .delete(`https://proatik-server.herokuapp.com/todos/${id}`, {
      params: {
        id: "",
      },
    })
    .then((response) => {
      fetchTodos();
    })
    .catch((error) => {
      console.log(error);
    });
}
