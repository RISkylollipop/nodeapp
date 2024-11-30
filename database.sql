drop database hospital_testing; -- If exited
create database hospital_testing; -- Your database name
use hospital_testing;

create table patients(
patient_id int primary key auto_increment,
firstname varchar (50),
lastname varchar(50),
phone varchar(50),
email varchar (150),
date_of_birth date,
gender varchar(30),
password varchar (250),
address varchar(200),
status varchar(30)
);


create table doctors(
doctor_id int primary key auto_increment,
firstname varchar (50),
lastname varchar(50),
specialty varchar (150),
date_of_birth date,
email varchar (150),
phone varchar(50),
gender varchar(30),
password varchar (250),
date_joined date,
address varchar(200),
status varchar(30)
);
create table appointment(
appointment_id int primary key auto_increment,
firstname varchar (50),
email varchar (200),
appointment_date date,
appointment_time time,
patient_id int,
doctor_id int,
status varchar (50),
foreign key(patient_id) references patients(patient_id),
foreign key(doctor_id) references doctors(doctor_id)
);
create table admins(
admin_id int primary key auto_increment,
firstname varchar (100),
lastname varchar(100),
email varchar(100),
password varchar(200),
status varchar (50),
gender varchar(30)
);
select * from patients;
select * from doctors;
select * from appointment;
select * from admins;