importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.21.0/firebase-messaging.js');
  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyBpbLttegKdpK7CM4cphf0PxDQimE4aRNk",
      authDomain: "hoteles-1f374.firebaseapp.com",
      databaseURL: "https://hoteles-1f374.firebaseio.com",
      projectId: "hoteles-1f374",
      storageBucket: "hoteles-1f374.appspot.com",
      messagingSenderId: "178807558618",
      appId: "1:178807558618:web:24fbca31f725df13ecb0e3",
      measurementId: "G-PWRL47BVZZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  var _payload = JSON.parse(payload.data.info);
  const notificationTitle = _payload.whatsapp;
  const notificationOptions = {
    body: _payload.mensaje,
    icon: "logo.png"
  };
  //console.log(self);
  //return self.registration.showNotification(notificationTitle, notificationOptions);
  //console.log(payload.data);
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
  .then((windowClients) => {
    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      windowClient.postMessage(payload.data);
    }
  })
  .then(() => {
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
});

