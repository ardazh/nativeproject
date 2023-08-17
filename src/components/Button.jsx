import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';

const Button = ({children, disabled, ...rest}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[globalStyles.btn, disabled && globalStyles.btnDisabled]}>
      <Text
        style={[
          globalStyles.btnText,
          disabled && globalStyles.btnDisabledText,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
