document.addEventListener("DOMContentLoaded", function ()
 {
    fetchCarts();
});

async function fetchCarts() {
    try {
        const response = await fetch("https://fakestoreapi.com/carts");
        const carts = await response.json();
        displayCarts(carts);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    
    }
}

function displayCarts(carts) {
    const container = document.getElementById("info");
    container.innerHTML = "<h2>Lista de compras</h2>";
    const list = document.createElement("ul");
    list.classList.add("list-group");

    carts.forEach(cart => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = `<strong>ID del usuario:</strong> ${cart.userId} <br>
                              <strong>Fecha:</strong> ${cart.date} <br>
                              <strong>Productos:</strong> ${JSON.stringify(cart.products)}`;
        list.appendChild(listItem);
    });

    container.appendChild(list);
}