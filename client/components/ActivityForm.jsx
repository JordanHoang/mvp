import React from 'react';

class ActivityForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className="activityForm">
				<form method="POST">
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