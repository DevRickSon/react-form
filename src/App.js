import React from 'react';
import FrmPages from './FrmPages';
import {Switch, Route} from 'react-router-dom';

const App = () => (
	<Switch>
		<Route path="/:manufact/:model/:year/:grade" component={FrmPages}/>
		<Route path="/:manufact/:model/:year" component={FrmPages}/>
		<Route path="/:manufact/:model" component={FrmPages}/>
		<Route path="/:manufact" component={FrmPages}/>
		<Route path="/" component={FrmPages}/>
	</Switch>
);

export default App;
