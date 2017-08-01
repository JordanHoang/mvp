import React from 'react';
import Log from './Log.jsx';

class LogWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="logWindow">
				{this.props.logs.map( (log) => {
					return (
						<Log log={log} updateLogs={this.props.updateLogs} userName = {this.props.userName} />
					)
				})}
			</div>
		);
	}

}

export default LogWindow;