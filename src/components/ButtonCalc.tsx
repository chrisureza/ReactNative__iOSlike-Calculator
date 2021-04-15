import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export interface ButtonCalcProps {
  text: string;
  action: (value: string) => void;
  color?: 'lightGray' | 'darkGray' | 'orange';
  wide?: boolean;
}

export const ButtonCalc = ({
  text,
  color = 'darkGray',
  wide = false,
  action,
}: ButtonCalcProps) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => action(text)}>
      <View style={[styles.button, styles[color], {width: wide ? 180 : 80}]}>
        <Text
          style={{
            ...styles.buttonText,
            color: color === 'lightGray' ? 'black' : 'white',
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    fontWeight: '300',
  },
  lightGray: {
    backgroundColor: '#9b9b9b',
  },
  darkGray: {
    backgroundColor: '#2d2d2d',
  },
  orange: {
    backgroundColor: '#ff9427',
  },
});
