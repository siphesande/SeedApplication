DROP TABLE IF EXISTS `Categories`;
CREATE TABLE Categories (
    Id int not null auto_increment,
    Category_name char(100),
    primary key(Id),
    CONSTRAINT uc_Category_name  UNIQUE (Category_name)
    #CONSTRAINT Categories_unique UNIQUE (catagory_name)
)ENGINE=InnoDB;


DROP TABLE IF EXISTS `ComputerLanguages`;
CREATE TABLE ComputerLanguages (
    Id int not null auto_increment,
    ComputerLanguage_name char(100),
    Category_Id int(42),
    primary key(Id),
    FOREIGN KEY(Category_Id) REFERENCES Categories(Id)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Schools`;
create table Schools (
     Id int not null auto_increment,
     School_name char(100),
     primary key(Id),
     CONSTRAINT uc_School_name  UNIQUE (School_name)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Enrollments`;
CREATE TABLE Enrollments (
    Id int not null auto_increment,   
    Numbers int(42),
    enrollment_date date,
    enrollment_price decimal(42,2),
    School_Id int(42),
    FOREIGN KEY (School_Id) REFERENCES Schools(Id),
    ComputerLanguage_Id int(42),
    FOREIGN KEY (ComputerLanguage_Id) REFERENCES ComputerLanguages(Id),
    primary key(Id)
)ENGINE=InnoDB;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE  users(
Id int NOT NULL auto_increment primary key,
username VARCHAR(30) NOT NULL,
password VARCHAR(100) NOT NULL,
role VARCHAR(15) NOT NULL
);


