import { loginPage } from "./pages/loginPage";
import { homePage } from "./pages/homePage";
import { todosPage } from "./pages/todosPage";

import { validateSession } from "./helpers/validateSession";

export async function router(path, app) {
  if (path !== "/") {
    const result = await validateSession();

    if (!result) {
      window.location.pathname = "/";
    }
  }

  if (path === "/") {
    app.appendChild(loginPage());
    return;
  }

  if (path === "/home") {
    app.appendChild(homePage());
    return;
  }

  if (path === "/todos") {
    app.appendChild(todosPage());
    return;
  }
}
