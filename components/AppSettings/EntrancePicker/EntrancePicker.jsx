import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Picker } from "react-native";
import { EPStyles as styles } from "../../../styles/entrancePickerStyles";

const EntrancePicker = ({ dimensions, entranceCoords, setEntranceCoords }) => {
  const [entranceCount, setEntranceCount] = useState(3);

  useEffect(() => {
    setEntranceCoords(Array(entranceCount).fill([0, 0]));
  }, [entranceCount]);

  const increaseEntranceCount = () => {
    setEntranceCount(entranceCount + 1);
  };

  const decreaseEntranceCount = () => {
    if (entranceCount > 1) {
      setEntranceCount(Math.max(entranceCount - 1, 3));
    }
  };

  const generateDimensionsArray = () => {
    const dimensionsArray = [];
    for (let x = 0; x < dimensions.width; x++) {
      for (let y = 0; y < dimensions.length; y++) {
        if (
          x == 0 ||
          x == dimensions.width - 1 ||
          y == 0 ||
          y == dimensions.length - 1
        )
          dimensionsArray.push([x, y]);
      }
    }
    return dimensionsArray;
  };

  const dimensionsArray = generateDimensionsArray();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Entrance count: </Text>
        <TouchableOpacity style={styles.button} onPress={decreaseEntranceCount}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text>{entranceCount}</Text>
        <TouchableOpacity style={styles.button} onPress={increaseEntranceCount}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Entrance Coordinates:</Text>
      {entranceCoords.map((coords, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Entrance {index + 1}:</Text>
          <Picker
            style={styles.picker}
            selectedValue={coords}
            onValueChange={(itemValue) => {
              const updatedCoords = [...entranceCoords];
              updatedCoords[index] = itemValue;
              setEntranceCoords(updatedCoords);
            }}
          >
            {dimensionsArray.map((pair, pairIndex) => (
              <Picker.Item
                key={pairIndex}
                label={`(${pair[0]}, ${pair[1]})`}
                value={pair}
              />
            ))}
          </Picker>
        </View>
      ))}
    </View>
  );
};

export default EntrancePicker;
