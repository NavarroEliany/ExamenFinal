document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password)
});


function login(username, password){
    localStorage.removeItem('token')
    let message = ''
    let alertType = ''
    const REQRES_ENDPOINT = 'https://fakestoreapi.com/users'
    fetch(REQRES_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        },
        body: JSON.stringify({username, password})
    })
    .then((response) =>{
        if(response.status === 200){
            alertType = 'success'
            message = 'Inicio de sesion exitoso'
            alertBuilder(alertType, message)
            localStorage.setItem('token', "asdasdadasd12345")
            setTimeout(() =>{
                location.href = '../user/user.html'
            }, 3000)//tiempo de espera para entrar a la pagina 
            
        } 
        else {
            alertType = 'danger'
            message = 'Correo o contraseña incorrectos'
            alertBuilder(alertType, message)
        }
        console.log('respuesta del servicio', response)

    })
    .catch((error) =>{
        alertType = 'danger'
        message = 'Ocurrio un error inesperado'
        console.log('error en el servicio', error)
        alertBuilder(alertType, message)
    })



}

function alertBuilder(alertType, message) {
    const alert = `
        <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    document.getElementById('mensaje').innerHTML = alert;
}