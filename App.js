import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calculator from './Calculator';
import FruitMenu from './FruitMenu';
import Login from './Login';
import Register from './Register';

const App = () => {
  const [isFruitMode, setIsFruitMode] = useState(false);
  const [fruitValues, setFruitValues] = useState({
    "🍎": "0",
    "🍌": "0",
    "🍇": "0",
    "🍉": "0",
    "🍓": "0",
    "🍒": "0",
    "🍍": "0",
    "🥭": "0",
    "🍑": "0",
    "🥝": "0"
  });
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const loadFruitValues = async () => {
      const savedValues = await AsyncStorage.getItem('fruitValues');
      if (savedValues) {
        setFruitValues(JSON.parse(savedValues));
      }
    };

    loadFruitValues();
  }, []);

  const handleSetFruitValues = async (newValues) => {
    await AsyncStorage.setItem('fruitValues', JSON.stringify(newValues));
    setFruitValues(newValues);
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        showMenu ? (
          <FruitMenu fruitValues={fruitValues} setFruitValues={handleSetFruitValues} setShowMenu={setShowMenu} />
        ) : (
          <Calculator
            isFruitMode={isFruitMode}
            fruitValues={fruitValues}
            setIsFruitMode={setIsFruitMode}
            setShowMenu={setShowMenu}
          />
        )
      ) : isRegistering ? (
        <Register setIsRegistering={setIsRegistering} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setIsRegistering={setIsRegistering} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
