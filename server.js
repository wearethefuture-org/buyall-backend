const Express = require("express");
const BodyParser = require("body-parser");
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;

const CONNECTION_URL = "mongodb+srv://<login>:<password>@buyall-kazeu.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "Shop";
const PORT = 3004;

var app = Express();
app.use(cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("Products");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

//Get all products
app.get("/products", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//Get one product
app.get("/product/:id", (request, response) => {
    let id = request.params.id;
    collection.find({product_id:id}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//Add new product
app.post("/product", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

//Update product
app.put("/product/:id", (request, response) => {
    let id = request.params.id;
        collection.update({product_id:id},request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

// Delete product
app.delete('/product/:id', function(request, response){
    let id = request.params.id;
        collection.deleteOne({product_id:id}, (error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result.result);
        });

});
