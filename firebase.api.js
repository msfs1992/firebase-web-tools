var ApiFirebase = function(){
	this.firebaseMessaging = null;
	this.firebaseConfig = {
	    apiKey: "AIzaSyBpbLttegKdpK7CM4cphf0PxDQimE4aRNk",
	    authDomain: "hoteles-1f374.firebaseapp.com",
	    databaseURL: "https://hoteles-1f374.firebaseio.com",
	    projectId: "hoteles-1f374",
	    storageBucket: "hoteles-1f374.appspot.com",
	    messagingSenderId: "178807558618",
	    appId: "1:178807558618:web:24fbca31f725df13ecb0e3",
	    measurementId: "G-PWRL47BVZZ"
	};
  this.soundNewNotification = new Audio('bell.mp3');
};
ApiFirebase.prototype.suscribeUser = function(){
    var _data = {
    	token: localStorage.getItem("firebase_token")
    };
    tools.XHR(_data, 'msn-suscribe-topic',function(response){

    }, false);
};
ApiFirebase.prototype.allowNotifications = function(){
	var thread = this;
    Notification.requestPermission(function(){
    }).then(function(){
        return thread.firebaseMessaging.getToken();
    }).then(function(token){
    	console.log("Firebase Token: "+token);
        localStorage.setItem("firebase_token", token);
        thread.suscribeUser();
    }).catch(function(err){
        console.log(err);
      });
      // Callback fired if Instance ID token is updated.
    thread.firebaseMessaging.onTokenRefresh(function() {
      thread.firebaseMessaging.getToken().then(function(refreshedToken) {
      	console.log("Refreshed Token: "+refreshedToken);
        localStorage.setItem("token", refreshedToken);
      }).catch(function(err) {
      });
    });
};
ApiFirebase.prototype.SetupFirebase = function(){
	var thread = this;
    firebase.initializeApp(thread.firebaseConfig);
    //firebase.analytics();
    thread.firebaseMessaging = firebase.messaging();
    navigator.serviceWorker.register('./firebase-messaging-sw.js?v=5.3')
    .then(function(registration){
      thread.firebaseMessaging.useServiceWorker(registration);
      thread.allowNotifications();
      navigator.serviceWorker.addEventListener('message', function(event) {
      	console.log(event);
        thread.handleReceivedMessage(event.data);
      });
      // Request permission and get token.....
    });
    thread.firebaseMessaging.onMessage(function(payload){
      console.log('Message received. ', payload);
      //wpanel.handleReceivedMessage(payload.data);
    });
};
ApiFirebase.prototype.handleReceivedMessage = function(payload){
  console.log(global_view)
  if(payload.data.conv == undefined || global_view != "messaging"){
    var mensaje = payload.data.mensaje;
    this.soundNewNotification.play();
    Materialize.toast(mensaje, 4000);
  }
};
var api = new ApiFirebase();
api.SetupFirebase();