const express =require('express');
const router = express.Router();
const tareasCtrl = require('../controllers/tareas.controller.js')

router.get('/',tareasCtrl.getTareas);

router.post('/',tareasCtrl.createTareas);

router.get('/:id',tareasCtrl.getTarea);

router.put('/:id',tareasCtrl.editTarea);

router.delete('/:id',tareasCtrl.deleteTarea);

module.exports= router;
