import React from 'react';

class ActivityForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	handleSubmit(e) {

		console.log(e.target.activity.value);
		console.log(e.target.description.value);
		console.log(e.target.calories.value);

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
					<label>Calories</label><input name="calories"></input>
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

export default ActivityForm;