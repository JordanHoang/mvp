import React from 'react';

class SearchResultEntry extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		return (
			<div>
				<span>{this.props.result.item_name}</span>
				<span>{this.props.result.brand_name}</span>
			</div>
		);
	}
}

export default SearchResultEntry;