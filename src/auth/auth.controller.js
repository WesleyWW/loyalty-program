import User from '../api/models/user'
import bcrypt from 'bcrypt'
const salt = bcrypt.genSaltSync(10)

const register = async (req, res) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let company = req.body.company
    let pw = req.body.password

    const password = bcrypt.hashSync(pw, salt)
    const newUser = await new User({ firstName, lastName, email, company, password })
    console.log(newUser)
    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).send('Error: ' + err))
}

//Login
const login = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if(!email || !password){
        return res.status(403).send({ success: false, message: 'Must include email and password'})
    }
    try {
        let user = await User.findOne({ email: new RegExp('^'+email+'$', "i") })
        if(!user) return res.status(404).send( {success: false, message: 'Could not find user'} )

        const validPW = bcrypt.compare(password, user.password)
        if(!validPW) return res.status(403).send({ success: false, message: 'Email or password incorrect'})

        let session = req.session
        session.userId = user._id
        return res.status(200).send({ success: true, session })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ success: false, message: 'Problem logging in'})
    }
}

const logout = async (req, res) => {
    let session = req.session
    if(!session) return res.status(404).send({ success: false, message: 'User not logged in' })

    req.session.destroy(() => {
        return res.status(200).send({ success: true, message: 'Sucessfully logged out' })
    })
}

const authRoute = async (req, res) => {
    const userId = req.session.userId
    return res.send(userId)
}

export { register, login, logout, authRoute } 