import React from "react";
import './App.css';
import axios from 'axios';
import Helmet from "react-helmet";
import ProductCard from "./components/ProductCard";
import CircularProgress from '@material-ui/core/CircularProgress';

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
      nextProduct: {},
      ranking: 0,
      loading: true
    }
  }
  
  async componentDidMount() {
    // parse and load the CSV data into firestore if it has not been done yet
    const options = {
      params: this.state.currentProduct
    };

    await axios.get('/api/v1/load-data', options);

    await axios.get('/api/v1/get-ranking').then(res => this.setState({ ranking: res.data.ranking }));
    // get the next similar product from the database
    await axios.get('/api/v1/next-product', options).then(res => {
      this.setState({ loading: false, nextProduct: res.data.product })
    });
    
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Fabelio Project</title>
          <style>{"body {background-color: #f7d300}"}</style>
        </Helmet>
        { this.state.loading && (<CircularProgress />) }
        { !this.state.loading && (<ProductCard ranking={this.state.ranking} product={this.state.nextProduct} />) }
      </div>
    );
  }
}

export default App;
