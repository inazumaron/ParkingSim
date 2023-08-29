import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { default as TablePicker } from "./TablePicker/TablePicker";
import { default as EntrancePicker } from "./EntrancePicker/EntrancePicker";
import { settingStyles as styles } from "../../styles/settingsStyles";
import { useState } from "react";

const Settings = ({
  dimensions,
  setDimensions,
  setParkingSlotList,
  setParkingData,
  setActiveTab,
  setParkedCars,
  setReturningCars,
  setParkingLot,
  setEntranceCoordList,
  setLogs,
}) => {
  const [tableData, setTableData] = useState([]);
  const [entranceCoords, setEntranceCoords] = useState(
    Array(3).fill({ x: 0, y: 0 })
  );

  const setParkingState = () => {
    let tempData = { S: [], M: [], L: [] };
    for (let row = 0; row < tableData.length; row++) {
      for (let cell = 0; cell < tableData[row].length; cell++) {
        switch (tableData[row][cell]) {
          case "S":
            tempData.S.push([cell, row]);
            break;
          case "M":
            tempData.M.push([cell, row]);
            break;
          case "L":
            tempData.L.push([cell, row]);
            break;
        }
      }
    }

    setLogs((prev) => [...prev, "Changing parking lot settings"]);

    //update data on new layout
    setParkingData({
      totalSmall: tempData.S.length,
      takenSmall: 0,
      totalMedium: tempData.M.length,
      takenMedium: 0,
      totalLarge: tempData.L.length,
      takenLarge: 0,
    });
    setParkingSlotList(tempData);
    setEntranceCoordList(entranceCoords);

    //resset data
    setParkedCars([]);
    setReturningCars([]);
    setParkingLot({});

    //return to home
    setActiveTab(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>Settings</View>
      <View style={styles.settingEntry}>
        <Text style={styles.settingTitle}>Adjust dimensions</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={dimensions.length}
            onChangeText={(text) =>
              setDimensions((prev) => ({
                ...prev,
                length: !isNaN(parseInt(text))
                  ? Math.max(Math.min(parseInt(text), 9), 1)
                  : 1,
              }))
            }
            keyboardType="numeric"
            placeholder="Enter number of rows"
          />
          <TextInput
            style={styles.input}
            value={dimensions.width}
            onChangeText={(text) =>
              setDimensions((prev) => ({
                ...prev,
                width: !isNaN(parseInt(text))
                  ? Math.max(Math.min(parseInt(text), 9), 1)
                  : 1,
              }))
            }
            keyboardType="numeric"
            placeholder="Enter number of rows"
          />
        </View>
      </View>
      <View style={styles.settingEntry}>
        <Text style={styles.settingTitle}>Adjust sizes</Text>
        <TablePicker
          parkingLength={dimensions.length}
          parkingWidth={dimensions.width}
          tableData={tableData}
          setTableData={setTableData}
        />
      </View>
      <View style={styles.settingEntry}>
        <Text style={styles.settingTitle}>Adjust Entrances</Text>
        <EntrancePicker
          dimensions={dimensions}
          entranceCoords={entranceCoords}
          setEntranceCoords={setEntranceCoords}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={setParkingState}>
        <Text>Apply changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
