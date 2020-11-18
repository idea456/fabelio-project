import React from "react";
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    // set up the base url instead of localhost:3000
    axios.defaults.baseURL = "http://localhost:5000";

    this.state = {
      // set the default product to compare with others for similarity
      currentProduct: {
        name: "Sofa 2 dudukan Vienna",
        price: 3899000,
        dimension: [162, 95, 86],
        colours: ["custard vienna", "graphite vienna", "ruby vienna"],
        material: "solid wood",
        image: "https://fabelio.com/media/catalog/product/w/i/wina_2_seater_sofa__custard__1_1.jpg"
      },
      nextProduct: {}
    }
  }
  
  async componentDidMount() {
    // parse and load the CSV data into firestore if it has not been done yet
    const options = {
      params: this.state.currentProduct
    };

    await axios.get('/api/v1/load-data', options);
    // get the next similar product from the database
    await axios.get('/api/v1/next-product', options).then(res => this.setState({ nextProduct: res.data.product }));
    console.log(this.state.nextProduct);
  }

  render() {
    const { name, image, colours, dimension, price, material, sold } = this.state.nextProduct;
    return (
      <div className="App">
        <h1>{name}</h1>
      </div>);
  }
}

export default App;
