import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, SectionList } from 'react-native';
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
        }
    ]

    render() {
        return (
            <SectionList
                contentContainerStyle={styles.inputFirmData}
                sections={InputFirmData.sectionListData}
                renderItem={this._renderLittleCategoryItem}
                renderSectionHeader={this._renderBigCategoryHeader}
                ListHeaderComponent={<Text style={styles.pageTitle}>请输入以下财务指标</Text>}
                ListFooterComponent={Copyright}
                keyExtractor={item => item.littleCategory}
            />
        )
    }

    _renderBigCategoryHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.bigCategoryTitle}>{section.bigCategory}</Text>
            <DivideLine style={styles.sectionHeaderDivider} />
        </View>
    )

    _renderLittleCategoryItem = ({ item }) => {
        return (
            <View style={styles.littleCategoryItem}>
                <Text style={styles.itemDesc}>{`${item.littleCategory}: `}</Text>
                <TextInput
                    style={styles.itemInput}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputFirmData: {
        flex: 1,
        backgroundColor: '#F9F7E8',
    },
    pageTitle: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '900',
    },
    sectionHeader: {
        marginTop: 10,
    },
    bigCategoryTitle: {
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 18,
    },
    sectionHeaderDivider: {
        marginBottom: 5,
        borderBottomColor: 'rgba(128, 128, 128, 0.4)'
    },
    littleCategoryItem: {
        height: 40,
        paddingLeft: 16,
        paddingRight: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    itemDesc: {
        fontSize: 16
    },
    itemInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    }
});