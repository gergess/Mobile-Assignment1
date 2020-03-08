/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Button,
  Header,
  View,
  Text,
  StatusBar,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { CameraKitCameraScreen } from 'react-native-camera-kit';


export default class App extends React.Component {
  state = { isPermitted: false };
  constructor(props) {
    super(props);
  }


    // return (
    //   <>
    //     <StatusBar barStyle="dark-content" />
    //     <SafeAreaView style={styles.container}>
    //       <View>
    //         <Text style={styles.title}>
    //           This layout strategy lets the title define the width of the button.
    //         </Text>
    //         <View style={styles.fixToText}>
    //           <Button onPress={OpenCamera}
    //             title="Take a Picture"
    //           />
    //           <Button onPress={OpenCamera}
    //             title="Reset Picture"
    //           />
    //         </View>
    //       </View>
    //     </SafeAreaView>
    //   </>
    // )
  };

function OpenCamera() {
  var that = this;
  if (Platform.OS === 'android') {
    async function requestCameraPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'CameraExample App Camera Permission',
            message: 'CameraExample App needs access to your camera ',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //If CAMERA Permission is granted
          //Calling the WRITE_EXTERNAL_STORAGE permission function
          requestExternalWritePermission();
        } else {
          alert('CAMERA permission denied');
        }
      } catch (err) {
        alert('Camera permission err', err);
        console.warn(err);
      }
    }
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'CameraExample App External Storage Write Permission',
            message:
              'CameraExample App needs access to Storage data in your SD Card ',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //If WRITE_EXTERNAL_STORAGE Permission is granted
          //Calling the READ_EXTERNAL_STORAGE permission function
          requestExternalReadPermission();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    async function requestExternalReadPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'CameraExample App Read Storage Read Permission',
            message: 'CameraExample App needs access to your SD Card ',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //If READ_EXTERNAL_STORAGE Permission is granted
          //changing the state to re-render and open the camera
          //in place of activity indicator
          that.setState({ isPermitted: true });
        } else {
          alert('READ_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Read permission err', err);
        console.warn(err);
      }
    }
    //Calling the camera permission function
    requestCameraPermission();
  } else {
    this.setState({ isPermitted: true });
  }
}

function onBottomButtonPressed(event) {
  const captureImages = JSON.stringify(event.captureImages);
  if (event.type === 'left') {
    this.setState({ isPermitted: false });
  } else {
    Alert.alert(
      event.type,
      captureImages,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  }
};
render(){
  if (this.state.isPermitted) {
    return (
      <CameraKitCameraScreen
        // Buttons to perform action done and cancel
        actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
        flashImages={{
          // Flash button images
          on: require('./assets/flashon.png'),
          off: require('./assets/flashoff.png'),
          auto: require('./assets/flashauto.png'),
        }}
        cameraFlipImage={require('./assets/flip.png')}
        captureButtonImage={require('./assets/capture.png')}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.OpenCamera.bind(this)}>
          <Text>Open Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
