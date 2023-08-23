import { View, Text, TouchableOpacity } from "react-native";
import { timeStyles as styles } from "../../../styles/timeControlsStyles";

const TimeControls = ({
  currDate,
  setCurrDate,
  returningCars,
  setReturningCars,
}) => {
  const handleAddMinute = () => {
    const newDate = new Date(currDate);
    newDate.setMinutes(newDate.getMinutes() + 1);
    setCurrDate(newDate);
    //check list and remove those that exceed
    const updatedReturningCars = returningCars.filter((car) => {
      const timeDifference = newDate - car.exitTime;
      const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert to hours
      return hoursDifference < 1; // Keep cars that returned within 1 hour
    });

    setReturningCars(updatedReturningCars);
  };

  const handleAddHour = () => {
    const newDate = new Date(currDate);
    newDate.setHours(newDate.getHours() + 1);
    setCurrDate(newDate);
    //remove all since at least 1 hour has passed
    setReturningCars([]);
  };

  const handleAddDay = () => {
    const newDate = new Date(currDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrDate(newDate);
    setReturningCars([]);
  };

  const formattedDate = currDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.dateTimeText}>{formattedDate}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddMinute}>
          <Text>+1 Minute</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddHour}>
          <Text>+1 Hour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddDay}>
          <Text>+1 Day</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimeControls;
