const { Router } = require('express');
const router = Router();
const { userRegis } = require('../controllers/userCont');

router.post('/reg-user', userRegis)

module.exports = router