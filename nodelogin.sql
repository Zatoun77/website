ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sqlBINKS13';
flush privileges;
CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;


CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `power` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `power`) VALUES ("1", 'admin', 'pass', '3');
INSERT INTO `accounts` (`id`, `username`, `password`, `power`) VALUES ("2", 'random', 'pass', '1');

