#node-opskins
### A node module to help automate opskins.com

### Example

```
var opClient = new OPSkins(APIKEY) // API Key see https://opskins.com/?loc=store_account

opClient.on('ready', function() {
	console.log("OPSkins API key works");
});

opClient.on('apikeyError', function(err) {
	console.log("An error occured using API key " + err);
})

```

### Todo:

This isn't going to be a very maintained project unless it gains popularity, this was solely created for me to sell items on OPSkins without having to repeat lots of code.

- GetActiveSales
- GetStaleSales
- ResendTrade
- GetOP
- Cashout
- BumpItem
- EditItem
- ~SellItem~
- GetPriceHistory