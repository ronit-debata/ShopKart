const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const User = require('../models/user');
const Order = require('../models/order');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AT4VsuboQHFaEPvqbwu6xHfUqChQBAQ6Z3u9KhhsLkMZZOykjyEmeC3Nk60KQk0tyZ7s0YiVN12a_Oca',
  'client_secret': 'EPosk33FCxG-V12AiQmq63xzaFmot9KmABf00cae6JuJJq4DCcZCf8x8jEckrtJNJphxbPjYWy24BQQP'
});


router.post('/pay',isLoggedIn, (req, res) => {


    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `https://shpkart.herokuapp.com/payment/success/${req.body.amount}/`,
            "cancel_url": "https://shpkart.herokuapp.com/payment/fail"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Your Order",
                    "sku": "001",
                    "price": req.body.amount,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": req.body.amount
            },
            "description": "Shop Order"
        }]
    }

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
            }
        }
      });


    });
    

router.get('/payment/success/:amt',isLoggedIn, async(req, res) => {

try{
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
       "payer_id": payerId,
       "transactions": [{
          "amount": {
             "currency": "USD",
             "total": req.params.amt
        }
    }]
    }

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
    }
    })

    const order= {
        txnid: paymentId,
        amount: Math.ceil(req.params.amt*75),
        orderedProducts:req.user.cart
    }

    const placedOrder=await Order.create(order);
    
    req.user.orders.push(placedOrder);
    
    await req.user.save();
    
    req.flash('success','Your Order has been Successfully Placed.Thanks for Shopping with us!')
    res.redirect(`/user/${req.user._id}/me`);
}
catch (e) {
    console.log(e.message);
    req.flash('error', 'Cannot Place the Order at this moment.Please try again later!');
    res.render('error');
} 
    
})

router.get('/payment/fail',isLoggedIn, (req, res) => {
    //Payumoney will send Fail Transaction data to req body. 
    //  Based on the response Implement UI as per you want
    req.flash('error', `Your Payment Failed.Try again after sometime ${req.body}`);
    res.render('error');
})



module.exports = router;
