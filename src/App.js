import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "styled-components";
import theme from "./styled-components/theme";
import StartPage from "./pages/StartPage";
import HolePage from "./pages/HolePage";
import RoundCompletedPage from "./pages/RoundCompletedPage";
import NotFoundPage from "./pages/NotFoundPage";
import { StateProvider } from "./state/stateprovider";

const App = () => {
  const history = createBrowserHistory();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StateProvider>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={StartPage}></Route>
              <Route path="/hole" exact component={HolePage}></Route>
              <Route
                path="/round-completed"
                exact
                component={RoundCompletedPage}
              ></Route>
              <Route path="*" component={NotFoundPage}></Route>
            </Switch>
          </Router>
        </StateProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
