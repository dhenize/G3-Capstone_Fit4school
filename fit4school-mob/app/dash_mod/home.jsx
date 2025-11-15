//../../dash_mod/home

//IMPORTS
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { Text } from "../../components/globalText";
import { useRouter } from "expo-router";

//MAIN FUNCTION
export default function Home() {

  const router = useRouter();
  const [sort, setSort] = useState("all");
  const [uniforms, setUniforms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniforms(sort);
  }, [sort]);

  const fetchUniforms = async (grade) => {
    try {
      setLoading(true);
      const gradeParam = grade === 'all' ? '' : grade;
      console.log('Fetching uniforms with grade:', gradeParam);
      const response = await fetch(`http://192.168.1.50:3000/auth/uniforms?grade=${gradeParam}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched uniforms:', data);
      setUniforms(data);
    } catch (error) {
      console.error('Error fetching uniforms:', error);
      setUniforms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greet}>
          <Text style={{ fontSize: 20, fontWeight: '400' }}>Hello</Text>
          <Text style={{ color: '#0FAFFF', fontSize: 20, fontWeight: '500' }}>Juan Dela Cruz {"!"}</Text>
        </View>

        <View style={styles.helpbtn}>
          <TouchableOpacity style={styles.button} onPress={() => alert("Help button pressed")}>
            <Text style={{ fontSize: 13, fontWeight: '400' }}>HELP</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/*CURRENT PROCESSING ORDER*/}

      <View style={styles.cpo_cont}>
        <View style={styles.cpo_pic}>
          <Image
            source={require("../../assets/images/g2_unif_ex.png")}
            style={{ height: 70, width: 70, borderRadius: 10 }}
          />
        </View>

        <View style={styles.cpo_desc}>
          <Text style={{ color: '#0FAFFF', fontSize: 14, fontWeight: '600', textAlign: "left" }}>Your Order is being processed!</Text>
          <Text style={{ color: '#0FAFFF', fontSize: 12, fontWeight: '400', textAlign: "left" }}>#04 Boy's Uniform (Pre-school)</Text>
          <Text style={{ color: '#0FAFFF', fontSize: 11, fontWeight: '400', textAlign: "left" }}>size 8</Text>
          <Text style={{ color: '#61C35C', fontSize: 13, fontWeight: '500', textAlign: "left" }}>Quantity: 2</Text>
        </View>
      </View>

      <Text style={{ marginTop: '5%', marginBottom: '3%', fontSize: 16, fontWeight: '500', textAlign: "left " }}>Order Again?</Text>


      <TouchableOpacity>
        <View style={styles.oa_cont}>

          <View style={styles.oa_pic}>
            <Image
              source={require("../../assets/images/g2_unif_ex.png")}
              style={{ height: 50, width: 50, borderRadius: 10, borderColor: '#0FAFFF', borderWidth: 2 }}
            />
          </View>

          <View style={styles.oa_desc}>
            <Text style={{ fontSize: 13, fontWeight: '400', textAlign: "left" }}>#03 Girl's Uniform (Pre-school)</Text>
            <Text style={{ fontSize: 11, fontWeight: '400', textAlign: "left" }}>size 10</Text>
          </View>

        </View>
      </TouchableOpacity>


      <View style={styles.sort_cont}>
        <View>
          <Text style={{ fontSize: 13, fontWeight: '500', textAlign: "left" }}>
            {loading ? 'Loading...' : `${uniforms.length} Items`}
          </Text>
        </View>

        <View style={styles.drop_cont}>
          <Picker selectedValue={sort} style={styles.dropdown} onValueChange={(itemValue) => setSort(itemValue)}>
            <Picker.Item label="All Items" value="all" style={styles.drop_txt} />
            <Picker.Item label="Pre-School" value="preschool" style={styles.drop_txt} />
            <Picker.Item label="Elementary" value="elementary" style={styles.drop_txt} />
            <Picker.Item label="Junior High" value="junior high" style={styles.drop_txt} />
          </Picker>
        </View>
      </View>

      <ScrollView style={{ flex: 1, marginTop: "7%" }} contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text>Loading uniforms...</Text>
          </View>
        ) : uniforms.length === 0 ? (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text>No uniforms found</Text>
          </View>
        ) : (
          <View style={styles.unif_cont}>
            {/* Boy's Preschool */}
            <View style={styles.unif_column}>
              <TouchableOpacity 
                style={styles.unif_item}
                onPress={() => router.push("/transact_mod/uniforms?type=boy&grade=preschool")}
              >
                <Image source={require("../../assets/images/b_unif_ex.png")} style={styles.unif_pics} />
                <Text style={styles.unif_desc}>Boy's Uniform (Preschool)</Text>
                <Text style={styles.unif_prc}>₱400.00</Text>
              </TouchableOpacity>

              {/* Boy's Elementary */}
              <TouchableOpacity 
                style={styles.unif_item}
                onPress={() => router.push("/transact_mod/uniforms?type=boy&grade=elementary")}
              >
                <Image source={require("../../assets/images/b_unif_ex.png")} style={styles.unif_pics} />
                <Text style={styles.unif_desc}>Boy's Uniform (Elementary)</Text>
                <Text style={styles.unif_prc}>₱400.00</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.unif_column}>
              {/* Girl's Preschool */}
              <TouchableOpacity 
                style={styles.unif_item}
                onPress={() => router.push("/transact_mod/uniforms?type=girl&grade=preschool")}
              >
                <Image source={require("../../assets/images/g_unif_ex.png")} style={styles.unif_pics} />
                <Text style={styles.unif_desc}>Girl's Uniform (Preschool)</Text>
                <Text style={styles.unif_prc}>₱400.00</Text>
              </TouchableOpacity>

              {/* Girl's Elementary */}
              <TouchableOpacity 
                style={styles.unif_item}
                onPress={() => router.push("/transact_mod/uniforms?type=girl&grade=elementary")}
              >
                <Image source={require("../../assets/images/g_unif_ex.png")} style={styles.unif_pics} />
                <Text style={styles.unif_desc}>Girl's Uniform (Elementary)</Text>
                <Text style={styles.unif_prc}>₱400.00</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

    </View>
  );
}


//STYLES
const styles = StyleSheet.create({
  //OVERALL CONTAINER
  container: {
    padding: '8.5%',
    flex: 1,
    backgroundColor: '#FFFBFB',
  },

  //HEADER 
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: '5%',
  },

  button: {
    backgroundColor: "#FFFF20",
    width: 60,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: 'black',
    elevation: 10,
    shadowOpacity: 0.90,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 4 },
  },


  // CURRENT PROCESSING ORDER CONTATINER
  cpo_cont: {
    marginTop: '6%',
    padding: '3%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    height: 90,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '5%',
  },

  cpo_desc: {
    alignContent: 'center',
  },

  // ORDER AGAIN CONTATINER
  oa_cont: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8%',
    marginBottom: '7%',
  },

  // SORT AND DROPDOWN CONTATINER
  sort_cont: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  drop_cont: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    height: 40,
    width: 145,
  },

  dropdown: {
    height: 51,
    width: 145,
    marginTop: -6,
  },

  drop_txt: {
    fontSize: 13,
    fontWeight: '600',
  },

  // SCROLLVIEW
  scrollContent: {
    paddingBottom: '5%',
  },

  // UNIFORMS CONTATINER - PROPER 2-COLUMN LAYOUT
  unif_cont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  unif_column: {
    width: '48%', // Each column takes 48% of the width
  },

  unif_item: {
    alignItems: 'center',
    marginBottom: 25, // Space between items in the same column
  },

  unif_pics: {
    height: 140,
    width: '100%',
    marginBottom: 8,
    borderRadius: 10,
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  unif_desc: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 4,
  },

  unif_prc: {
    color: '#61C35C',
    fontWeight: '600',
    textAlign: 'center',
  },

}); //END OF STYLES