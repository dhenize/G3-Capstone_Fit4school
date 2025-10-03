//../../items_mod/boys_unif

import React, { useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView
} from "react-native";
import { Text } from "../../components/globalText";
import { useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-reanimated-carousel";
import ImageZoom from "react-native-image-pan-zoom";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function boys_unif() {
    //Router
    const router = useRouter();

    //Carousel and Zoom Function
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoomModal, setZoomModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    //Add to Cart Modal
    const [atcModal, setAtcModal] = useState(false);
    const [selectSize, setSelectSize] = useState(null);
    const [qty, setQty] = useState(1);

    //Buy Now Modal
    const [bnModal, setBnModal] = useState(false);

    //Uniform Pictures
    const carouselItems = [
        { id: 1, image: require("../../assets/images/b_unif_ex.png") },
        { id: 2, image: require("../../assets/images/b_unif_ex.png") },
        { id: 3, image: require("../../assets/images/b_unif_ex.png") },
        { id: 4, image: require("../../assets/images/b_unif_ex.png") },
        { id: 5, image: require("../../assets/images/b_unif_ex.png") },
    ];

    //Uniform Sizes
    const sizes = ["small", "medium", "large", "size 6", "size 7", "size 8", "size 9", "size 10", "size 11", "size 12", "size 13", "size 14"];

    //Size Chart
    const sizeChartImage = require("../../assets/images/chart_ex.png");

    const openZoom = (img) => {
        setSelectedImage(img);
        setZoomModal(true);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.slide}
                activeOpacity={0.9}
                onPress={() => openZoom(item.image)}
            >
                <Image
                    source={item.image}
                    style={styles.carouselImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    };

    const renderPagination = () => {
        return (
            <View style={styles.paginationNumber}>
                <Text style={{ color: "#fff", fontSize: 14 }}>
                    {activeIndex + 1}/{carouselItems.length}
                </Text>
            </View>
        );
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push("/dash_mod/home")}>
                <Ionicons
                    name="arrow-back-outline"
                    size={23}
                    style={{ marginTop: "8%" }}
                />
            </TouchableOpacity>

            <View style={styles.carouselContainer}>
                <Carousel
                    loop
                    width={screenWidth - 40}
                    height={300}
                    data={carouselItems}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    renderItem={renderItem}
                    autoPlay={false}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                />
                {renderPagination()}
            </View>

            <View style={styles.prc_cont}>
                <View>
                    <Text style={styles.prc}>₱400.00</Text>
                    <Text style={styles.item_desc}>Boy’s Uniform (Pre-school)</Text>
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.ar_btn}
                        onPress={() => router.push("/ar_mod/ar_height")}
                    >
                        <Image
                            source={require("../../assets/images/icons/ar_menu.png")}
                            style={styles.ar_pic}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.szchrt_cont}>
                <TouchableOpacity onPress={() => openZoom(sizeChartImage)}>
                    <Image
                        source={sizeChartImage}
                        style={styles.szchrt_pic}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.buy_cont}>
                <View>
                    <TouchableOpacity style={styles.atc_btn} onPress={() => setAtcModal(true)}>
                        <Image
                            source={require("../../assets/images/icons/ar_menu.png")}
                            style={styles.ar_pic}
                        />
                        <Text style={{ fontSize: 10, color: "white", fontWeight: "400" }}>
                            Add to cart
                        </Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={styles.bn_btn} onPress={() => setBnModal(true)}>
                        <Text style={{ fontSize: 20, color: "white", fontWeight: "400" }}>
                            Buy Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                visible={zoomModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setZoomModal(false)}
                >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={() => setZoomModal(false)}
                    >
                        <Ionicons name="close" size={30} color="#fff" />
                    </TouchableOpacity>

                    {selectedImage && (
                        <ImageZoom
                            cropWidth={screenWidth}
                            cropHeight={screenHeight}
                            imageWidth={screenWidth}
                            imageHeight={screenHeight}
                            enableSwipeDown={true}
                            onSwipeDown={() => setZoomModal(false)}
                        >
                            <Image
                                source={selectedImage}
                                style={styles.zoomedImage}
                                resizeMode="contain"
                            />
                        </ImageZoom>
                    )}
                </View>
            </Modal>

            <Modal 
                visible={atcModal}
                transparent
                animationType="slide"
                onRequestClose={() => setAtcModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setAtcModal(false)}>
                    <View style={styles.modal_overlay}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.modal_cont}>
                                <View style={styles.matc_cont}>
                                    <View style={styles.matc_pic_cont}>
                                        <Image source={require("../../assets/images/b_unif_ex.png")}
                                        style={styles.matc_pic}
                                        />
                                    </View>

                                    <View style={styles.matc_desc}>
                                        <Text style={styles.matc_prc}>₱400.00</Text>
                                        <Text style={styles.matc_item_desc}>Boy’s Uniform (Pre-school)</Text>
                                    </View>
                                </View>

                                <Text style={{fontSize: 16, fontWeight: '600', marginTop: '8%'}}>Size</Text>

                                <ScrollView style={{ maxHeight: 160 }}>
                                    <View style={styles.matc_sizes_cont}>
                                        {sizes.map((size) => (
                                        <TouchableOpacity
                                            key={size}
                                            onPress={() => setSelectSize(size)}
                                            style={[
                                            styles.matc_sizes_btn,
                                            selectSize === size && styles.setSelectSize
                                            ]}
                                        >
                                            <Text
                                            style={[
                                                { fontWeight: '500', fontSize: 14, color: "black" },
                                                selectSize === size && { color: "white" }
                                            ]}
                                            >
                                            {size}
                                            </Text>
                                        </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                                
                                <View style={styles.matc_qty_cont}>
                                    <View>
                                        <Text style={{fontWeight: '600', fontSize: 16}}>Quantity</Text>
                                    </View>

                                    <View style={styles.matc_btn_cont}>
                                        <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={styles.matc_qty_btn}>
                                            <Text style={styles.matc_qty_desc}>-</Text>
                                        </TouchableOpacity>

                                        <View style={styles.matc_qty_btn}>
                                            <Text style={styles.matc_qty_desc}>{qty}</Text>
                                        </View>
                                        
                                        <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.matc_qty_btn}>
                                            <Text style={styles.matc_qty_desc}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <TouchableOpacity style={styles.matc_btn}
                                        onPress={() => {
                                            if (!selectSize) {
                                                alert("Please select a size first!");
                                                return;
                                            }
                                            setAtcModal(false);
                                            alert(`✅ Added to Cart\nSize: ${selectSize}, Qty: ${qty}`);
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>
                                            Add to cart
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            
            <Modal 
                visible={bnModal}
                transparent
                animationType="slide"
                onRequestClose={() => setBnModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setBnModal(false)}>
                    <View style={styles.modal_overlay}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.modal_cont}>
                                <View style={styles.matc_cont}>
                                    <View style={styles.matc_pic_cont}>
                                        <Image source={require("../../assets/images/b_unif_ex.png")}
                                        style={styles.matc_pic}
                                        />
                                    </View>

                                    <View style={styles.matc_desc}>
                                        <Text style={styles.matc_prc}>₱400.00</Text>
                                        <Text style={styles.matc_item_desc}>Boy’s Uniform (Pre-school)</Text>
                                    </View>
                                </View>

                                <Text style={{fontSize: 16, fontWeight: '600', marginTop: '8%'}}>Size</Text>

                                <ScrollView style={{ maxHeight: 160 }}>
                                    <View style={styles.matc_sizes_cont}>
                                        {sizes.map((size) => (
                                        <TouchableOpacity
                                            key={size}
                                            onPress={() => setSelectSize(size)}
                                            style={[
                                            styles.matc_sizes_btn,
                                            selectSize === size && styles.setSelectSize
                                            ]}
                                        >
                                            <Text
                                            style={[
                                                { fontWeight: '500', fontSize: 14, color: "black" },
                                                selectSize === size && { color: "white" }
                                            ]}
                                            >
                                            {size}
                                            </Text>
                                        </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                                
                                <View style={styles.matc_qty_cont}>
                                    <View>
                                        <Text style={{fontWeight: '600', fontSize: 16}}>Quantity</Text>
                                    </View>

                                    <View style={styles.matc_btn_cont}>
                                        <TouchableOpacity onPress={() => setQty(Math.max(1, qty - 1))} style={styles.matc_qty_btn}>
                                            <Text style={styles.matc_qty_desc}>-</Text>
                                        </TouchableOpacity>

                                        <View style={styles.matc_qty_btn}>
                                            <Text style={styles.matc_qty_desc}>{qty}</Text>
                                        </View>
                                        
                                        <TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.matc_qty_btn}>
                                            <Text style={styles.matc_qty_desc}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <TouchableOpacity style={styles.matc_btn}
                                        onPress={() => {
                                            if (!selectSize) {
                                                alert("Please select a size first!");
                                                return;
                                            }
                                            setBnModal(false);
                                            alert(`✅ Added to Cart\nSize: ${selectSize}, Qty: ${qty}`);
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>
                                            Buy Now
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        padding: "8.5%",
        backgroundColor: "#FFFBFB",
    },

    carouselContainer: {
        marginVertical: "3%",
        alignItems: "center",
    },

    slide: {
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#f8f8f8",
    },

    carouselImage: {
        height: 300,
        width: "100%",
    },

    paginationNumber: {
        position: "absolute",
        bottom: 10,
        right: 15,
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },

    prc: {
        color: "#61C35C",
        fontWeight: "600",
        fontSize: 28,
    },

    item_desc: {
        fontWeight: "400",
        fontSize: 18,
    },

    prc_cont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },

    ar_btn: {
        height: 46,
        width: 52,
        backgroundColor: "#61C35C",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    ar_pic: {
        height: 32,
        width: 32,
    },
    
    szchrt_cont: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: "6%",
    },

    szchrt_pic: {
        height: 260,
        width: 320,
    },

    buy_cont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },

    atc_btn: {
        backgroundColor: "#0FAFFF",
        alignItems: "center",
        justifyContent: "center",
        height: 55,
        width: 110,
        borderRadius: 5,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    bn_btn: {
        backgroundColor: "#61C35C",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        height: 55,
        width: 190,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalCloseButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 20,
        padding: 5,
    },

    zoomedImage: {
        width: screenWidth,
        height: screenHeight,
    },

    modal_overlay:{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    modal_cont:{
        alignContent: 'center',
        backgroundColor: '#FFFBFB',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: '7%',
        paddingHorizontal: '10%',
        height: '65%',
    },

    matc_cont:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    matc_pic:{
        height: 90,
        width: 90,
        borderRadius: 10,
    },

    matc_prc:{
        color: "#61C35C",
        fontWeight: "600",
        fontSize: 26,
    },

    matc_item_desc:{
        fontWeight: "400",
        fontSize: 16,
    },

    matc_sizes_cont:{
        justifyContent: 'space-between',
        flexWrap: "wrap",
        flexDirection: 'row',
        paddingVertical: '3%',
    },

    matc_sizes_btn:{
        marginVertical: '1%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        width: 90,
        height: 32,
        borderColor: "#ccc"
    },

    setSelectSize:{
        backgroundColor: "#61C35C",
        borderColor: "#61C35C"
    },

    matc_qty_cont:{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: '8%',
    },

    matc_btn_cont:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: '3%',
    },

    matc_qty_btn:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 35,
        borderWidth: 1,
    },

    matc_qty_desc:{
        fontSize: 20,
        fontWeight: '400',
    },

    matc_btn:{
        backgroundColor: "#61C35C",
        alignItems: "center",
        justifyContent: "center",
        height: 55,
        width: 'auto',
        borderRadius: 5,
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4, 
    }
});
