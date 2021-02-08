import React from 'react'
import { Component } from 'react'
import './RecordDetail.css';
import { baseUrl } from "../shared/baseUrl";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Button } from 'reactstrap';

class RecordDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            recordDetail: null
        }
    }

    componentDidMount = () => {
        const recordId = this.props.match.params.recordId;
        this.getRecordDetail(recordId);
    }

    getRecordDetail = async (recordId) => {
        const res = await fetch(`${baseUrl}/${recordId}`);
        const data = await res.json();
        this.setState({
            recordDetail: data
        });
    }

    isValid = (value) => {
        if(value){
            return <i className="fa fa-check" aria-hidden="true"></i>
        }
        else{
            return <i className="fa fa-times" aria-hidden="true"></i>
        }
    }

    render() {
        const record = this.state.recordDetail;
        if(record == null){
            return(
                <div className="container">
                    <h3>OnBoarding Form</h3>
                </div>
            );
        }
        else{
            return(
                <>
                    <div className="widgets">
                            <Button color='primary'>OnBoarding Form</Button>
                            <Link to='/home'><Button color="muted">Student List</Button></Link>
                    </div>
                    <div className="container-fluid">
                        <h3>OnBoarding Form</h3>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="name">Name: </Label>
                                <div className="input">{record.name}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="category">Category: </Label>
                                <div className="input">{record.category}</div>   
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="documents">Documents: </Label>
                                <div className="checkboxes">
                                    <Label>{this.isValid(record.documents.domicile)}Domicile</Label>
                                    <Label>{this.isValid(record.documents.birthCertificate)}Birth Certificate</Label>
                                    <Label>{this.isValid(record.documents.marksheet)}Marksheet</Label>
                                    <Label>{this.isValid(record.documents.policeClearence)}Police Clearence</Label>
                                    <Label>{this.isValid(record.documents.passport)}Passport</Label>
                                    <Label>{this.isValid(record.documents.decleration)}Decleration</Label>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="dob">DOB:</Label>
                                <div className='input'>{record.dob}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="father">Father's Name:</Label>
                                <div className="input">{record.father}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="mother">Mother's Name:</Label>
                                <div className='input'>{record.mother}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastScore">Last Class Score:</Label>
                                <div className="input">{record.lastScore}</div>
                            </FormGroup>
                            <FormGroup>
                                <Link to="/home"><Button color='primary'>Back To Home</Button></Link>
                            </FormGroup>
                        </Form>
                    </div>
                </>    
            );
        }
    }
}

export default RecordDetail
