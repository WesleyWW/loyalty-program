import { Router } from 'express'
import { verifyLogin } from '../../auth/auth.middleware'
import { updateUser } from '../controllers/user.controller'
const router = Router()


//Update User information
router.post('/update', verifyLogin, updateUser)


module.exports = router