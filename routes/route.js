const express = require('express')
const router = express.Router()

//index
router.get('/', (req, res) => {
  return res.send('Server running')
})

module.exports = router
