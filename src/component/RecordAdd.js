import React, { Component } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Link } from "react-router-dom";
import './RecordAdd.css';

class RecordAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            category: 'International',
            documents: {
                domicile: false,
                birthCertificate: false,
                marksheet: false,
                policeClearence: false,
                passport: false,
                decleration: false
            },
            dob: '',
            father: '',
            mother: '',
            lastScore: 0
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(baseUrl,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then(res => res.json)
            .then(data => {
                console.log(data);
                window.open('http://localhost:3000/home', '_self');
            })
    }

    handleCheck = (e) => {
        const { name, checked } = e.target;
        console.log(e.target.name);
        this.setState((e) => {
            var selectedDocument = e.documents;
            return selectedDocument[name] = checked;
        });
    }

    render() {
        return(
            <>
                <div className="widgets">
                    <Button color='primary'>OnBoarding Form</Button>
                    <Link to='/home'><Button color="muted">Student List</Button></Link>
                </div>
                <div className="container-fluid">
                    <h3>OnBoarding Form</h3>
                    <div id='error'></div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="name">Name: </Label>
                            <input className="input" type="text" id="name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="category">Category: </Label>
                            <select className="input" name="category" value={this.state.value} onChange={(e) => this.handleChange(e)}>
                                <option name="category" value="International">International</option>
                                <option name="category" value="Domestic">Domestic</option>
                            </select>   
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="documents">Documents: </Label>
                            <div className="checkboxes">
                                <Label><input type="checkbox" name='domicile' onChange={this.handleCheck} required />Domicile</Label>
                                <Label><input type="checkbox" name='birthCertificate' onChange={this.handleCheck} required/>Birth Certificate</Label>
                                <Label><input type="checkbox" name='marksheet' onChange={this.handleCheck} required/>Marksheet</Label>
                                <Label><input type="checkbox" name='policeClearence' onChange={this.handleCheck} required={(this.state.category === 'International') ? true : false} />Police Clearence</Label>
                                <Label><input type="checkbox" name='passport' onChange={this.handleCheck} required={(this.state.category === 'International') ? true : false} />Passport</Label>
                                <Label><input type="checkbox" name='decleration' onChange={this.handleCheck} required />Decleration</Label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="dob">DOB:</Label>
                            <input className='input' type='date' name='dob' value={this.state.dob} onChange={(e) => this.handleChange(e)} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="father">Father's Name:</Label>
                            <input className='input' type='text' name='father' value={this.state.father} onChange={(e) => this.handleChange(e)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="mother">Mother's Name:</Label>
                            <input className='input' type='text' name='mother' value={this.state.mother} onChange={(e) => this.handleChange(e)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="lastScore">Last Class Score:</Label>
                            <input className='input' type='Number' name='lastScore' value={this.state.lastScore} onChange={(e) => this.handleChange(e)} required />
                        </FormGroup>
                        <FormGroup>
                            <Button type='submit' color='warning'>OnBoard</Button>
                        </FormGroup>
                    </Form>
                </div>
            </>
        )
    }
}

export default RecordAdd;
