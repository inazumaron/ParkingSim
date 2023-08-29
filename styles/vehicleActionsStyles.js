import { StyleSheet } from "react-native";

export const vehicleStyles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  inputBox: {
    borderColor: "#000",
    borderWidth: 2,
    margin: "auto",
    padding: 4,
    marginBottom: 10,
    width: "100%",
    maxWidth: "300px",
  },
  btnContainer: {
    margin: "auto",
    flex: 1,
    justifyContent: "space-evenly",
    width: "300px",
    marginVertical: 5,
  },
  btn: {
    padding: 8,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
