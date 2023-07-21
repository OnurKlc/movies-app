CREATE SCHEMA IF NOT EXISTS `moviesdb` ;

USE `moviesdb`;

CREATE TABLE `moviesdb`.`User` (
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255),
  `surname` VARCHAR(255),
  `user_type` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE
);

CREATE TABLE `moviesdb`.`Platform` (
  `platform_id` VARCHAR(255) NOT NULL,
  `platform_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`platform_id`),
  UNIQUE INDEX `platform_id_UNIQUE` (`platform_id` ASC) VISIBLE,
  UNIQUE INDEX `platform_name_UNIQUE` (`platform_name` ASC) VISIBLE
);

CREATE TABLE `moviesdb`.`Audience` (
  `username` VARCHAR(255) NOT NULL,
  `platform_id` VARCHAR(255) NOT NULL,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `platform_id_UNIQUE` (`platform_id` ASC) VISIBLE,
  INDEX `platform_id_idx` (`platform_id` ASC, `username` ASC) VISIBLE,
  CONSTRAINT `username`
    FOREIGN KEY (`username`)
    REFERENCES `moviesdb`.`User` (`username`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `platform_id`
    FOREIGN KEY (`platform_id`)
    REFERENCES `moviesdb`.`Platform` (`platform_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE `moviesdb`.`Director` (
    `username` VARCHAR(255) PRIMARY KEY,
    `nation` VARCHAR(255) NOT NULL,
    `platform_id` VARCHAR(255),
    FOREIGN KEY (`username`) REFERENCES `moviesdb`.`User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`platform_id`) REFERENCES `moviesdb`.`Platform`(`platform_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `moviesdb`.`Theatre` (
  `theatre_id` INT AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `capacity` INT NOT NULL,
  `district` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`theatre_id`),
  UNIQUE INDEX `theatre_id_UNIQUE` (`theatre_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `district_UNIQUE` (`district` ASC) VISIBLE
);

CREATE TABLE `moviesdb`.`Movie` (
  `movie_id` INT AUTO_INCREMENT,
  `director` varchar(255) NOT NULL,
  `movie_name` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `timeslot` varchar(255) NOT NULL,
  `theatre_id` INT NOT NULL,
  `avg_rating` decimal(2,0) DEFAULT NULL,
  `predecessor_id` INT DEFAULT NULL,
  PRIMARY KEY (`movie_id`),
  UNIQUE KEY `movie_name_UNIQUE` (`movie_name`),
  UNIQUE KEY `predecessor_id_UNIQUE` (`predecessor_id`),
  CONSTRAINT `predecessor_id` FOREIGN KEY (`predecessor_id`) REFERENCES `moviesdb`.`Movie` (`movie_id`),
  FOREIGN KEY (`theatre_id`) REFERENCES `moviesdb`.`Theatre`(`theatre_id`)
);

CREATE TABLE `moviesdb`.`Rating` (
    `username` VARCHAR(255),
    `movie_id` INT,
    `rating_value` DECIMAL(2, 1) NOT NULL CHECK (rating_value >= 0 AND rating_value <= 5),
    PRIMARY KEY (`username`, `movie_id`),
    FOREIGN KEY (`username`) REFERENCES `moviesdb`.`User`(`username`),
    FOREIGN KEY (`movie_id`) REFERENCES `moviesdb`.`Movie`(`movie_id`)
);

CREATE TABLE `moviesdb`.`Genre` (
  `genre_id` varchar(255) NOT NULL,
  `genre_name` varchar(255) NOT NULL,
  PRIMARY KEY (`genre_id`),
  UNIQUE KEY `genre_id_UNIQUE` (`genre_id`),
  UNIQUE KEY `genre_name_UNIQUE` (`genre_name`)
);

CREATE TABLE `moviesdb`.`Audience_Movie` (
    `username` VARCHAR(255) NOT NULL,
    `movie_id` INT NOT NULL,
    PRIMARY KEY (`username`, `movie_id`),
    FOREIGN KEY (`username`) REFERENCES `moviesdb`.`User`(`username`),
    FOREIGN KEY (`movie_id`) REFERENCES `moviesdb`.`Movie`(`movie_id`)
);

CREATE TABLE `moviesdb`.`Movie_Genre` (
    `genre_id` VARCHAR(255) NOT NULL,
    `movie_id` INT NOT NULL,
    PRIMARY KEY (`genre_id`, `movie_id`),
    FOREIGN KEY (`genre_id`) REFERENCES `moviesdb`.`Genre`(`genre_id`),
    FOREIGN KEY (`movie_id`) REFERENCES `moviesdb`.`Movie`(`movie_id`)
);

CREATE TABLE `moviesdb`.`Audience_Platform` (
    `username` VARCHAR(255) NOT NULL,
    `platform_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`username`, `platform_id`),
    FOREIGN KEY (`username`) REFERENCES `moviesdb`.`User`(`username`),
    FOREIGN KEY (`platform_id`) REFERENCES `moviesdb`.`Platform`(`platform_id`)
);

-- Insert the default data
INSERT INTO `moviesdb`.`User` (username, password, user_type) VALUES
  ('manager1', 'managerpass1', 'manager'),
  ('manager2', 'managerpass2', 'manager'),
  ('manager35', 'managerpass35', 'manager');
  
INSERT INTO `moviesdb`.`Genre` (genre_id, genre_name) VALUES
  ('80001', 'Animation'),
  ('80002', 'Comedy'),
  ('80003', 'Adventure'),
  ('80004', 'Real Story'),
  ('80005', 'Thriller'),
  ('80006', 'Drama');
  
INSERT INTO `moviesdb`.`Platform` (platform_id, platform_name) VALUES
  ('10130', 'IMDB'),
  ('10131', 'Letterboxd'),
  ('10132', 'FilmIzle'),
  ('10133', 'Filmora'),
  ('10134', 'BollywoodMDB');


DELIMITER //

CREATE TRIGGER `update_average_rating`
AFTER INSERT ON `moviesdb`.`Rating`
FOR EACH ROW
BEGIN
    DECLARE avg_rating DECIMAL(2,1);

    SELECT AVG(rating_value) INTO avg_rating
    FROM Rating
    WHERE movie_id = NEW.movie_id;

    UPDATE Movie
    SET avg_rating = avg_rating
    WHERE movie_id = NEW.movie_id;
END//

DELIMITER ;
