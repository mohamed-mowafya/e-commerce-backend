const Order = require('../models/order');
const Cart = require('../models/cart');
const User = require('../models/user');

const getUserOrders = async (req,res) =>{
    const userId = req.user.id
    Order.find({userId}).sort({date:-1}).then(orders => res.json(orders))
}

const addOrder = async (req,res) =>{
    const userId = req.user.id
    let cart = await Cart.findOne({userId});
    let user = await User.findOne({_id: userId});

    const order = await Order.create({
        userId,
        items: cart.items,
        bill: cart.bill
    });

    const data = await Cart.findByIdAndDelete({_id:cart.id});
    return res.status(201).send("Order created for user" + userId);

}

module.exports = {getUserOrders,addOrder}