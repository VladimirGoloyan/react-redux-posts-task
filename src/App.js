import React, { Component } from "react";
import { Provider } from "react-redux";

import Layout from "components/Layout/Layout";
import Posts from "containers/Posts/Posts";
import { store } from "reducers/store";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Posts />
        </Layout>
      </Provider>
    );
  }
}

export default App;
