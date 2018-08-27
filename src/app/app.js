import React,{Component } from 'react';
import {render } from 'react-dom';
import axios from 'axios'
class App extends Component{
	constructor(){
		super();
		this.state ={
			titulo:'',
			descripcion:''
		}
		this.agregarTarea = this.agregarTarea.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	agregarTarea(e){
		axios.post('http://192.168.0.3:5001/api/tareas', this.state)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
		 // axios.post('http://192.168.0.3:5001/api/tareas',this.state)
   //  		.then(response => console.log(response))
   //  		.catch(err=>console.error("MIR error",err));
		// fetch('http://localhost:5001/api/tareas',{
		// 	method:"POST",
		// 	body: JSON.stringify(this.state),
		// 	headers:{
		// 		'Accept':'application/json',
		// 		'Content-Type':'application/json'
		// 	}
		// })
		// .then(res=>console.log(res))
		// .catch(err=>console.error("error",err));

		e.preventDefault();
	}
	handleChange(e){
		const{name,value}= e.target;
		this.setState({
			[name]:value
		});
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
												<input name="titulo" onChange={this.handleChange} type="text" placeholder="titulo"/>
											</div>
										</div>
										<div className="row">
											<div className="input-field col s12">
												<textarea className="materialize-textarea" name="descripcion" onChange={this.handleChange} placeholder="Descripción"></textarea>
											</div>
										</div>
										<button type="submit" className="btn light-blue darken-4">Enviar</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
		}
	}
export default App;