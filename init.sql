CREATE TABLE IF NOT EXISTS `attractions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `detail` text NOT NULL,
  `coverimage` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `attractions` (`name`, `detail`, `coverimage`) VALUES
('Phi Phi Islands', 'Beautiful islands in Krabi, Thailand.', 'https://www.tourismthailand.org/home'),
('Eiffel Tower', 'Iconic landmark in Paris, France.', 'https://www.toureiffel.paris/en');