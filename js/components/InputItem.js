import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, } from 'react-native';
import Toast from 'react-native-root-toast';
import CONFIG from '../constans/config';
import Logger from '../utils/log';
import { StringUtil } from '../utils/language';
import { fix } from '../utils/math';

const logger = new Logger();

export default class container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showClearButton: false,
            value: '',
            textColor: 'black'
        }
    }

    _handleFocus = event => {
        if (this.state.value !== '') {
            this.setState({
                ...this.state,
                showClearButton: true
            })
        }
    }

    _handleBlur = __ => {
        this.setState({
            ...this.state,
            showClearButton: false
        })
    }

    _handleClear = __ => {
        const { name } = this.props;
        this.setState({
            ...this.state,
            value: '',
            showClearButton: false
        }, __ => {
            this.props.onChangeText(this.props.name, '');
            if (this.state.textColor === 'red') {
                this.setState({
                    textColor: 'black'
                })
            }
        })
    }

    _handleChangeText = newValue => {
        this.setState({
            ...this.state,
            value: newValue,
        }, __ => {
            this.props.onChangeText(this.props.name, newValue.trim());
            if (newValue === '') {
                this.setState({
                    ...this.state,
                    showClearButton: false
                });
            } else {
                if (!this.state.showClearButton) {
                    this.setState({
                        ...this.state,
                        showClearButton: true
                    });
                }
            }

            if (this.props.name !== 'firmName') {
                if (!this._validate(newValue.trim())) {
                    this.setState({
                        ...this.state,
                        textColor: 'red'
                    })
                } else {
                    if (this.state.textColor === 'red') {
                        this.setState({
                            ...this.state,
                            textColor: 'black'
                        })
                    }
                }
            }
        });
    }

    _validate = inputValue => {
        if (inputValue === '') return true;

        if (!/\d+\.$/.test(inputValue) && !StringUtil.isNumberStr(inputValue)) {
            Toast.show(`输入值不是一个合法的数字!${inputValue}`, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: 'gray',
                textEmphasisColor: 'white',
                delay: 0,
            });
            return false;
        }

        const { hint } = this.props;
        const numberHint = hint.endsWith('%')
            ? Number.parseFloat(hint.slice(0, hint.length - 1))
            : Number.parseFloat(hint);

        const inputNumber = Number.parseFloat(inputValue);
        const maxInputNumber = CONFIG.maxScore / CONFIG.ofilmScore * numberHint;

        if (inputNumber > maxInputNumber) {
            Toast.show(`超出最大值${fix(maxInputNumber)}!`, {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                backgroundColor: 'gray',
                textEmphasisColor: 'white',
                delay: 0,
            });
            return false;
        }
        return true;
    }

    // FIXME: 输入公司名称不需要数字键盘
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.itemDesc}>{this.props.desc}</Text>
                <TextInput
                    ref={this.props.name}
                    style={{ ...styles.itemInput, color: this.state.textColor }}
                    value={this.state.value}
                    placeholder={this.props.hint && `参考值: ${this.props.hint}`}
                    keyboardType='numeric'
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                    onChangeText={this._handleChangeText}
                />
                {this._renderClearButton()}
            </View>
        )
    }

    _renderClearButton = __ => {
        if (this.state.showClearButton) {
            return (
                <Text
                    style={{
                        fontSize: 20,
                        color: 'gray',
                        fontWeight: 'bold'
                    }}
                    onPress={this._handleClear}
                >
                    x
                </Text>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 40,
        paddingRight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#666666'
    },
    itemDesc: {
        width: 110,
        marginLeft: 2,
        fontFamily: '思源黑体',
        fontSize: 15,
        color: '#666666'
    },
    itemInput: {
        flex: 1,
        fontSize: 14
    }
})
