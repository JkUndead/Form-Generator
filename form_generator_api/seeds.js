const mongoose = require('mongoose');
const User = require('./models/users');

const data = [
    {
        username: 'Wei Jie',
        role: 'Manager'
    },
    {
        username: 'Syed',
        role: 'Manager',
    }
]

function seedDB() {
    //Remove all users
    User.deleteMany({})
        .then(() => {
            data.forEach(seed => {
                User.create(seed)
                    .then(newUser => {
                        console.log(newUser)
                    }).catch(err => {
                        console.log(err);
                    })
            })
        }).catch(err => {
            console.log(err);
        })
}

module.exports = seedDB;