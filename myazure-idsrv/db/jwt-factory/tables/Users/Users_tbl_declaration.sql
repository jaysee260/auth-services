use [jwt-factory]

create table Users
(
    id int identity (1,1),
    first_name nvarchar(50),
    last_name nvarchar(50),
    email nvarchar(50) unique not null,
    username nvarchar(30) unique not null,
    password nvarchar(128) not null,

    primary key(id)
)