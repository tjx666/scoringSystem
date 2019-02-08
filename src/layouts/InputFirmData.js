import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput } from 'react-native';
import Divider from '../components/DivideLine';
import Copyright from '../components/Copyright';

class InputItem extends Component {
    render() {
        return (
            <View style={styles.inputItem}>
                <Text style={styles.itemDesc}>{`${this.props.littleCategory}: `}</Text>
                <TextInput
                    style={styles.itemInput}
                />
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

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.container}
            >
                {this.renderTitle()}
                {this.renderSectionList(InputFirmData.sectionListData)}
                <Copyright/>
            </ScrollView>
        )
    }

    renderTitle = __ => <Text style={styles.title}>请输入以下财务指标</Text>

    renderSectionHeader = bigCategory => (
        <View style={styles.sectionHeader}>
            <Text style={styles.bigCategoryTitle}>{bigCategory}</Text>
            <Divider style={styles.sectionHeaderDivider} />
        </View>
    )

    renderItems = items => {
        return items.map(littleCategory => {
            return (
                <InputItem
                    key={littleCategory}
                    littleCategory={littleCategory}
                />
            )
        });
    }

    renderSection = sectionData => (
        <View style={styles.section} key={sectionData.bigCategory}>
            {this.renderSectionHeader(sectionData.bigCategoryTitle)}
            {this.renderItems(sectionData.items)}
        </View>
    )

    renderSectionList = sectionListData => {
        return <View style={styles.sectionList}>
            {sectionListData.map(sectionData => this.renderSection(sectionData))}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F7E8',
    },
    title: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '900',
    },
    // item
    inputItem: {
        height: 40,
        paddingLeft: 16,
        paddingRight: 50,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    itemDesc: {
        fontSize: 16
    },
    itemInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: 14,
    },
    sectionList: {

    },
    section: {
        
    },
    sectionHeader: {
        marginTop: 10,
    },
    sectionHeaderDivider: {
        marginBottom: 5,
        borderBottomColor: 'rgba(128, 128, 128, 0.4)'
    },
})
