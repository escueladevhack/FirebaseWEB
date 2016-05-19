
$(function(){	

	firebase.initializeApp(configVars);
		
	$('#btnLoginTwitter').click({redSocial:"twitter"}, clickAutenticar);

	$('#btnLoginFacebook').click({redSocial:"facebook"}, clickAutenticar);	

	function clickAutenticar(event){		

		var redSocial = event.data.redSocial;

		var provider = new firebase.auth.TwitterAuthProvider();
		
		if(redSocial === "facebook"){
			provider = new firebase.auth.FacebookAuthProvider();					
		}

		firebase.auth().signInWithPopup(provider).then(function(result){

			var token = result.credential.accessToken;
		  	var secret = result.credential.secret;

		  	console.log(result);		  	

		  	sessionStorage.setItem('token', token);
		  	sessionStorage.setItem('secret', secret);
			sessionStorage.setItem('profileImageURL', result.user.photoURL);
			sessionStorage.setItem('displayName', result.user.displayName);

			window.location.href = "Pages/ppal.html"

		}).catch(function(error){
			var errorCode = error.code;
	  		var errorMessage = error.message;
	  		var email = error.email;
	  		console.log('ERROR => '+ errorMessage);

		});				


	}	
	
});