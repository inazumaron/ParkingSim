import { StyleSheet } from "react-native";

export const tabStyles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    maxWidth: "800px",
    margin: "auto",
    justifyContent: "space-between",
  },
  btn: {
    justifyContent: "center",
    padding: "auto",
    paddingVertical: "20px",
    width: "25%",
  },
  btnActive: {
    justifyContent: "center",
    padding: "auto",
    paddingVertical: "20px",
    backgroundColor: "#aaa",
    shadowRadius: 8,
    width: "25%",
  },
  img: {
    height: "60px",
    width: "60px",
    resizeMode: "contain",
    margin: "auto",
  },
});
