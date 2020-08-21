import { Router } from 'express'
import { verifyLogin } from '../../auth/auth.middleware'
import { createPurchase, customersByUser } from '../controllers/customer.controller'
const router = Router()

//Add new customer
router.post('/create', verifyLogin, createPurchase)



router.get('/byUser', verifyLogin, customersByUser)

module.exports = router