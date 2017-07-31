import React from 'react';
import ActivityForm from './ActivityForm.jsx'
import LogWindow from './LogWindow.jsx'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentCalories: 2500,
			name: 'Jordan',
			logs: []
		};
	}

	render () {
		return (
			<div className="app">
				<h1 className="title">workout.log()</h1>
				<h3>Welcome {this.state.name}</h3>
				<h4>Net calories: {this.state.currentCalories}</h4>
				<ActivityForm />
				<h3>Today's Log</h3>
				<LogWindow />
			</div>
		);
	}
}

export default App;