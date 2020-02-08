import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';

class Index extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='space'>
                <div className='flying_words'>
                    Hi
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));