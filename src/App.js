import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AppContainer from './router';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return <AppContainer/>;
    }
}

const styles = StyleSheet.create({
    app: {}
});