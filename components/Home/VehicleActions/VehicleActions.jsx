import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { vehicleStyles as styles } from "../../../styles/vehicleActionsStyles";

const VehicleActions = ({ currTime, addCar, removeCar, entranceCoordList }) => {
  const [carId, setCarId] = useState("");
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedEntrance, setSelectedEntrance] = useState("0,0");

  // parkedCar {
  //   id: varChar,
  //   size: 'L' | 'M' | 'S',
  //   time: DateTime,
  //   entrance: char
  //   parkCode: Vector2 (to be assigned here)
  //   paid: number (for returning cars, set time to before, but final fee will be reduced by number on exit)
  // }
  const setData = () => {
    return {
      id: carId,
      size: selectedSize,
      time: currTime,
      entrance: selectedEntrance,
      parkCode: "",
      paid: 0,
    };
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={carId}
          onChangeText={(text) =>
            setCarId(() => (text.length > 6 ? text.slice(0, 6) : text))
          }
          placeholder="Input car ID"
          style={styles.inputBox}
        />
      </View>
      <View>
        <View style={styles.btnContainer}>
          <Text>Size: </Text>
          <Picker
            selectedValue={selectedSize}
            onValueChange={(itemValue, itemIndex) => setSelectedSize(itemValue)}
          >
            <Picker.Item label="Small" value="S" />
            <Picker.Item label="Medium" value="M" />
            <Picker.Item label="Large" value="L" />
          </Picker>
        </View>
        <View style={styles.btnContainer}>
          <Text>Entrance: </Text>
          <Picker
            selectedValue={selectedEntrance}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedEntrance(itemValue);
            }}
          >
            {entranceCoordList.map((pair, pairIndex) => (
              <Picker.Item key={pairIndex} label={pair} value={pair} />
            ))}
          </Picker>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => addCar(setData())}
          >
            <Text>Park</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => removeCar(carId)}>
            <Text>Leave</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VehicleActions;
