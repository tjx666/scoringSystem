import React, { Component } from 'react'
import { WebView, StyleSheet, Platform } from 'react-native'

export default class Charts extends Component {
    

    render() {
        const firmData = this.props.navigation.state.params;
        const src = Platform.OS === 'ios'
            ? require('../common/html/charts.mini.html')
            : { uri: 'file:///android_asset/html/charts.mini.html', baseUrl: 'file:///android_asset/' }


        return (
            <WebView
                originWhitelist={['*']}
                source={src}
            />
        );
    }
}

const styles = StyleSheet.create({

})