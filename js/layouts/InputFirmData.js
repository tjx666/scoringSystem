import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import InputItem from '../components/InputItem';
import Button from 'apsl-react-native-button';
import Toast from 'react-native-root-toast';
import CheckAlert from "react-native-awesome-alert";
import DropdownAlert from 'react-native-dropdownalert';
import Logger from '../utils/log';
import CONFIG from '../constans/config';
import { fix, average } from '../utils/math';
import { StringUtil } from '../utils/language';

const logger = new Logger();

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

    _getValueFromItem = (key, name) => {
        for (const bigCategory of InputFirmData.sectionListData) {
            for (const item of bigCategory.items) {
                if (item.name === name) return item[key];
            }
        }

        return null;
    }

    _getSortedNumberFirmData = firmData => {
        const keys = [
            'currentRatio',
            'assetsAndLiabilityRate',
            'inventoryTurnover',
            'accountReceivableTurnover',
            'totalAssetsTurnover',
            'grossProfitRate',
            'roe',
            'operationIncomeGrowthRate',
            'netProfitGrowthRate',
            'netProfitCashRatio'
        ]
        const sortedNumberFirmData = {};
        for (const key of keys) {
            sortedNumberFirmData[key] = firmData[key]
        }
        return sortedNumberFirmData;
    }

    _getParams = firmData => {
        const params = {firmName: firmData.firmName}
        const numberStrFirmData = this._getSortedNumberFirmData(firmData);
        const numberDataArray = [];

        for (const [key, value] of Object.entries(numberStrFirmData)) {
            let hint = this._getValueFromItem('hint', key);
            const inputValue = value.trim() !== '' ? Number.parseFloat(value) : 0;

            if (hint.endsWith('%')) hint = hint.slice(0, hint.length - 1);
            numberDataArray.push(Math.min(CONFIG.maxScore, inputValue / Number.parseFloat(hint) * CONFIG.ofilmScore));
        }

        params.values = [
            numberDataArray.slice(0, 2),
            numberDataArray.slice(2, 5),
            numberDataArray.slice(5, 7),
            numberDataArray.slice(7, 9),
            numberDataArray.slice(9, 10)
        ].map(param => fix(average(param)))

        return params;
    }

    _handleSubmit = __ => {
        // logger.debug(this.state.firmData);
        const numberStrFirmData = this._getSortedNumberFirmData(this.state.firmData);

        for (const [key, value] of Object.entries(numberStrFirmData)) {
            const desc = this._getValueFromItem('desc', key);

            if (value !== '' && !StringUtil.isNumberStr(value)) {
                Toast.show(`${desc}的输入值不是一个合法的数字! 请修改${desc}!`, {
                    duration: Toast.durations.LONG,
                    position: 0,// Toast.positions.BOTTOM
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: 'gray',
                    textEmphasisColor: 'white',
                    delay: 0,
                });
                return;
            }
        }

        for (const [key, value] of Object.entries(numberStrFirmData)) {
            const desc = this._getValueFromItem('desc', key);

            if (value === '') {
                Toast.show(`${desc}未输入!`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,// Toast.positions.BOTTOM
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    backgroundColor: 'gray',
                    textEmphasisColor: 'white',
                    delay: 0,
                });
                break;
            }
        }

        setTimeout(__ => {
            const params = this._getParams(this.state.firmData);
            this.props.navigation.navigate('Charts', params)
        }, 500);
    }

    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps={'always'}
                keyboardDismissMode="on-drag"
            >
                <CheckAlert
                    styles={alertStyles}
                    ref={ref => (this.awesomeAlert = ref)}
                    modalProps={{
                        transparent: true,
                        animationType: "slide",
                    }}
                    checkBoxColor="black"
                />
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
                <DropdownAlert ref={ref => this.dropdown = ref} />
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

    _renderNeverAskView = desc => {
        return (
            <View style={styles.alertDetailView}>
                <Text style={styles.alertDetail}> {desc}</Text>
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
        marginVertical: 8,
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
    alertDetailView: {
        height: 60,
        paddingHorizontal: 9,
        fontFamily: '黑体',
        textAlign: 'left',
    },
    alertDetail: {
        fontSize: 16,
        textAlign: 'left',
        color: '#444444',
    }
})

const alertStyles = {
    container: {
        flex: 1
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(100,100,100, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 6,
        width: 280,
        borderColor: 'black',
        borderWidth: StyleSheet.hairlineWidth
    },
    checkBox: {
        marginBottom: 10,
        paddingLeft: 5
    },
    checkBoxText: {
        marginLeft: 4,
        alignSelf: 'center',
        fontSize: 15,
        justifyContent: 'center'
    },
    titleText: {
        fontFamily: '方正中宋',
        fontSize: 17,
        fontWeight: '600',
        padding: 15,
        alignSelf: 'center',
        color: 'black',
        fontWeight: '600'
    },
    buttonContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderColor: 'gray',
        borderTopWidth: StyleSheet.hairlineWidth
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderColor: 'gray'
    }
}
