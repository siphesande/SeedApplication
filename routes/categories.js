'use strict'
exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		    connection.query('SELECT * from Categories', [], function(err, results) {
               if (err) return next(err);
    		   res.render( 'categories', {
			   no_categories : results.length === 0,
					//products : results,
			   categories: results
    		   });
           });
	});
	
}
exports.home =function(req, res){
	res.render('home');
}
exports.showAdd = function(req, res){
	res.render('addCat');
}

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
      		category_name : input.Category_name,
      		Id :input.Id
  	    };      
		connection.query('insert into Categories set ?', data, function(err, results){
  		    if (err) return next(err);
			res.redirect('/categories');
		});
	});
}

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Categories WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.render('editCategories',{page_title:"Edit Categories - Node.js", data : rows[0]});
		});
	});
}

exports.update = function(req, res, next){
    var data = JSON.parse(JSON.stringify(req.body));
    var Id = req.params.Id;
        req.getConnection(function(err, connection){
			connection.query('UPDATE Categories SET ? WHERE Id = ?', [data, Id], function(err, rows){
    			if (err) return next(err);
                res.redirect('/categories');
    		});
        });
}

exports.delete = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM Categories WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.redirect('/categories');
		});
	});
}

exports.mostPopulerCat =function (req, res, next){
    var id = req.params.Id;
    req.getConnection(function(err, connection){

        connection.query('SELECT Categories.Id,Categories.Category_name, sum( Enrollments.Numbers) AS TotalNumbers FROM Enrollments INNER JOIN ComputerLanguages ON Enrollments.ComputerLanguage_Id = ComputerLanguages.Id INNER JOIN Categories ON ComputerLanguages.Category_id = Categories.Id GROUP BY Categories.Category_name ORDER BY TotalNumbers DESC LIMIT  1;',[], function(err, results){
             if (err) return next(err);
             res.render('mostPopulerCat',{
             most : results
               
            });

        });
    });
}

exports.leastPopulerCat =function (req, res, next){
    var id = req.params.Id;
    req.getConnection(function(err, connection){
        connection.query('SELECT Categories.Id,Categories.Category_name, sum( Enrollments.Numbers ) AS TotalNumbers FROM Enrollments INNER JOIN ComputerLanguages ON Enrollments.ComputerLanguage_Id = ComputerLanguages.Id INNER JOIN Categories ON ComputerLanguages.Category_Id = Categories.Id GROUP BY Categories.Category_name ORDER BY TotalNumbers ASC LIMIT  1;',[], function(err, results){
            if (err) return next(err);
            res.render('leastPopulerCat',{
                least : results
               
            });

        });
    });
}

