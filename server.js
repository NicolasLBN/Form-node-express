let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

//Set the template model motor
app.set('view engine', 'ejs')

// ========================= Start of Middleware =========================
//We tell our application it will look for statc files in the public folder, we have to add assets in the URL to access content
app.use('/assets', express.static('public'))

//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//This Middleware create a session with a cookie
app.use(session({
    secret: 'azerty',
    resave: false, 
    saveUninitialized: true, 
    cookie: {secure: false}
}))

app.use(require('./middlewares/flash'))
// ========================= End of Middleware =========================

//When it goes to the root of the project express will render the variable test of pages/index
app.get('/', (request, response) => {
    let Message = require('./models/message')
    Message.all(function (messages) {
        response.render('pages/index', {messages: messages})
    })
})

/*Each time the user submits the form the method checks whether the message is empty or not.
If it is, then a error message is stored in the session flash array and displayed.
otherwise the message content is inserted in DB and a success message is displayed*/
app.post('/', (request, response) => {
if(request.body.message === undefined || request.body.message === '') {
    request.flash('error', "Vous n'avez pas posté de message")
    response.redirect('/')
}
else{
    let Message = require('./models/message')
    Message.create(request.body.message, function () {
        request.flash('success', "Merci !")
        response.redirect('/')
    })
}
})

//If we add message/id in the url, this method will find the proper row in DB and give back the message content
app.get('/message/:id', (request, response) => {
    let Message = require('./models/message')
    Message.find(request.params.id, function(message) {
        response.render('messages/show', {message: message})
    })
})
app.listen(8080)