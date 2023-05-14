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


  create table purchase(
    id bigserial primary key,
    username text,
    purchase_date timestamp default current_timestamp,

  )

  create table purchase_item(
    id bigserial primary key,
    purchase_id bigint not null references purchase on delete cascade,
    name text not null,
   
    price numeric not null

  )