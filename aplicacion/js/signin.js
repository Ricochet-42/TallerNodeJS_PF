window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {

        alert("token invalido");
        window.location.href = "login.html"
    }
    
    document.querySelector('.btn-primary').addEventListener('click', signin);
    document.querySelector('.btn-secondary').addEventListener('click', borrartoken);
}

function borrartoken(){
    localStorage.removeItem('token');
    alert("Cerrando Sesion...");

    window.location.href = "login.html"

}


function signin(){
    var name = document.getElementById('input-name').value;
    var lastname = document.getElementById('input-lastname').value;
    var number = document.getElementById('input-number').value;
    var mail = document.getElementById('input-mail').value;
    var address = document.getElementById('input-address').value;

    if (!name || !lastname || !number || !mail || !address) {
        alert("Campos Incompletos.");
        return;
    }

    
    
    axios({
        method: 'post',
        url: 'http://localhost:3000/usuarios/alta',
        data: {
            Nombre: name,
            Apellidos: lastname,
            Telefono: number,
            Correo: mail,
            Dirección: address
        }
    }).then(function(res) {
        console.log(res);
        alert("Registro exitoso");
        window.location.href = "inicio.html";
    }).catch(function(err){
        console.log(err);
    })
}