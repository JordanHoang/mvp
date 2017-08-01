import React from 'react';
import ActivityForm from './ActivityForm.jsx';
import LogWindow from './LogWindow.jsx';
import AuthPanel from './AuthPanel.jsx'
import * as LogModel from '../models/logs.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentCalories: 0,
			userName: '',
			name: '',
			logs: [],
			isLoggedIn: false
		};
	}

	// componentDidMount() {
	// 	LogModel.getAllLogs(this.state.userName, (data) => {
	// 		this.setState({
	// 			logs: data
	// 		})
	// 	});
	// }

	// change isLoggedIn state upon correct signin
	authentication(info) {
		this.setState({
			isLoggedIn: true,
			userName: info.userName,
			name: info.firstName,
			currentCalories: info.desiredCalories
		}, () => {
			console.log('yusah', this.state.userName);
			LogModel.getAllLogs(this.state.userName, (data) => {
				this.setState({
					logs: data.logsPush,
					currentCalories: data.currentCalories
				})
			})
		})
	}

	// update logs upon log post
	// data is user id, current calories, and logsPush
	updateLogs() {
		LogModel.getAllLogs(this.state.userName, (data) => {
			this.setState({
				logs: data.logsPush,
				currentCalories: data.currentCalories
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

	handleSignout() {
		this.setState({
			isLoggedIn: false
		})
	}

	render () {
		if (this.state.isLoggedIn) {
			return (
				<div className="app">
					<h1 className="title">workout.log()</h1>
					<h3>Welcome {this.state.name}</h3>
					<a href="#" onClick={this.handleSignout.bind(this)}>Signout</a>
					<h4>Net calories: {this.state.currentCalories}</h4>
					<ActivityForm updateLogs={this.updateLogs.bind(this)} updateCalorieCount={this.updateCalorieCount.bind(this)} userName = {this.state.userName} />
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