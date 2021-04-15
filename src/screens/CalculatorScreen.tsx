import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ButtonCalc, ButtonCalcProps} from '../components/ButtonCalc';
import {styles} from '../theme/appTheme';

export const CalculatorScreen = () => {
  const [previousNumber, setPreviousNumber] = useState('0');
  const [number, setNumber] = useState('0');

  const clear = () => {
    setPreviousNumber('0');
    setNumber('0');
  };

  const togglePositiveNegative = () => {
    const parsedNumber = (parseFloat(number) * -1).toString();
    setNumber(parsedNumber);
  };

  const deleteLastEntry = () => {
    let negative = '';
    let numberTemp = number;

    if (number.includes('-')) {
      negative = '-';
      numberTemp = number.substr(1);
    }

    if (numberTemp.length > 1) {
      setNumber(negative + numberTemp.slice(0, -1));
    } else {
      setNumber('0');
    }
  };

  const buildNumber = (numberText: string) => {
    // Not accepts double decimal point
    if (number.includes('.') && numberText === '.') return;

    // If starts with zero
    if (number.startsWith('0') || number.startsWith('-0')) {
      // Decimal Point
      if (numberText === '.') {
        setNumber(number + numberText);
      }
      // If zero and there is a decimal point
      else if (numberText === '0' && number.includes('.')) {
        setNumber(number + numberText);
      }
      // If !== zero and there is not a decimal point
      else if (numberText !== '0' && !number.includes('.')) {
        setNumber(numberText);
      }
      // Avoid 0000.0
      else if (numberText === '0' && !number.includes('.')) {
        setNumber(number);
      }
      // Concat Number
      else {
        setNumber(number + numberText);
      }
    }
    // If not starts with zero
    else {
      setNumber(number + numberText);
    }
  };

  return (
    <View>
      <Text style={styles.calcResultSmall}>{previousNumber}</Text>
      <Text style={styles.calcResult} numberOfLines={1} adjustsFontSizeToFit>
        {number}
      </Text>
      <ButtonsRow
        rows={[
          {text: 'C', color: 'lightGray', action: clear},
          {text: '+/-', color: 'lightGray', action: togglePositiveNegative},
          {text: 'del', color: 'lightGray', action: deleteLastEntry},
          {text: '/', color: 'orange'},
        ]}
      />
      <ButtonsRow
        rows={[
          {text: '7', action: buildNumber},
          {text: '8', action: buildNumber},
          {text: '9', action: buildNumber},
          {text: 'X', color: 'orange'},
        ]}
      />
      <ButtonsRow
        rows={[
          {text: '4', action: buildNumber},
          {text: '5', action: buildNumber},
          {text: '6', action: buildNumber},
          {text: '-', color: 'orange'},
        ]}
      />
      <ButtonsRow
        rows={[
          {text: '1', action: buildNumber},
          {text: '2', action: buildNumber},
          {text: '3', action: buildNumber},
          {text: '+', color: 'orange'},
        ]}
      />
      <ButtonsRow
        rows={[
          {text: '0', wide: true, action: buildNumber},
          {text: '.', action: buildNumber},
          {text: '=', color: 'orange'},
        ]}
      />
    </View>
  );
};

const ButtonsRow = ({rows}: {rows: ButtonCalcProps[]}) => (
  <View style={styles.row}>
    {rows.map(({text, color, wide, action}) => (
      <ButtonCalc
        key={text}
        text={text}
        color={color}
        wide={wide}
        action={action}
      />
    ))}
  </View>
);
