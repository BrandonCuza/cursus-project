//Imports
import express, { json, urlencoded } from 'express';
import session from 'express-session';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { create_profile, delete_profile, read_all_profiles, read_profile, isValidUser, request_password_reset, update_profile_alarms_add, update_profile_compcourses_add, update_profile_courses_add, update_profile_courses_drop, update_profile_degreeplan, update_profile_email, update_profile_googpass, update_profile_googuser, update_profile_hascalendar, update_profile_major, update_profile_minor, update_profile_name, update_profile_password, update_profile_studentid, update_profile_year } from './controller/user_profiles.js';
import { read_courses, read_course, read_all_courses, check_conflict} from './controller/courses.js';
import { connectToDB, closeDBConnection } from './utils/db.js';

const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({extended: true}));
app.use(session({
  name: 'munCourseToolSession',
  secret: 'HVGAEOMeQd2iQwwrROAqr5KZrFedS2DV',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 3600000 // One hour
  }
}));

var server;

async function createServer(){
  try {
    await connectToDB();

    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use(express.static(__dirname + '/view'));

    // Authentication paths

    app.get('/', (req, res) => {
      if (req.session.loggedIn) {
        res.redirect('/homepage.html');
      } else {
        res.redirect('/login');
      }
    });

    app.get('/dashboard', (req, res) => {
      if (req.session.loggedIn) {
        res.redirect('/homepage.html');
      } else {
        res.redirect('/login');
      }
    });

    app.get('/login', (req, res) => {
      res.redirect('/login.html');
    });

    app.post('/authenticate', async (req, res, next) => {
      if (await isValidUser(req)) {
        res.locals.username = req.body.username;
        next();
      } else {
        res.sendStatus(401);
        return 'Login failed.'
      }
    },
    (req, res) => {
      req.session.loggedIn = true;
      req.session.username = res.locals.username;
      let session = req.session;
      res.redirect('/homepage');
      return session;
    });
    
    app.get("/getStuAgenda/:stuid",async (req, resp)=>{
      let data = await getStuAgenda(req.params.stuid+"")
      resp.send(data)
    })
    app.get("/course-registration",(req,resp)=>{
      resp.redirect("/course-registration.html")
    })
    app.get("/homepage",(req,resp)=>{
      resp.redirect("/homepage.html")
    })
      
    app.get('/logout', (req, res) => {
      req.session.destroy((err)=>{});
      res.redirect('/login');
    });

    app.get('/test', (req,res) => {
      req.redirect('/courselist.html');
    });

    app.get('/register', (req, res) => {
      res.redirect('/register.html');
    })

    // Resource paths

    // POST
    app.post('/profile', (req, res) => {
      create_profile(req, res);
    });
    app.post('/profiles', create_profile);

    //GET
    app.get('/profile', read_profile);
    app.get('/profiles', read_all_profiles);
    app.get('/courses/', read_courses);
    app.get('/courses', read_all_courses);
    app.get('/course/:crn', read_course);

    //PUT
    app.put('/profile/name',update_profile_name);
    app.put('/profile/studentid', update_profile_studentid);
    app.put('/profile/email', update_profile_email);
    app.put('/profile/password', update_profile_password);
    app.put('/profile/password_reset', request_password_reset);
    app.put('/profile/hascalendar', update_profile_hascalendar);
    app.put('/profile/googuser', update_profile_googuser);
    app.put('/profile/googpass', update_profile_googpass);
    app.put('/profile/course/add', update_profile_courses_add);
    app.put('/profile/course/drop', update_profile_courses_drop);
    app.put('/profile/alarms/add', update_profile_alarms_add);
    app.put('/profile/alarms/drop', update_profile_alarms_add);
    app.put('/profile/major', update_profile_major);
    app.put('/profile/minor', update_profile_minor);
    app.put('/profile/compcourses/add', update_profile_compcourses_add);
    app.put('/profile/degreeplan', update_profile_degreeplan);
    app.put('/profile/year', update_profile_year);
    app.put('/courses/conflict', check_conflict);

    //DELETE
    app.delete('/profile', delete_profile);

    // Server Start
    server = app.listen(port, () => {
      console.log('Example app listening at http://localhost:%d', port);
    });
  }catch(err){
    console.log(err)
  }
}

createServer();

// Close MongoDB client when server is closed
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing Mongo Client.');
  server.close(async function(){
    let msg = await closeDBConnection()   ;
    console.log(msg);
  });
});
