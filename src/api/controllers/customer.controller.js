import User from '../models/user'
import Customer from '../models/customer'

/*
Customer enters phone number - teller enters amount
  -->Create customer if doesn't exist - not eligible for reward discount
  -->Check if eligible for reward, if eligible => discount price
  -->Send reward eligibility and amount back

Teller submits both forms
  -->Add amount paid to spent.total
  -->

*/

const createPurchase = async (req, res) => {
    const id = req.userId
    let phone  = req.body.phone
    let amount = req.body.amount
    let cycle 
    let total = 0
    let rewardEligible
    try {
        
        let customer = await Customer.findOne({ phone })
        if(!customer){
            rewardEligible = (amount > 100) ? '1' : '0'

            customer = await new Customer({ 
                phone,
                spent: {
                    cycle: amount,
                    total: amount
                },
                rewardEligible,
                user: id
             })
            await customer.save()
    
            let user = await User.findById(id)
            user.customers.push(customer)

            
            await user.save()
            return res.status(200).send({customer, message: 'Customer created'})
        }else{
            //check if elegible for reward
            if(customer.rewardEligible){
                amount = (amount*.95).toPrecision(2)
                cycle = 0
                total = customer.spent.total + amount

                customer.spent.cycle = cycle
                customer.spent.total = total
                customer.rewardEligible = '0'
                await customer.save()
                return res.send(customer)
            }
            cycle = customer.spent.cycle + amount
            total = customer.spent.total + amount
            if((customer.spent.cycle + amount) > 100){
                customer.rewardEligible = '1'
            }
            return res.status(201).send({ success: true, customer })
        }

        return res.status(201).send({ success: true, customer })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ success: false, message: 'Problem creating customer'})
    }
}

const customersByUser = async (req, res) => {
    const id = req.userId

    const user = await User.findById(id).populate('customers')


    return res.send(user)

}

export { createPurchase, customersByUser }