import React, { Component } from 'react';
import { Counter } from './Counter';

export class Test extends Component {
    
    constructor(props) { 
        super(props);
        this.state = { isParent: false };   
    }

    render() {
        const testMsg = 'Test Class Component';
        return (
            <div>
                <Counter testMsg={testMsg}/>
                
            </div>
        )
    }
}

export default Test;