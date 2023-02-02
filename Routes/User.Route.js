const express = require('express')
const router = express.Router();

router.get('/', (req, res) => { });
router.post('/signup', (req, res) => { })
router.post('/login', (req, res) => { })
router.get('/:id', (req, res) => { })
router.patch('/:id', (req, res) => { })

module.exports = router;