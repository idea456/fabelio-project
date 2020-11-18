const firebase = require('firebase');
const parse = require('csv-parse');
const fs = require('fs');
const { on } = require('process');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-3b6i2J95VtjdN93z7dweXdWevWxhzHk",
    authDomain: "fabelio-project-669e5.firebaseapp.com",
    databaseURL: "https://fabelio-project-669e5.firebaseio.com",
    projectId: "fabelio-project-669e5",
    storageBucket: "fabelio-project-669e5.appspot.com",
    messagingSenderId: "227641074897",
    appId: "1:227641074897:web:410771026df6f4855491f0"
};

// set up firebase and firestore
const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/**
 * Use a scoring system to determine the similarity of products. The scoring system is determined by the priorities of the fields.
 * I chose the dimensions of the product to be the highest priority to check first because
 * 
 * @param currentProduct
 * @param nextProduct
 * 
 */
const calculateRank = (currentProduct, nextProduct) => {
    let score = 0;
    for (let i = 0; i < nextProduct['dimension'].length; i++) {
        score += nextProduct['dimension'][i] === currentProduct['dimension'][i]
            ? 0
            : Math.abs(nextProduct['dimension'][i] - currentProduct['dimension'][i]);
    }

    for (let i = 0; i < currentProduct['colours'].length; i++) {
        score += currentProduct['colours'][i] in nextProduct['colours'] ? 0 : 1;
    }

    score += currentProduct['material'] === nextProduct['material'] ? 0 : 1;

    return score;
}

const updateSeenProducts = async () => {
    const snapshot = await firebase.firestore().collection('products').get()
    snapshot.docs.map(doc => {
        db.collection("products").doc(doc.id).update({ seen: false });
    });
}

const loadData = (req, res, next) => {
    const parser = parse({
        delimiter: ',',
        columns: true
    });

    let output = [];

    parser.on('readable', function () {
        let record, coloursArray, coloursDict;
        while (record = parser.read()) {
            record['price'] = parseInt(record['price']);
            record['dimension'] = record['dimension'].split(' x ').map(n => parseInt(n));
            coloursArray = record['colours'].split(', ');
            // use a dictionary instead of an array to store the values since dictionaries have O(1) access time which will be needed later
            coloursDict = {};
            for (let i = 0; i < coloursArray.length; i++) {
                coloursDict[coloursArray[i]] = 1;
            }
            record['colours'] = coloursDict;
            record['rank'] = 0;
            record['seen'] = false;
            output.push(record);
        }
    });

    parser.on('end', function () {
        const ref = db.collection('products');
        // Firstly, export the contents of the CSV to firestore IF the collection has not been created yet
        ref.get().then(snapshot => {
            // if the collection does exist then create a new collection
            if (snapshot.size <= 0) {
                for (let i = 0; i < output.length; i++) {
                    db.collection("products").doc().set({
                        name: output[i]['product name'],
                        price: output[i]['price'],
                        dimension: output[i]['dimension'],
                        colours: output[i]['colours'],
                        material: output[i]['material'],
                        image: output[i]['image'],
                        // calculate the rank of the similarity of this product 
                        rank: calculateRank(req.query, output[i]),
                        seen: output[i]['seen'],
                        sold: output[i]['product name'] === req.query["name"] ? true : false
                    }).then(function() {
                    console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                }
            }
        });
    })

    fs.createReadStream(__dirname + '/intern-test-data.csv').pipe(parser);
   
    res.status(200).json({
        body: 'Successfully added csv data to firestore!'
    });
}

const nextProduct = (req, res, next) => {
    let nextProduct, nextProductID;
    let currentProduct = req.query;

    const ref = db.collection('products');
    ref.where("sold", "==", false)
    .where("seen", "==", false)
    .orderBy("rank")
    .limit(2)
    .get()
    .then(snapshot => { 
        if (snapshot.docs.length === 1) {
            nextProductID = snapshot.docs[0].id;
            nextProduct = snapshot.docs[0].data();
            updateSeenProducts();
        } else {
            let firstProduct = snapshot.docs[0].data();
            let secondProduct = snapshot.docs[1].data();
            if (firstProduct["rank"] === secondProduct["rank"]) {
                // pick the product that is the cheapest
                if (firstProduct["price"] < secondProduct["price"]) {
                    nextProductID = snapshot.docs[0].id;
                    nextProduct = firstProduct;
                } else {
                    nextProductID = snapshot.docs[1].id;
                    nextProduct = secondProduct;
                }
            } else {
                nextProductID = snapshot.docs[0].id;
                nextProduct = snapshot.docs[0].data();
            }

            // update the product since it has already been seen by the user
            db.collection("products").doc(nextProductID).update({ seen: true });
        }
        

        res.status(200).json({
            // Order the documents by their rank in ascending order
            // The document with the smallest rank is the most similar product
            product: nextProduct,
            body: 'Successfully retrieved the next similar product!'
        });
    });
}
    

    


module.exports.loadData = loadData;
module.exports.nextProduct = nextProduct;