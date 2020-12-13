import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {
    gotService = new gotService();

    state = {
        selectedHouse: 378,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name, gender})=>`${name} (${gender})`}
            />
        )

        const houseDeatils = (
            <ItemDetails itemId = {this.state.selectedHouse}
            getData={()=>this.gotService.getHouse(this.state.selectedHouse)}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={houseDeatils}/>
        )
    }
}