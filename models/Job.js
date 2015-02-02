var keystone = require('keystone'),
    moment = require('moment'),
	_ = require('underscore'),
	Types = keystone.Field.Types;

/**
 *  Model
 * ===================
 */

var Job = new keystone.List('Job', {
	autokey: { path: 'key', from: 'name', unique: true }
});

Job.add({
	name: { type: String, index: true },
    publishedDate: { type: Types.Date, index: true },
    state: { type: Types.Select, options: 'draft, active, past', noedit: true },
	description: { type: Types.Markdown }
});


/**
 * Relationships
 * =============
 */


// Pre Save
// ------------------------------

Job.schema.pre('save', function(next) {
	
	var job = this;
	
	// If no published date, it's a draft meetup
	if (!job.publishedDate) job.state = 'draft';
	
	// If job date plus one day is after today, it's a past job
	else if (moment().isAfter(moment(job.startDate).add('day', 1))) job.state = 'past';
	
	// If publish date is after today, it's an active job
	else if (moment().isAfter(job.publishedDate)) job.state = 'active';
	
	// If publish date is before today, it's a scheduled job
	else if (moment().isBefore(moment(job.publishedDate))) job.state = 'scheduled';
	
	next();

});


/**
 * Registration
 * ============
 */

Job.addPattern('standard meta');
Job.defaultColumns = 'name';
Job.register();
