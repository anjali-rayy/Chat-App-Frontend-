import { Alert, ImageBackground, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import homeImage from "../assets/Homeimage.png";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";

export default function HomeScreen({ navigation }) {
    /* Context variables */
    const { showLoginView, setShowLoginView, currentUserName, setCurrentUserName, currentUser, setCurrentUser, allUsers, setAllUsers } = useContext(GlobalContext);

    /* Function to handle user registration and sign-in */
    function handleRegisterAndSignIn(isLogin) {
        /* Check if user name is provided */
        if (currentUserName.trim() !== "") {

            /* Check if user name exists in the list of all users */
            const index = allUsers.findIndex(
                (userItem) => userItem === currentUserName
            );

            /* If it's a login attempt */
            if (isLogin) {

                /* Check if user exists*/
                if (index === -1) {
                    /* If user doesn't exist, display alert */
                    Alert.alert("Please register first");
                } else {
                    /* If user exists, set current user */
                    setCurrentUser(currentUserName);
                }
            } else {  /* If it's a registration attempt */

            /* Check if user exists */
                if (index === -1) {
                    /* If user doesn't exist, add to the list of all users and set current user */
                    allUsers.push(currentUserName);
                    setAllUsers(allUsers);
                    setCurrentUser(currentUserName);
                } else {
                    /* If user already exists, display alert */
                    Alert.alert("Already registered ! Please login");
                }
            }
            /* Clear current user name and dismiss keyboard */
            setCurrentUserName("");
            Keyboard.dismiss();
        } else {
            /* If user name is empty, display alert */
            Alert.alert("Field is Empty");
        }

    }

    /* Redirect to ChatScreen if user is logged in */
    useEffect(() => {
        if (currentUser.trim() !== "") navigation.navigate("ChatScreen");
    }, [currentUser]);

    console.log(allUsers, currentUser);

    /* Render component */
    return (
        <View style={styles.mainWrapper}>
            <ImageBackground source={homeImage} style={styles.homeImage} />
            <View style={styles.content}>
                {showLoginView ? (
                    <View style={styles.infoBlock}>
                        <View style={styles.loginInputContainer}>
                            <Text style={styles.heading}>Enter User Name</Text>
                            <TextInput
                                autoCorrect={false}
                                placeholder="Enter user name"
                                style={styles.loginInput}
                                onChangeText={(value) => setCurrentUserName(value)}
                                value={currentUserName}
                            />

                        </View>
                        <View style={styles.buttonWrapper}>
                            <Pressable onPress={() => handleRegisterAndSignIn(false)} style={styles.button} >
                                <View>
                                    <Text style={styles.buttonText}>Register</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => handleRegisterAndSignIn(true)} style={styles.button}>
                                <View>
                                    <Text style={styles.buttonText}>Login</Text>
                                </View>
                            </Pressable>

                        </View>

                    </View>
                ) : (
                    <View style={styles.infoBlock}>
                        <Text style={styles.heading}>Connect, Grow & Inspire</Text>
                        <Text style={styles.subHeading}>Connect people around the world for free</Text>
                        <Pressable style={styles.button} onPress={() => setShowLoginView(true)}>
                            <View>
                                <Text style={styles.buttonText}>Let's Started</Text>
                            </View>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
    },
    homeImage: {
        width: "100%",
        flex: 3,
        justifyContent: "center",
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundColor: "white",
    },
    infoBlock: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "black",
        marginBottom: 10,
    },
    subHeading: {
        fontSize: 15,
        color: "#acacac",
        marginBottom: 15,
    },
    loginInput: {
        borderRadius: 60,
        borderWidth: 1,
        padding: 8,
    },
    button: {
        backgroundColor: "skyblue",
        padding: 15,
        marginVertical: 10,
        width: "35%",
        elevation: 1,
        borderRadius: 60,
    },
    buttonWrapper: {
        flexDirection: "row",
        gap: 10,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
})