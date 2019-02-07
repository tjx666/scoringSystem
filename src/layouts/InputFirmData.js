import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, SectionList } from 'react-native';
import DivideLine from '../components/DivideLine';
import Copyright from '../components/Copyright';

class ListItem extends Component {
    _handleTextChange = text => {
        const data = {
            value: Number.parseFloat(text),
            bigCategory: this.props.section,
            index: this.props.index
        }
        this.props.onChangeText(data);
    }

    render() {
        return (
            <View style={styles.littleCategoryItem}>
                <Text style={styles.itemDesc}>{`${this.props.littleCategory}: `}</Text>
                <TextInput
                    style={styles.itemInput}
                    onChangeText={this._handleTextChange}
                />
            </View>
        )
    }
}


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

    constructor(props) {
        super(props);
        this.state = {
            currentRatio: 0,
            assetsAndLiabilities: 0,
            inventoryCycleRate: 0,
            accountReceivableCycleRate: 0,
            totalAssetTurnover: 0,
            grossProfitRate: 0,
            roe: 0,
            operationIncomeGrowthRate: 0,
            netProfitGrowthRate: 0,
            netProfitCashRatio: 0,
        }
    }

    _handleInputTextChange = data => {
        switch (data.bigCategory) {
            case '偿债能力': {
                switch (data.index) {
                    case 0: {
                        this.setState({
                            ...this.state,
                            currentRatio: data.value
                        })
                    }
                    case 1: {
                        this.setState({
                            ...this.state,
                            assetsAndLiabilities: data.value
                        })
                    }
                }
            }
            case '营运能力': {
                switch (data.index) {
                    case 0: {
                        this.setState({
                            ...this.state,
                            inventoryCycleRate: data.value
                        })
                    }
                    case 1: {
                        this.setState({
                            ...this.state,
                            accountReceivableCycleRate: data.value
                        })
                    }
                    case 3: {
                        this.setState({
                            ...this.state,
                            totalAssetTurnover: data.value
                        })
                    }
                }
            }
            case '盈利能力': {
                switch (data.index) {
                    case 0: {
                        this.setState({
                            ...this.state,
                            grossProfitRate: data.value
                        })
                    }
                    case 1: {
                        this.setState({
                            ...this.state,
                            roe: data.value
                        })
                    }
                }
            }
            case '成长性分析': {
                switch (data.index) {
                    case 0: {
                        this.setState({
                            ...this.state,
                            operationIncomeGrowthRate: data.value
                        })
                    }
                    case 1: {
                        this.setState({
                            ...this.state,
                            netProfitGrowthRate: data.value
                        })
                    }
                }
            }
            case '现金流量分析': {
                switch (data.index) {
                    case 0: {
                        this.setState({
                            ...this.state,
                            netProfitCashRatio: data.value
                        })
                    }
                }
            }
        }
    }

    render() {
        return (
            <SectionList
                contentContainerStyle={styles.container}
                sections={InputFirmData.sectionListData}
                renderItem={this._renderItem}
                renderSectionHeader={this._renderSectionHeader}
                ListHeaderComponent={this._renderListHeader}
                ListFooterComponent={Copyright}
                keyExtractor={item => item.littleCategory}
            />
        )
    }

    _renderItem = ({ item, index, section }) => (
        <ListItem
            littleCategory={item.littleCategory}
            onChangeText={this._handleInputTextChange}
            section={section}
            index={index}
        />
    )

    _renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.bigCategoryTitle}>{section.bigCategory}</Text>
            <DivideLine style={styles.sectionHeaderDivider} />
        </View>
    )

    _renderListHeader = __ => (
        <Text style={styles.title}>请输入以下财务指标</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F7E8',
    },
    title: {
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
    }
});