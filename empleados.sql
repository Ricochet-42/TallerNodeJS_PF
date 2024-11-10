-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2024 a las 04:11:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `empleados`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `ID` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellidos` text NOT NULL,
  `Correo` text NOT NULL,
  `Contraseña` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`ID`, `Nombre`, `Apellidos`, `Correo`, `Contraseña`) VALUES
(1, 'Christopher Eduardo', 'Barrientos Guerra', 'chriscytus@gmail.com', 'cytus123'),
(2, 'Samuel', 'Juarez Lucas', 'samueljuarezlucas.90@gmail.com', 'pumas123'),
(3, 'Joselito', 'Gerardo', 'correo@gmail.com', 'pass');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `ID` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Apellidos` text NOT NULL,
  `Telefono` bigint(11) NOT NULL,
  `Correo` text NOT NULL,
  `Dirección` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`ID`, `Nombre`, `Apellidos`, `Telefono`, `Correo`, `Dirección`) VALUES
(2, 'Christoph', 'Barrientos Guerra', 4428907856, 'chriscytus@gmail.com', 'Puertas de San Miguel condominio Puerta del encino 160 numero int. 6'),
(3, 'Pedro', 'García Lopez', 4425674569, 'pedrito01@hotmail.com', '858 Kling Shoals Apt. 293'),
(4, 'Juan', 'Arias Villafaña', 2228907988, 'ariasjuanv@hotmail.com', 'Plaça Conde, 667, 5º 8º'),
(5, 'Ramon', 'Ayala Valdez', 7776589055, 'locovaldez@outlook.com', 'Avenida Malak, 3, 1º F'),
(7, 'Jose', 'De Leon Gonzales', 4427658569, 'deleon@gmail.com', 'Colonia loca 98 AV de la luz'),
(9, 'pepe', 'loool', 123123123, 'correogenerico@gmail.com', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
