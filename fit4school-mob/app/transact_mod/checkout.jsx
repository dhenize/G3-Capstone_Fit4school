import { View, StyleSheet, TouchableOpacity, Image, } from 'react-native'
import { Text } from "../../components/globalText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";
import React from 'react';

export default function checkout() {

    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFBFB" }}>

            <Stack.Screen
                options={{
                animation: "slide_from_right",
                headerShown: false,
                }}
            />

            {/* Title Box */}
            <View style={styles.titlebox}>
                <TouchableOpacity onPress={() => router.push("/dash_mod/transact")}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={26}
                        color="black"
                        style={{ marginHorizontal: "2%" }}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Order Summary</Text>
            </View>

            
            {/* MAIN CONTAINER */}
            <View style={styles.container}>

                <View style={styles.notif}>

                    <Image
                        source={require("../../assets/images/b_unif_ex.png")}
                        style={styles.notif_img}
                    />

                    <View style={styles.notif_content}>

                        <View style={styles.rowBetween}>
                            <View>
                                <Text style={styles.itemTitle}>
                                    Boy’s Uniform (Pre-school)
                                </Text>
                                <Text style={styles.itemSubtitle}>size 8</Text>
                            </View>
                        </View>

                        <View style={[styles.rowBetween, { marginTop: 6 }]}>
                            <Text style={styles.itemQuantity}>Quantity 2</Text>
                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={styles.itemPrice}>₱800.00</Text>
                            </View>
                        </View>

                    </View>
                </View>


                <View style = {styles.paymet_cont}>
                    <Text style = {{color: "#61C35C", fontSize: 15, fontWeight: "600",}}>
                        Payment Method
                    </Text>

                    <View>
                        <Text style = {{color: "black", fontSize: 14, fontWeight: "400",}}>Cash</Text>
                        <Text style = {{color: "black", fontSize: 14, fontWeight: "400",}}>Bank Method</Text>
                        <Text style = {{color: "black", fontSize: 14, fontWeight: "400",}}>Online Method</Text>
                    </View>
                </View>


                <View style = {styles.remind_cont}>
                    <Text style = {{color: "#1F72AD", fontSize: 14, fontWeight: "500", marginBottom: '2%'}}>
                        Reminders !
                    </Text>
                    <Text style = {{color: "#1F72AD", fontSize: 13, fontWeight: "400", textAlign: "justify"}}>
                        Tickets will automatically expire after 24 hours if left unpaid. Make sure you pay on time to avoid inconvenience.
                    </Text>

                </View>


                <View style = {styles.app_cont}>
                    <Text style = {{color: "#61C35C", fontSize: 15, fontWeight: "600",}}>
                        Appointment
                    </Text>

                    <View>
                        <Text style = {{color: "black", fontSize: 14, fontWeight: "400",}}>Let me decide</Text>
                        <Text style = {{color: "black", fontSize: 14, fontWeight: "400",}}>System/Admin</Text>
                    </View>
                </View>


                <View style = {styles.dnt_cont}>
                    <Text style = {{color: "#61C35C", fontSize: 15, fontWeight: "600",}}>
                        Set Date & Time
                    </Text>

                    <Text style = {{color: "black", fontSize: 13, fontWeight: "400",}}>
                        MM/DD/YYYY
                    </Text>

                    <Text style = {{color: "black", fontSize: 13, fontWeight: "400",}}>
                        HH:MM am/pm
                    </Text>
                </View>


                <View style = {styles.remind_cont}>
                    <Text style = {{color: "#1F72AD", fontSize: 13, fontWeight: "400", textAlign: "justify"}}>
                        You can only update appointment once the uniforms are delivered to your school.
                    </Text>
                </View>
                

                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity style = {styles.plcordr_btn}>
                        <Text style={{ fontSize: 20, fontWeight: "600", color: 'white' }}>PLACE ORDER</Text>
                    </TouchableOpacity>
                </View>
                

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    //TITLE CONTAINER
    titlebox: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        padding: "6%",
        top: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    title: {
        fontWeight: "500",
        fontSize: 24,
        justifyContent: "center",
    },

    //OVERALL CONTAINER
    container: {
        padding: "7%",
        flex: 1,
        backgroundColor: "#FFFBFB",
        rowGap: '2%'
    },

    notif: {
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F4F4F4",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        alignItems: "center",
    },

    notif_img: {
        height: 80,
        width: 70,
        resizeMode: "contain",
        marginRight: 10,
        alignSelf: 'flex-start',
        borderRadius: 5,
    },

    notif_content: {
        flex: 1,
        justifyContent: "space-between",
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    itemTitle: {
        color: "#1F72AD",
        fontSize: 14,
        fontWeight: "600",
    },

    itemSubtitle: {
        color: "#1F72AD",
        fontSize: 12,
        fontWeight: "400",
    },

    itemQuantity: {
        color: "#1F72AD",
        fontSize: 15,
        fontWeight: "600",
    },

    remarktxt: {
        color: "#1F72AD",
        fontSize: 11,
        fontWeight: "400",
    },

    itemPrice: {
        color: "#1F72AD",
        fontSize: 15,
        fontWeight: "600",
    },

    paymet_cont:{
        flexDirection: "row",
        padding: 10,
        height: '13%',
        borderRadius: 10,
        backgroundColor: "#F4F4F4",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        justifyContent: "space-evenly",
        alignItems: 'center'
    },

    remind_cont: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#F4F4F4",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    app_cont: {
        flexDirection: "row",
        height: '12%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F4F4F4",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        justifyContent: "space-evenly",
        alignItems: 'center'
    },

    dnt_cont: {
        flexDirection: "row",
        height: '7%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F4F4F4",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        justifyContent: "space-evenly",
        alignItems: 'center'
    },

    plcordr_btn: {
        alignItems: "center",
        backgroundColor: "#61C35C",
        padding: "4%",
        width: "100%",
        borderRadius: 5,
        shadowColor: "black",
        elevation: 5,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        alignItems: "center",
        justifyContent: "center",
        marginVertical: '9%'
    }
});