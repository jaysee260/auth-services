use [jwt-factory]

create table Whitelist
(
    id int identity (1,1),
    user_id int,
    email nvarchar(50) unique not null,
    date_added datetime default getdate()

    primary key(user_id, email),
    foreign key(user_id) references Users(id)
)