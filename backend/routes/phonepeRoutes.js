
const express=require('express')
const router=express.Router()
const paymentcontroller=require('../controllers/PhonepeController')

router.post('/pay',paymentcontroller.pay)
router.post('/check-payment-status',paymentcontroller.checkPaymentStatus)
// router.post('/redirect-url/:merchantTransactionId',paymentcontroller.redirect)

    
module.exports=router