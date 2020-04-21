import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "styled-components";
import theme from "./styled-components/theme";
import StartPage from "./components/StartPage";
import { StateProvider } from "./state/stateprovider";
import { reducer } from "./state/reducer";
function App() {
  const history = createBrowserHistory();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StateProvider reducer={reducer}>
          <Router history={history}>
            <Route path="/" exact component={StartPage}></Route>
          </Router>
        </StateProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
