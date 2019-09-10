import React, { Component } from 'react';
import axios from 'axios';

export default class EnterOneActivity extends Component {

    constructor(props){
        super(props);

        this.onChangeActQuantity = this.onChangeActQuantity.bind(this);
        this.onChangeActQuantUom = this.onChangeActQuantUom.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // entering activity based on a goal, so we use the action from the goal
        // and Quantity UOM from the goal by default
        this.state = {
            act_action: '',
            act_quantity: '',
            act_quant_uom: '',
            act_datetime: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/goals/goal/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    act_action: response.data.goal_activity,
                    act_quantity: '',
                    act_quant_uom: response.data.goal_quant_uom,
                    act_datetime: ''
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    onChangeActQuantity(e){
        this.setState({
            act_quantity: e.target.value
        });
    }

    onChangeActQuantUom(e){
        this.setState({
            act_quant_uom: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log("activity submitted");

        // if the datetime hasn't been set already, use now
        const newActivity = {
            act_action: this.state.act_action,
            act_quantity: this.state.act_quantity,
            act_quant_uom: this.state.act_quant_uom,
            act_datetime: this.state.act_datetime||(new Date())
        };

        axios.post('http://localhost:4000/goals/oneactivity', newActivity)
              .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <h3>Enter Activity for: {this.state.act_action}</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.act_quantity}
                            onChange={this.onChangeActQuantity}
                            />
                    </div>
                    <div className="form-group">
                        <label>Unit of Measure</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.act_quant_uom}
                            onChange={this.onChangeActQuantUom}
                            />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                            value="Enter"
                            className="btn btn-primary"
                            />
                    </div>
                </form>
            </div>
        )
    }
}