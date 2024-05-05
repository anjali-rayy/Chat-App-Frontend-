import { useContext, useEffect } from "react";
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalContext } from "../context";
import MESSAGEROOM from "../COMPONENTS/MESSAGEROOM";
import { socket } from "../utils/index";


export default function MessageScreen({ navigation, route }) {
    /* Extracting parameters from the route */
    const { currentGroupName, currentGroupID } = route.params;
    /* Getting necessary data from global context */
    const { allChatMessages, setAllChatMessages, currentUser, currentChatMessage, setCurrentChatMessage } = useContext(GlobalContext);


    /* Function to handle sending a new message */
    function handleAddNewMessage() {
        /* Creating time data for the message */
        const timeData = {
            hr:
                new Date().getHours() < 10
                    ? `0${new Date().getHours()}`
                    : new Date().getHours(),
            mins:
                new Date().getMinutes() < 10
                    ? `0${new Date().getMinutes()}`
                    : new Date().getMinutes(),
        };

        /* Check if currentUser exists before sending the message */
        if (currentUser) {
            /* Emitting the new chat message to the server */
            socket.emit("newChatMessage", {
                currentChatMessage,
                groupIdentifier: currentGroupID,
                currentUser,
                timeData,
            });

            /* Clearing the current chat message and dismissing the keyboard */
            setCurrentChatMessage("");
            Keyboard.dismiss();
        }
    }

    /* Effect to fetch all chat messages for the current group */
    useEffect(() => {
        socket.emit('findGroup', currentGroupID)
        socket.on('foundGroup', (allChats) => setAllChatMessages(allChats))
    }, [socket])


    return (
        <View style={styles.wrapper}>
            <View style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}>
                {allChatMessages && allChatMessages[0] ? (
                    <FlatList
                        data={allChatMessages}
                        renderItem={({ item }) => (
                            <MESSAGEROOM item={item} currentUser={currentUser} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                ) : (null)}

            </View>
            <View style={styles.messageInputContainer}>
                <TextInput
                    style={styles.messageInput}
                    value={currentChatMessage}
                    onChangeText={(value) => setCurrentChatMessage(value)}
                    placeholder="Enter your message"
                />
                <Pressable onPress={handleAddNewMessage} style={styles.button}>
                    <View>
                        <Text style={styles.buttonText}>Send</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#eee",
    },
    messageInputContainer: {
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: "center",
        flexDirection: "row",
    },
    messageInput: {
        borderWidth: 1,
        padding: 15,
        flex: 1,
        borderRadius: 50,
        marginRight: 10,
    },
    button: {
        width: "30%",
        backgroundColor: "skyblue",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    }

})