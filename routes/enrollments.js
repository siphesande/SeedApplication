
exports.show =function (req, res, next){
    req.getConnection(function(err, connection){
        if (err) return next(err);
		    connection.query('SELECT * from Schools',[], function(err, Schools){
            connection.query('SELECT * from ComputerLanguages' ,[], function(err, ComputerLanguages){
                connection.query('SELECT Enrollments.Id,Schools.School_name, ComputerLanguages.ComputerLanguage_name, DATE_FORMAT(Enrollments.enrollment_date, "%d/%l/%Y") as enrollment_date , Enrollments.Numbers, Enrollments.enrollment_price FROM Enrollments INNER JOIN ComputerLanguages ON Enrollments.ComputerLanguage_Id = ComputerLanguages.Id INNER JOIN Schools ON Enrollments.School_Id = Schools.Id ORDER BY Id DESC' ,[], function(err, enrollments){
            	      if (err) return next(err);
            	      res.render('enrollments', {
            	      no_enrollments : enrollments.length === 0,
            	      Schools : Schools,
            	      ComputerLanguages : ComputerLanguages,
                    enrollments : enrollments
            	      });
                });
            });
	      });
    });
}
exports.home =function(req, res){
	res.render('home')
}

exports.showAdd = function (req, res){
	res.render('add');

}

exports.add = function (req, res, next) {
    req.getConnection(function(err, connection){
         if (err)return next(err);
         var input = JSON.parse(JSON.stringify(req.body));
         var data = {
                    ComputerLanguage_Id : input.ComputerLanguage_Id,
                    Numbers : input.Numbers,
                    enrollment_date: input.enrollment_date,
                    enrollment_price: input.enrollment_price,
                    School_Id : input.School_Id
                    //sold :input.Qty
         };
         console.log(data);
         connection.query('insert into Enrollments set ?', data, function(err, results) {
             if (err) return next(err);
             console.log("Error inserting : %s ",err );
             res.redirect('/enrollments');
         });
    });
}


// exports.get = function(req, res, next){
//      //return res.send("......");
//     req.getConnection(function(err, connection){
//         if (err){
//             //console.log(err)
//             return next(err);
//         }
//         var enrollmentId = Number(req.params.Id);
//         //var enrollmentId = Number(req.params.enrollment_Id);
//         //console.log( 'enrollmentId : ' + enrollmentId);

//         //var enrollmentSql = 'SELECT * from enrollments p where p.Id = ?'; 
//         var enrollmentSql = 'SELECT * FROM Enrollments WHERE Id = ?';
//         connection.query(enrollmentSql, [enrollmentId], function(err, enrollments, fields) {
//                     if (err){
//                        // console.log(err)
//                         return next(err);
//                     }
//                      connection.query('SELECT * from Schools', [], function(err, supply, fields) {
//                         if (err)
//                             return next(err);
//                      var schools = enrollments.length > 0 ? enrollments[0] : {};
//                      var schoolsList = schools.map(function(storedSchool){
//                             //console.log(product.Id);
//                             //console.log(enrollment);
//                             var schoolResult = {
//                                 Id : storedSchool.Id,
//                                 Name : storedSchool.school_name,
//                                 selectedSchool : storedSchool.Id === school.School_Id                            
//                             };
//                            return schoolResult;
//                         }); 
//                         var alegra = {
//                             school : schoolList,
//                             school: school.length > 0 ? school[0] : {},
//                             schools: schoolsList
//                         };
//                      connection.query('SELECT * FROM ComputerLanguages', [], function(err, computerLanguages, fields) {
//                         if (err)
//                             return next(err);
//                         //console.log(product)
//                         var enrollment = enrollments.length > 0 ? enrollments[0] : {};
//                         var computerLanguagesList = computerLanguages.map(function(computerLanguage){
//                              //console.log(computerLanguage.Id);
//                             //console.log(enrollment);
//                             var result = {
//                                 Id : computerLanguage.Id,
//                                 Name : computerLanguage.computerLanguage_name,
//                                 selectedcomputerLanguage : ComputerLanguages.Id === enrollment.computerLanguage_Id
//                             };
//                             //console.log("**** : " + result.selected);
//                             return result;
//                         }); 
//                            var context = {
//                             computerLanguages : computerLanguagesList,
//                             enrollment: enrollments.length > 0 ? enrollments[0] : {},
//                            //enrollment: enrollment,
//                             schools: schoolsList
//                         };
//                         //console.log(context);
//                         res.render('editEnrollments', context);
//                     });
//             });
//         });
//     });
// };
exports.get = function (req,res, next){
	 var id = req.params.Id;
	 req.getConnection(function(err,connection){
		   connection.query('SELECT * FROM Enrollments WHERE id = ?',[id], function (err,rows){
			     connection.query('SELECT * FROM Schools', [], function(err, results) {
              connection.query('SELECT * from ComputerLanguages' ,[], function(err, ComputerLanguages){
                  if (err) return next(err);
			            res.render('editEnrollments' ,{page_title:"Edit Customers - Node.js", 
                  data : rows[0],
                  school : results,
                  ComputerLanguages :ComputerLanguages

                  });
              });
           });
	     });
	 });
};
exports.update = function(req, res,next){

 	var data = JSON.parse(JSON.stringify(req.body));
 	var id = req.params.Id;
 	req.getConnection(function(err,connection){
 	    connection.query('UPDATE Enrollments SET ? WHERE Id = ?',[data, id], function(err, rows){
 	       if(err) return next(err);
 	    	 res.redirect('/enrollments');
 	    });
 	 });
}

exports.delete = function(req, res, next){
  var id = req.params.Id;
 	req.getConnection(function(err, connection){
 		 connection.query('DELETE FROM Enrollments WHERE Id = ?', [id],function(err,rows){
 			 if(err) return next(err);
 			 res.redirect('/enrollments');
 		   });
 	 });
}