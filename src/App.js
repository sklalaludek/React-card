import React, {Component} from 'react';
import './App.css';

const Card = (props) => {
    return (<div className="card">
        <img className="card__img" src={props.avatar_url} alt="avatar"/>
        <div className="card__info">
            <div className="card__name">{props.name}</div>
            <div>{props.company}</div>
        </div>
    </div>);
};

const CardList = (props) => {
    return (<div>
        {props.cards.map(card => <Card key={card.id} {...card}/>)}
    </div>);
};

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://api.github.com/users/${this.state.userName}`).then(res => {
            return res.json();
        }).then(data => {
            this.props.onSubmit(data);
            this.setState({userName: ''});
        });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input text="text" value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} placeholder="Github username" required="required"/>
                <button type="submit">Add card</button>
        </form>);
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    };

    render() {
        return (<div>
            <Form onSubmit={this.addNewCard}/>
            <CardList cards={this.state.cards}/>
        </div>);
    }
}

export default App;
