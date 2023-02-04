const Cart = require("../models/cart")
const Product = require("../models/products")

const getCart = async (req,res) =>{
    const userId = req.user.id;

    try{
        let cart = await Cart.findOne({userId});
        
        if(cart){ // If cart exists and has items.
            res.send(cart)
        }
        else{
            res.send("Cart doesn't exist")
        }
    }

    catch(err){ 
        res.status(500).send("DB Error.")
    }
}

const addToCart = async (req,res) =>{
    const userId = req.user.id;
    const {productId, quantity} = req.body.productId;

    try{
        let cart = await Cart.findOne({userId});
        let product = await Product.findOne({_id: productId});

        if(!item){
            res.status(400).send("Item not found.")
        }

        const productPrice = product.price;

        if(cart){ // If user has an existing cart in db
            cart.items.push({productId,quantity,price})

            cart.total += quantity * productPrice
            await cart.save()
          
        }
        else{ // User doesn't have a cart in db.
            
            const userCart = await Cart.create({
                userId,
                items: [{productId,quantity,price}],
                total: quantity * price
            })
        }

        return res.status(201).send("Item added to cart.")

     
    }
    catch(err){
        res.status(500).send("DB Error.")
    }
}

const removeFromCart = async (req,res) =>{
    const userId = req.user.id
    const productId = req.body.productId

    try{
        let cart = await Cart.findOne({userId})

        let productIndex = cart.items.findIndex(product => product.productId == productId)
        let product = cart.items[productIndex]

        cart.total -= product.quantity * product.price // Remove item price from total.
        cart.items.splice(productIndex,1) // Remove item from the cart items array.

        await cart.save()

        res.status(201).send("Item Removed")
    }

    catch(err){
        req.status(500).send("DB Error.")
    }
}

module.exports = {removeFromCart,addToCart,getCart}