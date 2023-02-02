const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const UserRoute = require('./Routes/User.Route.js');
const ThemeRoute = require('./Routes/Theme.Route.js');
const BlogRoute = require('./Routes/Blog.Route.js');

const PORT = process.env.PORT || 5000;
const app = express();

const corsFonfig = {
    origin: true,
    credentials: true,
}

app.use(cors(corsFonfig));
app.options('*', cors(corsFonfig));
app.use(bodyParser.json());

//Database connection
mongoose.connect(process.env.DATABASE_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected successfully"))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const baseUrl = process.env.BASE_ROUTE;

app.get("/", (req, res) => {
    res.send("Server is running");
});
app.use(`${baseUrl}/auth/user`, UserRoute);
app.use(`${baseUrl}/theme`, ThemeRoute);
app.use(`${baseUrl}/blogs`, BlogRoute);


//All
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
})

process.on('uncaughtException', err => {
    console.log(err);
    app.close(() => {
        process.exit(1);
    })
})