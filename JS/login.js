
$(function(){	

	firebase.initializeApp(configVars);
		
	$('#btnLoginTwitter').click({redSocial:"twitter"}, clickAutenticar);

	$('#btnLoginFacebook').click({redSocial:"facebook"}, clickAutenticar);	

	$('#btnIngresar').click(clickIngresar);

	function clickIngresar(){

		var email = $('#txtEmailLogin').val();
		var password = $('#txtPasswordLogin').val();

		if(email === ''){
			alert('Por favor digita un correo electronico');
			return;
		}

		if(password === ''){
			alert('Por favor digita un password');
			return;
		}

		firebase.auth().signInWithEmailAndPassword(email, password).then(function(result){
			console.log(result);

			if(result.emailVerified){
				
				var token = result.refreshToken;		  

			  	sessionStorage.setItem('token', token);
				sessionStorage.setItem('profileImageURL', result.photoURL);
				sessionStorage.setItem('displayName', result.displayName);

				window.location.href = "Pages/ppal.html"
			}
			else{
				alert('Por favor revisar tu correo para realizar la verificación');
			    return;
			}

		}).catch(function(error){
			alert(error.code + " " + error.message);
			return;
		});

	}


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
	  		alert('ERROR => '+ errorMessage);
	  		console.log('ERROR => '+ errorMessage);

		});				


	}	
	
});