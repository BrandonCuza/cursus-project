import { strictEqual } from 'assert';
import { Course } from '../model/course.js'
import { User_profile } from '../model/user_profile.js';
import axios from 'axios';
import { validate_fields } from '../utils/validate-fields.js';
const create = axios.create;

var myurl = 'http://localhost:3000';           
const instance = create({
    baseURL: myurl,
    timeout: 5000, //5 seconds max
    headers: {
        'content-type': 'application/json'}
});

// These are dummy values for the tests
let testName = 'Test Name';
let testStudentId = "201881792";
let testEmail = 'testjohndoe343@gmail.com';
let testUsername = 'TestUsername';
let testPassword = 'TestPassword1';
let testHasCalendar = false;
let testGoogUser = '';
let testGoogPass = '';
let testMajor = 'Biology';
let testMinor = 'Linguistics';
let testYear = 3;

describe('MUN Course Tool v1', function() {
    describe('Test Models', function() {
        describe('User Profile', function() {
            it('Test if profile is invalid (Invalid name)', async function() {
                let testProfile = new User_profile(2000292, testStudentId, testEmail, testUsername, testPassword, testHasCalendar, testGoogUser,
                                                   testGoogPass, testMajor, testMinor, testYear);
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), false);
            })
            it('Test if profile is invalid (Invalid student ID)', async function() {
                let testProfile = new User_profile(testName, 'error', testEmail, testUsername, testPassword, testHasCalendar, testGoogUser,
                                                   testGoogPass, testMajor, testMinor, testYear);
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), false);
            })
            it('Test if profile is invalid (Invalid email)', async function() {
                let testProfile = new User_profile(testName, testStudentId, 'hhsjhbs', testUsername, testPassword, testHasCalendar, testGoogUser,
                                                   testGoogPass, testMajor, testMinor, testYear);
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), false);
            })
            it('Test if profile is invalid (Invalid username)', async function() {
                let testProfile = new User_profile(testName, testStudentId, testEmail, '^%&@%@%', testPassword, testHasCalendar, testGoogUser,
                                                   testGoogPass, testMajor, testMinor, testYear);
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), false);
            })
            it('Test if profile is invalid (Invalid password)', async function() {
                let testProfile = new User_profile(testName, testStudentId, testEmail, testUsername, '*&^*^@*&^', testHasCalendar, testGoogUser,
                                                   testGoogPass, testMajor, testMinor, testYear);
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), false);
            })
            it('Test if profile is invalid (Invalid calendar integration choice)', async function() {
                let testProfile = new User_profile(testName, testStudentId, testEmail, testUsername, testPassword, 26573, testGoogUser,
                                                   testGoogPass, testMajor, testMinor, testYear);
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), false);
            })
            it('Test if profile is invalid (Invalid major)', async function() {
                let testProfile = new User_profile(testName, testStudentId, testEmail, testUsername, testPassword, testHasCalendar, testGoogUser,
                                                   testGoogPass, '327652', testMinor, testYear);
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), false);
            })
            it('Test if profile is invalid (Invalid minor)', async function() {
                let testProfile = new User_profile(testName, testStudentId, testEmail, testUsername, testPassword, testHasCalendar, testGoogUser,
                                                   testGoogPass, testMajor, '2324555', testYear);
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), false);
            })
            it('Test if profile is invalid (Invalid year)', async function() {
                let testProfile = new User_profile(testName, testStudentId, testEmail, testUsername, testPassword, testHasCalendar, testGoogUser,
                                                   testGoogPass, testMajor, testMinor, 'jhjsuuyd');
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), false);
            })
            it('Test if profile is valid', async function() {
                let testProfile = new User_profile(testName, testStudentId, testEmail, testUsername, testPassword, testHasCalendar, testGoogUser,
                                                   testGoogPass, testMajor, testMinor, testYear);
                strictEqual(await validate_fields(testProfile.name, testProfile.studentid, testProfile.email, testProfile.username, testProfile.password,
                                                  testProfile.hasCalendar, testProfile.googuser, testProfile.googpass, testProfile.major, testProfile.minor,
                                                  testProfile.year), true);
            })
        })
    })
    describe('Test API calls', function() {
        it('Fail 1. POST - Invalid input', async function() {
            let data = {
                name: 'Test Name',
                studentid: 'Invalid ID',
                email: 'testjohndoe343@gmail.com',
                username: 'TestUser',
                password: 'TestPassword1',
                hasCalendar: false,
                googuser: '',
                googpass: '',
                major: 'Biology',
                minor: 'Linguistics',
                year: 3
            }
            let res = await instance.post('/profiles', data);
            strictEqual(res.data, 'Error. User profile not inserted into the database.');
        })
        it('Success 1. POST - Valid input', async function() {
            let data = {
                name: 'Test Name',
                studentid: "201818972",
                email: 'testjohndoe343@gmail.com',
                username: 'TestUser',
                password: 'TestPassword1',
                hasCalendar: false,
                googuser: '',
                googpass: '',
                major: 'Biology',
                minor: 'Linguistics',
                year: 3
            };
            let res = await instance.post('/profiles', data);
            strictEqual(res.data, 'User profile correctly inserted into the database.');
        })
        it('Success 2. PUT - Login as new user.', async function() {
            this.timeout(15000);
            let data = {
                username: 'TestUser',
                password: 'TestPassword1'
            };
            let fail = false;
            await instance.post('/authenticate', data).catch(function(err) {
                if (err.response) {
                    fail = true;
                }
            });
            strictEqual(fail, false);
        })
        it('Success 3. PUT - Add course to profile', async function() {
            let course = new Course('TEST', '1002', 'Test', '001', '87928798');
            let data = {
                course: course
            }
            let res = await instance.put('/profile/course/add', data);
            strictEqual(res.data, 'Course properly added');
        })
        it('Success 4. PUT - Drop course from profile', async function() {
            let crn = '87928798';
            let data = {
                crn: crn
            }
            let res = await instance.put('/profile/course/drop', data);
            strictEqual(res.data, 'Course properly dropped');
        })
        it('Success 5. PUT - Request password reset', async function() {
            let res = await instance.put('/profile/password_reset');
            strictEqual(res.data, 'Email sent.')
        })
        it ('Success 6. DELETE - Delete profile from database', async function() {
            let res = await instance.delete('/profile');
            strictEqual(res.data, 'User profile was deleted.');
        })
    })
})
