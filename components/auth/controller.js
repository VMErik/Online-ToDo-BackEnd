const Store = require('../user/store');
const bcrypt = require('bcrypt');
const auth = require('../../auth/index');

async function login(username, password) {
    const query = {
        username: username
    }
    let data = await Store.query(query);
    console.log(data);
    if (data) {
        return bcrypt.compare(password, data.password)
            .then(correcta => {
                if (correcta === true) {
                    const plainObject = {
                        ...data
                    }
                    console.log('Plan object -- ', plainObject);
                    return auth.sign(plainObject._doc);
                } else {
                    return Promise.reject('The password dont match');
                }
            })
            .catch(error => {
                console.log(error)
                return Promise.reject('Internal error');
            })
    } else {
        return Promise.reject('The user does not exist');
    }
}



module.exports = {
    login
}