const express = require('express');
const router = express.Router();
const { getAllClients, createClient } = require('../controllers/clientController');

router.get('/', getAllClients);
router.post('/', createClient);

module.exports = router;
