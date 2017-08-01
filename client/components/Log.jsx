import React from 'react';

class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formattedTime: ''
		};
	}

	componentWillMount () {
		var timeArray = new Date(this.props.log.created_at).toLocaleString().split(',');
		// check if hour is greater/less 12 aka check if it's PM or AM

		this.setState({
			formattedTime: `${timeArray[1]}`
		})

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