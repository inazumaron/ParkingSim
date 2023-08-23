import React, { useEffect } from "react";
import { View, Picker } from "react-native";

const TablePicker = ({
  parkingLength,
  parkingWidth,
  tableData,
  setTableData,
}) => {
  useEffect(() => {
    generateTable(parkingLength, parkingWidth);
  }, [parkingLength, parkingWidth]);

  const generateTable = (length, width) => {
    const newTableData = Array.from({ length }, () => Array(width).fill("S"));
    setTableData(newTableData);
  };

  return (
    <View>
      {tableData.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row" }}>
          {row.map((cell, cellIndex) => (
            <Picker
              key={cellIndex}
              selectedValue={cell}
              onValueChange={(itemValue) => {
                const updatedTableData = [...tableData];
                updatedTableData[rowIndex][cellIndex] = itemValue;
                setTableData(updatedTableData);
              }}
            >
              <Picker.Item label="Small" value="S" />
              <Picker.Item label="Medium" value="M" />
              <Picker.Item label="Large" value="L" />
            </Picker>
          ))}
        </View>
      ))}
    </View>
  );
};

export default TablePicker;
