import { Router } from 'express'
import { verifyLogin } from '../../auth/auth.middleware'

import { enterPhoneNumber, createPurchase, customersByUser  } from '../controllers/customer.controller'
const router = Router()

//Enter a phone number
router.post('/number', verifyLogin, enterPhoneNumber )
//Add new customer
router.post('/create', verifyLogin, createPurchase)



router.get('/byUser', verifyLogin, customersByUser)

module.exports = router