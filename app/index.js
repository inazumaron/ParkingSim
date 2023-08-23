import { SafeAreaView, ScrollView } from "react-native";
import { HomePage, HomeTabs, Logs, ParkingView, Settings } from "../components";
import { Stack } from "expo-router";
import { useState } from "react";
import { default as alert } from "../scripts/alert";

const Home = () => {
  const simplifyDate = (date) =>
    date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  const [activeTab, setActiveTab] = useState(0); // 0 - home, 1-view, 2-logs, 3-settings
  const [currDate, setCurrDate] = useState(new Date());
  const [parkingData, setParkingData] = useState({
    totalSmall: 9,
    takenSmall: 0,
    totalMedium: 0,
    takenMedium: 0,
    totalLarge: 0,
    takenLarge: 0,
  });
  // parkingSLotList contains coords to know which slots are what size
  const [parkingSlotList, setParkingSlotList] = useState({
    S: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    M: [],
    L: [],
  });
  const [logs, setLogs] = useState([
    `Program started at ${simplifyDate(currDate)}`,
  ]);
  const [entranceCoordList, setEntranceCoordList] = useState(["0,0"]);
  // parkedCar {
  //   id: varChar,
  //   size: 'L' | 'M' | 'S',
  //   time: DateTime,
  //   exitTime: DateTime, (to be added/modified when in returningCars, keeps track of time left)
  //   entrance: char
  //   parkCode: Vector2 (to be assigned here)
  //   paid: number (for returning cars, set time to before, but final fee will be reduced by number on exit)
  // }
  const [parkedCars, setParkedCars] = useState([]);
  const [returningCars, setReturningCars] = useState([]); // stores parkedCars that left within 1 hour, will be removed after 1 hour
  const [dimensions, setDimensions] = useState({
    length: 3,
    width: 3,
  });
  //parkingLot {
  //  coord (key): (size,int,int) (every size has different dimensions)
  //  value: parkedCarId
  //}
  //Will contain parking spot coordinates for taken spots
  const [parkingLot, setParkingLot] = useState({});

  const getEntranceCoord = (entrance) => {
    const res = entrance.split(",").map(Number);
    return res;
  };

  const getNearestSlot = (entrance, size) => {
    //there is assumed to be available space in the zones
    //add entry to slot
    switch (size) {
      case "S":
        setParkingData((prevData) => ({
          ...prevData,
          takenSmall: prevData.takenSmall + 1,
        }));
        break;
      case "M":
        setParkingData((prevData) => ({
          ...prevData,
          takenMedium: prevData.takenMedium + 1,
        }));
        break;
      case "L":
        setParkingData((prevData) => ({
          ...prevData,
          takenLarge: prevData.takenLarge + 1,
        }));
        break;
    }

    const entranceCoord = getEntranceCoord(entrance);
    const validList =
      size == "S"
        ? parkingSlotList.S
        : size == "M"
        ? parkingSlotList.M
        : parkingSlotList.L;
    const length = dimensions.length;
    const width = dimensions.width;
    const dirList = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    let distance = 0;
    while (true) {
      if (distance) {
        for (const dir of dirList) {
          const tempCoord = [
            entranceCoord[0] + dir[0] * distance,
            entranceCoord[1] + dir[1] * distance,
          ];
          if (
            tempCoord[0] > -1 &&
            tempCoord[0] < width &&
            tempCoord[1] > -1 &&
            tempCoord[1] < length
          ) {
            const key = `${size},${tempCoord.join(",")}`;
            if (
              !(key in parkingLot) &&
              validList.some(
                (pair) => JSON.stringify(pair) == JSON.stringify(tempCoord)
              )
            )
              return key;
          }
        }
      } else {
        const key = `${size},${entranceCoord.join(",")}`;
        if (
          !(key in parkingLot) &&
          validList.some(
            (pair) => JSON.stringify(pair) == JSON.stringify(entranceCoord)
          )
        ) {
          return key;
        }
      }
      distance++;
      if (distance > Math.max(width, length)) return -1;
    }
  };

  const getParkSlot = (entrance, size) => {
    switch (size) {
      case "S":
        if (parkingData.takenSmall < parkingData.totalSmall)
          return getNearestSlot(entrance, "S");
        if (parkingData.takenMedium < parkingData.totalMedium)
          return getNearestSlot(entrance, "M");
        if (parkingData.takenLarge < parkingData.totalLarge)
          return getNearestSlot(entrance, "L");
      case "M":
        if (parkingData.takenMedium < parkingData.totalMedium)
          return getNearestSlot(entrance, "M");
        if (parkingData.takenLarge < parkingData.totalLarge)
          return getNearestSlot(entrance, "L");
      case "L":
        if (parkingData.takenLarge < parkingData.totalLarge)
          return getNearestSlot(entrance, "L");
    }
    return -1; //no available space
  };

  const addCar = (carData) => {
    let returningTrue = false;
    //check if car already exist
    const alreadyParked = parkedCars.some(
      (parkedCar) => parkedCar.id === carData.id
    );

    if (alreadyParked) {
      alert("Error", "Car already exist", [{ text: "OK" }]);
      return -1;
    }

    //if returning car, just set time to before
    const returningCar = returningCars.find(
      (returning) => returning.id === carData.id
    );

    if (returningCar) {
      carData.time = returningCar.time;
      returningTrue = false;
    }

    //get available space from 2d grid and a start point (entrance)
    carData.parkCode = getParkSlot(carData.entrance, carData.size);
    if (carData.parkCode == -1) {
      alert("Sorry", "Parking lot is full", [{ text: "OK" }]);
      setLogs((prevData) => [
        ...prevData,
        `Car ${carData.id} attempted to park but parking is full`,
      ]);
      return -1;
    }

    setParkingLot((prevData) => ({
      ...prevData,
      [carData.parkCode]: carData.id,
    }));

    setParkedCars((prevData) => [...prevData, carData]);

    alert("Success", "Car sent to " + carData.parkCode, [{ text: "OK" }]);

    if (!returningTrue)
      setLogs((prevData) => [
        ...prevData,
        `Car ${carData.id} parked at ${carData.parkCode} on ${simplifyDate(
          carData.time
        )}`,
      ]);
    else
      setLogs((prevData) => [
        ...prevData,
        `Returning car ${carData.id} parked at ${
          carData.parkCode
        } on ${simplifyDate(currDate)}`,
      ]);

    return -1;
  };

  const removeCar = (carId) => {
    //check if car exist in list
    const carExist = parkedCars.some((parkedCar) => parkedCar.id === carId);

    if (!carExist) return "Car isnt parked";

    const carData = parkedCars.find((car) => car.id == carId);

    //removing from parking data
    switch (carData.parkCode[0]) {
      case "S":
        setParkingData((prevData) => ({
          ...prevData,
          takenSmall: prevData.takenSmall - 1,
        }));
        break;
      case "M":
        setParkingData((prevData) => ({
          ...prevData,
          takenMedium: prevData.takenMedium - 1,
        }));
        break;
      case "L":
        setParkingData((prevData) => ({
          ...prevData,
          takenLarge: prevData.takenLarge - 1,
        }));
        break;
    }

    //free up slot in parking lot
    setParkingLot((prevData) => {
      const newData = { ...prevData };
      delete newData[carData.parkCode];
      return newData;
    });

    //remove from parked cars list
    setParkedCars((prevData) =>
      prevData.filter((car) => car.id !== carData.id)
    );

    //compute fee to pay
    const hours = calculateHoursElapsed(carData.time, currDate);
    const fee = computeFee(hours, carData.parkCode[0]) - carData.paid; //if returning, remove the fee already paid before
    carData.paid = fee;
    carData.exitTime = currDate;

    //add to returning cars list (in case it returns within an hour)
    setReturningCars((prevData) => [...prevData, carData]);

    setLogs((prevData) => [
      ...prevData,
      `Car ${carData.id} left, paying a fee of ${fee} on ${simplifyDate(
        currDate
      )}`,
    ]);

    alert("Exit fee", `Car ${carData.id} paid ${fee}`, [{ text: "OK" }]);

    return -1;
  };

  const calculateHoursElapsed = (startDate, endDate) => {
    const diffInMilliseconds = Math.abs(endDate - startDate);
    const hours = Math.ceil(diffInMilliseconds / (1000 * 60 * 60));
    return hours;
  };

  const computeFee = (hours, size) => {
    const sizeCost = size == "S" ? 20 : size == "M" ? 60 : 100;
    if (!hours) return 0;
    if (hours < 24) return 40 + Math.max(0, hours - 3) * sizeCost;
    return Math.floor(hours / 24) * 5000 + (hours % 24) * sizeCost;
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerShown: true,
          header: (props) => (
            <HomeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          ),
        }}
      />
      <ScrollView style={{ padding: 8 }}>
        {activeTab == 0 ? (
          <HomePage
            props={[
              parkingData,
              currDate,
              setCurrDate,
              returningCars,
              setReturningCars,
              addCar,
              removeCar,
              entranceCoordList,
            ]}
          />
        ) : activeTab == 1 ? (
          <ParkingView
            parkingLot={parkingLot}
            dimensions={dimensions}
            parkingSlotList={parkingSlotList}
          />
        ) : activeTab == 2 ? (
          <Logs logList={logs} />
        ) : (
          <Settings
            dimensions={dimensions}
            setDimensions={setDimensions}
            setParkingSlotList={setParkingSlotList}
            setParkingData={setParkingData}
            setActiveTab={setActiveTab}
            setParkedCars={setParkedCars}
            setReturningCars={setReturningCars}
            setParkingLot={setParkingLot}
            setEntranceCoordList={setEntranceCoordList}
            setLogs={setLogs}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
