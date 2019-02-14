import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, } from 'react-native'
import Logger from '../utils/log';
const logger = new Logger();

export default class container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showClearButton: false,
            value: ''
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
        this.refs[name].clear();
    }

    _handleChangeText = newValue => {
        this.setState({
            ...this.state,
            value: newValue,
        }, __ => {
            this.setState({
                ...this.state,
                showClearButton: this.state.value !== ''
            });

            this.props.onChangeText(this.props.name, newValue);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.itemDesc}>{this.props.desc}</Text>
                <TextInput
                    ref={this.props.name}
                    style={styles.itemInput}
                    placeholder={this.props.hint && `参考值: ${this.props.hint}`}
                    keyboardType='numeric'
                    selectionColor='gray'
                    onFocus={this._handleFocus}
                    onBlur={this._handleBlur}
                    onChangeText={this._handleChangeText}
                    value={this.state.value}
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
                        fontSize: 18,
                        color: 'gray'
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
        width: 100,
        marginLeft: 2,
        fontFamily: '思源黑体',
        fontSize: 14,
        color: '#666666'
    },
    itemInput: {
        flex: 1,
    }
})
