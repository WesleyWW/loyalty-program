import User from '../api/models/user'
import bcrypt from 'bcrypt'
const salt = bcrypt.genSaltSync(10)

const register = (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let company = req.body.company
    let pw = req.body.password

    const password = bcrypt.hashSync(pw, salt)
    const newUser = new User({ firstName, lastName, email, company, password })
    console.log(newUser)
    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).send('Error: ' + err))
}

export { register } 