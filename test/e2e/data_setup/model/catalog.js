var Q = require('q');
var http = require('../plugin/q-request.js');

/* @namespace Catalog
 * @desc
 * The Catalog module allows you to create and delete catalogs for the ERMrest API
 * service.
 * @param {options} A json object which may optionally contain the id of the catalog { id: 21 }.
 * @constructor
 */
var Catalog = function(options) {
	this.content = options || {};
	this.url = options.url;
	this.id = this.content.id;
};

/**
 *
 * @returns {Promise} Returns a promise.
 * @desc
 * An asynchronous method that returns a promise. If fulfilled, it creates a new catalog.
 */
Catalog.prototype.create = function() {
	var defer = Q.defer(), self = this;

	console.log("=========Inside catalog create=============");

	http.post(this.url + 'catalog').then(function(response) {
		self.content = response.data;
		self.id = response.data.id;
		defer.resolve(self);
	}, function(err) {
		defer.reject(err, self);
	});

	return defer.promise;
};


Catalog.prototype.addACLs = function(acls) {
	var defer = Q.defer(), self = this;
	if (!this.id) return defer.reject("No Id set : addACL catalog function"), defer.promise;
	if (!acls || acls.length == 0) defer.resolve();

	var promises = [];

	acls.forEach(function(acl) {
		promises.push(self.addACL(acl));
	});

	Q.all(promises).then(function() {
		defer.resolve();
	}, function(err) {
		defer.reject(err);
	});

	return defer.promise;
}


Catalog.prototype.addACL = function(acl) {
	var defer = Q.defer(), self = this;
	if (!this.id || !acl) return defer.reject("No Id or ACL set : addACL catalog function"), defer.promise;
	
	http.put(this.url + 'catalog/' + this.id + "/meta/" + acl.name + "/" + acl.user).then(function(response) {
		defer.resolve(self);
	}, function(err) {
		defer.reject(err, self);
	});

	return defer.promise;
};

/**
 *
 * @returns {Promise} Returns a promise.
 * @desc
 * An asynchronous method that returns a promise. If fulfilled, it deletes the catalog.
 */
Catalog.prototype.remove = function() {
	var defer = Q.defer(), self = this;
	if (!this.id) return defer.reject("No Id set : remove catalog function"), defer.promise;
	
	http.delete(this.url + 'catalog/' + this.id).then(function() {
		defer.resolve(self);
	}, function(err) {
		defer.reject(err, self);
	});

	return defer.promise;
}

/**
 *
 * @desc
 * Not yet implemented.
 */
Catalog.prototype.get = function() {
	throw new Error("Not Implemented");
}

module.exports = Catalog;