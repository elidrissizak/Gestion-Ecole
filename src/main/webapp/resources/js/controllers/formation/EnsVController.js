


'use strict';
App.controller('ensvController', ['$scope', 'ensvService', function($scope, ensvService) {
    var self = this;
    self.ensv={id:null,cin:'',firstName:'',lastName:'',password:'', adresseUtilisateur:'',email:''};
    self.ensvshow={id:null,cin:'',firtsName:'',lastName:'',password:'', adresseUtilisateur:'',email:''};
    self.ensvs=[];
    $scope.showMe = false;
    self.getOneEnsv = function(id){
    	ensvService.getOneEnsv(id)
    	 .then(
                function(d) {
                     self.ensvshow = d;
                     console.log("hada hhhhhhhhh:"+self.ensvshow);
                },
                 function(errResponse){
                     console.error('Error while fetching Currencies');
                 }
        );
    };
    
    self.fetchEnsvs = function(){
    	ensvService.fetchEnsvs()
            .then(
                         function(d) {
                              self.ensvs = d;  
                   
                         },
                          function(errResponse){
                              console.error('Error while fetching Currencies');
                          }
                 );
    };
    
    
    self.createEnsv = function(){
    	ensvService.createEnsv(self.ensv)
                .then(
                self.fetchEnsvs, 
                        function(errResponse){
                             console.error('Error while creating ensv.');
                        } 
            );
    };

   self.updateEnsv = function(ensv, id){
	   ensvService.updateEnsv(ensv, id)
                .then(
                        self.fetchEnsvs, 
                        function(errResponse){
                             console.error('Error while updating ensv.');
                        } 
            );
    };

   self.deleteEnsv = function(id){
	   ensvService.deleteEnsv(id)
                .then(
                        self.fetchEnsvs, 
                        function(errResponse){
                             console.error('Error while deleting ensv.');
                        } 
            );
    };

    self.fetchEnsvs();
    
    self.update = function(){
    	console.log('updating d\'un ensv'+self.ensv.id);
    	self.updateEnsv(self.ensv, self.ensv.id);
    	self.reset();
    };
    
    self.add=function(){
    	if(self.ensv.id===null){
            console.log('Saving New student', self.ensv);    
            self.createEnsv(self.ensv);
        }else{
            self.updateEnsv(self.ensv, self.ensv.id);
            console.log('ensv updated with id ', self.ensv.id);
        }
        self.reset();
    };
    
//    self.submit = function() {
//        if(self.etudiant.id===null){
//            console.log('Saving New student', self.etudiant);    
//            self.createEnsv(self.etudiant);
//        }else{
//            self.updateStudent(self.etudiant, self.etudiant.id);
//            console.log('student updated with id ', self.etudiant.id);
//        }
//        self.reset();
//    };
         
    self.edit = function(id){
        for(var i = 0; i < self.ensvs.length; i++){
            if(self.ensvs[i].id == id) {
               self.ensv = angular.copy(self.ensvs[i]);
               break;
            }
        }
    };
    
    self.remove = function(id){
        console.log('id to be deleted', id);
        self.deleteEnsv(id);
    };

     self.show=function(id){
    	 self.getOneEnsv(id);
    	 $scope.showMe = !$scope.showMe;
     };
     
    self.reset = function(){
        self.ensv={id:null,cin:'',firstName:'',lastName:'', adresseUtilisateur:'',password:'',email:''};
        $scope.myForm.$setPristine(); //reset Form
    };

}]);