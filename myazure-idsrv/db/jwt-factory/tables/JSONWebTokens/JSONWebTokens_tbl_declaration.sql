use [jwt-factory]

-- Rename to JWT_Registry
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