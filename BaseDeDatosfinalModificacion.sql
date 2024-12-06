-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2024 a las 00:18:22
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `computo`
--

CREATE TABLE `computo` (
  `id_computo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_registro` datetime NOT NULL,
  `estado` int(11) NOT NULL,
  `activo` int(11) NOT NULL,
  `codigo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `computo`
--

INSERT INTO `computo` (`id_computo`, `nombre`, `descripcion`, `fecha_registro`, `estado`, `activo`, `codigo`) VALUES
(1, 'Nombre del Computo', 'Descripción del computo', '2024-09-26 14:04:54', 1, 1, 'Código de ejemplo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mobiliario`
--

CREATE TABLE `mobiliario` (
  `id_mobiliario` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `descripcion` varchar(100) CHARACTER SET latin1 COLLATE latin1_spanish_ci NOT NULL,
  `tipo` text NOT NULL,
  `estado` text NOT NULL,
  `fecha_registro` datetime NOT NULL,
  `activo` text NOT NULL,
  `codigo` varchar(100) NOT NULL,
  `ubicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mobiliarion`
--

CREATE TABLE `mobiliarion` (
  `id_mobiliarion` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo` enum('Escritorio','Silla','Armario','Otro') NOT NULL,
  `estado` enum('Nuevo','Usado','Dañado') NOT NULL,
  `fecha_registro` date NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `ubicacion` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mobiliarion`
--

INSERT INTO `mobiliarion` (`id_mobiliarion`, `nombre`, `descripcion`, `tipo`, `estado`, `fecha_registro`, `activo`, `codigo`, `ubicacion`) VALUES
(33, 'Leonardo fabio cano barrera', 'camara fotografica', 'Otro', 'Usado', '2025-06-14', 0, 'ukt-7887', 'rectoria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muebles`
--

CREATE TABLE `muebles` (
  `id_muebles` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo` enum('Escritorio','Silla','Armario','Otro') NOT NULL,
  `estado` enum('Nuevo','Usado','Dañado') NOT NULL,
  `fecha_registro` date NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `codigo` varchar(50) NOT NULL,
  `id_ubicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `muebles`
--

INSERT INTO `muebles` (`id_muebles`, `nombre`, `descripcion`, `tipo`, `estado`, `fecha_registro`, `activo`, `codigo`, `id_ubicacion`) VALUES
(0, 'uwu', 'uwuw', 'Escritorio', 'Nuevo', '2024-12-06', 1, '1', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id_persona` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apaterno` varchar(100) NOT NULL,
  `amaterno` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id_persona`, `nombre`, `apaterno`, `amaterno`, `telefono`, `correo`) VALUES
(16, 'Violeta ', 'Valera', 'Fuerte', '444555777', 'valfuerte@gmail.com'),
(17, 'Vicente', 'Vicente', 'Vanegas', '2222333', 'Vicenteuwu@icloud.com'),
(18, 'Virginia', 'Velarde ', 'Villegas', '777444555', 'Virginia@icloud.com'),
(19, 'Jazmin', 'Flores', 'Castro', '111222333', 'Jazcast@outlook.com'),
(20, 'Jacqueline', 'Torres', 'Morales', '444555666', 'JaqMorales@gmail.com'),
(21, 'Jimena', 'Reyes', 'Orizaba', '777555888', 'JimeOrizaba1@gmail.com'),
(64, 'Leonardo', 'Cano', 'Barrera', '2215761564', 'canopruebas@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resguardos`
--

CREATE TABLE `resguardos` (
  `id_resguardo` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `id_mobiliario` int(11) NOT NULL,
  `fecha_asignacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion`
--

CREATE TABLE `ubicacion` (
  `id_ubicacion` int(11) NOT NULL,
  `edificio` varchar(100) NOT NULL,
  `departamento` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ubicacion`
--

INSERT INTO `ubicacion` (`id_ubicacion`, `edificio`, `departamento`, `area`) VALUES
(68, 'D-5', '214', 'Desarrollo web'),
(69, 'Rectoria ', 'oficinas', 'prensa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `paterno` varchar(100) NOT NULL,
  `materno` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `electronico` varchar(150) NOT NULL,
  `rol` enum('Ayudante','Encargado','Supervisor','Otro') NOT NULL,
  `areas` text DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `matricula`, `nombre`, `paterno`, `materno`, `telefono`, `electronico`, `rol`, `areas`, `fecha_registro`) VALUES
(17, 'UTP0150894', 'LEONARDO FABIO ', 'CANO ', 'BARRERA', '2215754411', 'canoutp@gmail.com', 'Encargado', 'd-5', '2024-12-06 16:10:31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `computo`
--
ALTER TABLE `computo`
  ADD PRIMARY KEY (`id_computo`);

--
-- Indices de la tabla `mobiliario`
--
ALTER TABLE `mobiliario`
  ADD PRIMARY KEY (`id_mobiliario`);

--
-- Indices de la tabla `mobiliarion`
--
ALTER TABLE `mobiliarion`
  ADD PRIMARY KEY (`id_mobiliarion`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id_persona`);

--
-- Indices de la tabla `resguardos`
--
ALTER TABLE `resguardos`
  ADD KEY `fk_id_persona` (`id_persona`),
  ADD KEY `fk_id_mobiliario` (`id_mobiliario`);

--
-- Indices de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`id_ubicacion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `computo`
--
ALTER TABLE `computo`
  MODIFY `id_computo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `mobiliario`
--
ALTER TABLE `mobiliario`
  MODIFY `id_mobiliario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `mobiliarion`
--
ALTER TABLE `mobiliarion`
  MODIFY `id_mobiliarion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id_persona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `id_ubicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `resguardos`
--
ALTER TABLE `resguardos`
  ADD CONSTRAINT `fk_id_mobiliario` FOREIGN KEY (`id_mobiliario`) REFERENCES `mobiliario` (`id_mobiliario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_id_persona` FOREIGN KEY (`id_persona`) REFERENCES `personas` (`id_persona`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
