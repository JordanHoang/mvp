import React from 'react';
import SearchResultEntry from './SearchResultEntry.jsx'

class SearchResultWindow extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
			<div className="searchResultWindow">
				{this.props.searchResults.map( (result) => {
					console.log('result??', result.fields);
					return (
						<div>
							<SearchResultEntry result={result.fields} />
						</div>
					)
				})}
			</div>
		);
	}

}

export default SearchResultWindow