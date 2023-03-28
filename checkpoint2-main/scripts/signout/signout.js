let finalizaSessao = document.getElementById("closeApp");

finalizaSessao.addEventListener("click", () => {
    // remove o jwt:
    sessionStorage.removeItem("jwt");
    window.location.href = "index.html";
})