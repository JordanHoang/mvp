import $ from 'jquery';

export const url = 'http://localhost:8000';

export const getAllLogs = (callback) => {
	$.get(`${url}/logs`, (data) => {
		data.reverse()
		callback(data);
	})
	.fail( (err) => {
		console.log('Invalid request');
	})
};

export const postLog = (log, callback) => {
	$.ajax({
	  type: "POST",
	  url: `${url}/logs`,
	  data: JSON.stringify(log),
	  contentType: 'application/json',
	  success: (data) => {
	  	callback(data);
	  }
	});
};