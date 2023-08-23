import { StyleSheet } from "react-native";

export const dataTableStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    columnGap: 4,
  },
  oddRow: {
    flexDirection: "row",
    columnGap: 4,
    marginBottom: 20,
  },
  cell: {
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
    minWidth: 80,
    padding: 8,
  },
  cellText: {
    fontSize: 16,
  },
  cellSmall: {
    backgroundColor: "#f05b5b",
  },
  cellMedium: {
    backgroundColor: "#f0a55b",
  },
  cellLarge: {
    backgroundColor: "#5bb7f0",
  },
  cellSmallEmpty: {
    backgroundColor: "#f29494",
  },
  cellMediumEmpty: {
    backgroundColor: "#f0bf90",
  },
  cellLargeEmpty: {
    backgroundColor: "#9dceed",
  },
});
