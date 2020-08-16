import User from '../models/user'
import Customer from '../models/customer'

const createCustomer = async (req, res) => {
    const id = req.userId
    let { phone, email } = req.body
    let cycle = req.body.spent.cycle

    try {
        const customer = await new Customer({ 
            phone,
            email,
            spent: {
                cycle
            },
            user: id
         })
        await customer.save()

        const user = await User.findById(id)
        user.customers.push(customer)
        await user.save()


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

export { createCustomer, customersByUser }