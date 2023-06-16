# Todo's and Notes app with authentication
  This app is build on the Model View Controller (MVC) model. 
  And for authentication, I have implemented the passportJs local strategy.

## App live at :
https://todo-app-x9ad.onrender.com

## Before deploying 
1. Added 👇 in package.json file 

"engines": {
    "node": ">=14.20.1"
  },

2. In environment variable added 👇
    NODE_ENV: Production

NODE_ENV is used to specify the runtime environment in which your application is running.

* When you set NODE_ENV to "Production", it indicates that your application is running in a production environment. This typically means that your application is deployed and being used by actual users or clients.

* Setting NODE_ENV to "Production" can have several effects on your application, depending on how you have configured your codebase and dependencies. Here are some common behaviors associated with the production environment:

1. Performance optimizations: In the production environment, you may want to enable various performance optimizations such as caching, bundling, and minification to improve the speed and efficiency of your application.

2. Error handling: Error handling and logging mechanisms may be configured differently in the production environment. Errors might be logged to a file or a centralized logging system, and detailed error messages may be suppressed to prevent potentially sensitive information from being exposed to end users.

3. Debugging information: Debugging information, such as stack traces, might be limited or omitted altogether in the production environment to minimize the risk of security vulnerabilities and provide a cleaner user experience.

4. Different database connections: You might use a separate database or database configuration for production to ensure data integrity and isolation from development or testing environments.

5. Enhanced security measures: In the production environment, additional security measures, such as stricter access controls, SSL certificates, and intrusion detection systems, may be employed to safeguard your application and its data.

# To run in your local machine:
    * clone the code
    * do "npm install"
    * put the database uri you want to connect in .env file
    * and any SESSION_SECRET in the .env file
    * do "npm start"

NOTE: To make the app safe, have proper error catching at places.