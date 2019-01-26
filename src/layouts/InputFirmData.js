import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, SectionList } from 'react-native';
import DivideLine from '../components/DivideLine';
import Copyright from '../components/Copyright';


export default class InputFirmData extends Component {
    static sectionListData = [
        {
            bigCategory: '偿债能力',
            data: [
                { littleCategory: '流动比率' },
                { littleCategory: '资产负债率' },
            ]
        },
        {
            bigCategory: '营运能力',
            data: [
                { littleCategory: '存货周期率' },
                { littleCategory: '应收账款周转率' },
                { littleCategory: '总资产周转率' }
            ]
        },
        {
            bigCategory: '盈利能力',
            data: [
                { littleCategory: '毛利率' },
                { littleCategory: '净资产收益率' },
            ]
        },
        {
            bigCategory: '成长性分析',
            data: [
                { littleCategory: '营业收入增长率' },
                { littleCategory: '净利润增长率' },
            ]
        },
        {
            bigCategory: '现金流量分析',
            data: [
                { littleCategory: '净利润现金比率' },
            ]
        },
        {
            bigCategory: '成长性分析',
            data: [
                { littleCategory: '营业收入增长率' },
                { littleCategory: '净利润增长率' },
            ]
        },
        {
            bigCategory: '现金流量分析',
            data: [
                { littleCategory: '净利润现金比率' },
            ]
        },
        {
            bigCategory: '成长性分析',
            data: [
                { littleCategory: '营业收入增长率' },
                { littleCategory: '净利润增长率' },
            ]
        },
        {
            bigCategory: '现金流量分析',
            data: [
                { littleCategory: '净利润现金比率' },
            ]
        },
    ]

    _renderBigCategoryHeader = ({ section }) => (
        <View>
            <Text style={styles.bigCategoryTitle}>{section.bigCategory}</Text>
            <DivideLine style={styles.sectionHeaderDivider} />
        </View>
    )

    _renderLittleCategoryItem = ({ item }) => {
        return (
            <View style={styles.littleCategoryItem}>
                <Text style={{ fontSize: 16 }}>{`${item.littleCategory}: `}</Text>
                <TextInput
                    allowFontScaling={true}
                    autoFocus={item.littleCategory === '流动比率'}
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                    keyboardType='default'
                    maxLength={8}
                    multiline={false}
                    selectionColor='blue'
                    placeholder='placeholder'
                ></TextInput>
            </View>
        )
    }

    render() {
        return (
            <SectionList
                style={styles.inputFirmData}
                sections={InputFirmData.sectionListData}
                renderSectionHeader={this._renderBigCategoryHeader}
                renderItem={this._renderLittleCategoryItem}
                ListHeaderComponent={<Text style={styles.pageTitle}>请输入以下财务指标</Text>}
                ListFooterComponent={Copyright}
                keyExtractor={item => item.littleCategory}
            />
        )
    }
}

const styles = StyleSheet.create({
    inputFirmData: {
        backgroundColor: '#F9F7E8',
    },
    pageTitle: {
        marginTop: 50,
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '900',
    },
    bigCategoryTitle: {
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 18,
    },
    sectionHeaderDivider: {
        marginBottom: 10,
        borderBottomColor: 'rgba(128, 128, 128, 0.1)'
    },
    littleCategoryItem: {
        height: 38,
        marginLeft: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        flex: 1,
    }
});