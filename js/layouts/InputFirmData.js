import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import InputItem from '../components/InputItem';
import Button from 'apsl-react-native-button';
import Toast from 'react-native-root-toast';
import CheckAlert from "react-native-awesome-alert";
import Logger from '../utils/log';
const logger = new Logger();

const NeverAskView = (
    <View style={styles.sampleView}>
        <Text
            style={{

            }}
        >
            {}
        </Text>
    </View>
)


export default class InputFirmData extends Component {
    static sectionListData = [
        {
            bigCategory: '公司信息',
            items: [
                {
                    name: 'firmName',
                    desc: '名称',
                    hint: null
                }
            ]
        },
        {
            bigCategory: '偿债能力',
            items: [
                {
                    name: 'currentRatio',
                    desc: '流动比率',
                    hint: '1.05'
                },
                {
                    name: 'assetsAndLiabilityRate',
                    desc: '资产负债率',
                    hint: '74.78%'
                },
            ]
        },
        {
            bigCategory: '营运能力',
            items: [
                {
                    name: 'inventoryTurnover',
                    desc: '存货周期率',
                    hint: '1.77'
                },
                {
                    name: 'accountReceivableTurnover',
                    desc: '应收账款周转率',
                    hint: '2.11'
                },
                {
                    name: 'totalAssetsTurnover',
                    desc: '总资产周转率',
                    hint: '0.52'
                }
            ]
        },
        {
            bigCategory: '盈利能力',
            items: [
                {
                    name: 'grossProfitRate',
                    desc: '毛利率',
                    hint: '15.26%',
                },
                {
                    name: 'roe',
                    desc: '净资产收益率',
                    hint: '49.24%'
                }
            ]
        },
        {
            bigCategory: '成长性分析',
            items: [
                {
                    name: 'operationIncomeGrowthRate',
                    desc: '营业收入增长率',
                    hint: '20.74%'
                },
                {
                    name: 'netProfitGrowthRate',
                    desc: '净利润增长率',
                    hint: '19.73'
                }
            ]
        },
        {
            bigCategory: '现金流量分析',
            items: [
                {
                    name: 'netProfitCashRatio',
                    desc: '净利润现金比率',
                    hint: '17.39%'
                }
            ]
        }
    ]

    constructor(props) {
        super(props);

        this.state = {
            firmData: {
                firmName: '',
                currentRatio: '',
                assetsAndLiabilityRate: '',
                inventoryTurnover: '',
                accountReceivableTurnover: '',
                totalAssetsTurnover: '',
                grossProfitRate: '',
                roe: '',
                operationIncomeGrowthRate: '',
                netProfitGrowthRate: '',
                netProfitCashRatio: ''
            }
        }
    }

    _handleChangeText = (name, newValue) => {
        this.setState({
            ...this.state,
            firmData: {
                ...this.state.firmData,
                [name]: newValue
            }
        });
    }

    _getDescOfItem = name => {
        for (const bigCategory of InputFirmData.sectionListData) {
            for (const item of bigCategory.items) {
                if (item.name === name) return item.desc;
            }
        }

        return null;
    }

    _handleSubmit = __ => {
        const numberStrFirmData = { ...this.state.firmData };
        delete numberStrFirmData.firmName;
        // logger.debug(JSON.stringify(numberStrFirmData, null, '  '));

        for (const [key, value] of Object.entries(numberStrFirmData)) {
            const desc = this._getDescOfItem(key);

            if (value.trim() !== '' && !/^\d+(\.\d+)?$/.test(value)) {
                Toast.show(`${desc}的输入值不是一个合法的数字! 请修改${desc}!`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: 'red',
                    textEmphasisColor: 'white',
                    delay: 0,
                });
                return;
            }
        }
    }

    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps={'always'}
                keyboardDismissMode="on-drag"
            >
                {this._renderSectionList(InputFirmData.sectionListData)}
                <Button
                    style={{
                        width: '80%',
                        backgroundColor: 'rgb(1, 122, 255)',
                        alignSelf: 'center',
                        borderColor: 'transparent',
                        marginTop: 10,
                        marginBottom: 20
                    }}
                    textStyle={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        fontFamily: '思源黑体',
                        color: 'white'
                    }}
                    onPress={this._handleSubmit}
                >
                    确认
                </Button>
            </ScrollView>
        )
    }

    _renderSection = sectionData => {
        const { bigCategory, items } = sectionData;

        return (
            <View
                style={styles.section}
                key={bigCategory}
            >
                <Text style={styles.sectionHeader}>{bigCategory}</Text>
                {
                    items.map(item => {
                        return (
                            <InputItem
                                {...item}
                                key={item.name}
                                onChangeText={this._handleChangeText}
                            />
                        );
                    })
                }
            </View>
        )
    }

    _renderSectionList = sectionListData => {
        return (
            <View style={styles.sectionList}>
                {sectionListData.map(sectionData => this._renderSection(sectionData))}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(239, 239, 244)',
        alignItems: 'center'
    },
    sectionList: {
        width: '90%',
        paddingTop: 10
    },
    section: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: 10,
        paddingBottom: 20,
        borderRadius: 5,
        elevation: 6
    },
    sectionHeader: {
        width: '100%',
        height: 45,
        paddingLeft: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#BBBBBB',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 45,
        fontFamily: '方正中宋'
    },
})
