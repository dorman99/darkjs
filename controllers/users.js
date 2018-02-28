var User = require('../models/User')
var bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = (req,res)=>{
	let user =  new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	})
	bcrypt.hash(user.password, saltRounds, function (err, hash) {
		user.password = hash 
		user.save()
			.then(doc => {
				res.status(200).send({ message: 'user created ', data: doc })
			}).catch(err => { res.send(err) })
	});
}

const finAll = (req,res)=>{
	User.find().then(docs=>{
		res.status(200).send({message:'all users ',data:docs})
	}).catch(err=>{res.send(err)})
}

const findOne = (req,res)=>{
	User.findOne({
		'_id':req.params.id
	}).then(doc=>{
		res.status(200).send({message:'findone user ',data:doc})
	}).catch(err=>{res.send(err)})
}

const editUser = (req,res)=>{
	User.findOne({
		'_id':req.body.userid
	}).then(doc=>{
		doc.email = req.body.email,
		doc.name  = req.body.name,
		doc.password =  req.body.password
		doc.save().then(docsaved=>{
			res.status(200).send({message:'saved: ',data:docsaved})
		}).catch(err=>{res.send({message:"errpr save ",err})})
	}).catch(err=>{res.send(err)})
}

const destroyuser = (req,res) => {
	User.remove({
		"_id": req.body.userid
	}).then(doc=>{
		res.status(200).send({message:'deleted ',data:doc})
	}).catch(err=>{res.send(err)})
}
module.exports = {
	createUser,
	editUser,
	destroyuser,
	findOne,
	finAll

}