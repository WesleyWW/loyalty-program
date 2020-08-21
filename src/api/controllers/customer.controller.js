import User from '../models/user'
import Customer from '../models/customer'

/*
Customer enters phone number 
  -->Create customer if doesn't exist - not eligible for reward discount
  -->Check if eligible for reward, if eligible return isEligible
  -->Return customer info

Teller includes amount w/ customer info
  -->discount amount if user is eligible for reward
  -->Add amount paid to spent.total
  -->add amount paid to spent.cycle -> subtract 100 from spent.cycle
  -->if cycle > 100 ? isEligible : !isEligible
  
*/

const enterPhoneNumber = async (req, res) => {
    const id = req.userId
    let phone  = `+1${req.body.phone}`
    try {
        let customer = await Customer.findOne({ phone })
        if(!customer){
            customer = await new Customer({ 
                phone,
                userId: id
            })
            await customer.save()
            return res.status(201).send({ success: true, customer })
        }else{
            let response = customer.hasReward ? "Customer is eligible for a reward" : "No reward this time"
            return res.status(200).send({ success: true, message: response })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Problem checking number'})
    }
}

const createPurchase = async (req, res) => {
    const id = req.userId
    let phone  = req.body.phone
    let amount = req.body.amount * 100
    let usedReward = req.body.usedReward
    let rewardLevel = 10000
    
    try {
        let customer = await Customer.findOne({ phone, userId: id })
        let cycle = customer.spent.cycle * 100
        let total = customer.spent.total * 100
        console.log([cycle, total])
        customer.spent.total = ((total+amount)/100).toPrecision(2)
        console.log(customer.spent.total)
        customer.spent.cycle = usedReward ? (cycle + amount - rewardLevel)/100 : (cycle + amount)/100
        console.log(customer.spent.cycle)
        customer.hasReward = customer.spent.cycle > 100 ? '1' : '0'

        customer.save()
        return res.status(201).send({ success: true, customer })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ success: false, message: 'Problem creating customer'})
    }
}

const customersByUser = async (req, res) => {
    const userId = req.userId
    try {
        let customers = await Customer.find({ userId })
        if(!customers){
            return res.status(404).send({ success: false, message: 'No customers found'})
        }
        return res.status(200).send(customers)
    } catch (err) {
        console.log(err)
        return res.status(400).send({ success: false, message: 'Problem getting customers'})
    }
}

export { enterPhoneNumber, createPurchase, customersByUser }