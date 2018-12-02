const express = require('express')
const mongoose = require('mongoose')

//some strange variables
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

//db config
const db = require('./config/keys').mongoURI

//connect to db
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('error connecting mongodb', err))

app.get('/', (req, res) => res.send('Hello World!'))

// use routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', users)


/*var Schema = mangoose.Schema

var courseModel = new Schema({
  courseAbbr: String,
  courseTitle: String,
  sectionType: String,
  creditsUSandECTS: String,
  startDate: String,
  endDate: String,
  days: String,
  startTime: String,
  endTime: String,
  faculty: String
})*/

// Get the index of nth occurance of pat in str
function nthIndex(str, pat, n) {
    var L = str.length,
        i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

//  PDFs
const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('sst_schedule_13.pdf');


let abstractCourses = [
    'BIOL ',
    'CHEM ',
    'CSCI ',
    'MATH ',
    'PHYS ',
    'ROBT '
]

let sstSectionTypes = [
    'Lb',
    'CLb',
    'Wsh',
    'ChLb',
    'BLb',
    'PLb',
    'L',
    'R'
]

var courses = [{}]

pdf(dataBuffer).then(function(data) {
    // first write to file
    fs.writeFile('aloha.txt', data.text, err => {
        if (err) console.log(err)
            // then read from that file
        fs.readFile('aloha.txt', 'utf-8', (err, text) => {
            abstractCourses.forEach((absCourse, index) => {

                    //counter for occurances
                    let indexCounter = 1
                        // start index of particular occurance of course code
                    let startIndex = nthIndex(text, absCourse, indexCounter)
                        // start index of the next occurance of course code
                    let endIndex = nthIndex(text, absCourse, indexCounter + 1)
                    console.log("\n STARTINDEX: " + startIndex + "\n");
                    console.log("\n ENDINDEX: " + endIndex + "\n");
                    // до конца не доделан, надо правильно находить последний курс нынешнего abscourse
                    // затем перейти к следующему
                    while (endIndex != -1 || startIndex != -1) {
                        courseAsText = text.substring(startIndex, endIndex).trim()
                        courseAbbr = courseAsText.match(new RegExp(absCourse + "[0-9][0-9][0-9]")) 
                        console.log("courseAbbr: " + courseAbbr[0])
                        shortCourseText = courseAsText.replace(courseAbbr[0], "") 
                        for (i = 0; i < sstSectionTypes.length; i++) {
                            if (shortCourseText.match(new RegExp("[0-9]+" + sstSectionTypes[i])) != null) {
                                sectionType = shortCourseText.match(new RegExp("[0-9]+" + sstSectionTypes[i]))
                                console.log("sectionType: " + sectionType);
                                shortCourseText = shortCourseText.replace(sectionType, "")
                                break
                            }
                        }
                        courseTitle = shortCourseText.match(new RegExp("[^0-9]+")) 
                        courseTitle[0] = courseTitle[0].trim()
                        console.log("courseTitle: " + courseTitle[0])
                        shortCourseText = shortCourseText.replace(courseTitle[0], "") 

                        creditsUSandECTS = shortCourseText.match(new RegExp("[0-9].[0-9][0-9]"))
                        console.log("creditsUSandECTS: " + creditsUSandECTS[0])
                        shortCourseText = shortCourseText.replace(creditsUSandECTS[0], "") 

                        startDate = shortCourseText.match(new RegExp("[0-9][0-9]-[A-Z]{3}-[0-9][0-9]"))
                        console.log("startDate: " + startDate[0])
                        shortCourseText = shortCourseText.replace(startDate[0], "")
                        
                        endDate = shortCourseText.match(new RegExp("[0-9][0-9]-[A-Z]{3}-[0-9][0-9]"))
                        shortCourseText = shortCourseText.replace(endDate[0], "")
                        console.log("endDate: " + endDate[0])
                        
                        days = shortCourseText.match(new RegExp("[^0-9]+"))
                        days[0] = days[0].trim()
                        console.log("days: " + days)
                        shortCourseText = shortCourseText.replace(days, "")
                        
                        startTime = shortCourseText.match(new RegExp("[0-9][0-9]:[0-9][0-9] AM|[0-9][0-9]:[0-9][0-9] PM"))
                        console.log("startTime: " + startTime);
                        shortCourseText = shortCourseText.replace(startTime[0], "")
                        
                        endTime = shortCourseText.match(new RegExp("[0-9][0-9]:[0-9][0-9] AM|[0-9][0-9]:[0-9][0-9] PM"))
                        console.log("endTime: " + endTime);
                        shortCourseText = shortCourseText.replace(endTime[0], "")
                        shortCourseText = shortCourseText.replace("-", "")
                        
                        faculty = shortCourseText.match(new RegExp("[^0-9]+")) 
                        faculty[0] = faculty[0].trim()
                        console.log("faculty: " + faculty[0])
                        shortCourseText = shortCourseText.replace(faculty[0], "") 
                        courses.push({
                          courseAbbr: courseAbbr[0],
                          courseTitle: courseTitle[0],
                          sectionType: sectionType[0],
                          creditsUSandECTS: creditsUSandECTS[0],
                          startDate: startDate[0],
                          endDate: endDate[0],
                          days: days[0],
                          startTime: startTime[0],
                          endTime: endTime[0],
                          faculty: faculty[0]
                        })
                        indexCounter++
                        startIndex = nthIndex(text, absCourse, indexCounter)
                        endIndex = nthIndex(text, absCourse, indexCounter + 1)
                    }
                    // number of courses?
                    console.log('number of courses', indexCounter)
                })
                //console.log(courses);
                // console.log(text.substring(startIndex, endIndex))
        })
    })
var jsonArray = JSON.parse(JSON.stringify(courses))
console.log(courses["CSCI 270"]);
});

const port = process.env.PORT || 4343
app.listen(port, () => console.log(`Server is running on port ${port}`))