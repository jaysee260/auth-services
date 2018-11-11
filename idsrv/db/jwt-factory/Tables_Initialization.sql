use [jwt-factory]

-- trigger: whenever a user is added to this table,
-- add the user's email to the whitelist
create table Users
(
    id int identity (1,1),
    account_id int unique,
    email nvarchar(50) unique not null,
    username nvarchar(30) unique not null,
    password nvarchar(128) not null,

    primary key(id),
    foreign key(account_id) references Accounts(id)
)

create table Accounts
(
    id int identity (1,1),
    user_id int unique,

    primary key(id),
    foreign key(user_id) references Users(id)
)

create table JSONWebTokens
(
    id uniqueidentifier default newid(),
    user_id int unique,
    issued_on datetime default getdate(),
    expires_on datetime,
    modified_on datetime default getdate(),
    is_expired bit default 0,

    primary key(id),
    foreign key(user_id) references Users(id)
)