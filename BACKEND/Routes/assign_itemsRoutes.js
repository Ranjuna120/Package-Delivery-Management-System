const express = require('express');
const router = express.Router();
const itemController = require('../controllers/assign_itemsCtrl');

router.post('/add', itemController.createAssign_items);
router.get('/all', itemController.getAllAssign_items);
router.get('/get/:id', itemController.getAssign_itemsByID);
router.put('/update/:id', itemController.updateAssign_items);
router.delete('/delete/:id', itemController.deleteAssign_items);

module.exports = router;