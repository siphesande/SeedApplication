exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
	    connection.query('SELECT ComputerLanguages.Id, ComputerLanguages.ComputerLanguage_name, Categories.Category_name FROM ComputerLanguages INNER JOIN Categories ON Categories.Id = ComputerLanguages.Category_Id ORDER BY Id LIMIT 0 , 30', [], function(err, results) {
			connection.query('SELECT * FROM Categories', [], function(err, categories) {
        	if (err) return next(err);
			res.render( 'computerLanguages', {
			    no_ComputerLanguages :results.length === 0,
				computerLanguages : results,
				 categories: categories
			    });
	        });
		});
	});
}
//exports.home =function(req, res){
	//res.render('home')
//}
exports.showAdd = function(req, res){
	res.render('add');
}

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
      		ComputerLanguage_name : input.ComputerLanguage_name,
      		Category_Id :input.Category_Id
  	    };      
		connection.query('insert into ComputerLanguages set ?', data, function(err, results){
  		    if (err) return next(err);
  		    console.log("Error inserting : %s ",err );
			res.redirect('/computerLanguages');
		});
	});
}

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM ComputerLanguages WHERE Id = ?', [Id], function(err,rows){
		    connection.query('SELECT * FROM Categories', [], function(err, results) {	
			    if(err) return next(err);
                console.log(results);
			    res.render('edit',{page_title:"Edit ComputerLanguages - Node.js", 
			    data : rows[0],
			    category : results
                });
		    });
        });
    });
}

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    var Id = req.params.Id;
    req.getConnection(function(err, connection){
			connection.query('UPDATE ComputerLanguages SET ? WHERE Id = ?',[data, Id], function(err, rows){
    			if (err) return next(err);
                res.redirect('/computerLanguages');
    		});

    });
}

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM ComputerLanguages WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.redirect('/computerLanguages');
		});
	});
}
exports.mostPopulerLang =function (req, res, next){
    var id = req.params.Id;
    req.getConnection(function(err, connection){

        connection.query('SELECT ComputerLanguages.ComputerLanguage_name, ComputerLanguages.Id,Categories.Category_name, SUM( Enrollments.Numbers ) AS Numbers FROM Enrollments INNER JOIN ComputerLanguages ON Enrollments.ComputerLanguage_id = ComputerLanguages.Id INNER JOIN Categories ON ComputerLanguages.Category_Id = Categories.Id GROUP BY ComputerLanguages.ComputerLanguage_name ORDER BY Numbers DESC LIMIT 1 ',[], function(err, results){
             if (err) return next(err);
             res.render('mostPopulerLang',{
             most : results
             });

        });
    });
}

exports.leastPopulerLang =function (req, res, next){
    var id = req.params.Id;
    req.getConnection(function(err, connection){
        connection.query('SELECT ComputerLanguages.ComputerLanguage_name, ComputerLanguages.Id,Categories.Category_name, SUM( Enrollments.Numbers ) AS Numbers FROM Enrollments INNER JOIN ComputerLanguages ON Enrollments.ComputerLanguage_Id = Products.Id INNER JOIN Categories ON Products.Category_Id = Categories.Id GROUP BY Products.ComputerLanguage_name ORDER BY qty ASC LIMIT 1 ',[], function(err, results){
            if (err) return next(err);c
            res.render('leastPopulerLang',{
            least : results
            });

        });
    });
}

