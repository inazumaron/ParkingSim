import { StyleSheet } from "react-native";

export const viewStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "5vh",
    marginVertical: 20,
    fontWeight: "600",
  },
  sampleContainer: {
    flex: 1,
    flexDirection: "row",
    margin: "auto",
    marginBottom: 40,
    columnGap: 4,
    alignItems: "center",
  },
  sampleBox: {
    borderWidth: 1,
    height: 10,
    width: 10,
  },
});
