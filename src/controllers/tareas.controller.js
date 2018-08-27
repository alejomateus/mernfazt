const Tarea= require('../models/tareas');
const tareaCtrl={};
tareaCtrl.getTareas = async (req,res)=>{
	const tareas = await Tarea.find();
	res.json(tareas);
}
tareaCtrl.createTareas = async (req,res)=>{
	const data_tarea ={
		titulo: req.body.titulo,
		descripcion: req.body.descripcion
	}
	const tarea = new Tarea(data_tarea);
	const createtarea =await tarea.save();
	res.json(createtarea);
}
tareaCtrl.getTarea = async (req,res)=>{
	const tarea = await Tarea.findById(req.params.id);
	res.json(tarea);
}
tareaCtrl.editTarea = async (req,res)=>{
	const data_tarea ={
		titulo: req.body.titulo,
		descripcion: req.body.descripcion
	}
	const tarea = await Tarea.findByIdAndUpdate(req.params.id,{$set: data_tarea},{new:true});
	res.json(tarea);
}
tareaCtrl.deleteTarea = async (req,res)=>{
	 await Tarea.findByIdAndRemove(req.params.id);
	res.json({
		status:200,
		message:'Tarea eliminada'
	});
}



module.exports= tareaCtrl;