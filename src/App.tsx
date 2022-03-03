import { Provider } from "react-redux";
import { store } from "./store/store";

import Layout from "./containers/Layout";
import Page from "./containers/Page";

import "./App.css";


const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div className="App">
        <Layout>
          <Page/>
        </Layout>
      </div>
    </Provider>
  );
};

export default App;
