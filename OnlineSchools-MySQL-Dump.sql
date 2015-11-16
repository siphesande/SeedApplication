--use spaza;

-- MySQL dump 10.13  Distrib 5.6.23, for osx10.10 (x86_64)
--
-- Host: localhost    Database: spaza
-- ------------------------------------------------------
-- Server version	5.6.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Enrollments_csv`
--

DROP TABLE IF EXISTS `Enrollments_csv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Enrollments_csv` (
  `school` varchar(45) NOT NULL,
  `date` date NOT NULL,
  `course` varchar(45) NOT NULL,
  `numbers` int(11) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enrollments_csv_csv`
--

LOCK TABLES `Enrollments_csv` WRITE;
/*!40000 ALTER TABLE `Enrollments_csv` DISABLE KEYS */;
INSERT INTO `Enrollments_csv` VALUES ('edX','2015-06-20','Bootstrap',3,7.00,21.00),('w3schools','2015-04-23','Bootstrap',3,7.00,21.00),('Codecademy','2015-01-23','Ruby',3,7.00,21.00),('Codecademy','2015-01-23','HTML & CSS',3,7.00,21.00),('w3schools','2015-01-23','C++',3,3.50,10.50),('edX','2015-01-23','Javascript',4,4.50,18.00),('Codecademy','2015-01-23','Python',4,4.50,18.00),('edX','2015-01-23','SQL',4,4.50,18.00);
UNLOCK TABLES;



