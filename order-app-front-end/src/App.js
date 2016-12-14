import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainView from './MainView';
import TextField from "material-ui/TextField";

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
    	<MuiThemeProvider>
    		<MainView id="app-main-view"
    			title="Order App"/>
      	</MuiThemeProvider>
    );
  }
}

export default App;
