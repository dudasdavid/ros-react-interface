import React, { Component } from 'react';
import { Button } from "react-bootstrap"

class Home extends Component {
    state = {
        counter: 10,
    };

    increment_counter() {
        this.setState({ counter: this.state.counter + 1 })
        console.log(this.state.counter);
    };

    render() {
        return (<main>
            <h1 className="text-center mt-3">Control panel</h1>
            <h5>Counter:<span>{this.state.counter}</span></h5>
            <Button onClick={() => this.increment_counter()}>Increment</Button>
        </main>);
    }
}

export default Home;