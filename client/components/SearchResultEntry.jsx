import React from 'react';

class SearchResultEntry extends React.Component {
	constructor(props) {
		super(props)
	}


	render() {
		return (
			<div className="searchResult">
				<p>{this.props.result.brand_name} </p>
				<p>{this.props.result.item_name} </p>
			</div>
		);
	}
}

export default SearchResultEntry;