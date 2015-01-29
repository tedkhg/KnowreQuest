SHOW DATABASES;
USE hgkim;
CREATE TABLE Books (
	bid int(11) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    publisher varchar(255) NOT NULL,
    PRIMARY KEY(bid)
);

CREATE TABLE Author (
	aid int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY(aid)
);

CREATE TABLE User (
	uid int(11) NOT NULL AUTO_INCREMENT,
    id varchar(255) NOT NULL,
    pwd varchar(255) NOT null,
    PRIMARY KEY(uid)
);

CREATE TABLE Info_author (
	id int(11) NOT NULL AUTO_INCREMENT,
    bid int(11) NOT NULL,
    aid int(11) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(bid) REFERENCES Books(bid),
    FOREIGN KEY(aid) REFERENCES Author(aid)
);

CREATE TABLE Info_borrow (
    id INT(11) NOT NULL AUTO_INCREMENT,
    bid INT(11) NOT NULL,
    uid INT(11) NOT NULL,
    borrow TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    turnin TIMESTAMP,
    isActive bool DEFAULT true,
    PRIMARY KEY (id),
    FOREIGN KEY (bid)
        REFERENCES Books (bid),
    FOREIGN KEY (uid)
        REFERENCES User (uid)
);

DELIMITER ///
CREATE TRIGGER updateDate
BEFORE UPDATE ON Info_borrow
FOR EACH ROW
    BEGIN
	IF NEW.isActive <> OLD.isActive THEN
		SET NEW.turnin = CURRENT_TIMESTAMP;
	END IF;
END;
///
