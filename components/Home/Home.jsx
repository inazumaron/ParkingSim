import { View, Image, Text } from "react-native";
import { default as TimeControls } from "./TimeControls/TimeControls";
import { default as VehicleActions } from "./VehicleActions/VehicleActions";
import { homeStyles as styles } from "../../styles/homeStyles";

const HomePage = ({ props }) => {
  const [
    parkingData,
    currDate,
    setCurrDate,
    returningCars,
    setReturningCars,
    addCar,
    removeCar,
    entranceCoordList,
  ] = props;
  return (
    <>
      <View style={styles.logo}>
        <Image source={require("../../assets/logo.png")} />
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statEntry}>Parking status:</Text>
        <Text style={styles.statEntry}>
          S {parkingData.takenSmall}/{parkingData.totalSmall}
        </Text>
        <Text style={styles.statEntry}>
          M {parkingData.takenMedium}/{parkingData.totalMedium}
        </Text>
        <Text style={styles.statEntry}>
          L {parkingData.takenLarge}/{parkingData.totalLarge}
        </Text>
      </View>
      <TimeControls
        currDate={currDate}
        setCurrDate={setCurrDate}
        returningCars={returningCars}
        setReturningCars={setReturningCars}
      />
      <VehicleActions
        currTime={currDate}
        addCar={addCar}
        removeCar={removeCar}
        entranceCoordList={entranceCoordList}
      />
    </>
  );
};

export default HomePage;
