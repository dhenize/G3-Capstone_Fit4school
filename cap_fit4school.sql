-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2025 at 04:09 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cap_fit4school`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_appmnt`
--

CREATE TABLE `tbl_appmnt` (
  `appoint_id` varchar(20) NOT NULL,
  `claim_id` varchar(20) NOT NULL,
  `appointment_date` date DEFAULT NULL,
  `appointment_time` time DEFAULT NULL,
  `status` enum('booked','resched','cancelled','completed') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_archv`
--

CREATE TABLE `tbl_archv` (
  `archive_id` varchar(20) NOT NULL,
  `appoint_id` varchar(20) NOT NULL,
  `order_id` varchar(20) NOT NULL,
  `archived_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_claim`
--

CREATE TABLE `tbl_claim` (
  `claim_id` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `ready_at` datetime DEFAULT current_timestamp(),
  `claimed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_itemlist`
--

CREATE TABLE `tbl_itemlist` (
  `item_id` varchar(150) NOT NULL,
  `measurement_id` varchar(20) NOT NULL,
  `uniform_type` enum('polo','pants','blouse','skirt','vest') DEFAULT NULL,
  `image_path` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_itemlist`
--

INSERT INTO `tbl_itemlist` (`item_id`, `measurement_id`, `uniform_type`, `image_path`, `price`) VALUES
('B Pants (Elem) L', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 325.00),
('B Pants (Elem) M', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 320.00),
('B Pants (Elem) S', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 300.00),
('B Pants (Elem) S10', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 350.00),
('B Pants (Elem) S11', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 355.00),
('B Pants (Elem) S12', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 360.00),
('B Pants (Elem) S13', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 365.00),
('B Pants (Elem) S14', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 370.00),
('B Pants (Elem) S6', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 330.00),
('B Pants (Elem) S7', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 335.00),
('B Pants (Elem) S8', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 340.00),
('B Pants (Elem) S9', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 345.00),
('B Pants (Jr_Hgh) L', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 375.00),
('B Pants (Jr_Hgh) M', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 370.00),
('B Pants (Jr_Hgh) S', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 350.00),
('B Pants (Jr_Hgh) XL', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 380.00),
('B Polo (Elem) L', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 325.00),
('B Polo (Elem) M', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 320.00),
('B Polo (Elem) S', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 300.00),
('B Polo (Elem) S10', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 350.00),
('B Polo (Elem) S11', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 355.00),
('B Polo (Elem) S12', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 360.00),
('B Polo (Elem) S13', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 365.00),
('B Polo (Elem) S14', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 370.00),
('B Polo (Elem) S6', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 330.00),
('B Polo (Elem) S7', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 335.00),
('B Polo (Elem) S8', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 340.00),
('B Polo (Elem) S9', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 345.00),
('B Polo (Jr_Hgh) L', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 375.00),
('B Polo (Jr_Hgh) M', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 370.00),
('B Polo (Jr_Hgh) S', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 350.00),
('B Polo (Jr_Hgh) XL', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 380.00),
('B Polo (Pr_Schl) L', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 225.00),
('B Polo (Pr_Schl) M', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 220.00),
('B Polo (Pr_Schl) S', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 200.00),
('B Polo (Pr_Schl) S10', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 250.00),
('B Polo (Pr_Schl) S11', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 255.00),
('B Polo (Pr_Schl) S12', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 260.00),
('B Polo (Pr_Schl) S13', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 265.00),
('B Polo (Pr_Schl) S14', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 270.00),
('B Polo (Pr_Schl) S6', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 230.00),
('B Polo (Pr_Schl) S7', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 235.00),
('B Polo (Pr_Schl) S8', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 240.00),
('B Polo (Pr_Schl) S9', '', 'polo', 'https://drive.google.com/file/d/1VhwDTLZeT69XOK6ACq92netr7HthPHjM/view?usp=drive_link', 245.00),
('B Short (Pr_Schl) L', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 225.00),
('B Short (Pr_Schl) M', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 220.00),
('B Short (Pr_Schl) S', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 200.00),
('B Short (Pr_Schl) S10', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 250.00),
('B Short (Pr_Schl) S11', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 255.00),
('B Short (Pr_Schl) S12', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 260.00),
('B Short (Pr_Schl) S13', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 265.00),
('B Short (Pr_Schl) S14', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 270.00),
('B Short (Pr_Schl) S6', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 230.00),
('B Short (Pr_Schl) S7', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 235.00),
('B Short (Pr_Schl) S8', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 240.00),
('B Short (Pr_Schl) S9', '', 'pants', 'https://drive.google.com/file/d/1oBZigHSA4lj2sA7iuCTpVG-SEAnkHpKP/view?usp=drive_link', 245.00),
('G Bls (Elem) L', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 325.00),
('G Bls (Elem) M', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 320.00),
('G Bls (Elem) S', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 300.00),
('G Bls (Elem) S10', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 350.00),
('G Bls (Elem) S11', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 355.00),
('G Bls (Elem) S12', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 360.00),
('G Bls (Elem) S13', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 365.00),
('G Bls (Elem) S14', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 370.00),
('G Bls (Elem) S6', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 330.00),
('G Bls (Elem) S7', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 335.00),
('G Bls (Elem) S8', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 340.00),
('G Bls (Elem) S9', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 345.00),
('G Bls (Jr_Hgh) L', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 375.00),
('G Bls (Jr_Hgh) M', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 370.00),
('G Bls (Jr_Hgh) S', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 350.00),
('G Bls (Jr_Hgh) XL', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 380.00),
('G Bls (Pr_Schl) L', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 225.00),
('G Bls (Pr_Schl) M', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 220.00),
('G Bls (Pr_Schl) S', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 200.00),
('G Bls (Pr_Schl) S10', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 250.00),
('G Bls (Pr_Schl) S11', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 255.00),
('G Bls (Pr_Schl) S12', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 260.00),
('G Bls (Pr_Schl) S13', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 265.00),
('G Bls (Pr_Schl) S14', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 270.00),
('G Bls (Pr_Schl) S6', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 230.00),
('G Bls (Pr_Schl) S7', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 235.00),
('G Bls (Pr_Schl) S8', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 240.00),
('G Bls (Pr_Schl) S9', '', 'blouse', 'https://drive.google.com/file/d/1NGRIzo1PBmacSqu52HiwXd65qD8zyBIO/view?usp=drive_link', 245.00),
('G Skrt (Elem) L', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 325.00),
('G Skrt (Elem) M', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 320.00),
('G Skrt (Elem) S', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 300.00),
('G Skrt (Elem) S10', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 350.00),
('G Skrt (Elem) S11', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 355.00),
('G Skrt (Elem) S12', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 360.00),
('G Skrt (Elem) S13', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 365.00),
('G Skrt (Elem) S14', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 370.00),
('G Skrt (Elem) S6', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 330.00),
('G Skrt (Elem) S7', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 335.00),
('G Skrt (Elem) S8', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 340.00),
('G Skrt (Elem) S9', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 345.00),
('G Skrt (Jr_Hgh) L', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 375.00),
('G Skrt (Jr_Hgh) M', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 370.00),
('G Skrt (Jr_Hgh) S', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 350.00),
('G Skrt (Jr_Hgh) S6', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 380.00),
('G Skrt (Pr_Schl) L', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 225.00),
('G Skrt (Pr_Schl) M', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 220.00),
('G Skrt (Pr_Schl) S', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 200.00),
('G Skrt (Pr_Schl) S10', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 250.00),
('G Skrt (Pr_Schl) S11', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 255.00),
('G Skrt (Pr_Schl) S12', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 260.00),
('G Skrt (Pr_Schl) S13', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 265.00),
('G Skrt (Pr_Schl) S14', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 270.00),
('G Skrt (Pr_Schl) S6', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 230.00),
('G Skrt (Pr_Schl) S7', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 235.00),
('G Skrt (Pr_Schl) S8', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 240.00),
('G Skrt (Pr_Schl) S9', '', 'skirt', 'https://drive.google.com/file/d/13IZMb0MHQlo7pdm86NQj4YldHD0ZpH9Q/view?usp=drive_link', 245.00);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_measure`
--

CREATE TABLE `tbl_measure` (
  `measure_id` varchar(20) NOT NULL,
  `chest` decimal(5,2) NOT NULL,
  `shoulder` decimal(5,2) NOT NULL,
  `sleeve` decimal(5,2) NOT NULL,
  `hips` decimal(5,2) NOT NULL,
  `overall_height` decimal(5,2) NOT NULL,
  `item_id` varchar(150) NOT NULL,
  `ref_stud_id` varchar(20) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `grade` enum('preschool','elementary','junior high') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_measure`
--

INSERT INTO `tbl_measure` (`measure_id`, `chest`, `shoulder`, `sleeve`, `hips`, `overall_height`, `item_id`, `ref_stud_id`, `gender`, `grade`) VALUES
('M001', 28.50, 10.20, 15.30, 26.80, 42.50, 'B Polo (Pr_Schl) S', 'STUD001', 'male', 'preschool'),
('M002', 30.20, 10.50, 16.10, 28.30, 45.20, 'B Polo (Pr_Schl) M', 'STUD001', 'male', 'preschool'),
('M003', 32.80, 11.00, 17.20, 30.10, 48.70, 'B Polo (Pr_Schl) L', 'STUD001', 'male', 'preschool');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notif`
--

CREATE TABLE `tbl_notif` (
  `notif_id` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `message` text DEFAULT NULL,
  `date_sent` datetime DEFAULT current_timestamp(),
  `rl_order_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
  `order_id` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `item_id` varchar(50) NOT NULL,
  `quantity` int(10) NOT NULL,
  `total_prc` decimal(10,2) NOT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `status` enum('pending','confirmed','on hold','to claim','completed','cancelled','void') DEFAULT NULL,
  `qr_code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_otp`
--

CREATE TABLE `tbl_otp` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `code` varchar(6) NOT NULL,
  `expires_at` datetime NOT NULL,
  `used` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_otp`
--

INSERT INTO `tbl_otp` (`id`, `email`, `code`, `expires_at`, `used`, `created_at`) VALUES
(1, 'dhenizelopez@gmail.com', '438067', '2025-11-14 13:25:56', 1, '2025-11-14 13:20:56.667807'),
(2, 'ic.dhenizekristafaith.lopez@cvsu.edu.ph', '971975', '2025-11-15 07:24:34', 1, '2025-11-15 07:19:34.399429');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_qrlog`
--

CREATE TABLE `tbl_qrlog` (
  `scan_id` varchar(20) NOT NULL,
  `order_id` varchar(20) NOT NULL,
  `scanned_by` varchar(20) NOT NULL,
  `scan_stat` enum('confirmed','completed') DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stud`
--

CREATE TABLE `tbl_stud` (
  `student_id` varchar(20) NOT NULL,
  `fname` varchar(200) NOT NULL,
  `midname` varchar(200) NOT NULL,
  `lname` varchar(200) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `grade` enum('preschool','elementary','junior highschool','senior highschool') DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_stud`
--

INSERT INTO `tbl_stud` (`student_id`, `fname`, `midname`, `lname`, `birthdate`, `gender`, `grade`, `user_id`) VALUES
('20250001', 'Maria', 'Santos', 'Garcia', '2005-03-15', 'female', 'junior highschool', 'USR1763097656637'),
('20250002', 'Juan', 'Cruz', 'Reyes', '2004-07-22', 'male', 'junior highschool', 'USR1763097656638'),
('20250003', 'Sophia', 'Lim', 'Tan', '2005-11-08', 'female', 'junior highschool', 'USR1763097656639'),
('20250004', 'Liam', 'Wong', 'Chen', '2004-09-14', 'male', 'junior highschool', 'USR1763097656640'),
('20250005', 'Isabella', 'Dela Cruz', 'Rivera', '2005-05-30', 'female', 'junior highschool', 'USR1763097656641'),
('20250006', 'Noah', 'Villanueva', 'Torres', '2004-12-03', 'male', 'junior highschool', 'USR1763097656642'),
('20250007', 'Olivia', 'Gonzales', 'Romero', '2005-08-19', 'female', 'junior highschool', 'USR1763097656643'),
('20250008', 'Ethan', 'Sy', 'Ong', '2004-04-11', 'male', 'junior highschool', 'USR1763097656644'),
('20250009', 'Ava', 'Aquino', 'Fernandez', '2005-01-25', 'female', 'junior highschool', 'USR1763097656645'),
('20251212', 'James', 'Ramos', 'Mendoza', '2004-06-17', 'male', 'junior highschool', 'USR1763097656646'),
('20251234', 'Juno', 'C.', 'Lopez', '2014-11-02', 'male', 'preschool', 'USR1763097656637');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ticket`
--

CREATE TABLE `tbl_ticket` (
  `ticket_id` varchar(20) NOT NULL,
  `order_id` varchar(20) DEFAULT NULL,
  `appoint_id` varchar(20) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `payment_time` time DEFAULT NULL,
  `payment_method` enum('cash','bank','online') DEFAULT NULL,
  `receipt_url` varchar(255) NOT NULL,
  `status` enum('unpaid','confirmed') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` varchar(20) NOT NULL,
  `fname` varchar(150) NOT NULL,
  `lname` varchar(150) NOT NULL,
  `roles` enum('parent','legal guardian','grandparent','older sibling','student') NOT NULL,
  `password` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `contact_number` varchar(20) NOT NULL,
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `fname`, `lname`, `roles`, `password`, `email`, `status`, `created_at`, `contact_number`, `student_id`) VALUES
('USR1763097656637', 'Dhenize', 'Lopez', 'parent', '$2b$12$dPoMRRms57EDxI5plsL5QeoWSOQ0oc/i9DT2h5m.tcMiazgM1lAHm', 'dhenizelopez@gmail.com', 'active', '2025-11-14 13:20:56', '09988262316', 20251234),
('USR1763162374357', 'Shai', 'Reyes', 'parent', '$2b$12$lSJJ5agDwk0S4QcybUw/dujTQs0PVK9Ds3EwQ1hJBhPzFlnIdX6be', 'ic.dhenizekristafaith.lopez@cvsu.edu.ph', 'active', '2025-11-15 07:19:34', '09991234567', 20250002);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_appmnt`
--
ALTER TABLE `tbl_appmnt`
  ADD PRIMARY KEY (`appoint_id`),
  ADD KEY `claim_id` (`claim_id`);

--
-- Indexes for table `tbl_archv`
--
ALTER TABLE `tbl_archv`
  ADD PRIMARY KEY (`archive_id`),
  ADD KEY `appoint_id` (`appoint_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `tbl_claim`
--
ALTER TABLE `tbl_claim`
  ADD PRIMARY KEY (`claim_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_itemlist`
--
ALTER TABLE `tbl_itemlist`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `tbl_measure`
--
ALTER TABLE `tbl_measure`
  ADD PRIMARY KEY (`measure_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `tbl_notif`
--
ALTER TABLE `tbl_notif`
  ADD PRIMARY KEY (`notif_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `rl_order_id` (`rl_order_id`);

--
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `qr_code` (`qr_code`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `tbl_otp`
--
ALTER TABLE `tbl_otp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_qrlog`
--
ALTER TABLE `tbl_qrlog`
  ADD PRIMARY KEY (`scan_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `scanned_by` (`scanned_by`);

--
-- Indexes for table `tbl_stud`
--
ALTER TABLE `tbl_stud`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `tbl_ticket`
--
ALTER TABLE `tbl_ticket`
  ADD PRIMARY KEY (`ticket_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `appoint_id` (`appoint_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_otp`
--
ALTER TABLE `tbl_otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_appmnt`
--
ALTER TABLE `tbl_appmnt`
  ADD CONSTRAINT `tbl_appmnt_ibfk_1` FOREIGN KEY (`claim_id`) REFERENCES `tbl_claim` (`claim_id`);

--
-- Constraints for table `tbl_archv`
--
ALTER TABLE `tbl_archv`
  ADD CONSTRAINT `tbl_archv_ibfk_1` FOREIGN KEY (`appoint_id`) REFERENCES `tbl_appmnt` (`appoint_id`),
  ADD CONSTRAINT `tbl_archv_ibfk_2` FOREIGN KEY (`appoint_id`) REFERENCES `tbl_appmnt` (`appoint_id`),
  ADD CONSTRAINT `tbl_archv_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`order_id`);

--
-- Constraints for table `tbl_claim`
--
ALTER TABLE `tbl_claim`
  ADD CONSTRAINT `tbl_claim_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`);

--
-- Constraints for table `tbl_measure`
--
ALTER TABLE `tbl_measure`
  ADD CONSTRAINT `tbl_measure_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `tbl_itemlist` (`item_id`);

--
-- Constraints for table `tbl_notif`
--
ALTER TABLE `tbl_notif`
  ADD CONSTRAINT `tbl_notif_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`),
  ADD CONSTRAINT `tbl_notif_ibfk_2` FOREIGN KEY (`rl_order_id`) REFERENCES `tbl_order` (`order_id`);

--
-- Constraints for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD CONSTRAINT `tbl_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`),
  ADD CONSTRAINT `tbl_order_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `tbl_itemlist` (`item_id`);

--
-- Constraints for table `tbl_qrlog`
--
ALTER TABLE `tbl_qrlog`
  ADD CONSTRAINT `tbl_qrlog_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`order_id`),
  ADD CONSTRAINT `tbl_qrlog_ibfk_2` FOREIGN KEY (`scanned_by`) REFERENCES `tbl_user` (`user_id`);

--
-- Constraints for table `tbl_ticket`
--
ALTER TABLE `tbl_ticket`
  ADD CONSTRAINT `tbl_ticket_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`order_id`),
  ADD CONSTRAINT `tbl_ticket_ibfk_2` FOREIGN KEY (`appoint_id`) REFERENCES `tbl_appmnt` (`appoint_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
