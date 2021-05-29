const express       = require('express'),
      router        = express.Router(),
      User          = require("../models/user"),
      passport      = require('passport'),
      sgMail        = require('@sendgrid/mail'),
      util          = require('util'),
      crypto        = require('crypto');

// send grid api key ---- store in process.env
sgMail.setApiKey(process.env.SENDGRID_API);


// Show forgot password page
router.get('/forgotpassword', (req, res)=>{
    res.render("forgot");
});


// sends mail for reset password
router.put("/forgotpassword", async(req, res)=>{
    // generate a token which will be vaild for 1 hr to reset the password
    const token = await crypto.randomBytes(20).toString('hex');
    const {email} = req.body;
    // find the user based on email provided by user
    const user = await User.findOne({email: email});
    // if that email id dosent exist
    if(!user){
      req.flash('error', 'User does not exists.');
      return res.redirect("/forgotpassword");
    }
    // if exist put the token and expire time in database
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    // compile the mail
    const msg = {
      to: email,
      from: 'ronitsonu6@gmail.com', 
      subject: 'Reset password',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process:
      https://shpkart.herokuapp.com/reset/${token}
      If you did not request this, please ignore this email and 
      your password will remain unchanged.`.replace(/    /g, ''),
    };
    // send the mail
    await sgMail.send(msg);
    req.flash('success', `An email has been sent to ${email}, check your spam folder if you cant find it in inbox.`);
    res.redirect('/forgotpassword');
});


//displays reset password page 
router.get('/reset/:token', async(req, res) => {
    // find the user based on token and expiration time of token
    const token = req.params.token;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    // if not exist or token expires
    if(!user){
      req.flash('error', 'Password reset token has expired');
      return res.redirect('/forgotpassword');
    }

    // if token is valid show the reset password page
    res.render("reset", {token});
});


// route to reset the password 
router.put('/reset/:token', async(req, res)=>{
    // collect the token and find the user
    const token = req.params.token;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    // if dosen't exist or token expired redirect back to forgot password page 
    if(!user){
      req.flash('error', 'Password reset token has expired');
      return res.redirect('/forgotpassword');
    }

    // if token valid then compare the password in two fields
    if( req.body.password === req.body.confirm ){
      // update the new password
      await user.setPassword(req.body.password);
      // set token to null
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      // save the user and login
      await user.save();
      const login = util.promisify(req.login.bind(req));
      await login(user);
    } //if password dosent match, ask them to enter again
    else {
      req.flash('error', 'Passwords do not match');
      return res.redirect(`/reset/${token}`);
    }
    
    res.redirect('/');
});


module.exports = router;