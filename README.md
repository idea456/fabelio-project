# Fabelio Internship Project

This project was created as part of my internship assessment with Fabelio. The app receives a list of product through a CSV file, establishes a database and user interface to view products that are similar to the product being compared with. 

The live link to the project: https://fabelio-project.herokuapp.com

To run the project, firstly install the dependencies:
```
npm install
```
Then, run the project with the following command:
```
npm run dev
```

## The process

### Tech stack used
- NodeJS and Express to create the API
- Firebase and Firestore for the database
- React and Material UI for the user interface

### Setting up the data and database

After setting up the work environment for the server and client (setting up a basic local server and API functions), the first thing I had to was to parse the CSV file into an appropriate format, so that it can be exported into the Firestore database with proper data types. After some data formatting and cleaning, I was able to establish a database with the exported CSV file. The following screenshot demonstrates a part of the Firestore document collection from the CSV file:

![Screenshot 2020-11-19 at 5 52 48 AM](https://user-images.githubusercontent.com/25546711/99593279-636dcd00-2a2c-11eb-82a3-c2c8c8120347.png)

The colours are stored as dictionaries since we need fast access and checking of these colours to compare them with the original product's colours. Dimensions are also stored as an array to simplify checking. The rest are stored as integers or strings. The `seen` field is used to indicate whether the product has been seen by the user or not. The `sold` field is used to distinguish the items that are already sold or not.

### The scoring system

After the database was established, I developed a way to distinguish different products on their similarity based on the following rules:

1. Dimensions was prioritized firstly, because when buying furniture, the dimensions of the furniture is one of the most important aspect to look at, and users are more likely to choose products which can fit in their living space or their preferred furniture size. The similar the dimensions are to the original product which the user looked at, the more similar the product is. The score is added by the difference of dimensions (length, width, height) between the original product.
2. Next was colours. Aesthetics and looks also define similarity, thus it is also important that the products have similar colour choices for the users to choose as they had chosen for the previous product. The score is added by 1 if there is no matching or missing colour.
3. Material is also emphasized here, as users also look for products with the same material as they have chosen before. The score is added by 1 if the materials do not match.
4. Price here in this case is not a factor for similarity. It is used only when two products have the same score, and the product with the lower price has a better score and is chosen first.

All of these factors attribute to counting the scores. The product with the lowest score has the highest similarity to the original chosen product. Each product is scored and the functions are all developed as an API GET request call.

### The user interface and additional features
After the API was finished with the appropriate functions, I created the front-end using React and Material UI. I designed the UI to be as simple as possible, with cards to represent the current and next product, and the background color to match Fabelio's theme. I also added badges to the next product card to indicate what rank they are, from most similar to least similar. 
![screencapture-fabelio-project-herokuapp-2020-11-19-06_14_22](https://user-images.githubusercontent.com/25546711/99595015-f4de3e80-2a2e-11eb-96c9-cb764072b41c.png)
The next product always changes only when the user refreshes/revisits the page.

### Final remarks
Overall, this was a quite a fun project to do, kinda similar to a small hackathon 😊, and it really helped me to refresh my back-end concepts since that is where I lack practice in.
