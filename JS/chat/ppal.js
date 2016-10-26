
$(function(){  

  firebase.initializeApp(configVars);

	$('#btnEnviarMsj').click(clickEnvio);
	$('#imgAvatar').attr('src', sessionStorage.getItem('profileImageURL'));
	$('#txtNombre').val(sessionStorage.getItem('displayName'));
  $('#txtNombre').prop('disabled', true);  

	$('#imgAvatar').click(clickSalir);

  function clickSalir(){

    console.log("Salir");

    firebase.auth().signOut().then(function() {

        sessionStorage.removeItem('token');
        sessionStorage.removeItem('secret');        
        window.location.href = "../index.html"; 

    }, function(error) {
        console.log(error);
    });

  }

	function clickEnvio(){
        var nombre = $("#txtNombre").val();
        var mensaje = $("#txtMensaje").val();

        $("#txtMensaje").val("");

        var database = firebase.database();

        var f = new Date();

        database.ref('questions').push({
          autor:nombre,
          pregunta:mensaje,
          imagen:sessionStorage.getItem('profileImageURL'),
          fecha: f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()
        });
	}

  var refQuestion = firebase.database().ref('questions');

  refQuestion.on("child_added", function(data){
    var values = data.val();
    var estilo = "";
    if(values.autor === $("#txtNombre").val()){ estilo = 'me'}
    $(".cont-mensaje-timeline").prepend(getTemplate(values.autor, values.pregunta, estilo, values.imagen));

  });

	function getTemplate(autor, mensaje, estilo, imagen){
		var plantilla = '<div class="msg ' +
               estilo +
               '">' +
               '<figure class"imgChat"> <img id="imgChatAvatar" src="'+ imagen +
               '" alt="Avatar"></figure>' +
               '<b>' + autor + '</b>' +
               '<p>' + mensaje + '</p>' +
               '</div>';

		return plantilla;
	}

});