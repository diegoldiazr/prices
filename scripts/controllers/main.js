'use strict';

/**
 *
 * http://stackoverflow.com/questions/34399049/dropbox-direct-upload-files-from-browser
 *
 * https://blogs.dropbox.com/developers/2016/03/how-formio-uses-dropbox-as-a-file-backend-for-javascript-apps/
 *
 * https://github.com/formio/ngFormio/blob/master/src/plugins/storage/dropbox.js
 *  
 */
/**
 * @ngdoc function
 * @name pricesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pricesApp
 */
angular.module('pricesApp')
  .controller('MainCtrl', [
	'$scope',	
	'$http',
  	function ($scope, $http) {
      
   $scope.estaCargando = false;   
   $scope.estaGuardando = false;

	function downloadFile(){		
		$scope.estaCargando = true;
		$http(
			{
			method : 'POST',
			url: 'https://content.dropboxapi.com/2/files/download',
			headers:{
				'Authorization': 'Bearer 7OXgJuyulmMAAAAAAAACOfKo-5z3lmnIkeFZ8QjZqXXiZGxtZmjmoztvVNss24lH',
				'Dropbox-API-Arg': '{\"path\":\"/articulos.json\"}'
			}
		})
		.then(function successCallback(data) {		       			       
		    $scope.articulos = data.data || [];
		    $scope.estaCargando = false;
   			//$scope.estaCargando = false;   			
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    alert("La carga del archivo ha fallado.");
		});
	}
	

	function modificarDropbox(){	
		$scope.estaGuardando = true;
		var file = new Blob([JSON.stringify($scope.articulos)], {type: 'text'});		
		//$http.defaults.headers.common['Content-Type'] = 'application/octet-stream';
		$http(
			{
			method : 'POST',
			url: 'https://content.dropboxapi.com/2/files/upload',
			data:file,
			headers:{
				'Authorization': 'Bearer 7OXgJuyulmMAAAAAAAACOfKo-5z3lmnIkeFZ8QjZqXXiZGxtZmjmoztvVNss24lH',
				'Content-Type': 'application/octet-stream',
				'Dropbox-API-Arg': '{\"path\":\"/articulos.json\", \"mode\":\"overwrite\",\"autorename\":true,\"mute\":false}'
			}
			
		})
		.then(function successCallback(data) {		       			       
		    
		    console.log('se ha subido el archivo');
		    console.log(data);
		    $scope.estaGuardando = false;
   			//$scope.estaCargando = false;   			
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    alert("La carga del archivo ha fallado.");
		});
	}

	   	   	
    $scope.borrar = function(row){    	
    	//el borrado hay que hacerlo manual por el nombre del producto.
    	//recorremos el array y vamos añadiendo a ese array todos los elementos menos el que tenemos que borrar
    	var arrayResultado = [];
    	$scope.articulos.forEach(function(element, index){
    		if(element.articulo != row.articulo){
    			arrayResultado.push(element);
    		}
    	});

    	//finalmente volcamos los datos
    	$scope.articulos = arrayResultado;
    	//guardamos el fichero
    	modificarDropbox();
    };


    $scope.modificar = function(row){    	
    	modificarDropbox();        	
    };

    $scope.obtenerDatos = function(){      	  	  	  	 
	  downloadFile();
	};

	$scope.aniadir = function(){
		var articuloVacio = {
			id : 0,
			articulo : '',
			unidades : 1,
			pt1 : '',
			pu1 : '',
			pt2 : '',
			pu2 : '',
			pt3 : '',
			pu3 : '',
			pt4 : '',
			pu4 : ''
		};
		$scope.articulos.push(articuloVacio);
	};
		

	//realizamos la carga inicial
	downloadFile();

  }]);