import LoginPage from "./containers/Login";
import SignUp from "./containers/SignUp";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme'
import AccountPage from "./containers/AccountPage";
import SettingPage from "./containers/SettingPage";
import { createBrowserHistory } from "history"
import { Route, Router, Switch } from 'react-router-dom';

function App(props) {
  const history = createBrowserHistory();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route exact path='/' > <LoginPage /></Route>
          <Route exact path='/registrasi'> <SignUp /></Route>
          <Route exact path='/account'><AccountPage /></Route>
          <Route exact path='/settings'> <SettingPage /></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
