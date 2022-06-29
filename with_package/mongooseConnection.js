const mongoose = require('mongoose');
const user = require('./Models/users');
mongoose.connect('mongodb+srv://root:root@cluster0.hucjxrl.mongodb.net/test_node?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected!');
}).catch(() => {
    console.log('Not Connected!');
});
// find all users
user.find({}, (err, data) => {
    console.log('all data',data);
});
// insert data
var createdUser = new user({
    _id: new mongoose.Types.ObjectId(),
    name: 'Jeevan Sharma',
    email: 'jeevan@test.com',
    address: 'Bhopal'
});
createdUser.save().then((result) => {
    console.log('created user = ', result)
}).catch((err) => {
    console.log(err);
});

