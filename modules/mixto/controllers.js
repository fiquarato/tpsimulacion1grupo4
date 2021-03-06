'use strict';

angular.module('Mixto', ["chart.js"])
.controller('MixtoController', 
  function ($scope, $confirm, $uibModal, Notification) {


    $scope.colors = ['#E54125', '#059BFF', '#4BC0C0', '#FFCE56', '#E7E9ED'];

    $scope.dataSeries = ['Numeros Aleatorios'];
    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };
    $scope.datasetOverride = [{
      yAxisID: 'y-axis-1'
    }];
    $scope.options1 = {
      scales: {
        yAxes: [{
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    $scope.disabledButton = false;
    $scope.semilla = null;

    $scope.randomMultiplicativo = function(ini, fin, cantidad, sem, modulo, a, c, intervalos){

      $scope.semilla = sem;

      $scope.labels = new Array();
      $scope.series = new Array();
      $scope.data = new Array();
      $scope.randoms = new Array();

      if(fin<=ini) {
        Notification.error({message: 'A (inicio) debe ser menor que B (fin)', delay: 3000,  replaceMessage: true});
        return;
      }

      if(cantidad<=0) {
        Notification.error({message: 'Debe introducir una cantidad correcta', delay: 3000,  replaceMessage: true});
        return;
      }

      var paso = (fin-ini)/intervalos;
      var min = ini;

      for (var i = 1; i <= intervalos; i++) {
       min = min + paso;
       $scope.labels.push(min);
       $scope.data.push(0);
     }

     for (var i = 0; i < cantidad; i++) {
      var labels = $scope.labels;
      var aux = $scope.semilla/modulo;
      $scope.semilla = ((a*$scope.semilla)+c)%modulo;
      var random = (ini + aux*(fin-ini)).toFixed(2);
      if($scope.randoms.length < 5000) {
        $scope.randoms.push(random);
      }
      for(var j = 0; j < labels.length; j++){
        if(random <= labels[j]){
          $scope.data[j]++;
          break;
        }
      }
    }

    for (var i = 0; i < $scope.labels.length; i++) {
     $scope.series.push(($scope.labels[i]-(paso/2)).toFixed(2));
   }
   if($scope.data.length > 0){
    $scope.disabledButton = true;
   }
 };

 $scope.random1 = function(ini, fin, modulo, a, c){
  var aux = $scope.semilla/modulo;
  $scope.semilla = ((a*$scope.semilla)+c)%modulo;
  var random = (ini + aux*(fin-ini)).toFixed(2);
  if($scope.randoms.length < 5000) {
    $scope.randoms.push(random);
  }
  for(var j = 0; j < $scope.labels.length; j++){
    if(random <= $scope.labels[j]){
      $scope.data[j]++;
      break;
    }
  }

};

$scope.pruebaChi = function(alfa, cantidad, intervalos){

  if(alfa<0 || alfa >1) {
    Notification.error({message: 'Alfa debe estar entre 0 y 1', delay: 3000,  replaceMessage: true});
    return;
  }
  
  var frecuenciaEsperada = cantidad/intervalos;
  $scope.suma = 0;
  $scope.arrayChi = new Array();

  for(var i = 0; i < $scope.data.length; i++){
    var aux = (Math.pow($scope.data[i]-frecuenciaEsperada, 2))/frecuenciaEsperada;
    $scope.arrayChi.push(aux);
    $scope.suma = $scope.suma+aux;
  }

  $scope.gdl = intervalos - 2 - 1;

  $scope.chi = jStat.chisquare.inv(1-alfa,$scope.gdl);
  if($scope.suma<$scope.chi){
    $scope.verifica = 'VERDADERO'
  }
  else {
    $scope.verifica = "FALSO"
  }
};

});
