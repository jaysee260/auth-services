use [jwt-factory]

-- trigger: whenever a user is added to this table,
-- add the user's email to the whitelist
create table Users
(
    id int identity (1,1),
    --account_id int unique,
    first_name nvarchar(50),
    last_name nvarchar(50),
    email nvarchar(50) unique not null,
    username nvarchar(30) unique not null,
    password nvarchar(128) not null,

    primary key(id),
    --foreign key(account_id) references Accounts(id)
)

create table Whitelist
(
    id int identity (1,1),
    user_id int,
    email nvarchar(50) unique not null,
    date_added datetime default getdate()

    primary key(user_id, email),
    foreign key(user_id) references Users(id)
)

-- create table Accounts
-- (
--     id int identity (1,1),
--     user_id int unique,

--     primary key(id),
--     foreign key(user_id) references Users(id)
-- )

-- create table TrustedTokenIssuers
-- (
--     id uniqueidentifier default newid(),
--     name nvarchar(60),

--     primary key(id)
-- )

create table JSONWebTokens
(
    id uniqueidentifier default newid(),
    user_id int unique,
    -- issued_by uniqueidentifier,
    issued_on datetime default getdate(),
    expires_on datetime,
    modified_on datetime default getdate(),
    is_expired bit default 0,

    primary key(id),
    foreign key(user_id) references Users(id),
    -- foreign key(issued_by) references TrustedTokenIssuers(id)
)

-- CREATE TRIGGER [dbo].[tr_AddUserToWhitelist]
-- ON [dbo].[Users]
-- 	AFTER INSERT
-- AS
-- BEGIN

-- 	INSERT INTO [dbo].[Whitelist] (user_id, email)
-- 		SELECT id, email from inserted

-- END

--  insert into Users (first_name, last_name, email, username, password)
--   values ('John', 'Smith', 'jsmith@email.com', 'jsmith', '1234')
