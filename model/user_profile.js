/*
    File taken from contacts-app-v4 and changed to fit our use case. Was 'contact.js'.
    Author: Amilcar Soares
    Modified by: Brandon Cuza
*/
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

    static async getAll() {
        let collection = await _get_profiles_collection();
        let objs = await collection.find({}).toArray();
        return objs;                
    }

    static async get(username) {
        let collection = await _get_profiles_collection();
        let obj = await collection.find({"username":username}).toArray();
        return obj;
    }

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

    static async addCourse(username, course) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $addToSet: {courses: course}});
        if (obj.modifiedCount > 0){
            return 'Course properly added';
        }else{
            return 'Course was not added';
        }
    }

    static async dropCourse(username, crn) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $pull: {courses: {crn: crn}}});
        if (obj.modifiedCount > 0){
            return 'Course properly dropped';
        }else{
            return 'Course was not dropped';
        }   
    }

    static async addAlarm(username, alarm) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $addToSet: {alarms: alarm}});
        if (obj.modifiedCount > 0){
            return 'Alarm properly added';
        }else{
            return 'Alarm was not added';
        }
    }

    static async dropAlarms(username, alarm) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $pull: {alarms: alarm}});
        if (obj.modifiedCount > 0){
            return 'Alarm properly dropped';
        }else{
            return 'Alarm was not dropped';
        }   
    }

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

    static async addCompCourse(username, course) {
        let collection = await _get_profiles_collection();
        let obj = await collection.updateOne({'username': username}, { $addToSet: {compcourses: course}});
        if (obj.modifiedCount > 0){
            return 'Course properly added';
        }else{
            return 'Course was not added';
        }
    }

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
/**
 * get student's information by google username and password
 * @author bonan yin
 * @param username google username 
 * @param password google password
 * @return information
 */
const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
const getStuByGoogle = async (username, password) =>{
    let isEmail= reg.test(username);
    let collection = await _get_profiles_collection();
    if (!isEmail){
        return "email format error"
    }
    return await collection.findOne({'Google Username' : username,'Google Password':password})
        .then((res)=>{
            return res
        }).catch(err=>{
            console.log(err)
            return false
        })

}

const _User_profile = User_profile;
export { _User_profile as User_profile, getStuByGoogle };
