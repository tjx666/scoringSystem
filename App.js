import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AppContainer from './src/router';
import WelcomePage from './src/pages/WelcomePage';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return <View style={styles.app}>
            {/* <AppContainer/> */}
            <WelcomePage/>
        </View>
    }
}

const styles = StyleSheet.create({
    app: {}
});