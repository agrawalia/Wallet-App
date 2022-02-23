const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://maxmilain:maxmilain@cluster0.c9tus.mongodb.net/wallet', {
    useNewUrlParser : true,
    useUnifiedTopology: true
    // useCreateIndex: true
})
.then(() =>{
    console.log('connection successfull');
})
.catch((err) => {
    console.log(err);
    console.log('unsuccessfull');
})