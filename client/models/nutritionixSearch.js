import $ from 'jquery';
import {NUTRITIONIX_APP_ID, NUTRITIONIX_APP_KEY} from '../../config.js';

export const url = "https://api.nutritionix.com/v1_1/search";


export const searchNutritionix = (options, callback) => {
	console.log('inside da search', NUTRITIONIX_APP_ID, '---', NUTRITIONIX_APP_KEY)
	var searchOptions = {
		limit: 5,
		appId: NUTRITIONIX_APP_ID,  
		appKey: NUTRITIONIX_APP_KEY,
	}

	$.get(`${url}/${options.query}`, searchOptions, function(data) {
		callback(data);
	})

};