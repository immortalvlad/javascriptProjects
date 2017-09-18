import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
var {EventEmitter} = require('fbemitter');
var emitter = new EventEmitter();
const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.on;
var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: my_news
        }
    }
    componentDidMount() {
        var self = this;
        emitter.addListener('News.add', function (item) {
            var nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        });
    }
    componentWillUnmount() {
        emitter.removeListener('News.add')
    }
    render() {
        return (
                <div className="app">
                    <h3>Новости</h3>
                    <Add />
                    <News data={this.state.news} />
                </div>
                );
    }
}
class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: false};
    }
    readmoreClick(e) {
        console.log(e.target);
        e.preventDefault();
        this.setState({visible: true});
    }
    render() {
        var author = this.props.data.author,
                text = this.props.data.text,
                bigText = this.props.data.bigText,
                visible = this.state.visible;
        console.log("render", this);
        return (
                <div className="article">
                    <p className="news__author">{author}:</p>
                    <p className="news__text">{text}</p>
                    <a href="#" onClick={this.readmoreClick.bind(this)} className={'news__readmore ' + (visible ? 'none' : '')}>Подробнее</a>
                    <p className={'news__big-text ' + (visible ? '' : 'none')}>{bigText}</p>
                </div>
                );
    }
}

Article.propTypes = {
    data: PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired
    })
};
class Add extends React.Component {
    constructor(props) {
        super(props);
        this.oncl = this.oncl.bind(this);
        this.cl = this.cl.bind(this);
        this.onBtnClickHandler = this.onBtnClickHandler.bind(this);
        this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.state = {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        };
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    }
    onBtnClickHandler(e) {
        e.preventDefault();
        var textEl = ReactDOM.findDOMNode(this.refs.text);
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = textEl.value;
        var item = [{
                author: author,
                text: text,
                bigText: '...'
            }];

        emitter.emit('News.add', item);

        textEl.value = '';
        this.setState({textIsEmpty: true});
    }
    oncl(input) {
        this.input = input;
    }
    cl() {
        alert(this.input.value);
    }
    onCheckRuleClick(e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    }
    onAuthorChange(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({authorIsEmpty: false})
        } else {
            this.setState({authorIsEmpty: true})
        }
    }
    onTextChange(e) {
        if (e.target.value.trim().length > 0) {
            this.setState({textIsEmpty: false})
        } else {
            this.setState({textIsEmpty: true})
        }
    }
    onFieldChange(fieldName, e) {
        if (e.target.value.trim().length > 0) {
            this.setState({['' + fieldName]: false})
        } else {
            this.setState({['' + fieldName]: true})
        }
    }
    render() {
        console.log("render 1111");
        var agreeNotChecked = this.state.agreeNotChecked,
                authorIsEmpty = this.state.authorIsEmpty,
                textIsEmpty = this.state.textIsEmpty
        return (
                <form className='add cf'>
                    <input
                        type='text'
                        className='add__author'
                        defaultValue=''
                        onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                        placeholder='Ваше имя'
                        ref='author'
                        />
                    <textarea
                        className='add__text'
                        defaultValue=''
                        onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                        placeholder='Текст новости'
                        ref='text'
                        ></textarea>
                    <label className='add__checkrule'>
                        <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick} />Я согласен с правилами
                    </label>
                    <button
                        className='add__btn'
                        onClick={this.onBtnClickHandler}
                        ref='alert_button'
                        disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>
                        Показать alert
                    </button>
                </form>
                );
    }
}
class News extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var data = this.props.data;
        var newsTemplate;
        if (data.length > 0) {
            newsTemplate = data.map(function (item, index) {
                return (
                        <div key={index}>
                            <Article data={item} />
                        </div>
                        );
            });
        } else {
            newsTemplate = <div>Not news here</div>;
        }

        return (
                <div className="news">
                    {newsTemplate}
                    <strong  className={'news__count ' + (data.length > 0 ? '' : 'none')}>Всего новостей: {data.length}</strong> 
                </div>
                );
    }
}
News.propTypes = {
    data: PropTypes.array.isRequired
};

ReactDOM.render(
        <App />,
        document.getElementById('root')
        );