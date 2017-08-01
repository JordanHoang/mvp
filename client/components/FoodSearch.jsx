import React from 'react';
import * as FoodModel from '../models/nutritionixSearch.js'

class FoodSearch extends React.Component {
	constructor(props) {
		super(props)
	}

	handleSearch(e) {

		var options = {query: e.target.search.value}

		FoodModel.searchNutritionix(options, (data) => {

			this.props.updateSearchResults(data.hits);
		});

		e.preventDefault();
	}


	render () {

		return (
			<div className="foodSearch">
				<form method="GET" onSubmit={this.handleSearch.bind(this)}>
					<label>Food Search</label><input type="text" className="input" name="search"></input>
					<button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
				</form>
			</div>
		)
	};



}

export default FoodSearch;