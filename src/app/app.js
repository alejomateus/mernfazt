import React,{Component } from 'react';
import {render } from 'react-dom';
import axios from 'axios'
class App extends Component{
	constructor(){
		super();
		this.state ={
			titulo:'',
			descripcion:'',
			tareas:[],
			_id:''
		}
		this.agregarTarea = this.agregarTarea.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	agregarTarea(e){
		let me= this;
		if(this.state._id == ''){
			axios.post('http://192.168.0.3:5001/api/tareas', this.state)
			.then(function (res) {
				console.log(res);
				M.toast({html:"Tarea guardada"});
				me.setState({
					titulo:"",
					descripcion:""
				});
				console.log(me.state);
				me.obtenertareas();

			})
			.catch(function (error) {
				console.log(error);
			});

		}
		else{
			axios.put(`http://192.168.0.3:5001/api/tareas/${this.state._id}`, this.state)
			.then(function (res) {
				console.log(res);
				M.toast({html:"Tarea editada"});
				me.setState({
					titulo:"",
					descripcion:"",
					_id :""
				});
				me.obtenertareas();

			})
			.catch(function (error) {
				console.log(error);
			});
		}

		e.preventDefault();
	}
	componentDidMount(){
		this.obtenertareas();
	}
	obtenertareas(){
		fetch('http://192.168.0.3:5001/api/tareas')
		.then(res=>res.json())
		.then(data=>{
			this.setState({
				tareas:data
			});
			console.log("tareas",this.state);
		})
		.catch(err=> console.log(err));
	}
	handleChange(e){
		const{name,value}= e.target;
		this.setState({
			[name]:value
		});
	}
	eliminartarea(titulo,_id){
		if (confirm(`Esta seguro de que quiere eliminar la tarea ${titulo}`)){
			fetch(`http://192.168.0.3:5001/api/tareas/${_id}`,{
				method:'DELETE',
				headers:{
					'Accept':'application/json',
					'Content-type':'application/json'
				}
			})
			.then(res=>res.json())
			.then(data=>{
				console.log(data);
				M.toast({html:"Tarea eliminada"});
				this.obtenertareas();

			})
			.catch(err=> console.log(err));
		}
		
	}
	editartarea(_id){
		fetch(`http://192.168.0.3:5001/api/tareas/${_id}`,{
			method:'GET',
			headers:{
				'Accept':'application/json',
				'Content-type':'application/json'
			}
		})
		.then(res=>res.json())
		.then(data=>{
			this.setState({
				titulo:data.titulo,
				descripcion:data.descripcion,
				_id:data._id
			})
		})
		.catch(err=> console.log(err));		
	}
	render(){
		return(
			<div>
			<nav className="light-blue darken-4">
			<div className="container">
			<a className="brand.logo" href="/">Mern Stack</a>
			</div>
			</nav>
			<div  className="container">
			<div className="row">
			<div className=" col s12">
			<div className="card">
			<div className="card-content">
			<form onSubmit={this.agregarTarea}>
			<div className="row">
			<div className="input-field col s12">
			<input name="titulo" onChange={this.handleChange} type="text" placeholder="titulo" value={this.state.titulo}/>
			</div>
			</div>
			<div className="row">
			<div className="input-field col s12">
			<textarea className="materialize-textarea" name="descripcion" onChange={this.handleChange} placeholder="Descripción" value={this.state.descripcion}></textarea>
			</div>
			</div>
			<button type="submit" className="btn light-blue darken-4">Enviar</button>
			</form>
			</div>
			</div>
			</div>
			</div>
			<div className="row">
			<div className=" col s12">
			<table>
			<thead>
			<tr>
			<th>Titulo</th>
			<th>Descripcion</th>
			<th>
			<button className="btn light-blue darken-4">
			<i className="material-icons">edit</i>
			</button>
			</th>
			<th>
			<button className="btn light-blue darken-4">
			<i className="material-icons">delete</i>
			</button>
			</th>
			</tr>

			</thead>
			<tbody>
			{
				this.state.tareas.map(tarea =>{
					return(
					<tr key={tarea._id}>
					<th>{tarea.titulo}</th>
					<th>{tarea.descripcion}</th>
					<th>
					<button className="btn light-blue darken-4" onClick={()=>this.editartarea(tarea._id)}>
					<i className="material-icons">edit</i>
					</button>
					</th>
					<th>
					<button className="btn light-blue darken-4" onClick={()=>this.eliminartarea(tarea.titulo,tarea._id)}>
					<i className="material-icons">delete</i>
					</button>
					</th>
					</tr>
					)
				})
			}
			</tbody>
			</table>
			</div>
			</div>
			</div>
			</div>
			)
		}
	}
	export default App;