const path = require("path");
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const events = require('./routes/api/events');
const bodyParser = require('body-parser');
const passport = require('passport');
const search = require('./routes/api/search');
require('./config/passport')(passport);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


mongoose
    .connect(db, {useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch( err => console.log(err));

app.get("/", (req, res) => res.send(" Bart App for Tourists"));
const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server is running on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/events", events);
app.use('/api/search', search);
app.use(passport.initialize());
