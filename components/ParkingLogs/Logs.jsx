import { View, Text, FlatList } from "react-native";
import { logStyles as styles } from "../../styles/logsStyles";

const ReverseList = ({ data }) => {
  const reversedData = data.slice().reverse();

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <FlatList
      data={reversedData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const Logs = ({ logList }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logs</Text>
      <ReverseList data={logList} />
    </View>
  );
};

export default Logs;
