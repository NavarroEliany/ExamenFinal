function logout() {
    localStorage.removeItem("token");
    location.href = "../user.html";
}