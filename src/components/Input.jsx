import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyles from '../assets/css/globalStyles';
import Icon from 'react-native-vector-icons/Feather';

const Input = ({secureTextEntry, ...rest}) => {
  const [visible, setVisibility] = React.useState(false);
  return (
    <View style={globalStyles.input}>
      {!secureTextEntry && (
        <TextInput {...rest} style={globalStyles.inputComponent} />
      )}
      {secureTextEntry && (
        <TextInput
          {...rest}
          secureTextEntry={!visible}
          style={globalStyles.inputComponent}
        />
      )}
      {secureTextEntry && (
        <>
          <TouchableOpacity onPress={() => setVisibility(!visible)}>
            {visible && <Icon size={20} color="#E14D2A" name="eye-off" />}
            {!visible && <Icon size={20} color="#E14D2A" name="eye" />}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Input;
