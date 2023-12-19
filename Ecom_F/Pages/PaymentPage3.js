import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { faMagnifyingGlass, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const Trackbar = require('../Streetmall/14_Checkout_page/step2.png');
import BottomBar from './BottomBar'; 


const PaymentPage3 = ({ navigation }) => {
  const goToPaymentPage4 = () => {
    navigation.navigate('Payment4');
  };

  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  const handlePaymentOptionPress = (option) => {
    setSelectedPaymentOption(option);
  };

  const renderPaymentOption = (optionText, bankName, imageSource) => (
    <TouchableOpacity
      style={[styles.optionButton, selectedPaymentOption === optionText && styles.selectedOption]}
      onPress={() => handlePaymentOptionPress(optionText)}
    >
      <View style={styles.optionContent}>
        <View style={styles.circle}>
          {selectedPaymentOption === optionText && (
            <Text style={styles.checkmark}>&#10003;</Text>
          )}
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{optionText}</Text>
          <Text style={styles.optionSubtext}>{bankName}</Text>
        </View>
        <Image style={styles.optionImage} source={imageSource} />
      </View>
    </TouchableOpacity>
  );

  const proceedButtonDisabled = !selectedPaymentOption;

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
            <Text style={styles.title}>Choose your payment type:</Text>

            {/* UPI */}
            <Text style={styles.subtitle}>UPI</Text>
            {renderPaymentOption('Paytm', 'Pay with your Paytm account', require('../Streetmall/Payment/Paytm_Logo.png'))}

            {/* Credit Card */}
            <Text style={styles.subtitle}>Credit Card</Text>
            {renderPaymentOption('Credit or Debit Card', 'Choose your Bank', require('../Streetmall/Payment/Paytm_Logo.png'))}

            {/* Other Options */}
            <Text style={styles.subtitle}>Other Options</Text>
            {renderPaymentOption('EMI', 'Choose EMI option', require('../Streetmall/Payment/Paytm_Logo.png'))}
            {renderPaymentOption('Net Banking', 'Choose Net Banking', require('../Streetmall/Payment/Paytm_Logo.png'))}
            {renderPaymentOption('Cash on Delivery', 'Pay when delivered', require('../Streetmall/Payment/Paytm_Logo.png'))}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.proceedButton, proceedButtonDisabled && styles.disabledButton]}
              disabled={proceedButtonDisabled}
              onPress={goToPaymentPage4}
            >
              <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text> {'\n'} </Text><Text> {'\n'} </Text><Text> {'\n'} </Text>
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
    paddingBottom: 3,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    borderColor: '#003478',
    borderWidth: 1,
  },
  selectedOption: {
    backgroundColor: '#ddd',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
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
  optionImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  proceedButton: {
    width: '70%',
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
  disabledButton: {
    backgroundColor: '#ccc',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  optionSubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default PaymentPage3;
