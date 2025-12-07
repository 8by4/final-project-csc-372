export async function loginUser(username, password) {
  const res = await fetch("http://localhost:5000/account/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}