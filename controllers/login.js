var bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var User = require('../models/User')

const login = (req,res)=>{
	User.findOne({
		email: req.body.email
	}).then(doc=>{
		console.log(doc,'ini login')
		bcrypt.compare(req.body.password, doc.password, function (err, result) {
			if(result){
				let payload = {
					email: doc.email,
					userid: doc._id,
					name: doc.name
				}
				let token = jwt.sign(payload, process.env.SecretKEY)
				res.send({message:'login succesed', token})
			}else {
				res.send('invalid')
			}
		});
	}).catch(err=>{res.send('invalid')})
}

module.exports = {
	login
}