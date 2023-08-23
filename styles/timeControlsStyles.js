import { StyleSheet } from "react-native";

export const timeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dateTimeText: {
    fontSize: 20,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
  },
  button: {
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    padding: 4,
  },
});
