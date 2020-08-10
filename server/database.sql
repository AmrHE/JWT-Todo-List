CREATE DATABASE auth_todo_list;

--check if extension exists

--command ==> "create extension if not exists "uuid-ossp";"

--users
CREATE TABLE  users(
    user_id UUID DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

--todos 
CREATE TABLE todos(
    todo_id SERIAL,
    user_id UUID,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (todo_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


--fake users data
insert into users (user_name, user_email, user_password) values ('Jacob', 'jacob@gmail.com', 'kthl8822');

--fake todos data
insert into todos (user_id, description) values ('c4154382-15ca-4c74-b4da-fbdc4c9052d2', 'Play Piano');