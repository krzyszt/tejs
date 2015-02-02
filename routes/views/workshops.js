var keystone = require('keystone');

var Workshop = keystone.list('Workshop');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section = 'members';
	
	view.query('workshops', Workshop.model.find().sort('name'));
	
	view.render('site/workshops');
	
};
