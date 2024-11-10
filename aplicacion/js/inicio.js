window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {

        alert("token invalido");
        window.location.href = "login.html"
    }
    
    document.querySelector('.btn-primary').addEventListener('click', borrartoken);
    obtenerEmpleados();

}

function borrartoken(){
    localStorage.removeItem('token');
    alert("Cerrando Sesion...");

    window.location.href = "login.html"

}






function obtenerEmpleados() {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/usuarios', {
        headers: { Authorization: token } 
    })
    .then(response => {
        if(response.data.code === 200) {
            mostrarEmpleados(response.data.empleados);
        } else {
            alert("Error al cargar los empleados.");
        }
    })

.catch(error => {
    console.error(error);
    alert("Hubo un problema al obtener los empleados.");
});
}

function mostrarEmpleados(empleados) {
const resultadoDiv = document.getElementById('resultado');
resultadoDiv.innerHTML = "";

empleados.forEach(empleado => {
    const empleadoInfo = document.createElement('div');
    empleadoInfo.className = "empleado";
    empleadoInfo.innerHTML = `
        <p><strong>ID:</strong> ${empleado.ID}</p>
        <p><strong>Nombre:</strong> ${empleado.Nombre}</p>
        <p><strong>Apellidos:</strong> ${empleado.Apellidos}</p>
        <p><strong>Teléfono:</strong> ${empleado.Telefono}</p>
        <p><strong>Correo:</strong> ${empleado.Correo}</p>
        <p><strong>Dirección:</strong> ${empleado.Dirección}</p>
        <hr>
    `;
    resultadoDiv.appendChild(empleadoInfo);
    });
}