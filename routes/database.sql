CREATE DATABASE books;

CREATE TABLE book(
    id SERIAL PRIMARY KEY NOT NULL,
    isbn INT,
    title VARCHAR(30),
    author  VARCHAR(90)
);