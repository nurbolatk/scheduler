const mongoose = require('mongoose')
const Schema = mongoose.Schema


const courseSchema = new Schema({
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
})

module.exports = Course = mongoose.model('course', courseSchema)