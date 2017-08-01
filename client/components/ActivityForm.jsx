import React from 'react';
import * as LogModel from '../models/logs.js'

class ActivityForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	handleSubmit(e) {

		var newLog = {
			userName: this.props.userName,
			activity: e.target.activity.value,
			description: e.target.description.value,
			calories: e.target.calories.value
		};

		console.log

		LogModel.postLog(newLog, (data) => {
			this.props.updateLogs();

			this.props.updateCalorieCount(newLog);
		});

		e.preventDefault();
	}

	render() {
		return (
			<div className="activityForm">
				<form method="POST" onSubmit={this.handleSubmit.bind(this)}>
					<label>Activity</label>
						<select name="activity">
							<option value="exercise">Exercise</option>
							<option value="food">Food</option>
						</select>
					<label>Description</label><input name="description"></input>
					<label>Calories</label><input type="number" name="calories"></input>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default ActivityForm;