window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {

        alert("token invalido");
        window.location.href = "login.html"
    }
    document.querySelector('.btn-primary').addEventListener('click', busqueda);
}

function busqueda() {
    var name = document.getElementById('input-name').value;

    // Validar que el nombre no esté vacío
    if (!name) {
        alert("Por favor ingrese un nombre.");
        return;
    }

    axios({
        method: 'get',
        url: `http://localhost:3000/usuarios/busqueda?Nombre=${name}`  // Usamos el parámetro Nombre en la URL
    }).then(function(res) {
        console.log(res);

        // Verificar si hay empleados en la respuesta
        if (res.data.empleados && res.data.empleados.length > 0) {
            // Mostrar los resultados en el HTML
            mostrarEmpleados(res.data.empleados);
        } else {
            alert("No se encontraron empleados con ese nombre.");
        }
    }).catch(function(err) {
        console.log(err);
        alert("Hubo un error al buscar los empleados, puede que no existan.");
    });
}

function mostrarEmpleados(empleados) {
    const resultadoDiv = document.getElementById('resultado');  // Un contenedor para mostrar los resultados
    resultadoDiv.innerHTML = '';  // Limpiar el contenedor antes de agregar los nuevos resultados

    empleados.forEach(empleado => {
        const div = document.createElement('div');
        div.classList.add('empleado');
        div.innerHTML = `
            <p>ID: ${empleado.ID}</p>
            
            <p>Nombre: ${empleado.Nombre}</p>
            <p>Apellidos: ${empleado.Apellidos}</p>
            <p>Correo: ${empleado.Correo}</p>
            <p>Telefono: ${empleado.Telefono}</p>
            <p>Dirección: ${empleado.Dirección}</p>

            <hr>
        `;
        resultadoDiv.appendChild(div);  
    });
}
