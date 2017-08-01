import React from 'react';
import ActivityForm from './ActivityForm.jsx';
import LogWindow from './LogWindow.jsx';
import AuthPanel from './AuthPanel.jsx'
import * as LogModel from '../models/logs.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentCalories: -2500,
			name: '',
			logs: [],
			isLoggedIn: false
		};
	}

	componentDidMount() {
		LogModel.getAllLogs( (data) => {
			this.setState({
				logs: data
			})
		});
	}

	// change isLoggedIn state upon correct signin
	authentication(name) {
		this.setState({
			isLoggedIn: true,
			name: name
		})
	}

	// update logs upon log post
	updateLogs() {
		LogModel.getAllLogs ( (data) => {
			this.setState({
				logs:data
			})
		});
	}

	// update calorie count upon post
	updateCalorieCount(log) {
		if (log.activity === 'exercise') {
			this.setState({
				currentCalories: this.state.currentCalories - parseInt(log.calories)
			}) 
		} else if (log.activity === 'food')
			this.setState({
				currentCalories: this.state.currentCalories + parseInt(log.calories)
			})
	}

	render () {
		if (this.state.isLoggedIn) {
			return (
				<div className="app">
					<h1 className="title">workout.log()</h1>
					<h3>Welcome {this.state.name}</h3>
					<h4>Net calories: {this.state.currentCalories}</h4>
					<ActivityForm updateLogs={this.updateLogs.bind(this)} updateCalorieCount={this.updateCalorieCount.bind(this)} />
					<h3>Today's Log</h3>
					<LogWindow logs={this.state.logs} />
				</div>
			);
		};

		return (
			<div className="app">
				<h1 className="title">workout.log()</h1>
				<AuthPanel authentication={this.authentication.bind(this)} />
			</div>
		)
	}
}

export default App;