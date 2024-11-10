window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {

        alert("token invalido");
        window.location.href = "login.html"
    }
    document.querySelector('.btn-primary').addEventListener('click', actualiza);
    document.querySelector('.btn-secondary').addEventListener('click', borrartoken);

}

function borrartoken(){
    localStorage.removeItem('token');
    alert("Cerrando Sesion...");

    window.location.href = "login.html"

}


function actualiza() {
    var id = document.getElementById('input-id').value;
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var number = document.getElementById('input-number').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;

    if (!id ) {
        alert("Por favor complete todos los campos.");
        return;
    }
    
    axios({
        method: 'post',
        url: 'http://localhost:3000/usuarios/actualizar',
        data: {
            ID: id,
            Nombre: name,
            Apellidos: lastname,
            Telefono: number,
            Correo: mail,
            Dirección: address
        }
    }).then(function(res) {
        console.log(res);
        alert(res.data.message);  
    }).catch(function(err) {
        console.log(err);
        alert("Empleado Inexistente o error al actualizar.");
    });
}
