import React from "react";
import { View, Text } from "react-native";
import { dataTableStyles as styles } from "../../../styles/dataTableStyles";

const DataTable = ({ parkingLot, dimensions, parkingSlotList }) => {
  const rows = [];
  console.log("psl ", JSON.stringify(parkingSlotList));

  for (let row = 0; row < dimensions.length; row++) {
    const cells = [];
    for (let cell = 0; cell < dimensions.width; cell++) {
      const key = `,${cell},${row}`;
      if (
        parkingSlotList["S"].some(
          (pair) => JSON.stringify(pair) == JSON.stringify([cell, row])
        )
      ) {
        if (parkingLot["S" + key])
          cells.push(
            <View key={cell} style={[styles.cell, styles.cellSmall]}>
              <Text style={styles.cellText}>{parkingLot["S" + key]}</Text>
            </View>
          );
        else
          cells.push(
            <View key={cell} style={[styles.cell, styles.cellSmallEmpty]}>
              <Text style={styles.cellText}>Empty</Text>
            </View>
          );
      } else if (
        parkingSlotList["M"].some(
          (pair) => JSON.stringify(pair) == JSON.stringify([cell, row])
        )
      ) {
        if (parkingLot["M" + key])
          cells.push(
            <View key={cell} style={[styles.cell, styles.cellMedium]}>
              <Text style={styles.cellText}>{parkingLot["M" + key]}</Text>
            </View>
          );
        else
          cells.push(
            <View key={cell} style={[styles.cell, styles.cellMediumEmpty]}>
              <Text style={styles.cellText}>Empty</Text>
            </View>
          );
      } else if (
        parkingSlotList["L"].some(
          (pair) => JSON.stringify(pair) == JSON.stringify([cell, row])
        )
      ) {
        if (parkingLot["L" + key])
          cells.push(
            <View key={cell} style={[styles.cell, styles.cellLarge]}>
              <Text style={styles.cellText}>{parkingLot["L" + key]}</Text>
            </View>
          );
        else
          cells.push(
            <View key={cell} style={[styles.cell, styles.cellLargeEmpty]}>
              <Text style={styles.cellText}>Empty</Text>
            </View>
          );
      }
    }
    rows.push(
      <View key={row} style={row % 2 ? styles.oddRow : styles.row}>
        {cells}
      </View>
    );
  }

  return <View>{rows}</View>;
};

export default DataTable;
