import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView,KeyboardAvoidingView,Platform } from 'react-native';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import BottomBar from './BottomBar';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';

const Manager2 = ({ navigation }) => {
    const route = useRoute();
    const { item } = route.params;
    const [username, setusername] = useState(item['label']);
    const {BASE_URL}=useUserContext();
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
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/user/${username}/`);
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
                });
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
      <View style={styles.containerw}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.all}>
            <View style={styles.container}>
              <FontAwesomeIcon
                icon={faCircleUser}
                style={styles.icon}
                size={30}
              />
              <Text style={styles.headerText}>
                {userData.name} | {userData.role}
              </Text>
            </View>

            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.infoContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 10,
                  }}
                >
                  <Text style={styles.infoLabel}>Name:</Text>
                  <Text style={styles.infoText}>{userData.name}</Text>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.infoLabel}>Mobile Number:</Text>
                  <Text style={styles.infoText}>{userData.phone}</Text>
                </View>

                <View style={styles.addressContainer}>
                  <Text style={styles.infoLabel}>Address:</Text>
                  <View style={styles.addressDetails}>
                    <Text>Address Line 1:</Text>
                    <Text style={styles.infoText}>
                      {userData.addressLine1}, {userData.addressLine2}
                    </Text>
                  </View>
                  <View style={styles.addressDetails}>
                    <Text>Address Line 2:</Text>
                    <View style={styles.addressSubDetails}>
                      <Text style={{ color: "#666" }}>
                        CityName: {userData.city}
                      </Text>
                      <Text style={{ color: "#666" }}>
                        PinCode: {userData.postalCode}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>Referred:</Text>
                    <Text style={styles.referredText}>
                      {userData.down_leaf.length}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <BottomBar navigation={navigation} initialPage="Category" />
        <View style={styles.blueBar}></View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3E6FD',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: '#1977F3',
    },
    icon: {
        color: '#fff',
        marginRight: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    infoContainer: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    containerw: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 120,
        backgroundColor: '#1977F3',
        paddingBottom: 15,
    },
    blueBar: {
        backgroundColor: '#1977F3',
        height: 15,
        position: 'sticky',
        bottom: 60,
        left: 0,
        right: 0,
    },
    all: {
        backgroundColor: '#D3E6FD',
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#333',
    },
    infoText: {
        marginLeft: 10,
        color: '#666',
    },
    addressContainer: {
        marginTop: 15,
    },
    addressDetails: {
        flexDirection: 'column',
    },
    addressSubDetails: {
        marginLeft: 10,
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
    },
    addressText: {
        marginVertical: 10,
    },
    referredText: {
        backgroundColor: '#FFAC2F',
        color: '#fff',
        width: 150,
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 10,
    },
});

export default Manager2;
