$(function(){

	firebase.initializeApp(configVars);

	$('#btnUploadFile').on('change', uploadFile);

	function uploadFile(e){

		//Obtener archivo
		var file = e.target.files[0];

		// Crear referencia al storage (Directorio creado en firebase para subir los archivos)
		var refStorage = firebase.storage().ref("imgsPreguntas/"+file.name);

		// Subir archivo y regresa tarea de estado
		var task = refStorage.put(file);

		var database = firebase.database();

		// Actualizamos progreso
		task.on('state_changed',

				function progress(snapshot){
					var porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(snapshot.state);
					$('#uploader').val(porcentaje);
				},

				function error(err){
					alert("Error > "+err.message);
				},

				function complete(){
					console.log(task.snapshot.downloadURL);

					var ref = database.ref('files');

					ref.push({
						nombre:file.name,
						url:task.snapshot.downloadURL
					});

				}
			);

	}

	function addItem(nombreArchivo, url){
		var plantilla = '<li><a href="'+url+'">'+nombreArchivo+'</a></li>'
		$("#listaArchivos").append(plantilla);
	}

	var database = firebase.database();
	var ref = database.ref("files");

	ref.on("child_added", function(snapshot){
		var valores = snapshot.val();
		var refFile = firebase.storage().ref("imgsPreguntas/"+valores.nombre);

		refFile.getDownloadURL().then(function(url){
			addItem(valores.nombre, url);
		}).catch(function(error){
			alert("Error > "+error.message);
		});

		
	});



});	

