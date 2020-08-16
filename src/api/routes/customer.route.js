import { Router } from 'express'
import { verifyLogin } from '../../auth/auth.middleware'
import { createCustomer, customersByUser } from '../controllers/customer.controller'
const router = Router()

//Add new customer
router.post('/create', verifyLogin, createCustomer)

router.get('/byUser', verifyLogin, customersByUser)

module.exports = router