//accounntService.js

export async function getUserById(userId) {
  const res = await fetch(`https://final-project-csc-372.onrender.com/account/${Number(userId)}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function loginUser(username, password) {
  const res = await fetch("https://final-project-csc-372.onrender.com/account/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function addWin(userId) {
  const res = await fetch(`https://final-project-csc-372.onrender.com/account/${userId}/win`, {
    method: "POST",
  });
  return res.json();
}

export async function addLoss(userId) {
  const res = await fetch(`https://final-project-csc-372.onrender.com/account/${userId}/lose`, {
    method: "POST",
  });
  return res.json();
}

export async function createUser(username, password, email) {
  const res = await fetch("https://final-project-csc-372.onrender.com/account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  });
  return res.json();
}