import { Router } from 'express'
import Auth from '../../auth/auth.route'
import User from '../routes/user.route'

const router = Router()

router.use('/', Auth)

router.use('/users', User)

module.exports = router