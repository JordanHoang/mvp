import React from 'react';
import ActivityForm from './ActivityForm.jsx';
import LogWindow from './LogWindow.jsx';
import * as LogModel from '../models/logs.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentCalories: 2500,
			name: 'Jordan',
			logs: []
		};
	}

	componentDidMount() {
		LogModel.getAllLogs( (data) => {
			this.setState({
				logs: data
			})

			console.log('DATA ', this.state.logs)
		});
	}

	render () {
		return (
			<div className="app">
				<h1 className="title">workout.log()</h1>
				<h3>Welcome {this.state.name}</h3>
				<h4>Net calories: {this.state.currentCalories}</h4>
				<ActivityForm />
				<h3>Today's Log</h3>
				<LogWindow logs={this.state.logs} />
			</div>
		);
	}
}

export default App;