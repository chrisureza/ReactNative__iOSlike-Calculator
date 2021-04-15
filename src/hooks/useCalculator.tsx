import { useState, useRef } from "react";

enum Operators {
  add,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [previousNumber, setPreviousNumber] = useState("0");
  const [number, setNumber] = useState("0");
  const lastOperation = useRef<Operators>();

  const clear = () => {
    setPreviousNumber("0");
    setNumber("0");
  };

  const togglePositiveNegative = () => {
    const parsedNumber = (parseFloat(number) * -1).toString();
    setNumber(parsedNumber);
  };

  const deleteLastEntry = () => {
    let negative = "";
    let numberTemp = number;

    if (number.includes("-")) {
      negative = "-";
      numberTemp = number.substr(1);
    }

    if (numberTemp.length > 1) {
      setNumber(negative + numberTemp.slice(0, -1));
    } else {
      setNumber("0");
    }
  };

  const buildNumber = (numberText: string) => {
    // Not accepts double decimal point
    if (number.includes(".") && numberText === ".") return;

    // If starts with zero
    if (number.startsWith("0") || number.startsWith("-0")) {
      // Decimal Point
      if (numberText === ".") {
        setNumber(number + numberText);
      }
      // If zero and there is a decimal point
      else if (numberText === "0" && number.includes(".")) {
        setNumber(number + numberText);
      }
      // If !== zero and there is not a decimal point
      else if (numberText !== "0" && !number.includes(".")) {
        setNumber(numberText);
      }
      // Avoid 0000.0
      else if (numberText === "0" && !number.includes(".")) {
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

  const setValueToPreviousNumber = () => {
    if (number.endsWith(".")) {
      setPreviousNumber(number.slice(0, -1));
    } else {
      setPreviousNumber(number);
    }
    setNumber("0");
  };

  const add = () => {
    setValueToPreviousNumber();
    lastOperation.current = Operators.add;
  };

  const subtract = () => {
    setValueToPreviousNumber();
    lastOperation.current = Operators.subtract;
  };

  const multiply = () => {
    setValueToPreviousNumber();
    lastOperation.current = Operators.multiply;
  };

  const divide = () => {
    setValueToPreviousNumber();
    lastOperation.current = Operators.divide;
  };

  const calculate = () => {
    const num1 = Number(previousNumber);
    const num2 = Number(number);

    switch (lastOperation.current) {
      case Operators.add:
        setNumber(`${num1 + num2}`);
        break;

      case Operators.subtract:
        setNumber(`${num1 - num2}`);
        break;

      case Operators.multiply:
        setNumber(`${num1 * num2}`);
        break;

      case Operators.divide:
        setNumber(`${num1 / num2}`);
        break;
    }
    setPreviousNumber("0");
  };

  return {
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
  };
};
