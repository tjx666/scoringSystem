import React, { Component } from 'react'
import { WebView, StyleSheet, Platform, Alert } from 'react-native'
import Logger from '../utils/log';
const logger = new Logger();

export default class Charts extends Component {
    _getRadarOptions = __ => {
        const firmData = this.props.navigation.state.params;

        return {
            title: {
                show: false
            },
            tooltip: {},
            legend: {
                data: ['得分']
            },
            radar: {
                name: {
                    textStyle: {
                        borderRadius: 3,
                        padding: [0, 0],
                        fontSize: 12,
                        fontWeight: 'bold',
                        fontFamily: 'Microsoft YaHei',
                        color: 'black'
                    }
                },
                indicator: [
                    { name: '偿债能力', max: 15 },
                    { name: '运营能力', max: 15 },
                    { name: '盈利能力', max: 15 },
                    { name: '成长性分析', max: 15 },
                    { name: '现金流量分析', max: 15 },
                ]
            },
            series: [{
                name: '该公司',
                type: 'radar',
                data: [
                    {
                        value: firmData,
                        name: '该公司得分',
                        lineStyle: {
                            color: 'blue'
                        },
                        itemStyle: {
                            color: 'blue'
                        }
                    }
                ]
            }]
        };
    }

    _renderRadar = __ => {
        const options = this._getRadarOptions();
        const totalScore = options.series[0].data[0].value.reduce((f, b) => f + b);

        return `
        !function () {
            const container = document.querySelector('#some-firm-radar');
            const chart = echarts.init(container, null, { renderer: 'canvas' });
            chart.setOption(${JSON.stringify(options)});
            document.querySelector('body > div:nth-child(2) > span.total-score').innerText = '总分: ${totalScore}分'
        }();
        `;
    }

    render() {

        const src = Platform.OS === 'ios'
            ? require('../common/html/charts.mini.html')
            : { uri: 'file:///android_asset/html/charts.mini.html', baseUrl: 'file:///android_asset/' }

        return (
            <WebView
                originWhitelist={['*']}
                source={src}
                injectedJavaScript={this._renderRadar()}
            />
        );
    }
}

const styles = StyleSheet.create({

})