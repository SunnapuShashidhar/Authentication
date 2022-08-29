import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "./context";
import Filter from "./Components/Filter/Filter";
import "./App.css"
import Home from "./Components/Home/Home";
import Detailes from "./Components/Home/Detailes";
import Navbar from "./Components/Home/Navbar";
function App() {
  return (
    <Provider>
      <BrowserRouter basename="/">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/filter" component={Filter} />
          <Route exact path="/filter/:_id" component={Filter} />
          <Route exact path="/details/:id" component={Detailes} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
