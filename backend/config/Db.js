const mongoose = require('mongoose');
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        console.log(`Mongo Db connected ${conn.connection.host}`)
    } catch (e) {
        console.log(e.message)
        process.exit();
    }
}

module.exports = connectDb;