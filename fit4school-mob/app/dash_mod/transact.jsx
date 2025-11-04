// ../../dash_mod/transact
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Text } from "../../components/globalText";
import Checkbox from "expo-checkbox";


export default function transact() {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("appointments");
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFBFB" }}>
      <View style={styles.titlebox}>
        <Text style={styles.title}>Transaction</Text>
      </View>

      <View style={styles.tabs_cont}>
        <View style={styles.srbtn_cont}>
          <TouchableOpacity onPress={() => setActiveTab("appointments")}>
            <View
              style={[
                styles.sysbtn,
                activeTab === "appointments" && styles.activeBtn,
              ]}
            >
              <Text
                style={[
                  styles.sysbtn_txt,
                  activeTab === "appointments" && styles.activeBtnText,
                ]}
              >
                Appointments
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab("mycart")}>
            <View
              style={[
                styles.rembtn,
                activeTab === "mycart" && styles.activeBtn,
              ]}
            >
              <Text
                style={[
                  styles.rembtn_txt,
                  activeTab === "mycart" && styles.activeBtnText,
                ]}
              >
                My Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={{ alignItems: "flex-end", paddingVertical: '5%'}}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={setIsChecked ? "#49454F" : undefined}
          />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: "5%" }}
        >
          {activeTab === "appointments" ? (
            <View style={styles.notif_cont}>

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
                    <Checkbox
                      value={isChecked}
                      onValueChange={setIsChecked}
                      color={isChecked ? "#49454F" : undefined}
                    />
                  </View>


                  <View style={[styles.rowBetween, { marginTop: 6 }]}>
                    <Text style={styles.itemQuantity}>Quantity 2</Text>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.toClaim}>To claim</Text>
                      <Text style={styles.itemPrice}>₱800.00</Text>
                    </View>
                  </View>


                  <TouchableOpacity style={styles.ticketBtn}>
                    <Text style={styles.ticketBtnText}>View Ticket</Text>
                  </TouchableOpacity>
                </View>
              </View>



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
                    <Checkbox
                      value={isChecked}
                      onValueChange={setIsChecked}
                      color={isChecked ? "#49454F" : undefined}
                    />
                  </View>


                  <View style={[styles.rowBetween, { marginTop: 6 }]}>
                    <Text style={styles.itemQuantity}>Quantity 2</Text>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.toClaim}>Pending</Text>
                      <Text style={styles.itemPrice}>₱800.00</Text>
                    </View>
                  </View>


                  <TouchableOpacity style={styles.ticketBtn} onPress={() => router.push("/transact_mod/cancel")}>
                    <Text style={styles.ticketBtnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>



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
                    <Checkbox
                      value={isChecked}
                      onValueChange={setIsChecked}
                      color={isChecked ? "#49454F" : undefined}
                    />
                  </View>


                  <View style={[styles.rowBetween, { marginTop: 6 }]}>
                    <Text style={styles.itemQuantity}>Quantity 2</Text>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.toClaim}>To claim</Text>
                      <Text style={styles.itemPrice}>₱800.00</Text>
                    </View>
                  </View>


                  <TouchableOpacity style={styles.ticketBtn}>
                    <Text style={styles.ticketBtnText}>View Ticket</Text>
                  </TouchableOpacity>
                </View>
              </View>



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
                    <Checkbox
                      value={isChecked}
                      onValueChange={setIsChecked}
                      color={isChecked ? "#49454F" : undefined}
                    />
                  </View>


                  <View style={[styles.rowBetween, { marginTop: 6 }]}>
                    <Text style={styles.itemQuantity}>Quantity 2</Text>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.toClaim}>To claim</Text>
                      <Text style={styles.itemPrice}>₱800.00</Text>
                    </View>
                  </View>


                  <TouchableOpacity style={styles.ticketBtn}>
                    <Text style={styles.ticketBtnText}>View Ticket</Text>
                  </TouchableOpacity>
                </View>
              </View>
            
            </View>


          ) : (


            <View style={styles.notif_cont}>

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
                    <Checkbox
                      value={isChecked}
                      onValueChange={setIsChecked}
                      color={isChecked ? "#49454F" : undefined}
                    />
                  </View>


                  <View style={[styles.rowBetween, { marginTop: 6 }]}>
                    <Text style={styles.itemQuantity}>Quantity 2</Text>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.toClaim}>To claim</Text>
                      <Text style={styles.itemPrice}>₱800.00</Text>
                    </View>
                  </View>

                  <View style = {{flexDirection: 'row', justifyContent: "flex-end"}}>
                    <TouchableOpacity style={styles.chng_btn}>
                      <Text style={styles.chngbtn_txt}>Change</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.del_btn}>
                      <Text style={styles.delbtn_txt}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>

              </View>

            </View>
          )}
        </ScrollView>

        <TouchableOpacity 
          onPress={() =>
            router.push(
              activeTab === "appointments"
                ? "/transact_mod/history"
                : "/transact_mod/checkout"
            )
          }>
          <View style={styles.hisbtn}>
            <Image
              source={ 
                activeTab === "appointments"
                ? require("../../assets/images/icons/gen_icons/history.png")
                : require("../../assets/images/icons/gen_icons/checkout-bag.png")
              }
              style={styles.his_pic}
            />
          </View>
        </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //TITLE CONTAINER
  titlebox: {
    justifyContent: "flex-start",
    alignContent: "center",
    backgroundColor: "#61C35C",
    padding: "10%",
    height: "16%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  title: {
    fontWeight: "500",
    fontSize: 24,
    color: "white",
    justifyContent: "center",
  },

  //OVERALL CONTAINER
  tabs_cont: {
    padding: "7%",
    flex: 1,
    backgroundColor: "#FFFBFB",
  },

  srbtn_cont: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },

  sysbtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    height: 35,
    width: 155,
    borderRadius: 5,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  rembtn: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#D9D9D9",
    height: 35,
    width: 155,
    borderRadius: 5,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  sysbtn_txt: { 
    fontWeight: "600",
  },

  rembtn_txt: { 
    fontWeight: "600",
  },

  activeBtn: { 
    backgroundColor: "#0FAFFF" 
  },

  activeBtnText: { 
    color: "white" 
  },

  notif: {
    flexDirection: "row",
    marginVertical: "2.5%",
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
    height: 70,
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
    fontSize: 14,
    fontWeight: "600",
  },
  toClaim: {
    color: "#1F72AD",
    fontSize: 11,
    fontWeight: "400",
  },
  itemPrice: {
    color: "#1F72AD",
    fontSize: 14,
    fontWeight: "600",
  },

  ticketBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 5,
  },

  chng_btn: {
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 5,
  },

  del_btn:{
    backgroundColor: "#FFD5D5",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 5,
    marginLeft: '2%',
  },

  ticketBtnText: {
    color: "black",
    fontSize: 13,
    fontWeight: "600",
  },

  chngbtn_txt: {
    color: "black",
    fontSize: 13,
    fontWeight: "600",
  },

  delbtn_txt:{
    color: "#FF6767",
    fontSize: 13,
    fontWeight: "600",
  },

  hisbtn: {
    position: "absolute",
    height: 65,
    width: 65,
    backgroundColor: "#61C35C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    bottom: "20%",
  },

  his_pic: {
    height: 40,
    width: 40,
  },
});
