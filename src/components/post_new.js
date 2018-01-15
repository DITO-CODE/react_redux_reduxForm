import React , {Component} from 'react';
import {connect} from 'react-redux';

import {Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';


class PostsNew extends Component{

    renderField(field){
        const { meta: {touched,error} } = field;
        const className = `form-group ${touched && error ?'has-danger':''}`

        return (
            <div className={className}>
            <label>{field.label}</label>
            <input 
                className="form-control"
                type="text"
                {...field.input}
            />  
            <div className="text-help">
            {touched ? error : ''}
            </div>
            </div>
        )
    }

    onSubmit(values){
        this.props.createPost(values,()=>{
            this.props.history.push('/');
        });
    }

    render(){
        const {handleSubmit} = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="title"
                        label="Titulo"
                    component={this.renderField}
                />

                <Field 
                    label="Categorias"
                    name="categories"
                    component={this.renderField}
                />

                <Field 
                    label="Contenido"
                    name="content"
                    component={this.renderField}
                />

                <button type="submit" className="btn btn-primary"> Enviar </button>
                <Link to='/' className="btn btn-danger"> Cancelar</Link>
            </form>
        )
    }
}

//Para validar el formulario
function validate(values){
    const errors = {};

    //Validamos los inputs de 'values'
    if(!values.title){
        errors.title = "Capture un titulo!";
    }

    if(!values.categories){
        errors.categories = 'Capture algunas categorias';
    }

    if(!values.content){
        errors.content = 'Capture un contenido';
    }
    //Si errors esta vacio el formulario esta bien para ser enviado
    return errors;
}



export default reduxForm({
    validate, //Hace referencia a la funcion para validar
    form : 'PostsNewForm'
})(
    connect(null,{createPost})(PostsNew)
)
