import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage';

import './app.css';
import CharDetails from '../charDetails';

export default class App extends Component {
    state={
        showRandomChar: true,
        error: false,
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error:true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }
    
    render(){
        
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character
                            </button>
                            {char}
                        </Col>
                    </Row>
                    <CharacterPage/>
                    {/* <Row>
                        <Col md="6">
                            <ItemList onCharSelected={this.onCharSelected}/>
                        </Col>
                        <Col md="6">
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <ItemList onCharSelected={this.onCharSelected}/>
                        </Col>
                        <Col md="6">
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row> */}
                </Container>
            </>
        );
    }
};