import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import PropTypes from 'prop-types';
import SwymNameLogo from '../../../components/SwymNameLogo';
import NavigationShape from '../../../data/shapes/Navigation';
import { useForm, Controller } from 'react-hook-form';
import FormStyles from '../../../utils/styling/Forms';
import Colors from '../../../utils/styling/Colors';
import ButtonStyles from '../../../utils/styling/Buttons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavbarStyles from '../../../utils/styling/Navbar';
import { createUserAccount, fetchTOTP, saveTOTP } from '../../../utils/networking/API';

const SignUpTOTPScreen = ({ route }) => {
  const { setIsSignedIn, setUserId } = route.params;
  const [errorsExist, setErrorsExist] = useState(false);
  const [code, setCode] = useState(null);
  const { control, formState, handleSubmit, watch, errors, setError } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmitted = async () => {
    if (Object.keys(errors).length) {
      return;
    }

    const response = await saveTOTP(code);

    if (response.status === 200) {
      const userId = response.data.id;
      setUserId(userId);
      setIsSignedIn(true);
    } else {
      setError('api', { type: 'manual', message: 'API error' });
    }
  };

  useEffect(async () => {
    var code = await fetchTOTPCode(user);
    setCode( code );
  }, []);
  if ( !code ) {
    return (
        <>
         <Text>Loading..</Text>
        </>
    );
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.rootContainer}>
      <SwymNameLogo style={styles.logoNameContainer} />

      <View style={styles.formContainer}>
        <Text style={FormStyles.errorText}>
          To setup 2FA please add the following code to your authenticator:
        </Text>
        <Text style={FormStyles.totp}>
          {{code}}
        </Text>
      </View>

      <View style={styles.actionButtonsContainer}>
        <Button
          title="Submit"
          raised
          containerStyle={[ButtonStyles.actionButtonContainer]}
          buttonStyle={[ButtonStyles.actionButton]}
          titleStyle={ButtonStyles.actionButtonTitle}
          onPress={handleSubmit(onSubmitted)}
          disabled={errorsExist || formState.isSubmitting}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: 'center',
  },

  logoNameContainer: {
    marginBottom: 22,
    fontFamily:'LuckiestGuy-Regular',
  },

  formContainer: {
    marginBottom: 22,
    minWidth: 240,
    width: '80%',
  },

  formFieldContainer: {
    marginBottom: 20,
  },

  actionButtonsContainer: {
    marginBottom: 22,
  },

  labelText: {
    ...FormStyles.labelText,
    color: Colors.purple,
  },
  totp: {
    color: Colors.black
  },
});

SignUpTOTPScreen.propTypes = {
  navigation: NavigationShape.isRequired,
  route: PropTypes.object,
};

SignUpTOTPScreen.defaultProps = {};

SignUpTOTPScreen.navigationOptions = ({ navigation }) => {
  return {
    headerBackTitle: '',
    headerTitle: () => {
      return <Text style={NavbarStyles.mainTitle}>Create Your Account</Text>;
    },
    headerTitleStyle: NavbarStyles.mainTitle,
  };
};

export default SignUpTOTPScreen;