let express = require('express');
const app = express();
let fs = require('fs');
let cors = require('cors');
app.use(cors()); // allow all origins -> Access-Control-Allow-Origin: *
app.use(express.static('public')); // host public folder

// TODO: read the products.json file here into a string
const products = fs.readFileSync('products.json')
const productsJSON = JSON.parse(products)
console.log(products.toString())

app.get('/', function (req, res) {

	// TODO: set a content type (from ex.1)

	res.contentType('html')

	res.status(200).send("EX2: This is a simple application");
});


app.get('/products', function (req, res) {

	// write your code here to output the list of products as JSON

	const productIds = []
	productsJSON.forEach(product => {
		productIds.push(product.id)
	});
	res.send({ productIds })

});

app.get('/product/:id', (req, res) => {
	const pid = req.params.id
	let p = undefined
	productsJSON.forEach(product => {
		if (product.id === pid) {
			p = product
		}
	});
	if (p === undefined) {
		res.status(400).send()
	} else {
		res.send(p)
	}


})

// write your route handler to output a single product by its ID as JSON here

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:" + port);
