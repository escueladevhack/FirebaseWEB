
$(function(){	

	firebase.initializeApp(configVars);

	$('#btnCrearCuenta').click(clickCrearCuenta);

	function clickCrearCuenta(){

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

		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result){
			result.sendEmailVerification();
			window.location.href = "../index.html"
		}).catch(function(error){
			alert("Error al crear la cuenta => " + error.code + " " + error.message);
			return;
		});

		alert('Para poder terminar el proceso por favor verifica tu cuenta');
	}	
	
	
});