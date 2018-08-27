const mongoose=require('mongoose');
const {Schema} = mongoose;

const TareasSchema = new Schema ({
	titulo:{
		type: String, 
		required:true
	},
	descripcion:{
		type: String, 
		required:true
	}

});
module.exports =mongoose.model('Tareas',TareasSchema);