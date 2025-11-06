import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, } from 'react-native'
import { Text } from "../../components/globalText";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";


export default function checkout() {

    const router = useRouter();

    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);


    const onChangeDate = (event, selectedDate) => {
        setShowDate(false);
        if (selectedDate) setDate(selectedDate);
    };

    const onChangeTime = (event, selectedTime) => {
        setShowTime(false);
        if (selectedTime) setDate(selectedTime);
    };

    const formatDate = date.toLocaleDateString();
    const formatTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });



    const [paymentMethod, setPaymentMethod] = useState("cash");


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


                <View style={styles.paymet_cont}>
                    <Text style={{ color: "#61C35C", fontSize: 14, fontWeight: "600", }}>
                        Payment Method
                    </Text>

                    <View>
                        <View style={styles.radio_cont}>
                            <Text style={{ color: "black", fontSize: 14, fontWeight: "400", }}>Cash</Text>
                            <RadioButton
                                value="cash"
                                status={paymentMethod === "cash" ? "checked" : "unchecked"}
                                onPress={() => setPaymentMethod("cash")}
                                style={styles.radiobtn}
                                color="#61C35C"
                                uncheckedColor='#B0B0B0'
                            />
                        </View>

                        <View style={styles.radio_cont}>
                            <Text style={{ color: "black", fontSize: 14, fontWeight: "400", }}>Bank Method</Text>
                            <RadioButton
                                value="cash"
                                status={paymentMethod === "bank" ? "checked" : "unchecked"}
                                onPress={() => setPaymentMethod("bank")}
                                style={styles.radiobtn}
                                color="#61C35C"
                                uncheckedColor='#B0B0B0'
                            />
                        </View>

                        <View style={styles.radio_cont}>
                            <Text style={{ color: "black", fontSize: 14, fontWeight: "400", }}>Online Method</Text>
                            <RadioButton
                                value="cash"
                                status={paymentMethod === "online" ? "checked" : "unchecked"}
                                onPress={() => setPaymentMethod("online")}
                                style={styles.radiobtn}
                                color="#61C35C"
                                uncheckedColor='#B0B0B0'
                            />
                        </View>


                        {paymentMethod === "online" && (
                            <View style={styles.hlink_cont}>
                                <TouchableOpacity onPress={() => router.push("/transact_mod/qr_payment")}>
                                    <Text style={styles.hlink_txt}>Click here to pay online</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>

                </View>

                
                {paymentMethod === "online" && (
                    <View style={styles.ss_cont}>
                        <Text style={styles.vw_txt}>View Image</Text>

                        <Text style={styles.ss_txt}>Screenshot Here</Text>
                    </View>
                )}


                <View style={styles.remind_cont}>
                    <Text style={{ color: "#1F72AD", fontSize: 14, fontWeight: "500", marginBottom: '2%' }}>
                        Reminders !
                    </Text>
                    <Text style={{ color: "#1F72AD", fontSize: 13, fontWeight: "400", textAlign: "justify" }}>
                        Tickets will automatically expire after 24 hours if left unpaid. Make sure you pay on time to avoid inconvenience.
                    </Text>

                </View>


                <View style={styles.dnt_cont}>
                    <Text style={{ color: "#61C35C", fontSize: 14, fontWeight: "600", }}>
                        Set Date & Time
                    </Text>

                    <TouchableOpacity onPress={() => setShowDate(true)}>
                        <Text style={{ color: "black", fontSize: 14, fontWeight: "400", }}>
                            {formatDate}
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => setShowTime(true)}>
                        <Text style={{ color: "black", fontSize: 14, fontWeight: "400", }}>
                            {formatTime}
                        </Text>
                    </TouchableOpacity>


                    {showDate && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={onChangeDate}
                        />
                    )}

                    {showTime && (
                        <DateTimePicker
                            value={date}
                            mode="time"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={onChangeTime}
                        />
                    )}

                </View>


                <View style={styles.remind_cont}>
                    <Text style={{ color: "#1F72AD", fontSize: 13, fontWeight: "400", textAlign: "justify" }}>
                        You can only update appointment once the uniforms are delivered to your school.
                    </Text>
                </View>


                <View style={styles.pobtncont}>
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity style={styles.plcordr_btn}>
                            <Text style={{ fontSize: 20, fontWeight: "600", color: 'white' }}>PLACE ORDER</Text>
                        </TouchableOpacity>
                    </View>
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

    paymet_cont: {
        flexDirection: "row",
        padding: 10,
        height: '20%',
        borderRadius: 10,
        backgroundColor: "#F4F4F4",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        justifyContent: "space-evenly",
        alignItems: 'center'
    },

    radio_cont: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
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
        justifyContent: "space-between",
        alignItems: 'center'
    },

    pobtncont: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        marginVertical: '9%',
    },

    radiobtn: {
        alignItems: 'flex-end'
    },

    plcordr_btn: {
        alignItems: "center",
        backgroundColor: "#61C35C",
        padding: "4%",
        width: "85%",
        borderRadius: 5,
        shadowColor: "black",
        elevation: 5,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        alignItems: "center",
        justifyContent: "center",
    },

    hlink_txt: {
        color: "#61C35C",
        textDecorationLine: "underline",
    },

    ss_cont: {
        flexDirection: "row",
        height: '7%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#F4F4F4",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
        justifyContent: "space-between",
        alignItems: 'center'
    },

    vw_txt: {
        color: "#61C35C", 
        fontSize: 14, 
        fontWeight: "600",
    },


    ss_txt: {
        textDecorationLine: "underline"
    }


});