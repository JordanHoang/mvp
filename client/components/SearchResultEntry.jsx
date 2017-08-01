import React from 'react';
import * as FoodModel from '../models/nutritionixSearch.js';
import * as LogModel from '../models/logs.js'

class SearchResultEntry extends React.Component {
	constructor(props) {
		super(props)
	}

	handleClick(e) {
		console.log(this.props.result);

		var id = this.props.result.item_id;

		FoodModel.searchItem({id: id}, (data) => {
			console.log('data!!!!', this.props.userName);
			var newLog = {
				userName: this.props.userName,
				activity: 'food',
				description: data.item_name,
				calories: data.nf_calories
			}
			LogModel.postLog(newLog, (data) => {
				this.props.updateLogs();

				this.props.updateCalorieCount(newLog);
			})
		})
		e.preventDefault();
	}


	render() {
		return (
			<div className="searchResult">
				<div class="linkResult">
					<p>Brand: {this.props.result.brand_name} </p>
					<a href="#" onClick={this.handleClick.bind(this)}>{this.props.result.item_name} </a>
				</div>
			</div>
		);
	}
}

export default SearchResultEntry;