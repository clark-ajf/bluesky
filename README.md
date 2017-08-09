# The Ionic BlueSky App (SEEKER)

**Pre-requisites:**
* Node (version 8 or greater)
* NPM (version 5 or greater)
* Android SDK (Android Studio) for Android deployment
* XCode for iOS deployment

**Android SDK and XCode configurations could be found in [Ionic Documentation](https://ionicframework.com/docs/intro/deploying/)**

**Setting up your local environment:**

Add the Global Dependencies
```bash
npm install -g ionic cordova
```
*This project was built using ionic version 3.7.0

To preview the application in your browser run: *(This provides limited functionalities, excluding all phone native features like Google Plus SignUp, Camera and QR Reader)*
```bash
ionic serve --lab
```
*(The first time you run it, it will add the npm packages. There is not need to run npm install separately)*

To deploy the app in your device run:
```bash
#Android
ionic cordova run android --device
#iOS
ionic cordova run ios --device
```

For Android, update the file under platforms/android: project.properties by adding the following lines:

```bash
target=android-25
android.library.reference.1=CordovaLib
keyPassword=android
storePassword=android
keyAlias=androiddebugkey
storeFile=../../debug.keystore
```

Is also recommended to add an additional file into platforms/android called debug-signing.properties

Finally, that certificate is associated with our BlueSky account in GCP. You can replace it with your own by following the instructions in the [Google Plus Plugin repo](https://github.com/EddyVerbruggen/cordova-plugin-googleplus) where you will also find the instructions for iOS.

**Packages dependencies:**

The project has all the packages versions fixed to the latest version that has been tested. WE DO NOT GUARANTEE IT WILL WORK WITH OTHER VERSIONS. 