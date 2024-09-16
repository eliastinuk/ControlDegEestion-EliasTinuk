export const validateSession = async () => {
  const response = await fetch("http://localhost:4000/auth/session", {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
