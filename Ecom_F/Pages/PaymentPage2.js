import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { faMagnifyingGlass, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const Trackbar = require('../Streetmall/14_Checkout_page/step1.png');
import BottomBar from './BottomBar'; 


const PaymentPage2 = ({navigation}) => {
  
  const goToPaymentPage3 = () => {
    navigation.navigate('Payment3');
  };

  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);

  const handleDeliveryOptionPress = (option) => {
    setSelectedDeliveryOption(option);
  };

  const renderOption = (optionText, subtext) => (
    <TouchableOpacity
      style={[styles.optionButton, selectedDeliveryOption === optionText && styles.selectedOption]}
      onPress={() => handleDeliveryOptionPress(optionText)}
    >
      <View style={styles.circle}>
        {selectedDeliveryOption === optionText && (
          <Text style={styles.checkmark}>&#10003;</Text>
        )}
      </View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionText}>{optionText}</Text>
        <Text style={styles.optionSubtext}>{subtext}</Text>
      </View>
    </TouchableOpacity>
    );

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
              <Text style={styles.title}>Choose your delivery option:</Text>
              {renderOption('Regular delivery', 'Saturday, 30 September - Free Delivery')}
              {renderOption('Instant delivery', 'Tomorrow by 10 AM ₹100.00')}
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={[styles.proceedButton, !selectedDeliveryOption && styles.disabledButton]}
              disabled={!selectedDeliveryOption} onPress={goToPaymentPage3}
          >
              <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
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
    aspectRatio: 9,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 16,
  },
  proceedButton: {
    width:'70%',
    backgroundColor: '#FF9900',
    borderRadius: 16,
    padding: 11,
    alignSelf: 'center',
    marginTop: 8,
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
  },
  trackcont: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  tracktext: {
    fontSize: 13,
    fontWeight: 'bold',
    color:'#003478',
    paddingRight: 15,
    paddingLeft: 35,
  },
  cont: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    paddingBottom: 30,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    borderColor:'#003478',
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: '#ddd',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1977F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    color: '#1977F3',
    fontSize: 18,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionSubtext: {
    fontSize: 14,
    color: '#999',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default PaymentPage2;
