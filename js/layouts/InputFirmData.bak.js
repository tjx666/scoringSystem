import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TextInput, Alert, Keyboard } from 'react-native';
import Divider from '../components/Divider';
import Toast from 'react-native-root-toast';
import Button from 'react-native-button';
import { average, fix } from '../utils/math';
import CONFIG from '../constans/config'
import Logger from '../utils/log';
const logger = new Logger();

const InputFirmContext = React.createContext();

class InputItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: '#AAAAAA'
        }
    }

    _handleFocus = __ => {
        this.setState({
            ...this.state,
            color: 'black'
        })
    }

    _handleBlur = __ => {
        this.setState({
            ...this.state,
            color: '#AAAAAA'
        })
    }

    render() {
        return (
            <View style={styles.inputItem}>
                <Text style={styles.itemDesc}>{`${this.props.desc}:  `}</Text>
                <InputFirmContext.Consumer>
                    {
                        ({ onChangeText, values }) => (
                            <TextInput
                                style={styles.itemInput}
                                onChangeText={newValue => {
                                    onChangeText(this.props.name, newValue.trim());
                                }}
                                clearButtonMode={'while-editing'}
                                enablesReturnKeyAutomatically={true}
                                keyboardType={'numeric'}
                                value={values[this.props.name]}
                                selectionColor={'gray'}
                                multiline={true}
                                numberOfLines={1}
                                textAlign={'left'}
                                onFocus={this._handleFocus}
                                onBlur={this._handleBlur}
                            />
                        )
                    }
                </InputFirmContext.Consumer>
                {this._renderPercentSign()}
            </View>
        )
    }

    _renderPercentSign = __ => {
        return this.props.showPercentSign && <Text style={{
            ...styles.percentSign,
            color: this.state.color
        }}>%</Text>
    }
}

class InputSection extends Component {
    _renderItems = items => {
        return items.map(item => {
            const { name, desc, showPercentSign } = item;
            return (
                <InputItem
                    key={name}
                    name={name}
                    desc={desc}
                    showPercentSign={showPercentSign}
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
                {
                    name: 'currentRatio',
                    desc: '流动比率',
                    showPercentSign: false
                },
                {
                    name: 'assetsAndLiabilityRate',
                    desc: '资产负债率',
                    showPercentSign: true
                },
            ]
        },
        {
            bigCategory: '营运能力',
            items: [
                {
                    name: 'inventoryTurnover',
                    desc: '存货周期率',
                    showPercentSign: false
                },
                {
                    name: 'accountReceivableTurnover',
                    desc: '应收账款周转率',
                    showPercentSign: false
                },
                {
                    name: 'totalAssetsTurnover',
                    desc: '总资产周转率',
                    showPercentSign: false
                }
            ]
        },
        {
            bigCategory: '盈利能力',
            items: [
                {
                    name: 'grossProfitRate',
                    desc: '毛利率',
                    showPercentSign: true
                },
                {
                    name: 'roe',
                    desc: '净资产收益率',
                    showPercentSign: true
                }
            ]
        },
        {
            bigCategory: '成长性分析',
            items: [
                {
                    name: 'operationIncomeGrowthRate',
                    desc: '营业收入增长率',
                    showPercentSign: true
                },
                {
                    name: 'netProfitGrowthRate',
                    desc: '净利润增长率',
                    showPercentSign: true
                }
            ]
        },
        {
            bigCategory: '现金流量分析',
            items: [
                {
                    name: 'netProfitCashRatio',
                    desc: '净利润现金比率',
                    showPercentSign: true
                }
            ]
        }
    ]

    constructor(props) {
        super(props);

        this.state = {
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

    _handleChangeText = (name, newValue) => {
        this.setState({
            ...this.state,
            [name]: newValue
        })
    }

    _getDescOfItem = name => {
        for (const bigCategory of InputFirmData.sectionListData) {
            for (const item of bigCategory.items) {
                if (item.name === name) return item.desc;
            }
        }
    }

    _parseFirmData = (stringFirmData) => {
        for (const key in stringFirmData) {
            if (stringFirmData[key].trim() === '') {
                stringFirmData[key] = '0';
            }
        }

        const parsedFirmData = Object.values(stringFirmData).map(stringValue => {
            const numberData = Number.parseFloat(stringValue) * 10;
            return Math.min(numberData, 15);
        });

        const params = [
            parsedFirmData.slice(0, 2),
            parsedFirmData.slice(2, 5),
            parsedFirmData.slice(5, 7),
            parsedFirmData.slice(7, 9),
            parsedFirmData.slice(9, 10)
        ].map(param => fix(average(param)))
        return params;
    }

    _handleSubmit = __ => {
        const firmData = this.state;

        for (const [key, value] of Object.entries(firmData)) {
            const desc = this._getDescOfItem(key);

            if (value.trim() !== '' && !/^\d+(\.\d+)?$/.test(value)) {
                Toast.show(`${desc}的输入值不是一个合法的数字!请修改${desc}!`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                return;
            }
        }


        for (const [key, value] of Object.entries(firmData)) {
            const desc = this._getDescOfItem(key);

            if (value.trim() === '') {
                Alert.alert(
                    `${desc}项未输入！`,
                    '继续将视未输入的所有项值为 0，是否继续？',
                    [
                        {
                            text: '返回', onPress: () => {
                            }
                        },
                        {
                            text: '继续', onPress: () => {
                                setTimeout(__ => {
                                    const params = this._parseFirmData(this.state);
                                    this.props.navigation.navigate('Charts', params)
                                }, 500);
                            }
                        },
                    ],
                    { cancelable: false }
                )
                return;
            }
        }

        setTimeout(__ => {
            const params = this._parseFirmData(this.state);
            this.props.navigation.navigate('Charts', params);
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
                <Text style={styles.title}>公司名</Text>
                <TextInput
                    style={{
                        width: '90%',
                        alignSelf: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: 'rgba(128, 128, 128, 0.6)',
                        fontSize: 20,
                    }}
                    selectionColor={'gray'}
                >
                </TextInput>
                <Text style={styles.title}>请输入以下财务指标</Text>
                <InputFirmContext.Provider
                    value={{
                        onChangeText: this._handleChangeText,
                        values: this.state
                    }}
                >
                    {this._renderSectionList(InputFirmData.sectionListData)}
                </InputFirmContext.Provider>
                <View style={styles.submitButtonContainer}>
                    <Button
                        style={{ fontSize: 20, color: 'white' }}
                        containerStyle={{ padding: 5, height: 40, overflow: 'hidden', borderRadius: 4, backgroundColor: 'gray' }}
                        onPress={() => this._handleSubmit()}
                    >
                        确定
                    </Button>
                </View>
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
        backgroundColor: 'white',
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
        width: "90%",
        alignSelf: 'center',
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
        marginBottom: 20,
        borderBottomColor: 'rgba(128, 128, 128, 0.1)'
    },
    inputItem: {
        height: 40,
        paddingLeft: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemDesc: {
        fontSize: 18,
        color: '#555555'
    },
    itemInput: {
        width: 120,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(128, 128, 128, 0.6)',
        fontSize: 18,
    },
    submitButtonContainer: {
        width: 80,
        marginTop: -15,
        marginBottom: 40,
        alignSelf: 'center',
        borderRadius: 50
    },
    percentSign: {
        fontSize: 18,
    }
})