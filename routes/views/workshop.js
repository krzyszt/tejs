var keystone = require('keystone'),
	moment = require('moment');

var Workshop = keystone.list('Workshop');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.moment = moment;


	// Load the Workshop

	view.on('init', function(next) {
		Workshop.model.findById(req.params.workshop)
		.exec(function(err, workshop) {
			if (err) return res.err(err);
			if (!workshop) {
				req.flash('info', 'Sorry, we couldn\'t find a matching workshop');
				return res.redirect('/workshops')
			}
			locals.workshop = workshop;
			next();
		});
	});

	
	// Set the page title and populate related documents
	
	view.on('render', function(next) {
		if (locals.workshop) {
			locals.page.title = locals.workshop.name + ' - TeJS';
			next();
		}
	});
	
	view.render('site/workshop');

};
