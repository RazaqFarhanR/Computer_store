-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2022 at 05:54 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `computer_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', '2022-01-14 01:03:57', '2022-04-08 13:31:52'),
(3, 'farhan', 'farhan', 'd1bbb2af69fd350b6d6bd88655757b47', '2022-02-03 03:46:43', '2022-02-03 03:46:43'),
(8, 'makasih666', 'makasih666', 'dfe779f02416776f6ba9915cddac1777', '2022-04-08 13:20:42', '2022-04-09 09:54:47');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `name`, `phone`, `address`, `image`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Customer', '082987345234', 'malang', 'img1648078161007.png', 'customer', '25b57f7ac4cfb69b77382467d3481f26', '2022-02-04 02:03:21', '2022-04-09 10:01:02'),
(3, 'Han', '082123987456', 'malang', 'img1648078105171.png', 'han', '3ac340832f29c11538fbe2d6f75e8bcc', '2022-02-10 06:55:21', '2022-03-23 23:28:25'),
(5, 'farhan', '999', 'kediri', 'img1648078061750.png', 'farhan', 'd1bbb2af69fd350b6d6bd88655757b47', '2022-02-17 01:13:21', '2022-03-23 23:27:41'),
(10, 'razaq', '12345223', 'Kediri', 'img1648599284674.png', 'razaq', '1c8880c59f4dfe2184a3d379312c44bd', '2022-03-29 03:32:50', '2022-03-30 00:14:44');

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id` int(11) NOT NULL,
  `transaksi_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` double DEFAULT NULL,
  `qty` double DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id`, `transaksi_id`, `product_id`, `price`, `qty`, `createdAt`, `updatedAt`) VALUES
(1, 3, 1, 320000, 1, '2022-02-16 04:26:39', '2022-02-16 04:26:39'),
(2, 3, 4, 1500000, 1, '2022-02-16 04:26:39', '2022-02-16 04:26:39'),
(3, 4, 1, 320000, 1, '2022-02-16 04:27:23', '2022-02-16 04:27:23'),
(4, 4, 4, 1500000, 1, '2022-02-16 04:27:23', '2022-02-16 04:27:23'),
(5, 5, 1, 320000, 1, '2022-02-16 04:29:36', '2022-02-16 04:29:36'),
(6, 7, 1, 320000, 1, '2022-03-30 01:22:37', '2022-03-30 01:22:37'),
(7, 7, 4, 1500000, 1, '2022-03-30 01:22:37', '2022-03-30 01:22:37');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` double DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `name`, `price`, `stock`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Rexus Legionare mx9', 320000, 99, 'img1644294269336.jpg', '2022-02-08 04:24:29', '2022-02-08 04:24:29'),
(4, 'HyperX cloud 2 wireless', 1500000, 99, 'img1644985007762.jpg', '2022-02-16 04:16:47', '2022-02-16 04:16:47'),
(5, 'Intel i3 10100f', 1350000, 99, 'img1648604131900.jpeg', '2022-03-30 01:35:31', '2022-04-09 10:00:38');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220110014051-create-product.js'),
('20220110014754-create-admin.js'),
('20220110014926-create-customer.js'),
('20220110015158-create-transaksi.js'),
('20220110015353-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `transaksi_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `waktu` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`transaksi_id`, `customer_id`, `waktu`, `createdAt`, `updatedAt`) VALUES
(3, 3, '2022-02-16 00:00:00', '2022-02-16 04:26:39', '2022-02-16 04:26:39'),
(4, 1, '2022-02-16 00:00:00', '2022-02-16 04:27:23', '2022-02-16 04:27:23'),
(5, 1, '2022-02-16 00:00:00', '2022-02-16 04:29:36', '2022-02-16 04:29:36'),
(6, 1, '2022-03-30 00:00:00', '2022-03-30 01:21:45', '2022-03-30 01:21:45'),
(7, 1, '2022-03-30 00:00:00', '2022-03-30 01:22:37', '2022-03-30 01:22:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaksi_id` (`transaksi_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`transaksi_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `transaksi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`transaksi_id`) REFERENCES `transaksi` (`transaksi_id`),
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
