Discord Music Bot: [Orpheus](https://discord.com/api/oauth2/authorize?client_id=916244674262495232&permissions=274881054720&scope=bot%20applications.commands).
### Requirements
* Node version 16 or later.
* A [Discord bot](https://discord.com/developers/applications/) that can be used.
* An API key from [YouTube API](https://console.cloud.google.com/apis/credentials).
---
### How to Use
1. Clone this repository by running this code in cmd:
	```
		git clone https://github.com/JasonBenfrin/Orphues.git
	```
2. Make a .env file with the configurations as below:
	```json
	{
	  "clientId": "<Your Bot's Application ID>",
	  "token": "<Your Bot's token>",
	  "ytAPI": "<YouTube API key>",
	  "PORT": "3000"
	}
	```
	`clientId`: Application ID of your [Discord Bot](https://discord.com/developers/applications/).  
	`token`: Token to login to [Discord Bot](https://discord.com/developers/applications/).  
	`ytAPI`: API key from [Google console](916244674262495232).  
	`PORT`: The port to open the server to. _(optional)_
 
3. Run: `npm run start`.
---
### Replit
1. Clone this repository or fork form [here](https://replit.com/@Bhone-MM/Orpheus).
2. Make the same configuration in **"Secrets"** mentioned [above](#How-to-Use).
3. Hit **Run**. 