create schema leaveManagement;
use leaveManagement;

# create tables 

CREATE TABLE Faculty (
	id INT NOT NULL auto_increment ,
    name varchar(50) NOT NULL,
    mobile_no varchar(15),
    email_id varchar(50),
    password varchar(100),
    department varchar(30),
    created_on TIMESTAMP default current_timestamp,
    isdeleted boolean default 0,
    CONSTRAINT PK_faculty PRIMARY KEY (id)
);

# entrance types are : GATE , QIP, QIP(Poly), Sponsored
CREATE TABLE Student (
	id INT NOT NULL auto_increment ,
    roll_no varchar(10) NOT NULL,
    name varchar(50) NOT NULL,
    mobile_no varchar(15) NOT NULL,
    email_id varchar(50) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
    department varchar(30) NOT NULL,
    faculty_id INT,
    degree varchar(40) NOT NULL,
    specialization varchar(40) NOT NULL,
    entrance varchar(30) NOT NULL,
    remaining_casual_leave INT DEFAULT 8,
    remaining_medical_leave INT DEFAULT 7,
    created_on TIMESTAMP default current_timestamp,
    isdeleted boolean default 0,
    CONSTRAINT PK_student PRIMARY KEY (id),
    CONSTRAINT FK_Faculty FOREIGN KEY (faculty_id) REFERENCES Faculty(id)
);

# status : pending, rejected, approved
# leave_types : medical_leave, casual_leave , permission_to_attend_conference
CREATE TABLE Leave_Application (
	id INT NOT NULL auto_increment ,
    s_id INT NOT NULL ,
	f_id INT NOT NULL ,
    leave_type varchar(20) NOT NULL,
    no_of_leaves INT NOT NULL,
    starting_date DATE NOT NULL,
    ending_date DATE NOT NULL,
    reason text NOT NULL,
    document_attached boolean default 0,
    document blob,
    status varchar(10) default 'pending',
    status_comment text,
    created_on TIMESTAMP default current_timestamp,
    isdeleted boolean default 0,
    CONSTRAINT PK_leave PRIMARY KEY (id),
    CONSTRAINT FK_Student FOREIGN KEY (s_id) REFERENCES Student(id),
    CONSTRAINT FK_Faculy FOREIGN KEY (f_id) REFERENCES Faculty(id)
);

desc Student;
desc Faculty;
desc Leave_Application;

select * from Student;
select * from Faculty;
select * from Leave_Application;



