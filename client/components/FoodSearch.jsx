import React from 'react';

class FoodSearch extends React.Component {
	constructor(props) {
		super(props)
	}

	render () {

		return (
			<div className="foodSearch">
				<form method="GET">
					<label>Food Search</label><input className="input" name="search"></input>
					<button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
				</form>
			</div>
		)
	};



}

export default FoodSearch;