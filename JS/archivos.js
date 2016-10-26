$(function(){

	firebase.initializeApp(configVars);

	$('#btnUploadFile').on('change', uploadFile);

	function uploadFile(e){

		console.log("evento");

		//Obtener archivo
		var file = e.target.files[0];

		// Crear referencia a storage (Directorio creado en firebase para subir los archivos)
		var storageRef = firebase.storage().ref("ImgsPreguntas/" + file.name);

		// Subir archivo y regresa tarea de estado
		var task = storageRef.put(file);

		// Actualizamos progreso
		task.on('state_changed', 

			function progress(snapshot){
				var porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Estado > " + snapshot.state);
				$('#uploader').val(porcentaje);
			},

			function error(err){
			 alert("Error subiendo archivo > " + err.message);

			},

			function complete(){
				console.log(task.snapshot.downloadURL);
			}

		);

	}



});	

