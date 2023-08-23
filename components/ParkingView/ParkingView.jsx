import { View, Text } from "react-native";
import { viewStyles as styles } from "../../styles/viewStyles";
import { dataTableStyles as styles2 } from "../../styles/dataTableStyles";
import { DataTable } from "../index";

const ParkingView = ({ parkingLot, dimensions, parkingSlotList }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Parking Lot</Text>
      <View style={styles.sampleContainer}>
        <Text>Small</Text>
        <>
          <View style={[styles.sampleBox, styles2.cellSmall]}></View>
          <View style={[styles.sampleBox, styles2.cellSmallEmpty]}></View>
        </>
        <Text>Medium</Text>
        <>
          <View style={[styles.sampleBox, styles2.cellMedium]}></View>
          <View style={[styles.sampleBox, styles2.cellMediumEmpty]}></View>
        </>
        <Text>Large</Text>
        <>
          <View style={[styles.sampleBox, styles2.cellLarge]}></View>
          <View style={[styles.sampleBox, styles2.cellLargeEmpty]}></View>
        </>
      </View>
      <DataTable
        parkingLot={parkingLot}
        dimensions={dimensions}
        parkingSlotList={parkingSlotList}
      />
    </View>
  );
};

export default ParkingView;
