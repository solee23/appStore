const mongooes = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoConnect = () => {
    mongooes.connect(process.env.DBURL, {
        useNewURLParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`Connected to Mongo !`)
    })
}

module.exports = mongoConnect;