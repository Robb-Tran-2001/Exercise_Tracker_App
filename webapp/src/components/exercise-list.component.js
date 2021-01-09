import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Exercise = props => {
    return (
        //Functional component if no state and life cycle methods needed
        //props passed down from exercise list include method to delete
        <tr>
            <td> {props.exercise.username} </td>
            <td> {props.exercise.description} </td>
            <td> {props.exercise.duration}  </td>
            <td> {props.exercise.date.substring(0, 10)} </td>
            <td>
                <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
            </td>
        </tr>
    )
}


export default class ExerciseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        }

        this.deleteExercise = this.deleteExercise.bind(this);
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/delete/'+id)
            .then(res => console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        }) //passes down to functional component above the exercises to display
        //for each exercise, have option to delete and edit
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.exerciseList() }
                </tbody>
                </table>
            </div>
        )
    }
}