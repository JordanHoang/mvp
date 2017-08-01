import $ from 'jquery';
import {NUTRITIONIX_APP_ID, NUTRITIONIX_APP_KEY} from '../../config.js';

export const searchNutritionix = (options, callback) => {
	var searchOptions = {
		limit: 5,
		appId: NUTRITIONIX_APP_ID,  
		appKey: NUTRITIONIX_APP_KEY,
	}

	$.get(`https://api.nutritionix.com/v1_1/search/${options.query}`, searchOptions, function(data) {
		callback(data);
	})
};

export const searchItem = (options, callback) => {
	var searchOptions = {
		id: options.id,
		appId: NUTRITIONIX_APP_ID,  
		appKey: NUTRITIONIX_APP_KEY,
	}

	$.get('https://api.nutritionix.com/v1_1/item', searchOptions, function(data) {
		console.log('inside the request', data);
		callback(data);
	})
};