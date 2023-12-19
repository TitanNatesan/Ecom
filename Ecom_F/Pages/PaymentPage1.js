import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { faMagnifyingGlass, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const Trackbar = require('../Streetmall/14_Checkout_page/step.png');
import BottomBar from './BottomBar'; 


const PaymentPage = ({navigation}) => {
  
  const goToPaymentPage2 = () => {
    navigation.navigate('Payment2');
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState("");
  const [editedPinCode, setEditedPinCode] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
 
  const [addressLines, setAddressLines] = useState([
    "123 Main Street",
    "Pin Code: 123456",
    "Phone: 123457890",
  ]);

  const handleEditPress = () => {
    setIsEditing(true);
    setEditedAddress(addressLines[0].replace("Address: ", ""));
    setEditedPinCode(addressLines[1].replace("Pin Code: ", ""));
    setEditedPhone(addressLines[2].replace("Phone: ", ""));
  };

  const handleSavePress = () => {
    setIsEditing(false);
    setAddressLines([
      `Address: ${editedAddress}`,
      `Pin Code: ${editedPinCode}`,
      `Phone: ${editedPhone}`,
    ]);
  };

  return (
    <View style={styles.containerw}>
      <ScrollView style={styles.containerw} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.topbarinput}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
            <TextInput placeholder="Search Sunlight.in" style={styles.inputBox} />
            <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" />
          </View>
          <StatusBar style="auto" />
        </View>
        <View>
          <Text> {'\n'} </Text>
          <Image style={styles.trackbar} source={Trackbar} />
          <View style={styles.trackcont}>
            <Text style={styles.tracktext}>Address</Text>
            <Text style={styles.tracktext}>Delivery</Text>
            <Text style={styles.tracktext}>Payment</Text>
            <Text style={styles.tracktext}>Place Order</Text>
          </View>
          <Text> {'\n'} </Text>
          <View style={styles.cont}>
            <Text style={styles.heading}>Customer</Text>
            {isEditing ? (
              <View>
                <TextInput
                  style={styles.editInput}
                  placeholder="Enter address"
                  value={editedAddress}
                  onChangeText={(text) => setEditedAddress(text)}
                />
                <TextInput
                  style={styles.editInput}
                  placeholder="Enter pin code"
                  value={editedPinCode}
                  onChangeText={(text) => setEditedPinCode(text)}
                />
                <TextInput
                  style={styles.editInput}
                  placeholder="Enter phone number"
                  value={editedPhone}
                  onChangeText={(text) => setEditedPhone(text)}
                />
              </View>
            ) : (
              addressLines.map((line, index) => (
                <Text key={index} style={styles.addressLine}>
                  {line}
                </Text>
              ))
            )}
            <View style={styles.buttonContainer}>
              {isEditing ? (
                <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <View>
                  <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                    <Text style={styles.buttonText}>Edit Address</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.proceedButton} onPress={goToPaymentPage2}>
                    <Text style={styles.buttonText}>Proceed</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomBar navigation={navigation} />
      <View style={styles.blueBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerw:{
    flex: 1,
    backgroundColor: '#ffffff',
  },
  blueBar: {
    backgroundColor: '#1977F3',
    height: 15,
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#1977F3",
    paddingBottom: 15,
  },
  topbarinput: {
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  inputBox: {
    flex: 1,
    color: "#1977F3",
    marginLeft: 10,
  },
  trackbar: {
    alignSelf:'center',
    aspectRatio: 5,
    resizeMode: 'contain',
  },
  cont: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#003478',
    padding: 16,
    margin: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addressLine: {
    fontSize: 16,
    marginBottom: 8,
  },
  editInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    marginTop: 16,
  },
  editButton: {
    backgroundColor: '#003478',
    borderRadius: 16,
    padding: 13,
    alignItems: 'center',
  },
  proceedButton: {
    backgroundColor: '#FF9900',
    borderRadius: 16,
    padding: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#003478',
    borderRadius: 16,
    padding: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  trackcont: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  tracktext: {
    fontSize: 13,
    fontWeight: 'bold',
    color:'#003478',
    paddingRight: 20,
    paddingLeft: 37,

  },
});

export default PaymentPage;
