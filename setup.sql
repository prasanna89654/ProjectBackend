create table maintainer (
    id bigserial primary key,
    name text,
    position text,
    description text,
    role text,
    userid bigint
  )

  create table multi (
    id bigserial primary key,
    name text,
    country text[]
  )

create table complaint (
    id bigserial primary key,
    user_id bigint not null references public on delete cascade,
    title text not null,
    description text,
    status text default 'pending',
    created_at timestamp default current_timestamp
  )


  create table file (
    id bigserial primary key,
    name text,
    country text,
    data text
  )

  create table users (
    id bigserial primary key,
    firstname text,
    lastname text,
    username text,
    email text,
    password text,
    role int,
    rolename text default 'user',
    phone text,
    address text,
    ward int,
    gender int,
    dob text

  )


create table complaint(
  id bigserial primary key,
  user_id bigint not null references users on delete cascade,
  title text ,
  description text,
  status text default 'pending',
  address text,
  ward int,
  category text,
  image text,
  priority text default 'low',
  created_at timestamp default current_timestamp,
)