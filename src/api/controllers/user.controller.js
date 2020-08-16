import User from '../models/user'

const updateUser = async (req, res) => {
    const id = req.userId
    const newUser = req.body

    try {
        let user = await User.findOneAndUpdate(
            {_id: id},
            newUser,
            { new: true}
        )
        if(!user) return res.status(404).send({ success: false, message: 'User not found' })
        
        return res.status(200).send({ success: true, user })
    } catch (error) {
        console.log(error)
        return res.status(400).send({ success: false, message: 'Problem saving user'})
    }
}

export { updateUser }