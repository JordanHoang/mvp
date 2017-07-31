import React from 'react';

class Log extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="log">
				<span>4:51pm </span>
				<span> Beer </span>
				<span> 90 calories</span>
			</div>
		);
	}

}

export default Log;