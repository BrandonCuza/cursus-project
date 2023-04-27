import validator from 'validator';

let _validate_name = (name) => {
	return new Promise((resolve, reject) => {
		let is_valid = false;
		if (typeof name == 'string') {
			is_valid = validator.isAlpha(name, undefined, { ignore: " " });
		}
		if (is_valid) {
			resolve('The name is valid.');
		} else {
			reject('The name is invalid.');
		}
	});
};

let _validate_studentid = (studentid) => {
	return new Promise((resolve, reject) => {
		let is_valid = false;
		if (typeof studentid == 'string') {
			is_valid = (validator.isNumeric(studentid) && validator.isLength(studentid, {min: 9, max: 9}));
		}
		if (is_valid) {
			resolve('The student ID is valid.');
		} else {
			reject('The student ID is invalid.');
		}
	});
};

let _validate_email = (email) =>{
	return new Promise((resolve, reject) => {
		let is_valid = false;
		if (typeof email == 'string') {
			is_valid = validator.isEmail(email);
		}
		if (is_valid) {
			resolve('The email is valid.');
		} else {
			reject('The email is invalid.');
		}
	});
};

let _validate_username = (username) =>{
	return new Promise((resolve, reject) => {
		let is_valid = false;
		if (typeof username == 'string') {
			is_valid = validator.isAlphanumeric(username);
		}
		if (is_valid) {
			resolve('The username is valid.');
		} else {
			reject('The username is invalid.');
		}
	});
};

let _validate_password = (password) =>{
	return new Promise((resolve, reject) =>{
		let is_valid = false;
		if (typeof password == 'string') {
			is_valid = validator.isAlphanumeric(password);
		}
		if (is_valid) {
			resolve('The password is valid.');
		} else {
			reject('The password is invalid.');
		}
	});
};

let _validate_hascalendar = (hasCalendar) =>{
	return new Promise((resolve, reject) =>{
		let is_valid = false;
		if (hasCalendar === true || hasCalendar === false) {
			is_valid = true;
		}
		if (is_valid) {
			resolve('The choice of calendar integration is valid.');
		} else {
			reject('The choice of calendar integration is invalid.');
		}
	});
};

let _validate_googuser = (googuser) =>{
	return new Promise((resolve, reject) =>{
		let is_valid = false;
		if (typeof googuser == 'string') {
			is_valid = (validator.isAlphanumeric(googuser) || googuser == '');
		}
		if (is_valid) {
			resolve('The Google username is valid.');
		} else {
			reject('The Google username is invalid.');
		}
	});
};

let _validate_googpass = (googpass) =>{
	return new Promise((resolve, reject) =>{
		let is_valid = false;
		if (typeof googpass == 'string') {
			is_valid = (validator.isAlphanumeric(googpass) || googpass == '');
		}
		if (is_valid) {
			resolve('The Google password is valid.');
		} else {
			reject('The Google password is invalid.');
		}
	});
};

let _validate_major = (major) =>{
	return new Promise((resolve, reject) =>{
		let is_valid = false;
		if (typeof major == 'string') {
			is_valid = validator.isAlpha(major, 'en-US', {ignore: " "});
		}
		if (is_valid) {
			resolve('The major is valid.');
		} else {
			reject('The major is invalid.');
		}
	});
};

let _validate_minor = (minor) =>{
	return new Promise((resolve, reject) =>{
		let is_valid = false;
		if (typeof minor == 'string') {
			is_valid = validator.isAlpha(minor, 'en-US', {ignore: " "});
		}
		if (is_valid) {
			resolve('The minor is valid.');
		} else {
			reject('The minor is invalid.');
		}
	});
};

let _validate_year = (year) =>{
	return new Promise((resolve, reject) =>{
		let is_valid = false;
		if (typeof year == 'number') {
			is_valid = true;
		}
		if (is_valid) {
			resolve('The year is valid.');
		} else {
			reject('The year is invalid.');
		}
	});
}

export async function validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year) {
	return Promise.all([_validate_name(name),  _validate_studentid(studentid), _validate_email(email), _validate_username(username), _validate_password(password),
						_validate_hascalendar(hasCalendar), _validate_googuser(googuser), _validate_googpass(googpass), _validate_major(major), _validate_minor(minor),
						_validate_year(year)])
		.then((values) => {
			return true;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}
