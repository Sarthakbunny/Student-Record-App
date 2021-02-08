import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import './RecordEdit.css';

class RecordEdit extends Component {
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

    componentDidMount = () => {
        const recordId = this.props.match.params.recordId;
        this.getRecordDetail(recordId);
    }

    getRecordDetail = async (recordId) => {
        const res = await fetch(`${baseUrl}/${recordId}`);
        const data = await res.json();
        // console.log(data);
        this.setState({
            name: data.name,
            category: data.category,
            documents: {
                domicile: data.documents.domicile,
                birthCertificate: data.documents.birthCertificate,
                marksheet: data.documents.marksheet,
                policeClearence: data.documents.policeClearence,
                passport: data.documents.passport,
                decleration: data.documents.decleration
            },
            dob: data.dob,
            father: data.father,
            mother: data.mother,
            lastScore: data.lastScore
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const recordId = this.props.match.params.recordId;
        console.log(recordId);
        fetch(`${baseUrl}/${recordId}`,
            {
                method: 'PUT',
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
        // console.log(this.state);
        return(
            <>
                <div className="widgets">
                        <Button color='primary'>OnBoarding Form</Button>
                        <Link to='/home'><Button color="muted">Student List</Button></Link>
                </div>
                <div className="container-fluid">
                    <h3>OnBoarding Form</h3>
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
                                <Label><input type="checkbox" name='domicile' required checked={this.state.documents.domicile} onChange={this.handleCheck} />Domicile</Label>
                                <Label><input type="checkbox" name='birthCertificate' required checked={this.state.documents.birthCertificate} onChange={this.handleCheck} />Birth Certificate</Label>
                                <Label><input type="checkbox" name='marksheet' required checked={this.state.documents.marksheet} onChange={this.handleCheck} />Marksheet</Label>
                                <Label><input type="checkbox" name='policeClearence' required={(this.state.category === 'International') ? true : false} checked={this.state.documents.policeClearence} onChange={this.handleCheck}  />Police Clearence</Label>
                                <Label><input type="checkbox" name='passport' required={(this.state.category === 'International') ? true : false} checked={this.state.documents.passport} onChange={this.handleCheck} />Passport</Label>
                                <Label><input type="checkbox" name='decleration' required checked={this.state.documents.decleration} onChange={this.handleCheck} />Decleration</Label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="dob">DOB:</Label>
                            <input className='input' type='date' name='dob' value={this.state.dob} onChange={(e) => this.handleChange(e)} required />
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
                            <Button type='submit' color='primary'>Submit</Button>
                            <Link to="/home"><Button color='success'>Back To Home</Button></Link>
                        </FormGroup>
                    </Form>
                </div>
            </>
        )
    }
}

export default RecordEdit;