import mongoose from "mongoose";

function connect() {
    const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env
    const connStr = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`

    const { connection } = mongoose
    connection.on('connected', ()=> console.log('[M] connected'))
    connection.on('error', ()=> console.log('[M] error', error))

    mongoose.connect(connStr)
}

export default connect