import { getDb } from '../utils/db.js';

async function _get_entries_collection() {
    let db = await getDb();
    return await db.collection('courses');
}

class Course {
    constructor(subject, number, name, section, crn, slot, days, starttime, endtime, roombuild, roomnumber, type, method, associatedleclab, phon, waitlist, precheck, reservelifted, attribute, credhr, billhr, prime_instr, secnd_instr, availto, reservefordegree, reserveformajor, reserveforminor, xlist) {
        this.subject = subject;
        this.number = number;
        this.name = name;
        this.section = section;
        this.crn = crn;
        this.slot = slot;
        this.days = days;
        this.starttime = starttime;
        this.endtime = endtime
        this.roombuild = roombuild;
        this.roomnumber = roomnumber
        this.type = type;
        this.method = method;
        this.associatedleclab = associatedleclab;
        this.phon = phon;
        this.waitlist = waitlist;
        this.precheck = precheck;
        this.reservelifted = reservelifted;
        this.attribute = attribute;
        this.credhr = credhr;
        this.billhr = billhr;
        this.prime_instr = prime_instr;
        this.secnd_instr = secnd_instr;
        this.availto = availto;
        this.reservefordegree = reservefordegree;
        this.reserveformajor = reserveformajor;
        this.reserveforminor = reserveforminor;
        this.xlist = xlist;
    }

    /*
    * Method to return all courses in the database that fit
    * a given filter.
    */
    static async get(filters) {
        let collection = await _get_entries_collection();
        let filteredCourses = await collection.find(filters).toArray();
        return filteredCourses;
    }

    /*
    * Method that returns a single course from the database that
    * matches the given crn.
    */
    static async getOne(crn) {
        let collection = await _get_entries_collection();
        let course = await collection.findOne({ crn: crn });
        return course;
    }

    /*
    * Method that returns all courses in the database.
    */
    static async getAll() {
        let collection = await _get_entries_collection();
        let allCourses = await collection.find({}).toArray();
        return allCourses;
    }
}

const _Course = Course;
export { _Course as Course };