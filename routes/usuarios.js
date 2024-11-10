const express = require('express');
const jwt = require('jsonwebtoken');
const usuarios = express.Router();
const db = require('../config/database');

usuarios.post("/login", async (req, res, next) =>{
    const { Correo, Contraseña} = req.body;
    const query = `SELECT * FROM administradores WHERE Correo = '${Correo}' AND Contraseña = '${Contraseña}';`;
    const rows = await db.query(query);

    if(Correo && Contraseña){
        if(rows.length == 1){
            const token =jwt.sign({
                ID: rows[0].ID,
                Correo: rows[0].Correo
            }, "debugkey");
            return res.status(200).json({code: 200, message: token});
        }
        else {
            return res.status(230).json({code: 401, message: "Usuario o contraseña incorrectos"});
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

usuarios.post("/alta", async (req, res, next) => {
    const { Nombre, Apellidos, Telefono, Correo, Dirección } = req.body;

    if (!Nombre || !Apellidos || !Telefono || !Correo || !Dirección) {
        return res.status(400).json({ code: 400, message: "Campos incompletos" });
    }

    try {
        // Consulta usando `db.query` con placeholders para evitar inyecciones SQL
        const query = "INSERT INTO empleados (Nombre, Apellidos, Telefono, Correo, Dirección) VALUES (?, ?, ?, ?, ?)";
        const rows = await db.query(query, [Nombre, Apellidos, Telefono, Correo, Dirección]);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "El empleado se dio de alta correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error al intentar registrar el empleado" });
    } catch (error) {
        console.error("Error en la ruta /alta:", error.message);
        return res.status(500).json({ code: 500, message: "Error en el servidor", error: error.message });
    }
});

usuarios.post("/baja", async (req, res, next) => {
    const {ID} = req.body;
    console.log(ID)

    const datos = `SELECT * FROM empleados WHERE ID =${ID};`;
    const rows1 = await db.query(datos);

    const query = `DELETE FROM empleados WHERE ID =${ID};`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({code: 200, empleado: rows1, message: "Empleado dado de baja correctamente" });
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

usuarios.get("/", async (req, res, next) => {
    const query = "SELECT * FROM empleados";
    const rows = await db.query(query);

    return res.status(200).json({code: 200, message: "Lista de todos los empleados:", empleados: rows });
});

usuarios.get("/busqueda", async (req, res, next) => {
    const { Nombre } = req.query;  // Usamos req.query para obtener los parámetros de la URL

    // Si el parámetro 'Nombre' no es proporcionado, enviar un error
    if (!Nombre) {
        return res.status(400).json({ code: 400, message: "Se requiere un nombre para la búsqueda" });
    }

    // Realizamos la búsqueda con el parámetro Nombre en la consulta SQL
    const query = `SELECT * FROM empleados WHERE LOWER(Nombre) LIKE LOWER('%${Nombre}%')`;
    try {
        const rows = await db.query(query);

        if (rows.length >= 1) {
            return res.status(200).json({ code: 200, message: "Lista de empleados:", empleados: rows });
        } else {
            return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
        }
    } catch (err) {
        return res.status(500).json({ code: 500, message: "Error en la búsqueda", error: err.message });
    }
});


usuarios.post("/actualizar", async (req, res) => {
    const { ID, Nombre, Apellidos, Telefono, Correo, Dirección} = req.body;

    if (!ID) {
        return res.status(400).json({ code: 400, message: "Se requiere un ID." });
    }

    // Definir la consulta base
    let query = "UPDATE empleados SET ";
    let params = [];

    // Añadir solo los campos que están presentes en la solicitud
    if (Nombre) {
        query += "Nombre = ?, ";
        params.push(Nombre);
    }
    if (Apellidos) {
        query += "Apellidos = ?, ";
        params.push(Apellidos);
    }
    if (Telefono) {
        query += "Telefono = ?, ";
        params.push(Telefono);
    }
    if (Correo) {
        query += "Correo = ?, ";
        params.push(Correo);
    }
    if (Dirección) {
        query += "Dirección = ?, ";
        params.push(Dirección);
    }
    // Eliminar la última coma y espacio de la consulta
    if (params.length > 0) {
        query = query.slice(0, -2); // Quita la última coma
    } else {
        return res.status(400).json({ code: 400, message: "No se proporcionaron datos para actualizar." });
    }

    // Añadir la condición WHERE para el ID
    query += " WHERE ID = ?";
    params.push(ID);

    try {
        const result = await db.query(query, params);

        if (result.affectedRows > 0) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente." });
        } else {
            return res.status(404).json({ code: 404, message: "Empleado no encontrado." });
        }
    } catch (error) {
        return res.status(500).json({ code: 500, message: "Error al actualizar", error: error.message });
    }
});


module.exports = usuarios;