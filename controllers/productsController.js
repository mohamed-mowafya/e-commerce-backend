const multer = require('multer')

const Product = require('../models/products')

const Storage = multer.diskStorage({ // Multer middleware for file upload.
    destination:'images',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage: Storage
}).single('image')

const getProducts = async (req, res) => {
    let products = await Product.find({});

    res.send(products);
}
const createProduct = (req,res) =>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            if(!req.user.admin) res.status(400).send("Unauthroized user.")
            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image:{
                    fileName:req.file.originalname,
                    contentType:'image/png'
                }
            })
            product.save()
            .then(()=>res.status(201).send('Product Created'))
            .catch(err=>console.log(err))
        }
    })
}
const updateProduct = (req,res) =>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            if(!req.user.admin) res.status(400).send("Unauthroized user.")
            Product.findByIdAndUpdate(req.body.id,{
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
               
            },(err,docs)=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send("Updated: " + docs.id)
                }
            })
        }
    })

}

const deleteProduct = (req,res) =>{
    Product.findByIdAndDelete(req.body.id,(err,docs)=>{
        if(err){
            res.status(404).send("Product not found.")
        }
        else{
            res.status(201).send("Product deleted.")
        }
    })

}

module.exports = {createProduct,deleteProduct,updateProduct, getProducts}