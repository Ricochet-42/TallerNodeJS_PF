window.onload = init;

function init() {

    if(!localStorage.getItem("token")) {

        alert("token invalido");
        window.location.href = "login.html"
    }
    document.querySelector('.btn-primary').addEventListener('click', baja);
}

function baja(){
    var Id = document.getElementById('input-id').value;

    if (!Id) {
        alert("Por favor ingrese un Id.");
        return;
    }

    axios({
        method: 'post',
        url: 'http://localhost:3000/usuarios/baja',
        data: {
            ID: Id
        }
    }).then(function(res) {
        console.log(res);
        alert("Borrado Exitoso");
        window.location.href = "inicio.html";
    }).catch(function(err){
        
        alert("Usuario Inexistente");
        console.log(err);
    })
}