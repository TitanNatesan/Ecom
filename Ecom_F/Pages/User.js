import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import BottomBar from './BottomBar';

const userimg = require("../Streetmall/Dashboard/ICON2.png");

const User = ({ navigation }) => {

  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('abc@mail.com');
  const [mobileNumber, setMobileNumber] = useState('+91 12345 67890');
  const [addressLine1, setAddressLine1] = useState(
    'No.123, 1st cross street, ABC Avenue, DEF Nagar, Area.'
  );
  const [addressLine2, setAddressLine2] = useState('City Name: QWERTY, Zonal PIN: 600123');
  const [recoveryMail, setRecoveryMail] = useState('abc@gmail.com');

  const [editingField, setEditingField] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  const handleEdit = (field) => {
    setEditingField(field);
    setEditedValue(getFieldValue(field));
  };

  const handleSaveEdit = () => {
    switch (editingField) {
      case 'name':
        setName(editedValue);
        break;
      case 'email':
        setEmail(editedValue);
        break;
      case 'mobileNumber':
        setMobileNumber(editedValue);
        break;
      case 'addressLine1':
        setAddressLine1(editedValue);
        break;
      case 'addressLine2':
        setAddressLine2(editedValue);
        break;
      case 'recoveryMail':
        setRecoveryMail(editedValue);
        break;
      default:
        break;
    }
    setEditingField(null);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const renderEditableField = (label, value, field) => {
    return (
      <View style={styles.editableField}>
        <Text style={styles.editableLabel}>{label}</Text>
        {editingField === field ? (
          <View style={styles.editableInputContainer}>
            <TextInput
              style={styles.editableInput}
              value={editedValue}
              onChangeText={(text) => setEditedValue(text)}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.editableValueContainer}>
            <Text style={styles.editableValue}>{value}</Text>
            {/* Style for the "Edit" button */}
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(field)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Add a line break */}
        <View style={styles.lineBreak} />
      </View>
    );
  };

  const getFieldValue = (field) => {
    switch (field) {
      case 'name':
        return name;
      case 'email':
        return email;
      case 'mobileNumber':
        return mobileNumber;
      case 'addressLine1':
        return addressLine1;
      case 'addressLine2':
        return addressLine2;
      case 'recoveryMail':
        return recoveryMail;
      default:
        return '';
    }
  };

  const handleButtonClick = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.containerw}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={userimg} style={styles.uicon} />
          <Text style={styles.utext}>Hello, Customer</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('confirmed')}>
            <Text style={styles.buttonText}>Your Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('confirmed')}>
            <Text style={styles.buttonText}>Buy Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('Dashboard')}>
            <Text style={styles.buttonText}>Your Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('Cart')}>
            <Text style={styles.buttonText}>Your Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('User')}>
            <Text style={styles.buttonText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonClick('User')}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>

        {/* User Details */}
        <View style={styles.userDetailsContainer}>
          <View style={styles.detailsBox}>
            {renderEditableField('Name', name, 'name')}
            {renderEditableField('Email', email, 'email')}
            {renderEditableField('Mobile Number', mobileNumber, 'mobileNumber')}
            {renderEditableField('Address Line 1', addressLine1, 'addressLine1')}
            {renderEditableField('Address Line 2', addressLine2, 'addressLine2')}
            {renderEditableField('Recovery Mail', recoveryMail, 'recoveryMail')}
          </View>
        </View>

        <Text> {'\n'} </Text>
        <Text> {'\n'} </Text>
        <Text> {'\n'} </Text>
      </ScrollView>
      <BottomBar navigation={navigation} />
      <View style={styles.blueBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerw: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    backgroundColor: "#1977F3",
    paddingBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '6%',
    paddingHorizontal: 35,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 13,
    alignItems: 'center',
    marginTop: 8,
    width: '44%',
    borderColor: '#6B6B6B',
    borderWidth: 1,
    shadowColor: '#6B6B6B',
    elevation: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uicon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: 20,
  },
  utext: {
    color: 'white',
    flex: 1,
    fontSize: 31,
  },
  userDetailsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  detailsBox: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    elevation: 5,
  },
  editableField: {
    marginBottom: 15,
  },
  editableLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editableValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editableValue: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'normal',
    flex: 2.8,
  },
  editableInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  editableInput: {
    flex: 0.8,
    height: '70%',
    borderColor: '#6B6B6B',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  editButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 7,
    alignItems: 'center',
    marginTop: 8,
    flex: 1,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editButtonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 7,
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 7,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  lineBreak: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 3,
  },
});

export default User;
