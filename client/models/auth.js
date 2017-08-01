import $ from 'jquery';

export const url = 'http://localhost:8000/users';

export const signup = (credentials, callback) => {
	$.ajax({
	  type: "POST",
	  url: `${url}/signup`,
	  data: JSON.stringify(credentials),
	  contentType: 'application/json',
	  success: (data) => {
	  	callback(data);
	  },
	  error: (data) => {
	  	console.log('Invalid signup')
	  }
	});
};

export const signin = (credentials, callback) => {
	$.ajax({
	  type: "POST",
	  url: `${url}/signin`,
	  data: JSON.stringify(credentials),
	  contentType: 'application/json',
	  // on success, will return first name and desired calories
	  success: (data) => {
	  	console.log('Successful signin');
	  	callback(data);
	  },
	  error: (data) => {
	  	console.log('Invalid signin')
	  }
	});
};