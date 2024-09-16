export const loginPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const form = document.createElement("form");

  form.classList.add(
    "flex",
    "flex-col",
    "w-1/6",
    "gap-4",
    "bg-white",
    "p-8",
    "rounded",
    "shadow-md"
  );

  const title = document.createElement("h2");

  title.classList.add("text-2xl", "font-bold", "mb-4");
  title.textContent = "Login form";

  const usernameInput = document.createElement("input");

  usernameInput.type = "text";
  usernameInput.id = "username";
  usernameInput.name = "username";
  usernameInput.required = true;
  usernameInput.classList.add(
    "w-full",
    "p-2",
    "border",
    "border-gray-300",
    "rounded"
  );
  usernameInput.placeholder = "Username";

  const passwordInput = document.createElement("input");

  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordInput.required = true;
  passwordInput.name = "password";
  passwordInput.classList.add(
    "w-full",
    "p-2",
    "border",
    "border-gray-300",
    "rounded"
  );
  passwordInput.placeholder = "Password";

  const submitButton = document.createElement("button");

  submitButton.type = "submit";
  submitButton.classList.add(
    "w-full",
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded"
  );
  submitButton.textContent = "Login";

  form.appendChild(title);
  form.appendChild(usernameInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Validación básica
    if (!username || !password) {
      document.getElementById("message").innerText =
        "Por favor, completa todos los campos.";
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/sign-in", {
        method: "POST",
        credentials: "include", // Importante para enviar las cookies de sesión
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        divError.innerText = "Credenciales inválidas";
        divError.classList.add(
          "bg-danger",
          "text-white",
          "text-center",
          "rounded",
          "p-2",
          "mt-3"
        );

        setTimeout(() => {
          divError.hidden = true;
        }, 3500);

        return;
      }

      const data = await response.json();
      console.log(data);
      window.location.pathname = "/home";
    } catch (error) {}
  });

  container.appendChild(form);

  return container;
};
