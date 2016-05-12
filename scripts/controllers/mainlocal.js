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
  .controller('MainLocalCtrl', [
	'$scope', 
  	function ($scope) {
  		/*
    */
   
   $scope.articulos = [];
   
   function downloadFile() {
  		cargado(JSON.parse(localStorage.getItem('articulos')));
	}

	function cargado(response){

		$scope.articulos = response || [];
		//$scope.isLoading = false;
		
	}

   
	//$scope.isLoading = true;
	downloadFile();	


    $scope.borrar = function(index){
    	$scope.articulos.splice(index, 1);
    	localStorage.setItem('articulos', JSON.stringify($scope.articulos));
    };

    $scope.modificar = function(row){
    	console.log($scope.articulos);
    	console.log(row);
    	/**
		 * Two variables should already be set.
		 * dropboxToken = OAuth token received then signing in with OAuth.
		 * file = file object selected in the file widget.
		 */
		
		
		localStorage.setItem('articulos', JSON.stringify($scope.articulos));
		
		
    };

    $scope.obtenerDatos = function(){
      
	  $scope.articulos = [];
	  //$scope.isLoading = true;

	  downloadFile();
	  
	  
	};

	$scope.aniadir = function(){
		var articuloVacio = {
			id : 0,
			articulo : '',
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

	

  }]);
