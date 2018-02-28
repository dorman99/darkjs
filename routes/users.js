var express = require('express');
var router = express.Router();
var controller = require('../controllers/users')
var auth =  require('../middlewares/auth')
/* GET users listing. */
router
 .get('/',auth.auth,controller.finAll)
 .post('/',controller.createUser)
 .get('/:id',controller.findOne)
 .put('/:id',controller.editUser)
 .delete('/:id',controller.destroyuser)
 
module.exports = router;
