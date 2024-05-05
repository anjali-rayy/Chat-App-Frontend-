import { useContext, useEffect } from "react";
import { FlatList, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../context";
import { AntDesign } from "@expo/vector-icons";
import CHATROOM from "../COMPONENTS/CHATROOM";
import NewGroupModal from "../COMPONENTS/MODAL";
import { socket } from "../utils";


export default function ChatScreen({ navigation }) {
    /* Destructure necessary variables and functions from the global context */
    const { currentUser, allChatRooms, setAllChatRooms, modalVisible, setModalVisible, setCurrentUser, setShowLoginView } = useContext(GlobalContext);
  
    /* Fetch all chat rooms when component mounts */
    useEffect(() => {
        socket.emit("getAllGroups");

        socket.on("groupList", (groups) => {
            console.log(groups, 'hhhhhhhhhhhhhhhhhhhhhhh');
            /* Update the state with the fetched chat rooms */
            setAllChatRooms(groups);
        });
    }, [socket]);

    /* Function to handle user logout */
    function handleLogout() {
        setCurrentUser("");
        setShowLoginView(false)
    }

    /* Redirect to the Home screen if the currentUser is empty */
    useEffect(() => {
        if (currentUser.trim() === "") navigation.navigate("HomeScreen");
    }, [currentUser]);

    return (
        <View style={styles.mainWrapper}>
            <View style={styles.topContainer}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Welcome {currentUser} !  </Text>
                    <Pressable onPress={handleLogout}>
                        <AntDesign name="logout" size={30} color={"red"} />
                    </Pressable>
                </View>
            </View>
            <View style={styles.listContainer}>
                {allChatRooms && allChatRooms.length > 0 ? (
                    <FlatList
                    data={allChatRooms}
                    renderItem={({ item }) => <CHATROOM item={item} />}
                    keyExtractor={(item) => item.id.toString()}     /*Ensure id is converted to string */
                />
                
                ) : null}
            </View>
            <View style={styles.bottomContainer}>
                <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>Create New Group</Text>
                    </View>
                </Pressable>
                <StatusBar hidden={true} />
            </View>
            {modalVisible && <NewGroupModal />}
        </View>
    );
}

const styles = StyleSheet.create({
    mainWrapper: {
        backgroundColor: "#cfe3da",
        flex: 1,
    },
    topContainer: {
        backgroundColor: "white",
        height: 70,
        width: "100%",
        padding: 20,
        justifyContent: "center",
        marginBottom: 15,
        flex: 0.3,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    listContainer: {
        flex: 3.4,
        paddingHorizontal: 10,
    },
    bottomContainer: {
        padding: 10,
    },
    button: {
        backgroundColor: "skyblue",
        padding: 12,
        width: "100%",
        elevation: 1,
        borderRadius: 60,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },

})