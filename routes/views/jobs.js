var keystone = require('keystone');

var Job = keystone.list('Job');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// locals.section = 'members';
	
	view.query('jobs', Job.model.find().sort('name'));
	
	view.render('site/jobs');
	
};
