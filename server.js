const { response } = require('express')
let express = require('express')
let app = express()
let bodyParser = require('body-parser')

app.set('view engine', 'ejs')

// Middleware
//We tell our application she will look for statc files in the public folder, we have to add assets in the URL to access content
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//When it goes to the root of the project express will render the variable test of pages/index
app.get('/', (request, response) => {
    //mthod
    response.render('pages/index', {test: 'Salut0'})
})

app.post('/', (request, response) => {
if(request.body.message === undefined || request.body.message === '') {
    response.render('pages/index', {error: "Vous n'avez pas entré de message"})
    response.redirect('/')
}
})
app.listen(8080)