CREATE TRIGGER [dbo].[tr_AddUserToWhitelist]
ON [dbo].[Users]
	AFTER INSERT
AS
BEGIN

	INSERT INTO [dbo].[Whitelist] (user_id, email)
		SELECT id, email from inserted

END