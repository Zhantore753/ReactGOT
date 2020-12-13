import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage/errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class BooksPage extends Component {
    gotService = new gotService();

    state = {
        selectedBook: 1,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
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
                getData={this.gotService.getAllBooks}
                renderItem={({name, gender})=>`${name} (${gender})`}
            />
        )

        const bookDeatils = (
            <ItemDetails itemId = {this.state.selectedBook}
            getData={()=>this.gotService.getBook(this.state.selectedBook)}>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='country' label='Country'/>
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={bookDeatils}/>
        )
    }
}