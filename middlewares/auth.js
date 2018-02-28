var jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
	console.log('ini header token', req.headers.token)
	jwt.verify(req.headers.token, process.env.SecretKEY, function (err, decoded) {
		console.log(decoded,'ini auth')
		if (decoded === undefined) {
			res.send('tokeninvalid')
		}else{
			req.headers.userid = decoded.userid
			next()
		}
	});
}

module.exports = {
	auth
}