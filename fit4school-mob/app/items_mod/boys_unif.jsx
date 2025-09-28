import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import { Text } from "../../components/globalText";
import { useRouter } from "expo-router";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function boys_unif(){
    return (
        <View style = {styles.container}>
            <TouchableOpacity>
                <Ionicons name = "arrow-back-outline" size={23} style ={{marginTop: '8%'}}></Ionicons>
            </TouchableOpacity>

            <View style = {styles.pic_cont}>
                <Image source={require("../../assets/images/b_unif_ex.png")} style = {styles.pic}/>
            </View>

            <View style = {styles.prc_cont}>
                <View>
                    <Text style = {styles.prc}>₱400.00</Text>
                    <Text style = {styles.item_desc}>Boy’s Uniform (Pre-school)</Text>
                </View>

                <View>
                    <TouchableOpacity style = {styles.ar_btn}>
                        <Image source = {require("../../assets/images/icons/ar_menu.png")} style = {styles.ar_pic} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignContent: 'center',
        padding: '8.5%',
        backgroundColor: '#FFFBFB',
    },

    pic_cont:{
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: '4%',
    },

    pic:{
        height: 320,
        width: 320,
    },

    prc:{
        color: '#61C35C',
        fontWeight: '600',
        fontSize: 28,
    },

    item_desc:{
        fontWeight: '400',
        fontSize: 18,
    },

    prc_cont:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    ar_btn:{
        height: 46,
        width: 52,
        backgroundColor: '#61C35C',
        borderRadius: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ar_pic:{
        height: 32,
        width: 32,
    }
})