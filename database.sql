CREATE DATABASE guest_list;

CREATE TABLE guest(
    todo_id SERIAL PRIMARY KEY,
    firstname VARCHAR(30),
    lastname VARCHAR(40),
    email    VARCHAR(50),
    code VARCHAR(10),
    isAttending BOOLEAN 

);