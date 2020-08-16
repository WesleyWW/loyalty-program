import User from '../api/models/user'

const verifyLogin = async (req, res, next) => {
    
    try {
        
        let id = req.session.userId
        if(!id) return res.status(400).send({ message: 'Must log in' })

        let user = await User.findById(id)
        if(!user) return res.status(400).send({ message: 'User does not exist' })

        req.userId = user._id

        next()
    } catch (error) {
        console.log(error)
        return res.status(401).send({ auth: false, message: error })
    }
}

export { verifyLogin }