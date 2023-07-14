
drop table if exists products;
drop table if exists subcategories;
drop table if exists categories;


create table categories 
(
    id serial not null
        constraint categories_pk
            primary key,
    name varchar(255) not null,
    created_at timestamp default now(),
    updated_at timestamp default now()
);


create table subcategories 
(
    id serial not null
        constraint subcategories_pk
            primary key,
    name varchar(255) not null,
    category_id int not null
        constraint subcategories_categories_id_fk
            references categories,
    created_at timestamp default now(),
    updated_at timestamp default now()
);


/*
Product Code, Name, Quantity, Price, Product description
*/
create table products
(
    code varchar(8) not null
        constraint products_pk
            primary key,
    name varchar(255) not null,
    price numeric(10, 2) not null,
    description varchar(255) not null,
    image_url varchar(255) ,
    quantity int not null default 0,
    category_id int not null
        constraint products_categories_id_fk
            references categories,
    subcategory_id int not null
        constraint products_subcategories_id_fk
            references subcategories,
    active boolean not null default true,
    created_at timestamp default now(),
    updated_at timestamp default now()
);



