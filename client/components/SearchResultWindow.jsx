import React from 'react';
import SearchResultEntry from './SearchResultEntry.jsx'
import { render } from 'react-dom';
import {Grid, Col} from 'react-bootstrap';

class SearchResultWindow extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
			<div className="searchResultWindow">
				<Grid>

					{this.props.searchResults.map( (result, i) => 
							<Col xs={6} md={4}><SearchResultEntry result={result.fields} /></Col>
					)}

				</Grid>
			</div>
		);
	}

}

export default SearchResultWindow