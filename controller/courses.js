import { Course } from '../model/course.js';
import { User_profile } from '../model/user_profile.js';

/**
 * A function that gets all courses that fit a filter and returns all
 * data of the requested courses. 
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function read_courses(req, res) {
    let filters = req.query;
    let username = req.session.username;
    if (filters.hasOwnProperty("number")) {
        filters.number = {$regex: filters.number};
    }
    if (filters.hasOwnProperty("name")) {
        filters.name = {$regex: filters.name};
    }
    if (!filters.hasOwnProperty("exclusive")) {
        
        if (filters.hasOwnProperty("days")) {
            let days = filters.days.split(',');
            let regex = "";
            for (let day of days) {
                if (regex == "") {
                    regex += day;
                } else {
                    regex += ".*" + day;
                }
            }
            filters.days = {$regex: regex};
        }
    } else {
        delete filters.exclusive;
    }
    if (filters.hasOwnProperty("starttime")) {
        filters.starttime = Number(filters.starttime);
    }
    if (filters.hasOwnProperty("endtime")) {
        filters.endtime = Number(filters.endtime);
    }
    if (filters.hasOwnProperty("starttime") && filters.hasOwnProperty("endtime")) {
        filters.starttime = {$gte: filters.starttime}
        filters.endtime = {$lt: filters.endtime}
    }
    if (filters.hasOwnProperty("attribute")) {
        filters.attribute = {$regex: filters.attribute};
    }
    if (filters.hasOwnProperty("prime_instr")) {
        filters.prime_instr = {$regex: filters.prime_instr};
    }
    if (filters.hasOwnProperty("secnd_instr")) {
        filters.secnd_instr = {$regex: filters.secnd_instr};
    }
    if (filters.hasOwnProperty("availto")) {
        filters.availto = {$regex: filters.availto};
    }
    if (filters.hasOwnProperty("reservefordegree")) {
        filters.reservefordegree = {$regex: filters.reservefordegree};
    }
    if (filters.hasOwnProperty("reserveformajor")) {
        filters.reserveformajor = {$regex: filters.reserveformajor};
    }
    if (filters.hasOwnProperty("reserveforminor")) {
        filters.reserveforminor = {$regex: filters.reserveforminor};
    }
    let courses = [];
    if (filters == {}) {
        courses = await Course.getAll();
    } else {
        courses = await Course.get(filters);
    }
    if (courses.length > 0){
        let user = await User_profile.get(username);
        let userCourses = user[0].courses;
        for (let course of courses) {
            let isConflict = false;
            for (let userCourse of userCourses) {
                if (await check_conflict(userCourse.crn, course.crn)) {
                    isConflict = true;
                }
            }
            if (isConflict) {
                course.color = "Yellow";
            } else {
                course.color = "Green";
            }
        }
        console.log(courses.length+' item(s) sent.');
        res.send(courses);        
    } else {
        res.send('No item was found');
    }  
}

/**
 * A function that gets a course by its CRN and returns all
 * data of the requested course. 
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function read_course(req, res) {
    let crn = req.params.crn;
    console.log(crn);
    console.log(typeof crn);
    let course = await Course.getOne(crn);
    if (typeof course != 'null'){
        console.log('One item(s) sent.');
        res.send(course);        
    } else {
        res.send('No item was found');
    }  
}

/**
 * A function that checks if two courses identified by their CRN have
 * a schedule conflict and return true or false. 
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function check_conflict(crnOne, crnTwo) {
    let courseOne = await Course.getOne(crnOne);
    let courseTwo = await Course.getOne(crnTwo);
    let isConflict = false;
    if ((courseOne.days.includes('M') && courseTwo.days.includes('M')) || (courseOne.days.includes('T') && courseTwo.days.includes('T')) || (courseOne.days.includes('W') && courseTwo.days.includes('W')) || (courseOne.days.includes('R') && courseTwo.days.includes('R')) || (courseOne.days.includes('F') && courseTwo.days.includes('F')) || (courseOne.days.includes('S') && courseTwo.days.includes('S')) || (courseOne.days.includes('U') && courseTwo.days.includes('U'))) {
        if ((Number(courseOne.starttime) <= Number(courseTwo.starttime) && Number(courseTwo.starttime) <= Number(courseOne.endtime)) || (Number(courseTwo.starttime) <= Number(courseOne.starttime) && Number(courseOne.starttime) <= Number(courseTwo.endtime))) {
            isConflict = true;
        }
    }
    return isConflict;
}

/**
 * A function that lists all courses with all information that is
 * in the collection. 
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */
export async function read_all_courses(req, res) {    
    let courses = await Course.getAll();
    console.log(courses.length+' item(s) sent.');
    res.send(courses);        
}
