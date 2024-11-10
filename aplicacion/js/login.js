window.onload = init;

function init() {
    
    localStorage.removeItem('token');
    if(!localStorage.getItem("token")) {

        document.querySelector('.btn-primary').addEventListener('click', login);
    }
    
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;


    axios({
        method: 'post',
        url: 'http://localhost:3000/usuarios/login',
        data: {
            Correo: mail,
            Contraseña: pass
        }
    }).then(function(res) {
        if(res.data.code === 200){
            localStorage.setItem("token", res.data.message);
            window.location.href = "inicio.html";
        }

        else{
            alert("Usuario o contraseña incorrectos");
        }
    }).catch(function(err){
        console.log(err);
    })
}