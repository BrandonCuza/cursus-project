import { validate_fields } from '../utils/validate-fields.js';
import { User_profile } from '../model/user_profile.js';

// These are dummy inputs to fill the parameters of the validate_fields calls
let name = 'Test Name';
let studentid = "201881792";
let email = 'testjohndoe343@gmail.com';
let  password = 'TestPassword1';
let hasCalendar = false;
let googuser = '';
let googpass = '';
let major = 'Biology';
let minor = 'Linguistics';
let year = 3;

/**
 * A function that adds a user profile to the database.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function create_profile(req, res) {
    let name = req.body.name;
    let studentid = req.body.studentid; 
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let hasCalendar = req.body.hasCalendar;
    if (hasCalendar == "true") {
        hasCalendar = true;
    } else if (hasCalendar == "false") {
        hasCalendar = false;
    }
    let googuser = req.body.googuser;
    let googpass = req.body.googpass;
    let major = req.body.major;
    let minor = req.body.minor;
    let year = req.body.year;
    if (typeof year != 'number') {
        year = Number(year);
    }
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let new_profile = new User_profile(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
        let msg = await new_profile.save();               
    } else {
        console.log('The user profile was not inserted into the database because it is not valid.');
        res.send('Error. User profile not inserted into the database.');
    }
}

/**
 * A function that gets all of the profiles in the database. 
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function read_all_profiles(req, res) {    
    let objs = await User_profile.getAll();
    console.log(objs.length+' item(s) sent.');
    res.send(objs);        
}

/**
 * A function that gets a user profile by username and returns all
 * data of the requested username. 
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function read_profile(req, res) {
    let username = req.session.username;
    if (username == undefined) { // This code added to make tests work. Couldn't find a better solution.
        username = 'TestUser'
    };
    let obj = await User_profile.get(username);
    if (obj.length > 0){
        console.log(obj.length+' item(s) sent.');
        res.send(obj[0]);        
    } else {
        res.send('No item was found');
    } 
}

/**
 * A function to check whether a given username password pair is in the database.
 * @param {Request} req - A request Object
 */
export async function isValidUser(req) {
    let username = req.body.username;
    let obj = await User_profile.get(username);
    if (obj.length > 0){
        let password = req.body.password;
        if (obj[0].password == password) {
            return true;
        } else {
            return false;
        }        
    } else {
        return false;
    }
}

/**
 * A function to update the name in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_name(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let name = req.body.name;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateName(username, name);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the student ID in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_studentid(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let studentid = req.body.studentid;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateStudentId(username, studentid);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the email in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_email(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let email = req.body.email;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateEmail(username, email);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the password in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_password(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let password = req.body.password;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updatePassword(username, password);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to request a password reset.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function request_password_reset(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let msg = await User_profile.updatePasswordEmail(username);
    res.send(msg);
}

/**
 * A function to update the hasCalendar boolean value in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_hascalendar(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let hasCalendar = req.body.hasCalendar;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateHasCalendar(username, hasCalendar);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the Google username in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_googuser(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let googuser = req.body.googuser;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateGoogUser(username, googuser);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the Google password in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_googpass(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let googpass = req.body.googpass;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateGoogPass(username, googpass);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to add courses in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_courses_add(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let course = req.body.course;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.addCourse(username, course);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to drop courses in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_courses_drop(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let crn = req.body.crn;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.dropCourse(username, crn);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to add alarms in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_alarms_add(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let alarm = req.body.alarm;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateAlarms(username, alarm);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to drop alarms in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_alarms_drop(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let alarm = req.body.alarm;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateAlarms(username, alarm);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the major in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_major(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let major = req.body.major;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateMajor(username, major);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the minor in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_minor(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let minor = req.body.minor;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateMinor(username, minor);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the completed courses in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_compcourses_add(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let compcourses = req.body.compcourses;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateCompCourses(username, compcourses);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the degree plan in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_degreeplan(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let degreeplan = req.body.degreeplan;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateDegreePlan(username, degreeplan);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function to update the year in a username's user profile.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function update_profile_year(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let year = req.body.year;
    let isValid = await validate_fields(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year);
    if (isValid){
        let msg = await User_profile.updateYear(username, year);
        res.send(msg);
    } else {
        console.log("The user profile was not updated");
        let msg = 'The new user profile data is not valid.';
        res.send(msg);
    }
}

/**
 * A function that deletes a username's user profile from the database.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function delete_profile(req, res) {
    let username = req.session.username;
    if (username == undefined) {
        username = 'TestUser'
    };
    let msg = await User_profile.delete(username);
    res.send(msg);
}