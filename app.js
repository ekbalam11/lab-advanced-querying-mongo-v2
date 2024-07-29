//mongodb module package
const { MongoClient, ServerApiVersion } = require('mongodb');

// connect with the database
const url = 'mongodb+srv://balam:balam@cluster0.z4ejn4b.mongodb.net/'
// MongoClient
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})
//async function
async function run(){
    try{
        await client.connect();
        const database = client.db("companiesDB")
        const companies = database.collection('companies')
        // const query = { name: /^Babel/ }
        // const query = { number_of_employees: { $gt: 5000 } }
        // const query = {$and: [{founded_year: {$gte: 2000}}, {founded_year:{$lte: 2005}}]}
        // const query = {$and: [{'ipo.valuation_amount': {$gte: 10000000}}, {founded_year:{$lt: 2010}}]}
        // const query = {partners: {$exists: false}}
        const query = {category_code: {$type: 'null'}}
        const options = {
            projection: { _id:0, name: 1, ipo: 1//founded_year: 1 
                },
            sort: { name: 1 },
            limit: 10
        }
        //executing query
        const cursor = companies.find(query, options);
        //print message if not found
        if((await companies.countDocuments(query)) === 0) {
            console.log(`No documents found`);
        }

    //for function to iterate through the DB
    for await (const doc of cursor) {
        console.dir(doc)
    }


    } finally {
        await client.close();
    }
}
run().catch(console.dir)