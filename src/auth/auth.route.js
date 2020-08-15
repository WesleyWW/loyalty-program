import { Router } from 'express'
import { verifyLogin } from './auth.middleware'
import { register, login, authRoute } from './auth.controller'

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.get('/auth', verifyLogin, authRoute)

module.exports = router