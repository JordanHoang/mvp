import React from 'react';

class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formattedTime: ''
		};
	}

	componentWillMount () {
		var timeArray = new Date(this.props.log.timestamp).toLocaleTimeString();
		// check if hour is greater/less 12 aka check if it's PM or AM
		console.log('time is money, so I went and bought a rolex', new Date(this.props.log.timestamp).toLocaleTimeString());
		this.setState({
			formattedTime: this.props.log.timestamp
		})
	}

	handleDelete () {
		console.log(this.props.log);
	}

	render() {
		return (
			<div className="log">
				<span>{this.state.formattedTime} </span>
				<span>	{this.props.log.description} </span>
				<span> {this.props.log.calories} calories</span>
				<a className="delete" onClick={this.handleDelete.bind(this)}>
					<i className="fa fa-minus-square" aria-hidden="true"></i>
				</a>
			</div>
		);
	}

}

export default Log;