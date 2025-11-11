-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2025 at 02:05 PM
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
  `appointment_id` int(11) NOT NULL,
  `claim_id` int(11) NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `status` enum('booked','resched','cancelled','completed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_archv`
--

CREATE TABLE `tbl_archv` (
  `archive_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `archived_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_audit`
--

CREATE TABLE `tbl_audit` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action_description` text NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `affected_tbl` varchar(100) NOT NULL,
  `affected_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_claim`
--

CREATE TABLE `tbl_claim` (
  `claim_id` int(11) NOT NULL,
  `inprod_id` int(11) NOT NULL,
  `ready_at` datetime NOT NULL DEFAULT current_timestamp(),
  `claimed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inprod`
--

CREATE TABLE `tbl_inprod` (
  `inprod_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `started_at` datetime NOT NULL DEFAULT current_timestamp(),
  `completed_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_inventory`
--

CREATE TABLE `tbl_inventory` (
  `item_id` varchar(150) NOT NULL,
  `stock_level` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `last_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `uniform_type` enum('Polo','Pants','Blouse','Skirt') NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_measurement`
--

CREATE TABLE `tbl_measurement` (
  `measurement_id` int(11) NOT NULL,
  `item_id` varchar(150) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `grade_level` enum('Preschool','Elementary','Junior High') NOT NULL,
  `chest` decimal(5,2) NOT NULL,
  `shoulder` decimal(5,2) NOT NULL,
  `sleeve` decimal(5,2) NOT NULL,
  `hips` decimal(5,2) NOT NULL,
  `overall_height` decimal(5,2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notif`
--

CREATE TABLE `tbl_notif` (
  `notif_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `data_sent` datetime NOT NULL DEFAULT current_timestamp(),
  `rl_order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` varchar(150) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','confirmed','on_hold','in_prod','to_claim','completed','cancelled','void') NOT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_qrlog`
--

CREATE TABLE `tbl_qrlog` (
  `scan_id` int(11) NOT NULL,
  `qr_code` varchar(255) NOT NULL,
  `scanned_by` int(11) NOT NULL,
  `scan_stat` enum('confirmed','completed') NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `affected_tbl` varchar(100) NOT NULL,
  `affected_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stud`
--

CREATE TABLE `tbl_stud` (
  `student_id` int(11) NOT NULL,
  `full_name` varchar(300) NOT NULL,
  `birthdate` date NOT NULL,
  `gender` enum('male','female') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ticket`
--

CREATE TABLE `tbl_ticket` (
  `ticket_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `payment_date` date NOT NULL,
  `payment_time` time NOT NULL,
  `payment_method` enum('cash','bank','online') NOT NULL,
  `receipt_url` varchar(255) NOT NULL,
  `status` enum('unpaid','confirmed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL,
  `fname` varchar(150) NOT NULL,
  `lname` varchar(150) NOT NULL,
  `roles` enum('user_pr','user_gp','user_lg','user_ols','user_std','admin','accountant') NOT NULL,
  `password` varchar(150) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `email` varchar(150) NOT NULL,
  `status` enum('active','inactive','unverified') NOT NULL DEFAULT 'unverified',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_appmnt`
--
ALTER TABLE `tbl_appmnt`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `claim_id` (`claim_id`);

--
-- Indexes for table `tbl_archv`
--
ALTER TABLE `tbl_archv`
  ADD PRIMARY KEY (`archive_id`),
  ADD KEY `fk_user_appointment` (`appointment_id`),
  ADD KEY `fk_user_order` (`order_id`);

--
-- Indexes for table `tbl_audit`
--
ALTER TABLE `tbl_audit`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_claim`
--
ALTER TABLE `tbl_claim`
  ADD PRIMARY KEY (`claim_id`),
  ADD KEY `inprod_id` (`inprod_id`);

--
-- Indexes for table `tbl_inprod`
--
ALTER TABLE `tbl_inprod`
  ADD PRIMARY KEY (`inprod_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `tbl_inventory`
--
ALTER TABLE `tbl_inventory`
  ADD PRIMARY KEY (`item_id`),
  ADD UNIQUE KEY `item_id` (`item_id`),
  ADD UNIQUE KEY `item_id_2` (`item_id`);

--
-- Indexes for table `tbl_measurement`
--
ALTER TABLE `tbl_measurement`
  ADD PRIMARY KEY (`measurement_id`),
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
  ADD UNIQUE KEY `item_id` (`item_id`),
  ADD KEY `user_id` (`user_id`);

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
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `IDX_da03ffed3d54f7872792df358f` (`email`),
  ADD UNIQUE KEY `REL_f764fac79b0f75ab0b2967d19e` (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_appmnt`
--
ALTER TABLE `tbl_appmnt`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_archv`
--
ALTER TABLE `tbl_archv`
  MODIFY `archive_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_audit`
--
ALTER TABLE `tbl_audit`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_claim`
--
ALTER TABLE `tbl_claim`
  MODIFY `claim_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_inprod`
--
ALTER TABLE `tbl_inprod`
  MODIFY `inprod_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_measurement`
--
ALTER TABLE `tbl_measurement`
  MODIFY `measurement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_notif`
--
ALTER TABLE `tbl_notif`
  MODIFY `notif_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_otp`
--
ALTER TABLE `tbl_otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_qrlog`
--
ALTER TABLE `tbl_qrlog`
  MODIFY `scan_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_stud`
--
ALTER TABLE `tbl_stud`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `fk_user_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `tbl_appmnt` (`appointment_id`),
  ADD CONSTRAINT `fk_user_order` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`order_id`);

--
-- Constraints for table `tbl_audit`
--
ALTER TABLE `tbl_audit`
  ADD CONSTRAINT `tbl_audit_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`);

--
-- Constraints for table `tbl_claim`
--
ALTER TABLE `tbl_claim`
  ADD CONSTRAINT `tbl_claim_ibfk_1` FOREIGN KEY (`inprod_id`) REFERENCES `tbl_inprod` (`inprod_id`);

--
-- Constraints for table `tbl_inprod`
--
ALTER TABLE `tbl_inprod`
  ADD CONSTRAINT `tbl_inprod_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`order_id`);

--
-- Constraints for table `tbl_measurement`
--
ALTER TABLE `tbl_measurement`
  ADD CONSTRAINT `tbl_measurement_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`);

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
  ADD CONSTRAINT `tbl_order_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`);

--
-- Constraints for table `tbl_qrlog`
--
ALTER TABLE `tbl_qrlog`
  ADD CONSTRAINT `tbl_qrlog_ibfk_1` FOREIGN KEY (`scanned_by`) REFERENCES `tbl_user` (`user_id`);

--
-- Constraints for table `tbl_ticket`
--
ALTER TABLE `tbl_ticket`
  ADD CONSTRAINT `tbl_ticket_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`order_id`),
  ADD CONSTRAINT `tbl_ticket_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `tbl_appmnt` (`appointment_id`);

--
-- Constraints for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD CONSTRAINT `FK_f764fac79b0f75ab0b2967d19ea` FOREIGN KEY (`student_id`) REFERENCES `tbl_stud` (`student_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
