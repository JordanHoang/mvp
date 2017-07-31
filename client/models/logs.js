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
	$.post(`${url}/logs`, (data) => {
		callback(data);
	})
	.fail( (err) => {
		console.log('Invalid post');
	})
};