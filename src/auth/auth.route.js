import { Router } from 'express'
import { verifyLogin } from './auth.middleware'
import { register, login } from './auth.controller'

const router = Router()

router.post('/register', register)

router.post('/login', login)

module.exports = router