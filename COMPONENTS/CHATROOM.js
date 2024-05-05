import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function CHATROOM({ item }) {
  const navigation = useNavigation();

  console.log(item.messages[item.messages.length - 1]);

  function handleNavigateToMessageScreen() {
      navigation.navigate('MessageScreen', {
          currentGroupName: item.currentGroupName,
          currentGroupID: item.id,
      });
  }

  return (
      <Pressable style={styles.chat} onPress={handleNavigateToMessageScreen}>
          <View style={styles.circle}>
              <FontAwesome name='group' size={24} color={"black"} />
          </View>
          <View style={styles.rightContainer}>
              <View>
                  <Text style={styles.userName}>{item.currentGroupName}</Text>
                  <Text style={styles.message}>
                      {item.messages && item.messages.length > 0
                          ? item.messages[item.messages.length - 1].text
                          : "Tap to start messaging"}
                  </Text>
              </View>
              <View>
                  <Text style={styles.time}>
                      {item.messages && item.messages.length > 0
                          ? item.messages[item.messages.length - 1].time
                          : "time"}
                  </Text>
              </View>
          </View>
      </Pressable>
  );
}


const styles = StyleSheet.create({
    chat: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        padding: 10,
        backgroundColor: "white",
        height: 80,
        marginBottom: 10,
      },
      userName: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
      },
      message: {
        fontSize: 14,
        opacity: .8,
      },
      rightContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
      },
      time: {
        opacity: 0.6,
      },
      circle: {
        width: 50,
        borderRadius: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        marginRight: 10,
      },
})