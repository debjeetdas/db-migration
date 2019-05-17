/* Create Table TodoList*/

CREATE TABLE `db_migration`.`TodoList` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `desc` VARCHAR(200),
  PRIMARY KEY (`id`));


/* Inserting Values */
INSERT INTO db_migration.TodoList (id,title) VALUES (1,'This is a Test');
