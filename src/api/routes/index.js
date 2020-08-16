import { Router } from 'express'
import Auth from '../../auth/auth.route'
import User from '../routes/user.route'
import Customer from '../routes/customer.route'

const router = Router()

router.use('/', Auth)

router.use('/users', User)

router.use('/customers', Customer)

module.exports = router