# Android SDK setup

## Install Java

```bash
sudo apt-get update
sudo dpkg --add-architecture i386
sudo apt-get install libbz2-1.0:i386
sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1
sudo apt-get install openjdk-8-jdk openjdk-8-jre
```W

Add JAVA_HOME to path via ~/.bashrc

```bash
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
```



## Install Android Studio
Download ZIP archive for Linux from: https://developer.android.com/studio/install.html
1. move the .zip to /opt
2. extract it
3. chown the folder to your name
4. chmod 777 studio.sh and run it for the installer

Now the android sdk is installed to ~/Android/Sdk
It's preferred to add ~/Android/Sdk folders to your path:

```bash
export PATH=${PATH}:~/Android/Sdk/tools
export PATH=${PATH}:~/Android/Sdk/platform-tools
```

Run `android`, install the images (atom, etc) and then navigate to Tools -> Manage AVDs and create a new image
Make sure to install the android-23 version and confirm it exists in ~/Android/Sdk/platforms/




# Ionic setup

## Pre-requisties
* Node.js v6
* npm v3

# Install latest cordova and ionic from npm

```bash
npm install -g cordova ionic
```

# Running aplication

```bash
npm install 
ionic serve
```

