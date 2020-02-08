import React from 'react';

const suffix=`被呼叫,this指向:`;

export default class App extends React.Component{
    constructor(props){
        super(props);
    };

    componentDidMount(){
        console.log(`componentDidMount ${suffix}`,this);
    };

    componentWillReceiveProps(){
        console.log(`componentWillReceiveProps ${suffix}`,this);
    };

    shouldComponentUpdate(){
        console.log(`shouldComponentUpdate ${suffix}`,this);
        return true;
    };

    componentDidUpdate(){
        console.log(`componentDidUpdate ${suffix}`,this);
    };

    componentWillUnmount(){
        console.log(`componentWillUnmount ${suffix}`,this);
    };

    handler(){
        console.log(`handler ${suffix}`,this);
    };

    render(){
        console.log(`render ${suffix}`,this);

        this.handler();
        window.handler=this.handler;
        window.handler();

        return(
            <div>
                <h1 onClick={this.handler}>Hello World!</h1>
            </div>
        );
    };
};