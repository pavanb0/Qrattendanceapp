import React, { useState, useEffect } from 'react';
import { Button, View, Text, ToastAndroid, StyleSheet, FlatList } from 'react-native';
import api_url from '../constants/api_url';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

function Students({ route, navigation }) {
  const { username, password } = route.params;
  const [attendances, setAttendances] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState('');
  useEffect(() => {
    // Fetch attendances when the component mounts
    getAttendances();
  }, []);
 



  async function getAttendances() {
    const url = api_url + '/getattendances';
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setAttendances(responseData.attendances);
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('Error in networking', ToastAndroid.SHORT);
    }
  }

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.attendanceItem}>
      <Text style={styles.textRender} >Date: {item.date}</Text>
      <Text style={styles.textRender} >Subject: {item.subject}</Text>
      <Text style={styles.textRender} >Time: {item.time}</Text>
      {/* Add other information to display for each item */}
    </View>
  );

  const handleAttend = async () => {
    console.log("handleAttend");
    setIsScanning(true);

  }
  console.log(scannedData);
  
  // app.post("/setattendances", (req, res) => {
  //   const {username, password,subject,qr} = req.body;
  const handleScan = async () => {
    console.log("handleScan");
    const url = api_url + '/setattendances';
    const data = {
      username: username,
      password: password,
      qr: scannedData,
    };
    console.log(data);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Attendance marked") {
          ToastAndroid.show("Attendance setted ", ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        ToastAndroid.show("Signup Failed", ToastAndroid.SHORT);
      });
  }



  return (
    <View style={{ flex: 1 }}>
      {/* Button to refresh attendances */}
    {isScanning ? (
      <>
        <View>

          <QRCodeScanner
          onRead={(event) => {
            // Handle the scanned data, e.g., set it in state
            setScannedData(event.data);
            handleScan().then(() => {
            setIsScanning(false); // Stop scanning after successful read
            });
          }}
          
          />
        <Button title="Stop Scanning" onPress={() => {setIsScanning(false)}} />
      </View>
      </>
    ):(
      <>
      {/* FlatList to display attendances */}
      <Button title='Refresh' onPress={getAttendances} />
      <FlatList
        data={attendances}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.attendButton} > 
        <Button title="Attend" onPress={() => {handleAttend()}} />
      </View>
      </>
    )}



    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 16,
  },
  attendButton: {
    zIndex: 10,
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 200,
    height: 50,

  },
  attendanceItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textRender:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  }
});

export default Students;
