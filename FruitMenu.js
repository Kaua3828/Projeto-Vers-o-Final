import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const FruitMenu = ({ fruitValues, setFruitValues, setShowMenu }) => {
  const [localValues, setLocalValues] = useState(fruitValues);

  const handleValueChange = (fruit, value) => {
    setLocalValues(prev => ({
      ...prev,
      [fruit]: value,
    }));
  };

  const saveValues = () => {
    setFruitValues(localValues); 
    setShowMenu(false); 
  };

  return (
    <View style={styles.container}>
      {Object.keys(localValues).map(fruit => (
        <View key={fruit} style={styles.row}>
          <Text style={styles.label}>{fruit}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={localValues[fruit]}
            onChangeText={value => handleValueChange(fruit, value)}
          />
        </View>
      ))}
      <Button title="Save" onPress={saveValues} />
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
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: 60,
    textAlign: 'center',
  },
});

export default FruitMenu;
