# myazure-idsrv

My identity server hosted in Azure.
Hosts a collection of authentication related services.

- jwt-factory service issues tokens to users on a whitelist.
- user-registration service handles the creation of users and their insertion into the whitelist.
- session-manager service verifies the integrity of tokens issued by the identity server.