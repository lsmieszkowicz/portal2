'use strict';

var db = require('../../database');
var Promise = require('promise');
var connection = db.connection;


module.exports = {
	
	get: function(id, callback){
		connection.query("SELECT * FROM investment WHERE id = ?", [id] , function(err, rows, fields){
			if(err) throw err;

			callback(err, rows[0]);
		});
	},

	getAll: function(callback){
		connection.query("SELECT * FROM investment", function(err, rows, fields){
			if(err) throw err;

			callback(err, rows); 
		});
	},

	getPosts: function(id, callback){
		connection.query("SELECT * FROM post WHERE investment_id = ? ORDER BY creationDate DESC", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);	
		});
	},

	getImages: function(id, callback){
		
		var sql = "SELECT i.*, r.uploaderId, r.creationDate FROM image i     \
				   LEFT JOIN img_relation r ON (i.id = r.imgId) \
				   WHERE (r.imgOwner = ? ) AND (r.kind LIKE 'INVESTMENT_PHOTO')";

		connection.query(sql, id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	getMap: function(id, callback){
		var mapPointSql = "SELECT * FROM map_point WHERE item_id = ?";
		var mapItemSql = "SELECT * FROM map_item WHERE investment_id = ?";

		var mapItems = [];

		var promise = new Promise(function(resolve, reject){
			connection.query(mapItemSql, id, function(err, mapItemsData, fields){
				mapItems = mapItemsData;
				resolve(mapItems);
			});
		});
		promise
		.then(function(items){
			var pointPromises = [];

			for(var i in mapItems){
				var mapItem = mapItems[i];
				var pointPromise = new Promise(function(resolve, reject){
					connection.query(mapPointSql, mapItem.id, function(err, mapPoint, fields){
						resolve(mapPoint);
					});
				});

				pointPromises.push(pointPromise);
			}
			Promise.all(pointPromises)
			.then(function(res){
				for(var i in res){
					mapItems[i].points = res[i];
				}
				callback(mapItems);
			});
		});
	},

	find: function(searchParams, callback){
		var sql = " SELECT i.id, i.name, i.description FROM investment i \
			        LEFT JOIN city c ON (i.city = c.id) \
			        WHERE (i.name LIKE ?) AND (c.name LIKE ?) AND (c.region_id = ?) ";

		var values = ['%'+searchParams.name+'%', searchParams.city, searchParams.region];

		connection.query(sql, values, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	},

	findByAdmin: function(id, callback){
		connection.query("SELECT * FROM investment WHERE admin = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});

	},

	create: function(newInvestment, callback){
		var map = newInvestment.map;
		delete newInvestment.map;

		connection.query("INSERT INTO investment SET ?", newInvestment, function(err, result){
	        saveMap(map, result.insertId);
	        callback(err, result);
		});
	},

	update: function(id, newData, callback){
		connection.query("UPDATE investment SET name = ?, description = ?, admin = ? WHERE id = ?", [newData.name, newData.description, newData.admin, id], function(err, result){
			if(err) throw err;

			callback(err, result);
		});
	},

	remove: function(id, callback){
		connection.query("DELETE FROM investment where id = ?", id, function(err, rows, fields){
			if(err) throw err;

			callback(err, rows);
		});
	}
};

var saveMap = function(map, investment_id){
	console.log(map);
	var markers = map.markers;
	var polylines = map.polylines;
	
	saveMarkers(markers, investment_id);
	savePolylines(polylines, investment_id);

};

var saveMarkers = function(markers, investment_id){
	for(var i in markers){
		var item = {
			type: "marker",
			investment_id: investment_id,
			points: [{
				latitude: markers[i].latitude,
				longitude: markers[i].longitude,
			}]
		};

		saveMapItem(item);
	}
};

var savePolylines = function(polylines, investment_id){
	for(var i in polylines){
		var polyline = polylines[i];

		var item = {
			type: 'polyline',
			investment_id: investment_id,
			points: []
		}

		for(var j in polyline){
			var point = polyline[j];
			item.points.push(point);
		}

		saveMapItem(item);
	}
};

var saveMapItem = function(item){
	var points = item.points;
	delete item.points;

	var sql = "INSERT INTO map_item SET ?";
	
	connection.query(sql, item, function(err, result){
		if(err) console.log(err);
		
		for(var i in points){
			var point = points[i];
			point.item_id = result.insertId;
			saveMapPoint(point);
		}
	});
};

var saveMapPoint = function(point, item_id){
	var sql = "INSERT INTO map_point SET ?";

	connection.query(sql, point, function(err, result){
	});

};
  
