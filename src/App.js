import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "styled-components";
import theme from "./styled-components/theme";
import StartPage from "./components/StartPage";
import HolePage from "./components/HolePage";
import RoundCompletedPage from "./components/RoundCompletedPage";
import NotFoundPage from "./components/NotFoundPage";
import { StateProvider } from "./state/stateprovider";
import { reducer } from "./state/reducer";
function App() {
  const history = createBrowserHistory();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StateProvider reducer={reducer}>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={StartPage}></Route>
              <Route path="/hole" exact component={HolePage}></Route>
              <Route
                path="/round-completed"
                exact
                component={RoundCompletedPage}
              ></Route>
              <Route component={NotFoundPage}></Route>
            </Switch>
          </Router>
        </StateProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
