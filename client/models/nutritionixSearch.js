import $ from 'jquery';

export const url = "https://api.nutritionix.com/v1_1/search";


export const searchNutritionix = (options, callback) => {
	var searchOptions = {
		appId: window.NUTRITIONIX_APP_ID,  
		appKey: window.NUTRITIONIX_APP_KEY
		query: options.query,
		fields: item_name, item_id,
		limit: 5
	}

	$.get(url, searchOptions, function(data) {
		console.log(data)
	})

};