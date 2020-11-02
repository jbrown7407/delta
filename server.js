//npm init
//npm i express
//"main":"server,js" in package.json
//npm i ejs
//npm i mongoose
///DELETE npm i method-override
//npm install express-session
//npm install dotenv

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')

// middleware to help with the form submission
// app.use(express.urlencoded({extended: false})); //  recognize the incoming object as strings or arrays.

app.use(express.json());  // allows us to recognize the incoming request as a JSON object. 
app.use(express.urlencoded({extended: false})); //  recognize the incoming object as strings or arrays.
app.use(express.static(__dirname + '/public'));  // Access public directory
app.use(methodOverride('_method'))  //allow editing

//Port_
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
const PORT2 = process.env.PORT || 3001;

//_
//Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'messages';

// Connect to Mongo
mongoose.connect(MONGODB_URI,  { useNewUrlParser: true,  useUnifiedTopology: true});
// mongoose.connect('mongodb://localhost:27017/messageCRUD', { useNewUrlParser: true, useUnifiedTopology: true } );
//replaced with direct MONGODB connect

const db = mongoose.connection
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});
////////




// mongoose connection logic
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// importing the message model
const Message = require('./models/messages.js')

// ROUTES //
///////////
// INDEX //
///////////
app.get('/messages/login', (req, res)=>{
  
    res.render('login.ejs', {
     
      })
  })

app.get('/messages', (req, res)=>{
  Message.find({}, (error, allMessages)=>{
    res.render('index.ejs', {
      allMessages: allMessages
      // tobottom()
      })
  })

  
})

app.get('/', (req, res)=>{   //INITIAL LOGIN
 
    res.redirect('/messages/login')

})

app.get('/messages/boards', (req, res)=>{
 
    res.render('boards.ejs');
  
})

//NEW//
///////
app.get('/messages/new', (req, res) => {
  res.render('new.ejs');
  //res.send('new') send string of new to test
})


//CREATE//
///post///
app.post('/messages/', (req, res)=>{    //Post is an express method to POST

  Message.create(req.body, (error, createdMessage)=>{
    console.log("message created")
    res.redirect('/messages')
   
  })
})
  

/// edit ////
/////////////
// app.get('/messages/:id/edit', (req, res)=>{
  app.get('/messages/:id/edit', (req, res)=>{
  Message.findById(req.params.id, (err, foundMessage)=>{ //find the Message
      res.render('edit.ejs', 
        { message: foundMessage, //pass in found message 
      })
  })
})

// app.get('/messages/login', (req, res)=>{
//   Message.findById(req.params.id, (err, foundMessage)=>{ //find the Message
//       res.render('login.ejs');
  
// })
// })

// update//
///////////
app.put('/messages/:id', (req, res)=>{
  // if(req.body.readyToEat === 'on'){
  //     req.body.readyToEat = true;
  // } else {
  //     req.body.readyToEat = false;
  // }
  Message.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel)=> {
    res.redirect('/messages');
  })
})

// show///
//////////
app.get('/messages/:id', (req, res) =>{
  Message.findById(req.params.id, (err, foundMessage)=>{
    res.render('show.ejs', {
      message: foundMessage,
    })
  })
})

////////////
// delete //
app.delete('/messages/:id', (req, res) => {
  Message.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, data)=>{
    res.redirect('/messages') //redirect back to Message index
  })
})

app.patch('/messages/:id', (req,res) => {  ////LIKE BUTTON INCREMENT
  console.log(req.body)
  Message.findByIdAndUpdate(req.params.id, {$inc: {'likes': +1}}, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect(`/messages`)
    }
  })
})

// const express = require('express')  //REDUNDANT
// const app = express()                 // REDUNDANT

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//routes
// app.get('/', (req, res) => {
// 	res.render('index')
// })

//Listen on port 3000
server = app.listen(PORT2) // PORT THROWING ERROR, USING PORT 2 UNTIL FIX IS FOUND

//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username =  'Stranger'

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})

// the app running the server    PORT SHOULD BE ON?!
app.listen(PORT, () => {
  console.log('listening')
})