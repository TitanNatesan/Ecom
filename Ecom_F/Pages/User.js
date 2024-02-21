import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import { useUserContext } from './UserContext';
import { faHome, faBars, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

const userimg = require("../Streetmall/Dashboard/ICON2.png");

const User = ({ navigation }) => {
  const { userID, updateUserID, BASE_URL,setLogin } = useUserContext();
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    doorNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    landmark: "",
    role: "",
    down_leaf: [],
    earning: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prevMode) => !prevMode);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/${userID}/`);
        const { user, address } = response.data;
        setUserData({
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
          doorNumber: address.door_number,
          addressLine1: address.address_line1,
          addressLine2: address.address_line2,
          city: address.city,
          state: address.state,
          postalCode: address.postal_code,
          landmark: address.landmark,
          down_leaf: user.down_leaf,
          earning: user.earning,
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateUserData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/${userID}/`,
        {
          user: {
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            username: userID,
          },
          address: {
            door_number: userData.doorNumber,
            address_line1: userData.addressLine1,
            address_line2: userData.addressLine2,
            city: userData.city,
            state: userData.state,
            postal_code: userData.postalCode,
            landmark: userData.landmark,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.log("Error updating data:", error);
    }
  };

  const handleEditChange = (field, text) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: text,
    }));
  };

  const navManager = () => {
    navigation.navigate("Manager1", { userData });
  }

  const logout = () => {
    updateUserID("");
    setLogin(false);
    navigation.navigate('Login', { screen: 'SignInScreen' });    
  }

  return (
    <View style={styles.containerw}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={userimg} style={styles.uicon} />
          <Text style={styles.utext}>Hello, {userData.name}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Order")}>
            <Text style={styles.buttonText}>Your Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          {userData.role != 'Customer' && (
            <TouchableOpacity style={styles.button} onPress={navManager}>
              <Text style={styles.buttonText} >Your Account</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cart")}>
            <Text style={styles.buttonText}>Your Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Resetpass")}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userDetailsContainer}>
          <View style={styles.detailsBox}>
            {renderEditableField('Name', userData.name, 'name')}
            {renderEditableField('Phone', userData.phone, 'phone')}
            {renderEditableField('Email', userData.email, 'email')}
            {renderEditableField('Door Number', userData.doorNumber, 'doorNumber')}
            {renderEditableField('Address Line 1', userData.addressLine1, 'addressLine1')}
            {renderEditableField('Address Line 2', userData.addressLine2, 'addressLine2')}
            {renderEditableField('City', userData.city, 'city')}
            {renderEditableField('State', userData.state, 'state')}
            {renderEditableField('Postal Code', userData.postalCode, 'postalCode')}
            {renderEditableField('Landmark', userData.landmark, 'landmark')}
          </View>
        </View>

        <View style={styles.buttonContainerbotom}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              toggleEditMode();
              updateUserData();
            }}
          >
            <Text style={styles.editButtonText}>
              {isEditMode ? 'Save All' : 'Edit All'}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={[styles.navbarIcon, styles.navbarIconHome1]}>
            <FontAwesomeIcon icon={faHome} size={25} color={'#1977F3'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
          <View style={[styles.navbarIcon, styles.navbarIconHome1]}>
            <FontAwesomeIcon icon={faBars} size={20} color={'#1977F3'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={[styles.navbarIcon, styles.navbarIconHome1]}>
            <FontAwesomeIcon icon={faShoppingCart} size={20} color={'#1977F3'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('User')}>
          <View style={[styles.navbarIcon, styles.navbarIconHome]}>
            <FontAwesomeIcon icon={faUser} size={20} color={'white'} />
          </View>
        </TouchableOpacity>
      </View>
      {/* Blue Bar */}
      <View style={styles.blueBar}></View>
    </View>
  );

  function renderEditableField(label, value, field) {
    return (
      <View style={styles.editableField}>
        <Text style={styles.editableLabel}>{label}</Text>
        {isEditMode ? (
          <View style={styles.editableInputContainer}>
            <TextInput
              style={styles.editableInput}
              value={value}
              onChangeText={(text) => handleEditChange(field, text)}
              editable={isEditMode}
            />
          </View>
        ) : (
          <View style={styles.editableValueContainer}>
            <Text style={styles.editableValue}>{value}</Text>
          </View>
        )}
        <View style={styles.lineBreak} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containerw: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: '5%',
    elevation: 10,
  },
  navbarIcon: {
    width: 15,
    height: 15,
    tintColor: '#1977F3',
  },
  navbarIconHome: {
    backgroundColor: '#1977F3',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: -10,
    borderBottomRightRadius: 21,
    borderBottomLeftRadius: 21,
    elevation: 5,
  },
  navbarIconHome1: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: -10,
    borderBottomRightRadius: 21,
    borderBottomLeftRadius: 21,
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
  buttonContainerbotom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: '6%',
    paddingHorizontal: 35,
    marginBottom: '20%',
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
    borderRadius: 1,
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

  lineBreak: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 3,
  },
});

export default User;