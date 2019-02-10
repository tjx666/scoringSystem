import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Copyright from '../components/Copyright';

export default class WelcomePage extends Component {
    componentDidMount() {
        setTimeout(__ => {
            // this.props.navigation.replace('InputFirmData');
            this.props.navigation.replace('Charts')
        }, 1500);
    }

    render() {
        return (
            <View style={styles.welcomePage}>
                <Text style={styles.title}>南昌高新区企业财务指标评分系统</Text>
                <Image style={styles.logo} source={require('../common/image/welcome-page.png')} />
                <Copyright />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    welcomePage: {
        width: '100%',
        height: '100%',
        paddingTop: 60,
        paddingBottom: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#33CCCC',
    },
    title: {
        fontWeight: "900",
        fontSize: 24,
    },
    logo: {
        width: 280,
        height: 320,
    }
});