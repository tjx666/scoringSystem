import React, { Component } from 'react'
import { WebView, StyleSheet } from 'react-native'
import Toast from 'react-native-root-toast';


export default class Charts extends Component {
    render() {
        const firmData = this.props.navigation.state.params;

        return (
            <WebView
                originWhitelist={['*']}
                source={{ html: '<h1>Hello world</h1>' }}
            />
        );
    }
}

const styles = StyleSheet.create({

})
