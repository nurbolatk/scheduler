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
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

// use routes
app.use('/api/users', users)
app.use('/api/posts', posts)
app.use('/api/profile', users)



// Get the index of nth occurance of pat in str
function nthIndex(str, pat, n){
  var L= str.length, i= -1;
  while(n-- && i++<L){
      i= str.indexOf(pat, i);
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
  'L',
  'Lb',
  'R',

]

pdf(dataBuffer).then(function(data) {
  // first write to file
  fs.writeFile('aloha.txt', data.text, err => {
    if(err) console.log(err)
    // then read from that file
    fs.readFile('aloha.txt', 'utf-8', (err, text) => {

      abstractCourses.forEach(absCourse => {

        //counter for occurances
        let indexCounter = 1
        // start index of particular occurance of course code
        let startIndex = nthIndex(text, absCourse, indexCounter)
        // start index of the next occurance of course code
        let endIndex = nthIndex(text, absCourse, indexCounter+1)

        // до конца не доделан, надо правильно находить последний курс нынешнего abscourse
        // затем перейти к следующему
        while(endIndex != -1 || startIndex != -1){
          courseAsText = text.substring(startIndex, endIndex).trim()
          
          // for testing
          if(absCourse == abstractCourses[0]){
            fs.writeFile('biol.txt', `${courseAsText}`, err => {if(err) console.log(err)})
          }

          courseTitle = courseAsText.substring(0, courseAsText.indexOf('\n'))
          if(courseTitle.length > 14){
            courseTitle = courseAsText.substring(0, 14)
          }
          console.log(courseTitle)
          indexCounter++
          startIndex = nthIndex(text, absCourse, indexCounter)
          endIndex = nthIndex(text, absCourse, indexCounter+1)
        }
        // number of courses?
        console.log('number of courses', indexCounter)
      })
      
      // console.log(text.substring(startIndex, endIndex))
    })
  })
});



const port = process.env.PORT || 4343
app.listen(port, () => console.log(`Server is running on port ${port}`))