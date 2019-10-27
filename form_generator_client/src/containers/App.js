import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom' ;
import Navbar from './Navbar';
import Main from './Main';

class App extends Component {
  render(){
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Main />
			</div>
		</Router>
		
  	);
  }
	  
}

export default App;
