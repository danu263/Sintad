CREATE DATABASE  IF NOT EXISTS `sintad` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sintad`;
-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: sintad
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_entidad`
--

DROP TABLE IF EXISTS `tb_entidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_entidad` (
  `id_entidad` int NOT NULL AUTO_INCREMENT,
  `id_tipo_documento` int NOT NULL,
  `nro_documento` varchar(25) NOT NULL,
  `razon_social` varchar(100) NOT NULL,
  `nombre_comercial` varchar(100) DEFAULT NULL,
  `id_tipo_contribuyente` int DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `estado` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id_entidad`),
  UNIQUE KEY `nro_documento_UNIQUE` (`nro_documento`),
  KEY `fk_tb_entidad_tb_tipo_documento1_idx` (`id_tipo_documento`),
  KEY `fk_tb_entidad_tb_tipo_contribuyente1_idx` (`id_tipo_contribuyente`),
  CONSTRAINT `tb_entidad_ibfk_2` FOREIGN KEY (`id_tipo_contribuyente`) REFERENCES `tb_tipo_contribuyente` (`id_tipo_contribuyente`),
  CONSTRAINT `tb_entidad_ibfk_3` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tb_tipo_documento` (`id_tipo_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_entidad`
--

LOCK TABLES `tb_entidad` WRITE;
/*!40000 ALTER TABLE `tb_entidad` DISABLE KEYS */;
INSERT INTO `tb_entidad` VALUES (1,3,'20505327552','SYL S.A.C','SYL CARGO NOMBRE COMERCIAL',1,'Jr. Comandante Jimenez Nro. 166 Int. a (entre Cuadra 7 y 8 Javier Padro Oeste)','79845612',_binary ''),(2,3,'20543844838','PUNTUAL EXPRESS S.A.C.','',1,'MZA. F LOTE. 29 AS.RSD.MONTECARLO II LIMA - LIMA - SAN MARTIN DE PORRE','',_binary ''),(3,3,'10410192999','ALVAREZ MACHUCA RENZO GUSTAVO','',3,'AV. LOS ALISOS MZA. G LOTE. 05 ASC. LA ALBORADA DE OQUENDO III ETAPA (CRUCE PTE OQUENDO CON AV.NESTOR GAMBETTA) PROV. CONST. DEL CALLAO - PROV. CONST. DEL CALLAO - CALLAO','',_binary ''),(4,3,'20600131037','CARNICOS MAFER S.A.C.','',2,'CAL.EL UNIVERSO NRO. 327 URB. LA CAMPIÑA ZONA CINCO (ALTURA ','',_binary ''),(5,3,'20556528218','SUMAQUINARIA S.A.C.','',2,'AV. M.SUCRE NRO. 455 DPTO. 603 LIMA - LIMA - MAGDALENA DEL MAR','',_binary ''),(6,3,'20545412528','OASIS FOODS S.A.C.','',2,'CAL. FRANCISCO MASIAS NRO. 370 URB. SAN EUGENIO (PISO 7) LIM','',_binary ''),(7,3,'20510620195','INVERSIONES PRO3 SAC','',2,'AV. AUTOPIDTA RAMIRO PRIALE LOTE. 02 A.V. PROP HUERTOS DE HU','',_binary ''),(8,3,'20498383361','REPUESTOS DAVID DIESEL E.I.R.L.','',2,'CAR.VIA EVITAMIENTO MZA. 857 LOTE. 7 SEC. IRRIGACION EL CURAL 1 AREQUIPA - AREQUIPA - CERRO COLORADO','',_binary ''),(9,6,'CNAH00003','ANHUI HAYVO PROTECTIVE PRODUCT MANUFACTURING CO.,LTD','',4,'173 FENGLE AVENUE,ECNOMIC DEVELOPMENT ZONE,QUANJIAO COUNTY','',_binary '');
/*!40000 ALTER TABLE `tb_entidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_rol`
--

DROP TABLE IF EXISTS `tb_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_rol` (
  `id_rol` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_rol`
--

LOCK TABLES `tb_rol` WRITE;
/*!40000 ALTER TABLE `tb_rol` DISABLE KEYS */;
INSERT INTO `tb_rol` VALUES (1,'Admin'),(2,'Mod');
/*!40000 ALTER TABLE `tb_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tipo_contribuyente`
--

DROP TABLE IF EXISTS `tb_tipo_contribuyente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_tipo_contribuyente` (
  `id_tipo_contribuyente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `estado` bit(1) NOT NULL,
  PRIMARY KEY (`id_tipo_contribuyente`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tipo_contribuyente`
--

LOCK TABLES `tb_tipo_contribuyente` WRITE;
/*!40000 ALTER TABLE `tb_tipo_contribuyente` DISABLE KEYS */;
INSERT INTO `tb_tipo_contribuyente` VALUES (1,'Natural Sin Negocio',_binary ''),(2,'Juridica',_binary ''),(3,'Natural Con Negocio',_binary ''),(4,'No Domiciliado',_binary '');
/*!40000 ALTER TABLE `tb_tipo_contribuyente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tipo_documento`
--

DROP TABLE IF EXISTS `tb_tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_tipo_documento` (
  `id_tipo_documento` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `estado` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tipo_documento`
--

LOCK TABLES `tb_tipo_documento` WRITE;
/*!40000 ALTER TABLE `tb_tipo_documento` DISABLE KEYS */;
INSERT INTO `tb_tipo_documento` VALUES (1,'4','CARNET DE EXTRANJERIA','CARNET DE EXTRANJERIA',_binary ''),(2,'7','PASAPORTE','PASAPORTE',_binary ''),(3,'11','PARTIDA DE NACIMIENTO - IDENTIDAD','PARTIDA DE NACIMIENTO - IDENTIDAD',_binary ''),(4,'99','OTROS','OTROS',_binary ''),(5,'6','RUC','REGISTRO UNICO DEL CONTRIBUYENTE',_binary ''),(6,'1','DNI','DOCUMENTO NACIONAL DE IDENTIDAD',_binary '');
/*!40000 ALTER TABLE `tb_tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario`
--

DROP TABLE IF EXISTS `tb_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `dni` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `estado` bit(1) DEFAULT NULL,
  `token` varchar(256) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario`
--

LOCK TABLES `tb_usuario` WRITE;
/*!40000 ALTER TABLE `tb_usuario` DISABLE KEYS */;
INSERT INTO `tb_usuario` VALUES (1,76510882,'Alex','Montes','montes.alex@pucp.edu.pe','2021-02-03 18:49:57','2021-02-03 18:49:57',_binary '',NULL,'12345');
/*!40000 ALTER TABLE `tb_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario_has_rol`
--

DROP TABLE IF EXISTS `tb_usuario_has_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuario_has_rol` (
  `tb_id_usuario` int NOT NULL,
  `tb_id_rol` int NOT NULL,
  PRIMARY KEY (`tb_id_usuario`,`tb_id_rol`),
  KEY `fk_tb_usuario_has_tb_rol_tb_rol1_idx` (`tb_id_rol`),
  KEY `fk_tb_usuario_has_tb_rol_tb_usuario_idx` (`tb_id_usuario`),
  CONSTRAINT `fk_tb_usuario_has_tb_rol_tb_rol1` FOREIGN KEY (`tb_id_rol`) REFERENCES `tb_rol` (`id_rol`),
  CONSTRAINT `fk_tb_usuario_has_tb_rol_tb_usuario` FOREIGN KEY (`tb_id_usuario`) REFERENCES `tb_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario_has_rol`
--

LOCK TABLES `tb_usuario_has_rol` WRITE;
/*!40000 ALTER TABLE `tb_usuario_has_rol` DISABLE KEYS */;
INSERT INTO `tb_usuario_has_rol` VALUES (1,1);
/*!40000 ALTER TABLE `tb_usuario_has_rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-04 16:03:42
