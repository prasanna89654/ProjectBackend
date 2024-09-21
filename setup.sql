-- Create the maintainer table
CREATE TABLE maintainer (
    id bigserial PRIMARY KEY,
    name text,
    position text,
    description text,
    role text,
    userid bigint
);

-- Create the multi table
CREATE TABLE multi (
    id bigserial PRIMARY KEY,
    name text,
    country text[]
);

-- Create the file table
CREATE TABLE file (
    id bigserial PRIMARY KEY,
    name text,
    country text,
    data text
);

-- Create the users table
CREATE TABLE users (
    id bigserial PRIMARY KEY,
    firstname text,
    lastname text,
    username text,
    email text,
    password text,
    role int,
    rolename text DEFAULT 'user',
    phone text,
    address text,
    ward int,
    gender int,
    dob text
);

-- Create the complaint table
CREATE TABLE complaint (
    id bigserial PRIMARY KEY,
    user_id bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    status text DEFAULT 'Pending',
    address text,
    ward text,
    category text,
    image text,
    priority text DEFAULT 'Low',
    created_at timestamp DEFAULT current_timestamp
);
