export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-3",
    "rounded",
    "hover:bg-blue-600",
    "mb-4",
    "mt-2"
  );

  btnHome.textContent = "Home";
  container.appendChild(btnHome);

  const addButton = document.createElement("button");
  addButton.classList.add("bg-green-500", "text-white", "p-2", "rounded", "mb-4");
  addButton.textContent = "Add Todo";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");
  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Actions";

  tr.append(th1, th2, th3, th4, th5);
  thead.appendChild(tr);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");
  table.appendChild(tbody);

  container.appendChild(title);
  container.appendChild(addButton);
  container.appendChild(table);

  fetch("http://localhost:4000/todos", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        if (todo.id > 10) return;

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("bg-red-500", "text-white", "px-2", "py-1", "rounded", "mr-2");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
          tr.remove();
        });

        const updateButton = document.createElement("button");
        updateButton.classList.add("bg-yellow-500", "text-white", "px-2", "py-1", "rounded", "mr-2");
        updateButton.textContent = "Actualizar";
        updateButton.addEventListener("click", () => {
          showUpdateTodoModal(todo, td2, td3);
        });

        td5.append(deleteButton, updateButton);
        tr.append(td1, td2, td3, td4, td5);
        tbody.appendChild(tr);
      });
    });

  addButton.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.classList.add("fixed", "inset-0", "bg-gray-600", "bg-opacity-50", "flex", "items-center", "justify-center");

    const modalContent = document.createElement("div");
    modalContent.classList.add("bg-white", "p-6", "rounded", "shadow-md", "w-1/3");

    const form = document.createElement("form");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.classList.add("block", "mb-2");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.classList.add("border", "p-2", "w-full", "mb-4");

    const completedLabel = document.createElement("label");
    completedLabel.textContent = "Completed:";
    completedLabel.classList.add("block", "mb-2", "mt-4");

    const completedInput = document.createElement("input");
    completedInput.type = "checkbox";
    completedInput.classList.add("mb-4", "mt-2");

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Agregar";
    submitButton.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded");

    form.append(titleLabel, titleInput, completedLabel, completedInput, submitButton);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const title = titleInput.value.trim();
      if (!title) {
        alert("El título no puede estar en blanco");
        return;
      }

      const newTodo = {
        title: title,
        completed: completedInput.checked,
      };

      fetch(`http://localhost:4000/todos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la solicitud. Verifica la API.");
          }
          return response.json();
        })
        .then((data) => {
          if (!data || !data.todo) {
            alert("Error: no se encontró el objeto todo en la respuesta");
            return;
          }

          const tr = document.createElement("tr");

          const tdId = document.createElement("td");
          tdId.classList.add("border", "px-4", "py-2");
          tdId.textContent = data.todo.id;

          const tdTitulo = document.createElement("td");
          tdTitulo.classList.add("border", "px-4", "py-2");
          tdTitulo.textContent = data.todo.title;

          const tdCompletado = document.createElement("td");
          tdCompletado.classList.add("border", "px-4", "py-2");
          tdCompletado.textContent = data.todo.completed ? "Sí" : "No";

          const tdOwner = document.createElement("td");
          tdOwner.classList.add("border", "px-4", "py-2");
          tdOwner.textContent = data.todo.owner;

          const tdAcciones = document.createElement("td");
          tdAcciones.classList.add("border", "px-4", "py-2");

          const deleteButton = document.createElement("button");
          deleteButton.classList.add("bg-red-500", "text-white", "px-2", "py-1", "rounded", "mr-2");
          deleteButton.textContent = "Eliminar";
          deleteButton.addEventListener("click", () => {
            tr.remove();
          });

          const updateButton = document.createElement("button");
          updateButton.classList.add("bg-yellow-500", "text-white", "px-2", "py-1", "rounded", "mr-2");
          updateButton.textContent = "Actualizar";
          updateButton.addEventListener("click", () => {
            showUpdateTodoModal(data.todo, tdTitulo, tdCompletado);
          });

          tdAcciones.append(deleteButton, updateButton);
          tr.append(tdId, tdTitulo, tdCompletado, tdOwner, tdAcciones);
          tbody.appendChild(tr);
        })
        .catch((error) => {
          alert("Hubo un error al crear la tarea: " + error.message);
        });

      modal.remove();
    });
  });

  function showUpdateTodoModal(todo, titleElement, completedElement) {
    const modal = document.createElement("div");
    modal.classList.add(
      "fixed",
      "inset-0",
      "bg-gray-600",
      "bg-opacity-50",
      "flex",
      "items-center",
      "justify-center"
    );

    const modalContent = document.createElement("div");
    modalContent.classList.add("bg-white", "p-6", "rounded", "shadow-md", "w-1/3");

    const form = document.createElement("form");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.classList.add("block", "mb-2");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = todo.title;
    titleInput.classList.add("border", "p-2", "w-full", "mb-4");

    const completedLabel = document.createElement("label");
    completedLabel.textContent = "Completed:";
    completedLabel.classList.add("block", "mb-2", "mt-4");

    const completedInput = document.createElement("input");
    completedInput.type = "checkbox";
    completedInput.checked = todo.completed;
    completedInput.classList.add("mb-4", "mt-2");

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Actualizar";
    submitButton.classList.add(
      "bg-yellow-500",
      "text-white",
      "px-4",
      "py-2",
      "rounded"
    );

    form.append(
      titleLabel,
      titleInput,
      completedLabel,
      completedInput,
      submitButton
    );
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const updatedTitle = titleInput.value.trim();
      const updatedCompleted = completedInput.checked;

      if (!updatedTitle) {
        alert("El título no puede estar en blanco");
        return;
      }

      fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          completed: updatedCompleted,
        }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          titleElement.textContent = data.todo.title;
          completedElement.textContent = data.todo.completed ? "Sí" : "No";

          modal.remove();
        })
        .catch((error) => {
          alert("Hubo un error al actualizar la tarea: " + error.message);
        });
    });
  }

  return container;
};
