import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, Button, Assert } from 'react-native';
import Divider from '../components/Divider';
import Copyright from '../components/Copyright';

class InputItem extends Component {
    render() {
        return (
            <View style={styles.inputItem}>
                <Text style={styles.itemDesc}>{`${this.props.littleCategory}:  `}</Text>
                <TextInput
                    style={styles.itemInput}
                />
            </View>
        )
    }
}

class InputSection extends Component {
    _renderItems = items => {
        return items.map(littleCategory => {
            return (
                <InputItem
                    key={littleCategory}
                    littleCategory={littleCategory}
                />
            )
        });
    }

    render() {
        const { sectionData } = this.props;
        return (
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.bigCategoryTitle}>{sectionData.bigCategory}</Text>
                    <Divider style={styles.sectionHeaderDivider} />
                </View>
                {this._renderItems(sectionData.items)}
            </View>
        )
    }
}

export default class InputFirmData extends Component {
    static sectionListData = [
        {
            bigCategory: '偿债能力',
            items: [
                '流动比率',
                '资产负债率'
            ]
        },
        {
            bigCategory: '营运能力',
            items: [
                '存货周期率',
                '应收账款周转率',
                '总资产周转率'
            ]
        },
        {
            bigCategory: '盈利能力',
            items: [
                '毛利率',
                '净资产收益率'
            ]
        },
        {
            bigCategory: '成长性分析',
            items: [
                '营业收入增长率',
                '净利润增长率'
            ]
        },
        {
            bigCategory: '现金流量分析',
            items: [
                '净利润现金比率'
            ]
        },
        {
            bigCategory: '成长性分析',
            items: [
                '营业收入增长率',
                '净利润增长率'
            ]
        },
        {
            bigCategory: '现金流量分析',
            items: [
                '净利润现金比率'
            ]
        }
    ]

    _handleSubmit = __ => {
        Alert.alert(
            '确定提交吗?',
            '可以返回修改数据',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
            >
                <Text style={styles.title}>请输入以下财务指标</Text>
                {this._renderSectionList(InputFirmData.sectionListData)}
                <Button
                    onPress={this._handleSubmit}
                    title="确定"
                    color="gray"
                />
                <Copyright />
            </ScrollView>
        )
    }

    _renderSectionList = sectionListData => {
        return <View style={styles.sectionList}>
            {
                sectionListData.map(sectionData => (
                    <InputSection
                        key={sectionData.bigCategory}
                        sectionData={sectionData}
                    />
                ))
            }
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F7E8',
        paddingBottom: 10
    },
    title: {
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '900',
        color: 'black'
    },
    sectionList: {
        marginBottom: 20
    },
    section: {
        paddingBottom: 30
    },
    sectionHeader: {
        marginBottom: -5
    },
    bigCategoryTitle: {
        paddingVertical: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444444'
    },
    sectionHeaderDivider: {
        marginBottom: 5,
        borderBottomColor: 'rgba(128, 128, 128, 0.4)'
    },
    inputItem: {
        height: 40,
        paddingLeft: 16,
        paddingRight: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemDesc: {
        fontSize: 18,
        color: '#555555'
    },
    itemInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 18,
    },
})