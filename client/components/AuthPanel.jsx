import React from 'react';
import * as AuthModel from '../models/auth.js'

class AuthPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signup: false
		};
	}

	// if user wants to sign up, change forms
	signupRequest() {
		this.setState({
			signup: !this.state.signup
		})

	}

	// handles request to sign up
	handleSignup(e) {

		var credentials = {
			userName: e.target.username.value,
			password: e.target.password.value,
			firstName: e.target.firstname.value,
			lastName: e.target.lastname.value,
			desiredCalories: e.target.calories.value
		};

		AuthModel.signup(credentials, (data) => {
			console.log('successful signup')
		})

		e.preventDefault();
	}

	// handles request to sign in
	handleSignin (e) {
		var credentials = {
			userName: e.target.username.value,
			password: e.target.password.value,
		};

		AuthModel.signin(credentials, (data) => {
			console.log('successful signin')
			this.props.authentication(data);
		})

		e.preventDefault();
	}


	render() {
		if (this.state.signup) {
			return (
				<div className="signupPanel" onSubmit={this.handleSignup.bind(this)}>
					<form method="POST">
						<label>Username</label><input name="username"></input>
						<label>Password</label><input name="password" type="password"></input>
						<label>First Name</label><input name="firstname"></input>
						<label>Last Name</label><input name="lastname"></input>
						<label>Desired Calories</label><input name="calories" type="number"></input>
						<button type="submit">Sign Up</button>
					</form>
					<a onClick={this.signupRequest.bind(this)} href="#">Sign In</a>
				</div>
			);
		};

		return (
			<div className="signinPanel">
				<form method="POST" onSubmit={this.handleSignin.bind(this)}>
					<label>Username</label><input name="username"></input>
					<label>Password</label><input name="password" type="password"></input>
					<button type="submit">Sign In</button>
				</form>
				<a onClick={this.signupRequest.bind(this)} href="#">Create an account</a>
			</div>
		);
	}

}

export default AuthPanel;
