import React, { Component } from 'react'
import { Button, Card, CardBody, CardTitle, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link } from "react-router-dom";
import { baseUrl } from '../shared/baseUrl';
import "./RecordList.css";


class RecordList extends Component {
    constructor(props){
        super(props);
        this.state = {
            recordList: [],
            isOpen: false,
            idToBeDeleted: null,
            category: 'All',
            name: '',
        };
    }
    
    componentDidMount = () => {
        this.getRecordList();
    }

    getRecordList = async () => {
        const res = await fetch(baseUrl);
        const data = await res.json();
        this.setState({
            recordList: data
        });
    }
    
    toggleModal = (id) => {
        this.setState((prev) => ({
            isOpen: (prev.isOpen) ? false : true,
            idToBeDeleted: id
        }));
    }

    deleteItem = () => {
        console.log(this.state.idToBeDeleted);
        fetch(`${baseUrl}/${this.state.idToBeDeleted}`, {
            method: 'delete'
        })
        .then(() => {
            this.toggleModal();
            this.getRecordList();
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return(
                <>
                    <div className="widgets">
                        <Link to='/add'><Button color='muted'>OnBoarding Form</Button></Link>
                        <Button color="primary">Student List</Button>
                    </div>                   
                    <div className="container-fluid">
                    <h3>Record List</h3>
                    <div className="clearfix">
                        <select className="float-left" name="category" value={this.state.value} onChange={(e) => this.handleChange(e)}>
                            <option name="category" value="All">All</option>
                            <option name="category" value="International">International</option>
                            <option name="category" value="Domestic">Domestic</option>
                        </select>
                        <input className="float-right" placeholder="type to search.." name="name" type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="row">
                        {
                            this.state.recordList.filter(item =>{
                                if(this.state.category === 'All')
                                    return item;
                                else if(item.category === this.state.category)
                                    return item;
                            })
                            .filter(item => {
                                if(this.state.name === '')
                                    return item;
                                else if(item.name.toLowerCase().includes(this.state.name.toLowerCase()))
                                    return item;
                            })
                            .map(record => {
                                return(
                                    <Card className='col-12 col-md-5 m-4' color={(record.category === 'International') ? 'secondary' : 'info'} key={record.id}>
                                        <CardTitle>
                                            <h5>{record.name}</h5>
                                        </CardTitle>
                                        <CardBody className="links">
                                            <Link to={`/${record.id}/details`}><Button size="sm" color="success">View</Button></Link>
                                            <Link to={`/${record.id}/edit`}><Button size="sm" color="warning">Edit</Button></Link>
                                            <Button size="sm" color="danger" onClick={() => this.toggleModal(record.id)}>Delete</Button>
                                        </CardBody>
                                    </Card>   
                                )                            
                            })
                        }
                    </div>
                    <Modal centered isOpen={this.state.isOpen} toggle={this.toggleModal}>
                        <ModalHeader>
                            <div>Do you want to delete this record</div>
                        </ModalHeader>
                        <ModalBody>
                            <Button color='danger' onClick={this.deleteItem}>Confirm</Button>
                            <Button color='warning' onClick={this.toggleModal}>Back</Button>
                        </ModalBody>
                    </Modal>
                    </div>
                </>
        )
    }
}

export default RecordList;