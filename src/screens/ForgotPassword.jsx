import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';
import Input from '../components/Input';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {asyncForgot} from '../redux/actions/auth';
import * as Yup from 'yup';
import {clearMessage} from '../redux/reducers/auth';
import Alert from '../components/alert';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('email cannot be empty'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doForgot = values => {
    dispatch(asyncForgot(values));
  };

  if (successMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
      navigation.replace('ResetPassword');
    }, 1500);
  }
  if (errorMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 1500);
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.heading}>
        <View>
          <Text style={globalStyles.title}>Forgot Password</Text>
        </View>
        <View>
          <Text style={globalStyles.subTitle}>
            You&apos;ll get mail soon on your email
          </Text>
        </View>
      </View>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doForgot}>
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.formGap}>
              {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
              {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
              )}
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text style={styles.textErrorMessage}>{errors.email}</Text>
              )}
            </View>
            <View>
              <Button
                disabled={!touched.email && !touched.password}
                onPress={handleSubmit}>
                Send
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    gap: 50,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  heading: {
    gap: 10,
  },
  formGap: {
    gap: 15,
  },
  formAlternative: {
    alignItems: 'center',
    gap: 15,
  },
  formAlternativeIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  textErrorMessage: {
    color: 'red',
  },
});

export default ForgotPassword;
