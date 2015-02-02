var keystone = require('keystone'),
	moment = require('moment');

var Job = keystone.list('Job');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.moment = moment;


	// Load the Job

	view.on('init', function(next) {
		Job.model.findById(req.params.job)
		.exec(function(err, job) {
			if (err) return res.err(err);
			if (!job) {
				req.flash('info', 'Sorry, we couldn\'t find a matching job');
				return res.redirect('/jobs')
			}
			locals.job = job;
			next();
		});
	});

	
	// Set the page title and populate related documents
	
	view.on('render', function(next) {
		if (locals.job) {
			locals.page.title = locals.job.name + ' - TeJS';
			next();
		}
	});
	
	view.render('site/job');

};
