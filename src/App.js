import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Mint from "./pages/Mint";
import SpecialNFTS from "./pages/SpecialNFTS";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/landing" exact>
            <Landing />
          </Route>
          <Route path="/Mint" exact>
            <Mint />
          </Route>
          <Route path="/special-nfts" exact>
            <SpecialNFTS />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
