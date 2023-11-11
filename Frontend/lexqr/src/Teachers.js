import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, FlatList, Modal, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import api_url from '../constants/api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

function Teachers({ route, navigation }) {
  const { username, password } = route.params;
  const [addLecture, setAddLecture] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [newLecture, setNewLecture] = useState({ name: '', time: '' });
  const [qrmodal, setQrmodal] = useState(false);
  const [subQr, setSubQr] = useState("");
  const [savedLectures, setSavedLectures] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [showAttendaceModal, setShowAttendaceModal] = useState(false);

//   useEffect(() => {
//     // Fetch attendances when the component mounts
//     // getAttendances("Surajtech");

//   }, []);
// console.log(attendances);



  async function getAttendances(subject) {
    const url = api_url + '/getattendancesteacher';
    const data = {
      username: username,
      password: password,
      subject: subject,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then((response) => response.json())
      .then((json) => {
        if(json.attendances.length == 0){
          ToastAndroid.show('No Attendances', ToastAndroid.SHORT);
          setShowAttendaceModal(false)

        }else{
        setAttendances([]);
        setAttendances(json.attendances);
        }
        // console.log(json);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log("attedance done" ));

  
  }

  console.log(attendances);

  const showSavedLectures = async () => {
    const data = {
      username: username,
      password: password,
    };

    const url = api_url + '/getsubjects';

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
      setSavedLectures(responseData.subjects);
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('Failed', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    showSavedLectures();
  }, []);

  const setQrInAsyncStorage = async (key, value) => {
    key = String(key);
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddLecture = () => {
    setAddLecture(true);
  };

  const handleSaveLecture = async () => {
    const url = api_url + '/setqrcode';
    const data = {
      username: username,
      password: password,
      teacher: 1,
      subject: newLecture.name,
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

      if (responseData.message === 'Qr setted') {
        ToastAndroid.show('Subject Added', ToastAndroid.SHORT);
        const keys = String(newLecture.name);
        const subQr = String(responseData.user.qr);
        setQrInAsyncStorage(keys, subQr);
      }
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('Signup Failed', ToastAndroid.SHORT);
    }

    setLectures([...lectures, newLecture]);
    setNewLecture({ name: '', time: '' });
    setAddLecture(false);
  };
 const handleAttendaceModal = async (sub) => {
    setShowAttendaceModal(true);
    getAttendances(sub);


 }
  const renderItem = ({ item }) => (
    <View style={styles.lectureItem}>

      <View style={{width:80}}>
      <Text style={styles.renderText}>{item.name}</Text>
      </View>
      <TouchableOpacity onPress={() => handleAttendaceModal(item.subject) } >
          <Text style={{ color: "#ca6ac6" }}> Show Attendace </Text>
        </TouchableOpacity>

      <Button title="Show QR" onPress={async () => await handleQr(item.name)} />
    </View>
  );

  const renderSavedLectures = ({ item }) => (
    <View style={styles.savedLectureItem}>
      <View style={{width:80}}>
      <Text style={styles.renderText}>{item.subject}</Text>
      </View>
     
        <TouchableOpacity onPress={() => handleAttendaceModal(item.subject) } >
          <Text style={{ color: "#ca6ac6" }}> Show Attendace </Text>
        </TouchableOpacity>
     
      <Button title="Show QR" onPress={async () => await handleQr(item.subject)} />
    </View>
  );

  const handleQr = async (name) => {
    const qr = await AsyncStorage.getItem(name);
    setSubQr("");
    setSubQr(qr);
    setQrmodal(true);
  };
  const renderAttendace = ({ item }) => (
    <View style={styles.attendanceItem}>
      <Text style={styles.renderText} >Date: {item.date}</Text>
      <Text style={styles.renderText} >Subject: {item.subject}</Text>
      <Text style={styles.renderText} >Time: {item.time}</Text>
      <Text style={styles.renderText} >name: {item.username}</Text>
      {/* Add other information to display for each item */}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.addLecture}>
        <Button title="Add Lecture" onPress={handleAddLecture} />
      </View>

      <FlatList
        data={lectures}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <FlatList
        data={savedLectures}
        renderItem={renderSavedLectures}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <Text style={styles.sectionHeader}>Saved Lectures</Text>}
      />

      <Modal visible={qrmodal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <QRCode value={subQr} />
            <Button title="Cancel" onPress={() => setQrmodal(false)} />
          </View>
        </View>
      </Modal>
      
      <Modal visible={showAttendaceModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList 
            data={attendances}
            renderItem={renderAttendace}
            keyExtractor={(item) => item.id.toString()}
            />
            <Button title="Cancel" onPress={() => setShowAttendaceModal(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={addLecture} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.renderText}>Add New Lecture</Text>
            <TextInput
              placeholder="Subject"
              placeholderTextColor={'black'}
              value={newLecture.name}
              style={{ color: 'black' }}
              onChangeText={(text) => setNewLecture({ ...newLecture, name: text })}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Button title="Save" onPress={handleSaveLecture} />
              <Button title="Cancel" onPress={() => setAddLecture(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  renderText: {
    color: 'black',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  attendanceItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: 250,
  },
  addLecture: {
    zIndex: 10,
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 200,
    height: 50,
  },
  lectureItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  savedLectureItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default Teachers;
