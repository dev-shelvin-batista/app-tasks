# Project details

Frontend project that allows you to manage simple tasks by storing information in an internal database with SQLite or in local storage.

|                |Version							|
|----------------|-------------------------------|
|Angular|`20.0.0`            |
|NPM          |`11.5.2`            |
|Node.js          |`22.14.0`|
|Ionic CLI          |`5.4.6`|
|SQLite          ||
|Android Studio          |`21.0.4`|
|Java JDK          |`20`|
|Gradle          |`9.0.0`|

## Important note 

The source code documentation and project structure were generated using the compodoc library, which generates a static web page that can be deployed on a server. In this case, it was deployed on GitHub. [Documentation](https://dev-shelvin-batista.github.io/ionic-sqlite-tasks/)

## Instructions for running on a PC

To run the frontend project, follow these steps:

- Clone the project, either with the command git clone `https://github.com/dev-shelvin-batista/ionic-sqlite-tasks.git` or using a GitHub graphical tool.

- After cloning the repository, install the node dependencies using the command `npm install` inside the `ionic-sqlite-tasks` project folder. If an error occurs, add the --force option.

- Run the command `ng serve` to start the server. By default, the url `http://localhost:8100` is used.

- In the browser, you can emulate how it would look on a mobile phone, but in this case, the database would not work, as it is a native dependency. That is why local storage is used in this test to perform tests from a PC.

## Instructions for running with a cell phone

To run the frontend project, follow these steps:

- Ensure that Java JDK, Gradle, and Android Studio are installed and configured on your PC.

- Clone the project, either with the command git clone `https://github.com/dev-shelvin-batista/ionic-sqlite-tasks.git` or using a GitHub graphical tool.

- After cloning the repository, install the node dependencies using the command `npm install` inside the `ionic-sqlite-tasks` project folder. If an error occurs, add the --force option.

- Your mobile phone must be in developer mode. To check this, select the Settings option on your mobile phone, find the About option, and select the mobile phone version or model six times.

- After activating developer mode, USB debugging must be enabled in Developer Options. The location of this option varies depending on the brand and model of the mobile phone being used.

Verify that the mobile phone connected via USB is recognized as a device by running the command `ionic cordova run android --list` in a command terminal. This command generates two types of devices: Connected via cable or Wi-Fi and Emulators. In this case, the mobile phone should appear in the first list.

- If there is only one device connected in the list above, you can run the command `ionic cordova run android --device`. But if there is more than one device connected, run the command `ionic cordova run android --target=<device_id>`. <device_id> is the ID generated in the list in the previous point. If an error occurs, use the **--verbose** option at the end of the command to display detailed information about the execution, the error, and its cause.

- When you run the above command, the application will be compiled and installed on your mobile phone, eliminating the need to compile the project, find the apk file, and transfer it to your mobile phone to install the application. When you install the application for the first time, you will be asked to authorize the installation of the application on your mobile phone. You must select the OK button each time it is displayed for installation.