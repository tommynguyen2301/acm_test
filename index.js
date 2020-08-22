const express = require("express"),
app = express();
//middlwares

app.use( express.urlencoded({extended: true}) )
app.use(express.json())
app.get("/", async (req, res) =>
	{
	 //var WPAPI = require( 'wpapi' );
	 //var wp = new WPAPI({ endpoint: 'http://acmuhd.com/wp-json' });

	 // Callbacks
	 //let users = await wp.users().get()
	 const https = require('https')
	 let url = 'https://acmuhd.com/wp-json/wp/v2/users'
	 https.get(url, (resp) => {
	 let data = '';

	 // A chunk of data has been recieved.
	 resp.on('data', (chunk) => {
		 data += chunk;
	 });

	 // The whole response has been received. Print out the result.
	 resp.on('end', () => {
		 console.log(JSON.parse(data));
		 let jdata = JSON.parse(data);
		 res.json(jdata)
	 });

 }).on("error", (err) => {
	 console.log("Error: " + err.message);
 });
})


//middleware
app.set("port", process.env.PORT || 3000)

app.listen(app.get("port"), () => {
	console.log(`Listening at port ${app.get("port")}`)
})
