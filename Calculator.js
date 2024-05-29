import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Vibration } from 'react-native';

const Calculator = ({ isFruitMode, fruitValues, setIsFruitMode, setShowMenu }) => {
  const [input, setInput] = useState('');
  const [partialResult, setPartialResult] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let expression = input;
    if (isFruitMode) {
      Object.keys(fruitValues).forEach(fruit => {
        const regex = new RegExp(fruitValues[fruit], 'g');
        expression = expression.replace(regex, fruitValues[fruit]);
      });
    }
    try {
      const result = eval(expression);
      setPartialResult(result.toString());
    } catch {
      setPartialResult('');
    }
  }, [input, isFruitMode, fruitValues]);

  const handleInput = (value) => {
    setInput(prev => prev + value);
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInput('');
    setPartialResult('');
  };

  const calculateResult = () => {
    if (partialResult) {
      Vibration.vibrate(500); 
      setHistory([...history, { key: `${input} = ${partialResult}` }]);
      setInput(partialResult);
      setPartialResult('');
    }
  };

  const renderButton = (label, onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const renderButtons = () => {
    const fruitButtons = Object.keys(fruitValues).map(fruit => 
      renderButton(fruit, () => handleInput(fruitValues[fruit].toString()))
    );

    const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(number => 
      renderButton(number, () => handleInput(number))
    );

    return isFruitMode ? fruitButtons : numberButtons;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{input}</Text>
      <Text style={styles.partialResult}>{partialResult}</Text>
      <View style={styles.buttonContainer}>
        {renderButtons().map((button, index) => (
          <View key={index} style={styles.buttonWrapper}>{button}</View>
        ))}
        <View style={styles.buttonWrapper}>{renderButton('+', () => handleInput('+'))}</View>
        <View style={styles.buttonWrapper}>{renderButton('-', () => handleInput('-'))}</View>
        <View style={styles.buttonWrapper}>{renderButton('*', () => handleInput('*'))}</View>
        <View style={styles.buttonWrapper}>{renderButton('/', () => handleInput('/'))}</View>
        <View style={styles.buttonWrapper}>{renderButton('.', () => handleInput('.'))}</View>
        <View style={styles.buttonWrapper}>{renderButton('C', handleClear)}</View>
        <View style={styles.buttonWrapper}>{renderButton('Del', handleDelete)}</View>
        <View style={styles.buttonWrapper}>{renderButton('=', calculateResult)}</View>
        <View style={styles.buttonWrapper}>{renderButton(isFruitMode ? '1️⃣' : '🍎', () => setIsFruitMode(!isFruitMode))}</View>
        {isFruitMode && <View style={styles.buttonWrapper}>{renderButton('⚙️', () => setShowMenu(true))}</View>}
      </View>
      <FlatList
        style={styles.history}
        data={history}
        renderItem={({ item }) => <Text style={styles.historyItem}>{item.key}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    flex: 1,
    width: '100%',
  },
  display: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'right',
    width: '100%',
  },
  partialResult: {
    fontSize: 24,
    color: 'gray',
    textAlign: 'right',
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  buttonWrapper:     {
    width: '22%',
    margin: '1%',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    minWidth: 70,
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    fontSize: 20,
  },
  history: {
    marginTop: 20,
    width: '100%',
  },
  historyItem: {
    fontSize: 18,
    textAlign: 'left',
    padding: 5,
  },
});

export default Calculator;

