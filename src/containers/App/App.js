import React from "react";
import Form from "../Form/Form";
import Loader from "react-loader-spinner";
import "./App.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 5000);
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="app__loader">
          <Loader type="Puff" color="#00BFFF" height="100" width="100" />
        </div>
      );
    }
    return (
      <div id="app">
        <Form />
      </div>
    );
  }
}
