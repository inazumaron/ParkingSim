import { StyleSheet } from "react-native";

export const settingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "5vh",
    fontWeight: "600",
    marginTop: 20,
  },
  settingEntry: {
    marginTop: "40px",
    paddingTop: "20px",
    borderTopWidth: 2,
    borderColor: "#000",
    width: "800px",
    margin: "auto",
  },
  settingTitle: {
    fontSize: "3vh",
    marginBottom: "20px",
    margin: "auto",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  input: {
    borderWidth: 1,
    padding: "4px",
  },
  btn: {
    borderWidth: 1,
    padding: "4px",
    marginTop: "20px",
    margin: "auto",
    width: "120px",
  },
});
