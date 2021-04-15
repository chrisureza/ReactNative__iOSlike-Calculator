import React from "react";
import { Text, View } from "react-native";
import { ButtonCalc, ButtonCalcProps } from "../components/ButtonCalc";
import { styles } from "../theme/appTheme";
import { useCalculator } from "../hooks/useCalculator";

export const CalculatorScreen = () => {
  const {
    number,
    previousNumber,
    clear,
    togglePositiveNegative,
    deleteLastEntry,
    buildNumber,
    add,
    subtract,
    multiply,
    divide,
    calculate,
  } = useCalculator();

  return (
    <View>
      {previousNumber !== "0" && (
        <Text style={styles.calcResultSmall}>{previousNumber}</Text>
      )}
      <Text style={styles.calcResult} numberOfLines={1} adjustsFontSizeToFit>
        {number}
      </Text>
      <ButtonsRow
        rows={[
          { text: "C", color: "lightGray", action: clear },
          { text: "+/-", color: "lightGray", action: togglePositiveNegative },
          { text: "del", color: "lightGray", action: deleteLastEntry },
          { text: "/", color: "orange", action: divide },
        ]}
      />
      <ButtonsRow
        rows={[
          { text: "7", action: buildNumber },
          { text: "8", action: buildNumber },
          { text: "9", action: buildNumber },
          { text: "X", color: "orange", action: multiply },
        ]}
      />
      <ButtonsRow
        rows={[
          { text: "4", action: buildNumber },
          { text: "5", action: buildNumber },
          { text: "6", action: buildNumber },
          { text: "-", color: "orange", action: subtract },
        ]}
      />
      <ButtonsRow
        rows={[
          { text: "1", action: buildNumber },
          { text: "2", action: buildNumber },
          { text: "3", action: buildNumber },
          { text: "+", color: "orange", action: add },
        ]}
      />
      <ButtonsRow
        rows={[
          { text: "0", wide: true, action: buildNumber },
          { text: ".", action: buildNumber },
          { text: "=", color: "orange", action: calculate },
        ]}
      />
    </View>
  );
};

const ButtonsRow = ({ rows }: { rows: ButtonCalcProps[] }) => (
  <View style={styles.row}>
    {rows.map(({ text, color, wide, action }) => (
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
