const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const app = express();
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors())
/*https://www.digitalocean.com/community/tutorials/an-introduction-to-json*/

const database = {

	entries : [
		{

			id: '0',
			added: new Date(),
			text : 'bacon',
			sites: [
				{
					name: 'titleX',
					url:'www.gxxgle.com',
					description : 'this is an article about X'
					//author
				},
				{
					name: 'titleY',
					url:'www.gyygle.com',
					description : 'this is an article about Y'
					//author
				},
				{
					name: 'titleZ',
					url:'www.gzzgle.com',
					description : 'this is an article about Z'
					//author
				}
			] 

		},
		{

			id: '1',
			added: new Date(),
			text : 'ipsum lorem',
			sites: [
				{
					name: 'titleA',
					url:'www.yxxhoo.com',
					description : 'this is an article about A'
					//author
				},
				{
					name: 'titleB',
					url:'www.yyyhoo.com',
					description : 'this is an article about B'
					//author
				},
				{
					name: 'titleC',
					url:'www.yzzhoo.com',
					description : 'this is an article about C'
					//author
				}
			] 

		}

	]

}


app.get('/entries', (req, res) => {
	//no hassle
	res.json(database.entries)
})


app.post('/entries', (req,res) => {

	//how does it work for sites?
	//added is automatic
	console.log(req.body);

	const {id, text, sites} = req.body;
	//testing it out with postman as we go.


	database.entries.push({

		id: id,
		added: new Date(),
		text : text,
		//is this correct?
		//what happens to url, description, name
		sites: sites
		

	});

	//responding with the element we just pushed in
	res.json(database.entries[database.entries.length-1]);

})

/*does this work ?*/
//here the user would click on a certain entry
//that already has an id numbered starting from zero...
//so i dont think we need the extra checks, but, adding them.

// i think it's cool if the user gets to pick which entry is deleted.

app.delete('/entries/:id', (req,res) => {


	const {id} = req.params;
	console.log("id searched: ", id)
	let found = false;

	database.entries.forEach(entry => {
		if(entry.id === id){
			found = true;
			//not sure if this works ?
			delete database.entries[id];
			return res.json(entry);
		} 
	})

	if(!found){
		res.status(404).json('no such entry');
	}

})



app.listen(3000, ()=> {
	console.log('app is running on port 3000');
})


/*

HOW TO START ???
MAKE A ROUTE MAP :


route map (IGNORING SIGN IN)

probably will need to sign in 
and register too

BUT (we already have code like that)
the biggest difference is that


User goes, types in their text
Submits, and then:

*** /entries --> POST (will add an entry to the database)

have - : * the user's text
         * the url array for 
         the search performed

User returns, logs back into acct
And then he wants to see posts from before


*** /entries --> GET (will return ALL the entries in the DB)
             (or maybe just the last two... ?)

have - : * the database with
         the data for each entry
         
	
User wants to eliminate some entries 

*** /entries/postId --> DELETE (will remove an entry from the database)
of course the user doesn't know what the id is for the post
(q : what is the javascript array method to eliminate an item? )



*/