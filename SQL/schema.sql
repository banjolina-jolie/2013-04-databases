CREATE DATABASE chat;

USE chat;

	CREATE TABLE `messages` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `content` varchar(100),
  `userId` VARCHAR(255),
  PRIMARY KEY (`id`)
);



-- /* You can also create more tables, if you need them... */

-- /*  Execute this file from the command line by typing:
--  *    mysql < schema.sql
--  *  to create the database and the tables.*/


-- GRANT ALL PRIVILEGES ON chat.* TO banjolina@localhost IDENTIFIED BY 'OKOKOK'