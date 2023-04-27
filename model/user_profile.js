import { getDb } from '../utils/db.js';
import nodemailer from 'nodemailer';

async function _get_profiles_collection() {
    let db = await getDb();
    return await db.collection('profiles');
}

class User_profile {
    constructor(name, studentid, email, username, password, hasCalendar, googuser, googpass, major, minor, year) {
        this._id = username;
        this.name = name;
        this.studentid = studentid;
        this.email = email;
        this.username = username;
        this.password = password;
        this.hasCalendar = hasCalendar;
        this.googuser = googuser;
        this.googpass = googpass;
        this.courses = [];
        this.alarms = [];
        this.major = major;
        this.minor = minor;
        this.compcourses = [];
        //this.degreeplan = [];
        this.year = year;
    };

    /*
    * Method to save this user profile object to the database.
    */
    async save() {
        try {
            let collection = await _get_profiles_collection();
            let mongoObj = await collection.insertOne(this);
            console.log('One (1) user profile was inserted into the database with id: '+mongoObj.insertedId);
            return 'User profile correctly inserted into the database.';
        } catch(err) {
            throw err;
        }
    }

    /*
    * Static method to return all user profiles in the database.
    */
    static async getAll() {
        let collection = await _get_profiles_collection();
        let objs = await collection.find({}).toArray();
        return objs;                
    }

    /*
    * Static method to return a user profile that matches the given
    * username.
    */
    static async get(username) {
        let collection = await _get_profiles_collection();
        let obj = await collection.find({"username":username}).toArray();
        return obj;
    }

    /*
    * Static method to update the name of a user profile that matches
    * the given username.
    */
    static async updateName(username, name) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'name': name}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User name correctly updated.';
        } else {
            return 'User name was not updated.';
        }
    }

    /*
    * Static method to update the student ID of a user profile that matches
    * the given username.
    */
    static async updateStudentId(username, studentid) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'studentid': studentid}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User student ID correctly updated.';
        } else {
            return 'User student ID was not updated.';
        }                       
    }

    /*
    * Static method to update the email of a user profile that matches
    * the given username.
    */
    static async updateEmail(username, email) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'email': email}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User email correctly updated.';
        } else {
            return 'User email was not updated.';
        }                        
    }

    /*
    * Static method to update the password of a user profile that matches
    * the given username.
    */
    static async updatePassword(username, password) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'Password': password}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User password correctly updated.';
        } else {
            return 'User password was not updated.';
        }
    }

    /*
    * Static method to send an email containing instructions on
    * reseting the user's password to the email listed in a given
    * username's user profile. 
    */
    static async updatePasswordEmail(username) {
        let collection = await _get_profiles_collection();
        let obj = await collection.findOne({ 'username': username });
        let email = obj.email;
        let transporter = nodemailer.createTransport( {
            service: 'zoho',
            auth: {
                user: 'coursetoolemail@zohomail.com',
                pass: 'YiCuza2023'
            }
        });
        let mailOptions = {
            from: 'coursetoolemail@zohomail.com',
            to: email,
            subject: 'MUN Course Tool Password Reset',
            text: 'Please follow this link to reset your password: link'
        };
        let info = await transporter.sendMail(mailOptions);
        let date = new Date();
        console.log("Email sent to %s at %d:%d on %d/%d/%d", info.envelope.to[0], date.getHours(), date.getMinutes(), date.getDate(), date.getMonth(), date.getFullYear());
        return 'Email sent.';
    }

    /*
    * Static method to update the hasCalendar boolean of a user profile that matches
    * the given username.
    */
    static async updateHasCalendar(username, hasCalendar) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'hasCalendar': hasCalendar}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User calendar integration correctly updated.';
        } else {
            return 'User calendar integration was not updated.';
        }                      
    }

    /*
    * Static method to update the Google username of a user profile that matches
    * the given username.
    */
    static async updateGoogUser(username, googuser) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'googuser': googuser}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User Google username correctly updated.';
        } else {
            return 'User Google username was not updated.';
        }                     
    }

    /*
    * Static method to update the Google password of a user profile that matches
    * the given username.
    */
    static async updateGoogPass(username, googpass) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'googpass': googpass}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User Google password correctly updated.';
        } else {
            return 'User Google password was not updated.';
        }
    }

    /*
    * Static method to add a course to the user profile that matches
    * the given username.
    */
    static async addCourse(username, course) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $addToSet: {courses: course}});
        if (obj.modifiedCount > 0){
            return 'Course properly added';
        }else{
            return 'Course was not added';
        }
    }

    /*
    * Static method to drop a course from the user profile that matches
    * the given username.
    */
    static async dropCourse(username, crn) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $pull: {courses: {crn: crn}}});
        if (obj.modifiedCount > 0){
            return 'Course properly dropped';
        }else{
            return 'Course was not dropped';
        }   
    }

    /*
    * Static method to uadd an alarm to the user profile that matches
    * the given username.
    */
    static async addAlarm(username, alarm) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $addToSet: {alarms: alarm}});
        if (obj.modifiedCount > 0){
            return 'Alarm properly added';
        }else{
            return 'Alarm was not added';
        }
    }

    /*
    * Static method to drop an alarm from the user profile that matches
    * the given username.
    */
    static async dropAlarms(username, alarm) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $pull: {alarms: alarm}});
        if (obj.modifiedCount > 0){
            return 'Alarm properly dropped';
        }else{
            return 'Alarm was not dropped';
        }   
    }

    /*
    * Static method to update the major of a user profile that matches
    * the given username.
    */
    static async updateMajor(username, major) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'major': major}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User major correctly updated.';
        } else {
            return 'User major was not updated.';
        }                       
    }

    /*
    * Static method to update the minor of a user profile that matches
    * the given username.
    */
    static async updateMinor(username, minor) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'minor': minor}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User minor correctly updated.';
        } else {
            return 'User minor was not updated.';
        }                      
    }

    /*
    * Static method to add a course to the completed courses of the user 
    * profile that matches the given username.
    */
    static async addCompCourse(username, course) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $addToSet: {compcourses: course}});
        if (obj.modifiedCount > 0){
            return 'Course properly added';
        }else{
            return 'Course was not added';
        }
    }

    /*
    * Static method to update the year of a user profile that matches
    * the given username.
    */
    static async updateYear(username, year) {
        let collection = await _get_profiles_collection();
        let new_val = {$set: {'year': year}}
        let obj = await collection.updateOne({'username':username}, new_val);
        if (obj.modifiedCount > 0) {
            return 'User year correctly updated.';
        } else {
            return 'User year was not updated.';
        }                       
    }

    /*
    * Static method to delete the user profile that matches
    * the given username.
    */
    static async delete(username) {
        let collection = await _get_profiles_collection();
        let obj = await collection.deleteOne({'username':username});
        if (obj.deletedCount > 0) {
            console.log(`One (1) user profile with username ${username} was deleted from the database.`);
            return 'User profile was deleted.';
        } else {
            return 'User profile was not deleted.'
        }
    }
}

const _User_profile = User_profile;
export { _User_profile as User_profile, getStuByGoogle };
