let connection = require('../config/db')
let moment = require('../config/moment')

class Message {

    constructor (row) {
        this.row = row
    }

    get content () {
        return this.row.content
    }

    get created_at () {
        return moment(this.row.created_at)
    }

    get id () {
        return this.row.id
    }

    //Insert a row with in query and return the content 
    static create (content, cb){
        connection.query('INSERT INTO livreor SET content = ?, created_at = ?', [content, new Date()], (err, result) => {
            if (err) throw err
            cb(result)
        })
    }

    //Send a SELECT SQL query and return all the rows 
    static all (cb) {
        connection.query('SELECT * FROM livreor', (err, rows) => {
            if (err) throw err
            cb(rows.map(row => new Message(row)))
        })
    }

    //Send a SELECT SQL query and return the proper row 
    static find (id, cb) {
        connection.query('SELECT * FROM livreor WHERE id = ? LIMIT 1', [id], (err, rows) => {
            if (err) throw err
            cb(new Message(rows[0]))
        })
    }
}


module.exports = Message