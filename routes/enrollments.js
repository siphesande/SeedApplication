exports.show =function (req, res, next){
    req.getConnection(function(err, connection){
        if (err) return next(err);
		    connection.query('SELECT * from Schools',[], function(err, Schools){
            connection.query('SELECT * from ComputerLanguages' ,[], function(err, ComputerLanguages){
                connection.query('SELECT Enrollments.Id,Schools.School_name, ComputerLanguages.ComputerLanguage_name, DATE_FORMAT(Enrollments.Purchase_date, "%d/%l/%Y") as enrollment_date , enrollments.Numbers, Enrollments.Enrollments_price FROM Enrollments INNER JOIN ComputerLanguages ON Enrollments.ComputerLanguage_Id = ComputerLanguages.Id INNER JOIN Schools ON Enrollments.Schools_Id = Schools.Id ORDER BY Id DESC' ,[], function(err, enrollments){
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
                    ComputerLanguages_Id : input.ComputerLanguages_Id,
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
exports.get = function (req,res, next){
	 var id = req.params.Id;
	 req.getConnection(function(err,connection){
		   connection.query('SELECT * FROM Enrollments WHERE id = ?',[id], function (err,rows){
			     connection.query('SELECT * FROM Schools', [], function(err, results) {
              connection.query('SELECT * from ComputerLanguages' ,[], function(err, ComputerLanguages){
                  if (err) return next(err);
			            res.render('editEnrollments' ,{page_title:"Edit Customers - Node.js", 
                  data : rows[0],
                  Schools : results,
                  ComputerLanguages :ComputerLanguages

                  });
                 // var product = products.length >  ? Enrollments[0] : {};
                 //var productList = function(products)
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