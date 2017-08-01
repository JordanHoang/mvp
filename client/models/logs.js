import $ from 'jquery';

export const url = 'http://localhost:8000';

export const getAllLogs = (username, callback) => {
	console.log('username???', username);
	var options = {userName: username};
	$.ajax({
	  type: "GET",
	  url: `${url}/logs/${username}`,
	  dataType: 'application/json',
	  success: (data) => {
	  	data.reverse()
	  	callback(data);
	  },
	  error: (data) => {
	  	console.log('Invalid get')
	  }
	});
};

export const postLog = (log, callback) => {
	// post contains username, activity, description, and calories
	$.ajax({
	  type: "POST",
	  url: `${url}/logs${log.userName}`,
	  data: JSON.stringify(log),
	  contentType: 'application/json',
	  success: (data) => {
	  	callback(data);
	  },
	  error: (data) => {
	  	console.log('Invalid log post')
	  }
	});
};