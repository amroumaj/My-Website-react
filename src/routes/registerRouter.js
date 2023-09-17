const express =require('express');
const router = express.Router();
const registerController =reauire('../controllers/registerController');

router.post('/', registerController.handleNewUser);

module.exports = router;