import { View, Image, TouchableOpacity } from "react-native";
import { tabStyles as styles } from "../../styles/tabsStyles";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={activeTab == 0 ? styles.btnActive : styles.btn}
        onPress={() => setActiveTab(0)}
      >
        <Image style={styles.img} source={require("../../assets/home.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={activeTab == 1 ? styles.btnActive : styles.btn}
        onPress={() => setActiveTab(1)}
      >
        <Image style={styles.img} source={require("../../assets/map.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={activeTab == 2 ? styles.btnActive : styles.btn}
        onPress={() => setActiveTab(2)}
      >
        <Image style={styles.img} source={require("../../assets/file.png")} />
      </TouchableOpacity>
      <TouchableOpacity
        style={activeTab == 3 ? styles.btnActive : styles.btn}
        onPress={() => setActiveTab(3)}
      >
        <Image
          style={styles.img}
          source={require("../../assets/settings.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Tabs;
