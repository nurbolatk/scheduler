const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017")


mongoose.connection.once('open', function() {
    console.log("Conection Made");
}).on('error', function(error) {
    console.log("Connection Error")
})