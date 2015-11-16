exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		    connection.query('SELECT * from Schools', [], function(err, results) {
               if (err) return next(err);
    		       res.render( 'schools', {
				   no_schools : results.length === 0,
				   //products : results,
				   schools: results
    		      });

            });
	});
};
exports.home =function(req, res){
	res.render('home');
}
exports.showAdd = function(req, res){
	res.render('addSchools');
}

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
      		School_name : input.School_name,
      		Id :input.Id
  	    };      
		connection.query('insert into Schools set ?', data, function(err, results){
  		if (err) return next(err);
			res.redirect('/schools');
		});
	});
}

exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM Schools WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.render('editSchools',{page_title:"Edit Schools - Node.js", data : rows[0]});
		});
	});
}

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    var Id = req.params.Id;
        req.getConnection(function(err, connection){
			connection.query('UPDATE Schools SET ? WHERE Id = ?', [data, Id], function(err,rows){
    			if (err) return next(err);
                res.redirect('/schools');
    		});

       });
}

exports.delete = function(req, res, next){
	var Id= req.params.Id;
	    req.getConnection(function(err, connection){
		connection.query('DELETE FROM Schools WHERE Id = ?', [Id], function(err,rows){
			if(err) return next(err);
			res.redirect('/schools');
		});
	});
}
