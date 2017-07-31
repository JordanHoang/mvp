import React from 'react';

class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formattedTime: ''
		};
	}

	componentWillMount () {
		// split xx:xx:xx format into an array of [hour, minute, second]
		var timeArray = this.props.log.timestamp.split(':');
		// check if hour is greater/less 12 aka check if it's PM or AM

		// if greater than 12, subtract 12 and add pm
		if (timeArray[0] > '12') {
			this.setState({
				formattedTime: `${timeArray[0] -12}:${timeArray[1]}pm`
			});
		// else if exactly 12, keep hour and add pm
		} else if (timeArray[0] === '12') {
			this.setState({
				formattedTime: `${timeArray[0]}:${timeArray[1]}pm`
			})
		// else if less than 12, keep hour and add am
		} else if (timeArray[0] < '12') {
			this.setState({
				formattedTime: `${timeArray[0]}:${timeArray[1]}am`
			})
		}
	}

	render() {
		return (
			<div className="log">
				<span>{this.state.formattedTime} </span>
				<span>	{this.props.log.description} </span>
				<span> {this.props.log.calories} calories</span>
			</div>
		);
	}

}

export default Log;