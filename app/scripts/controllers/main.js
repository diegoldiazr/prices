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
  	function ($scope) {
  		/*
    */
   
   

   
   function downloadFile() {
  		
  		 var xhr = new XMLHttpRequest();
		  xhr.responseType = 'text';

		 

		  xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
		  xhr.setRequestHeader('Authorization', 'Bearer ' + '7OXgJuyulmMAAAAAAAACOfKo-5z3lmnIkeFZ8QjZqXXiZGxtZmjmoztvVNss24lH');
		  xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
		    path: '/' +  'articulos.json'
		  }));
		  xhr.onreadystatechange = function() {//Call a function when the state changes.
			    if(xhr.readyState === 4 && xhr.status === 200) {
			        //alert(xhr.response);			       
			        cargado(xhr.responseText, $scope);
			    }			    
			};
		  xhr.send();
	}

	function cargado(response, $scope){
		$scope.articulos = JSON.parse(response) || [];
		//alert("cargado");
		//$scope.isLoading = false;
	
	}

	function modificarDropbox(){
		var file = new Blob([JSON.stringify($scope.articulos)], {type: 'text'});
		

		var xhr = new XMLHttpRequest();

		xhr.upload.onprogress = function(evt) {
		    //var percentComplete = parseInt(100.0 * evt.loaded / evt.total);
		    // Upload in progress. Do something here with the percent complete.
		    
		};

		xhr.onload = function() {
		    if (xhr.readyState === 4 && xhr.status === 200) {
		        var fileInfo = JSON.parse(xhr.response);
		        // Upload succeeded. Do something here with the file info.
		        console.log('se ha subido el archivo');
		        
		    }
		    else {
		        var errorMessage = xhr.response || 'Unable to upload file';
		        // Upload failed. Do something here with the error.
		        console.log('error al subir el archivo');
		    }
		};

		xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
		xhr.setRequestHeader('Authorization', 'Bearer ' + '7OXgJuyulmMAAAAAAAACOfKo-5z3lmnIkeFZ8QjZqXXiZGxtZmjmoztvVNss24lH');
		xhr.setRequestHeader('Content-Type', 'application/octet-stream');
		xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
		    path: '/' +  'articulos.json',
		    mode: 'overwrite',
		    autorename: true,
		    mute: false
		}));

		xhr.send(file);
	}
   	   	
    $scope.borrar = function(index){
    	$scope.articulos.splice(index, 1);
    	modificarDropbox();
    };


    $scope.modificar = function(row){
    	console.log($scope.articulos);
    	console.log(row);
    	modificarDropbox();
    	/**
		 * Two variables should already be set.
		 * dropboxToken = OAuth token received then signing in with OAuth.
		 * file = file object selected in the file widget.
		 */
		
		
		
    };

    $scope.obtenerDatos = function(){
      
	  
	  //$scope.isLoading = true;

	  downloadFile();
	  
	  
	};

	$scope.aniadir = function(){
		var articuloVacio = {
			id : 0,
			articulo : '',
			unidades : 1,
			pt1 : 0.00,
			pu1 : 0.00,
			pt2 : 0.00,
			pu2 : 0.00,
			pt3 : 0.00,
			pu3 : 0.00,
			pt4 : 0.00,
			pu4 : 0.00
		};
		$scope.articulos.push(articuloVacio);
	};

	

   	downloadFile();
	

  }]);
