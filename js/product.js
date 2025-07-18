function products() {
    document.getElementById('cardHeader').innerHTML = '<h5>Lista de productos</h5>';
    const REQRES_ENDPOINT = 'https://fakestoreapi.com/products';
    
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then(response => response.json().then(data => ({
        status: response.status,
        info: data,
    })))
    .then(result => {
        if (result.status === 200) {
            let listUsers = `
            <button type="button" class="btn btn-outline-success" onclick="createProduct()">Agregar Producto</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            result.info.forEach(element => {
                listUsers += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.title}</td>
                        <td>${element.price}</td>
                        <td>${element.description}</td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="getProducts(${element.id})">
                                Ver
                            </button>
                        </td>
                    </tr>
                `;
            });
            listUsers += `
                    </tbody>
                </table>
            `;
            document.getElementById('info').innerHTML = listUsers;
        } else {
            document.getElementById('info').innerHTML = 'No existen productos en la base de datos.';
        }
    });
}
function getProducts(idProduct) {
    const REQRES_ENDPOINT = "https://api.escuelajs.co/api/v1/products/" + idProduct;

    fetch(REQRES_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "x-api-key": "reqres-free-v1",
        },
    })
    .then(result => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then(response => {
        if (response.status === 200) {
            const element = response.body;
            const modalProduct = `
                <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">
                            <img src="${element.images}" class="img-thumbnail" alt="Imagen del producto">
                            <div class="card-body">
                                <h5 class="card-title">Información del Producto:</h5>
                                <p class="card-text">ID: ${element.id}</p>
                                <p class="card-text">Nombre Producto: ${element.title}</p>
                                <p class="card-text">Año: ${element.price}</p>
                            </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>
            `;
            document.getElementById('viewModal').innerHTML = modalProduct;
            const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
            modal.show();
        } else {
            document.getElementById('info').innerHTML = '<h3>No se encontró el producto en la API.</h3>';
        }
    });
}

function createProduct(){
    const modalUser = `
    <!-- Modal -->
    <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Crear usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="card">
                <div class="card-body">
                    <form id="formCreateProduct">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" id="title" placeholder="Title" aria-label="Title" required>
                            </div>
                            <div class="col">
                                <input type="number" class="form-control" id="price" placeholder="Price" aria-label="Price" required>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" id="description" placeholder="Description" aria-label="Description" required>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <input type="number" class="form-control" id="categoryId" placeholder="CategoryId" aria-label="CategoryId" required>
                            </div>
                            <div class="col">
                                <input type="url" class="form-control" id="images" placeholder="Images" aria-label="images" required>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col">
                                <button type="button" class="btn btn-success" onclick="saveProduct()">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        </div>
    </div>
    </div>
    `
    document.getElementById('viewModal').innerHTML = modalUser
    const modal = new bootstrap.Modal(
        document.getElementById('modalUser')
    )
    modal.show()

}

function saveProduct(){
    const form = document.getElementById('formCreateProduct')
    if(form.checkValidity()){
        const title = document.getElementById('title').value
        const price = document.getElementById('price').value
        const description = document.getElementById('description').value
        const images = [document.getElementById('images').value]
        const user = {title, price, description, categoryId, images}

        const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/products/'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(user)
        })
        .then((result) =>{
            return result.json().then(
                data =>{
                    return {
                        status: result.status,
                        body: data
                    }
                }
            )
        })
        .then((response) =>{
            console.log('entra aca', response)
            if(response.status === 201){
                document.getElementById('info').innerHTML =
                '<h3>Se guardo el producto</h3>'
            }
            else{
                document.getElementById('info').innerHTML =
                '<h3>Error al guardar el producto</h3>'
            }
            const modalId = document.getElementById('modalUser')
            const modal = bootstrap.Modal.getInstance(modalId)
            modal.hide()
        })
    }
    else{
        form.reportValidity()
    }
    
}