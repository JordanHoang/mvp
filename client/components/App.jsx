import React from 'react';
import ActivityForm from './ActivityForm.jsx';
import LogWindow from './LogWindow.jsx';
import AuthPanel from './AuthPanel.jsx';
import FoodSearch from './FoodSearch.jsx';
import SearchResultWindow from './SearchResultWindow.jsx'
import * as LogModel from '../models/logs.js';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentCalories: 0,
			userName: '',
			name: '',
			logs: [],
			isLoggedIn: false,
			searchResults: []
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

	updateSearchResults(hits) {
		this.setState({
			searchResults: hits.slice(0,6)
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
					<h3 className="welcome">Welcome {this.state.name}</h3>
					<a className="signout" href="#" onClick={this.handleSignout.bind(this)}>Signout</a>
					<br />
					<div className="remainingCals">
						<span>Remaining Calories:
							<span className={this.state.currentCalories > 0 ? 'positive' : 'negative'}> {this.state.currentCalories}
							</span>
						</span>
					</div>
					<FoodSearch updateSearchResults={this.updateSearchResults.bind(this)}/>
					<SearchResultWindow searchResults={this.state.searchResults} />
					<ActivityForm updateLogs={this.updateLogs.bind(this)} updateCalorieCount={this.updateCalorieCount.bind(this)} userName = {this.state.userName} />
					<h3 className='todaysLog'>Today's Log</h3>
					<LogWindow logs={this.state.logs} updateLogs={this.updateLogs.bind(this)} userName = {this.state.userName} />
				</div>
			);
		};

		return (
			<div className="app home">
				<h1 className="title">workout.log()</h1>
				<AuthPanel className="authPanel" authentication={this.authentication.bind(this)} />
			</div>
		)
	}
}

export default App;