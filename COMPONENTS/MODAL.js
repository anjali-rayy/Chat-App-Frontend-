import React, { useContext } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Keyboard } from "react-native";
import { GlobalContext } from "../context";
import { socket } from "../utils";


/* Functional component for the New Group Modal */
const NewGroupModal = () => {
  /* Destructuring state variables and functions from GlobalContext */
    const {
      modalVisible,
      setModalVisible,
      currentGroupName,
      setCurrentGroupName,
    } = useContext(GlobalContext);
  
    /* Function to handle creating a new group */
    function handleCreateNewRoom() {
      console.log(currentGroupName);  // Logging the current group name 
      socket.emit("createNewGroup", currentGroupName); // Emitting socket event to create a new group 

      setModalVisible(false);   // Closing the modal 
      setCurrentGroupName("");   // Clearing the current group name 
      Keyboard.dismiss();     // Dismissing the keyboard 
    }
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              autoCorrect={false}
              placeholder="Enter group name"
              style={styles.loginInput}
              onChangeText={(value) => setCurrentGroupName(value)}
              value={currentGroupName}
            />
            <View style={styles.buttonWrapper}>
              <Pressable onPress={handleCreateNewRoom} style={styles.button}>
                <View>
                  <Text style={styles.buttonText}>Add</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.button}
              >
                <View>
                  <Text style={styles.buttonText}>Cancel</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  

  /* Styles for the component */
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    loginInput: {
      borderRadius: 50,
      borderWidth: 1,
      padding: 8,
    },
    button: {
      backgroundColor: "skyblue",
      padding: 15,
      marginVertical: 10,
      elevation: 1,
      borderRadius: 50,
    },
    buttonWrapper: {
      flexDirection: "row",
      gap: 10,
    },
    buttonText: {
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: 15,
    },
  });
  
  export default NewGroupModal;