var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Workshops Model
 * ===================
 */

var Workshop = new keystone.List('Workshop', {
	autokey: { path: 'key', from: 'name', unique: true }
});

Workshop.add({
	name: { type: String, index: true },
	logo: { type: Types.CloudinaryImage },
	description: { type: Types.Markdown }
});


/**
 * Relationships
 * =============
 */

// Workshop.relationship({ ref: 'User', refPath: 'organisation', path: 'members' });


/**
 * Registration
 * ============
 */

Workshop.addPattern('standard meta');
Workshop.defaultColumns = 'name';
Workshop.register();
