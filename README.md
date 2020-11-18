# Fabelio Internship Project

This project was created as part of my internship assessment with Fabelio. The app receives a list of product through a CSV file, establishes a database and user interface to view products that are similar to the product being compared with. \\

The live link to the project:

## The process

### Setting up the data and database

After setting up the work environment for the server and client (setting up a basic local server and API functions), the first thing I had to was to parse the CSV file into an appropriate format, so that it can be exported into the Firestore database with proper data types. After some data formatting and cleaning, I was able to establish a database with the exported CSV file. The following screenshot demonstrates a part of the Firestore document collection from the CSV file:

![Screenshot 2020-11-19 at 5 52 48 AM](https://user-images.githubusercontent.com/25546711/99593279-636dcd00-2a2c-11eb-82a3-c2c8c8120347.png)

### The scoring system

After the database was established, I developed a way to distinguish different products on their similarity based on the following rules:

1. Dimensions was prioritized firstly, because when buying furniture, the dimensions of the furniture is one of the most important aspect to look at, and users are more likely to choose products which can fit in their living space or their preferred furniture size. The similar the dimensions are to the original product which the user looked at, the more similar
