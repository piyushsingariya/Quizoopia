import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizservice from "./quizservice";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
class Quizoopia extends Component{
    state={
        questionBank: [],
        score: 0,
        responses: 0
    };

    getQuestions = () => {
        quizservice().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };
    computeAnswer = (answer, correct) => {
        if(answer === correct) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1: 5
        });
    };
    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        });
    }
    componentDidMount(){
        this.getQuestions();
    };
    render(){
        return (
            <div className="container">
                <div className="title">Quizoopia</div>
                {this.state.questionBank.length > 0 && 
                this.state.responses < 5 &&
                this.state.questionBank.map(({question, answers, 
                    correct, questionId}) => (
                        <QuestionBox  
                        question={question} 
                        options={answers} 
                        key={questionId}
                        selected={answer => this.computeAnswer(answer, correct)} />
                    ))}
                {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain}/>) : null}    
            </div>
        );
    };
};

ReactDOM.render(<Quizoopia />, document.getElementById("root"));