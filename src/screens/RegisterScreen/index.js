import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { passwordValidator, nameValidator, phoneValidator } from '../../core/utils';

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: { value: '', error: '' },
            phone: { value: '', error: '' },
            password: { value: '', error: '' },
        };
    }

    _onSignUpPressed = () => {
        const { name, phone, password } = this.state;

        const nameError = nameValidator(name.value);
        const phoneError = phoneValidator(phone.value);
        const passwordError = passwordValidator(password.value);

        if (nameError || phoneError || passwordError) {
            this.setState({
                name: { value: name.value, error: nameError },
                phone: { value: phone.value, error: phoneError },
                password: { value: password.value, error: passwordError }
            })
            return;
        }

        // navigation.navigate('Dashboard');
    };

    render() {
        const { name, phone, password } = this.state;

        return (
            <Background>
                <Logo />

                <Header>Create Account</Header>

                <TextInput
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={text => this.setState({ name: { value: text, error: '' } })}
                    error={!!name.error}
                    errorText={name.error}
                />

                <TextInput
                    label="Phone"
                    returnKeyType="next"
                    value={phone.value}
                    onChangeText={text => this.setState({ phone: { value: text, error: '' } })}
                    error={!!phone.error}
                    errorText={phone.error}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    placeholder="+92123456789"
                />

                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={text => this.setState({ password: { value: text, error: '' } })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />

                <Button mode="contained" onPress={this._onSignUpPressed} style={styles.button}>Sign Up</Button>

                <View style={styles.row}>
                    <Text style={styles.label}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} >
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});