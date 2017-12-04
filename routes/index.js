var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'timesquaredata.cduvdiu5r6xm.us-east-2.rds.amazonaws.com',
  user     : 'cis550',
  password : 'password',
  database : 'tsdata'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/food', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'food.html'));
});

router.get('/hotel', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'hotel.html'));
});

router.get('/entertainment', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'entertainment.html'));
});

router.get('/signage', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'signage.html'));
});

router.get('/data/:name', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = '';
  var name = req.params.name;
  console.log(name)
  if (name != 'undefined') {
    var query1 = 'SELECT NAME AS NAME, "FOOD" AS TYPE, STREETNAME AS STREETNAME, BUILDING AS BUILDING from Food where NAME LIKE "%' + name + '%"' ;
    var query2 = 'SELECT NAME AS NAME, "HOTEL" AS TYPE, STREETNAME AS STREETNAME, BUILDING AS BUILDING from Hotel where NAME LIKE "%' + name + '%"' ;
    var query3 = 'SELECT NAME AS NAME, "Entertainment" AS TYPE, STREETNAME AS STREETNAME, BUILDING AS BUILDING from Entertainment where NAME LIKE "%' + name + '%"' ;
    var query4 = 'SELECT NAME AS NAME, "SIGNAGE" AS TYPE, STREETNAME AS STREETNAME, BUILDING AS BUILDING from Signage where NAME LIKE "%' + name + '%"' ;
    query = query1 +' UNION '+ query2 + ' UNION ' + query3 + ' UNION ' + query4;
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/datafood/:values', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var value = req.params.values.split('&');
  var query = 'SELECT NAME AS NAME, CUISINE AS TYPE, STREETNAME AS STREETNAME, BUILDING AS BUILDING from Food';
  var streetname = value[0];
  var cuisine = value[1];
  if(streetname != 'all' || cuisine != 'all' ) {
    query=query+' where ';
  }
  var count = 0;
  if (streetname != 'all') {
    if(count!=0) {
      query = query + ' AND ';
    } 
    query = query + 'STREETNAME = "' + streetname + '"' ;
    count++;
  }
  if(cuisine != 'all') {
    if(count!=0) {
      query = query + ' AND ';
    } 
    query = query + 'CUISINE = "' + cuisine + '"' ;
    count++;
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/datahotel/:values', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var value = req.params.values.split('&');
  var first = 'SELECT H.NAME AS NAME, H.STREETNAME AS STREETNAME, H.BUILDING AS BUILDING, COUNT(*) as RESTUARANT_AMOUNT from Hotel H left join Food F on H.BUILDING = F.BUILDING';
  var second = ' group by H.STREETNAME, H.NAME, H.BUILDING, H.ZIPCODE, H.PHONENUMBER, H.WEBSITE'
  var query = first + second;
  var streetname = value[0];
  var preferance = value[1];

  
  if (streetname != 'all') {
    first = first + ' WHERE H.STREETNAME = "' + streetname + '"';
    query = first + second;

  }
  if(preferance != 'all') {
    if(preferance == 'ASC') {
      query = query + ' ORDER BY RESTUARANT_AMOUNT ASC';
    } else {
      query = query + ' ORDER BY RESTUARANT_AMOUNT DESC';
    }
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/dataentertainment/:values', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var value = req.params.values.split('&');
  var query = 'SELECT NAME AS NAME, TYPE AS TYPE, STREETNAME AS STREETNAME, BUILDING AS BUILDING from Entertainment';
  var streetname = value[0];
  var type = value[1];
  if(streetname != 'all' || type != 'all' ) {
    query=query+' where ';
  }
  var count = 0;
  if (streetname != 'all') {
    if(count!=0) {
      query = query + ' AND ';
    } 
    query = query + 'STREETNAME = "' + streetname + '"' ;
    count++;
  }
  if(type != 'all') {
    if(count!=0) {
      query = query + ' AND ';
    } 
    query = query + 'TYPE = "' + type + '"' ;
    count++;
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/datasignage/:values', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var value = req.params.values.split('&');
  var query = 'SELECT * from Signage ';
  var streetname = value[0];
  var size = value[1];
  if(streetname != 'all' || size != 'all' ) {
    query=query+' where ';
  }
  var count = 0;
  if (streetname != 'all') {
    if(count!=0) {
      query = query + ' AND ';
    } 
    query = query + 'STREETNAME = "' + streetname + '"' ;
    count++;
  }
  if(size != 'all') {
    if(count!=0) {
      query = query + ' AND ';
    } 
    query = query + 'HEIGHT = "' + size + '"' ;
    count++;
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/insert/:values', function(req,res) {
 var value = req.params.values.split('&');
    //console.log('INSERT INTO Person(login,name,sex,relationshipStatus,birthyear) VALUES("'+value[0]+'","'+value[1]+'","'+value[2]+'","'+value[3]+'","'+value[4]+'")');
    connection.query('INSERT INTO Person(login,name,sex,relationshipStatus,birthyear) VALUES("'+value[0]+'","'+value[1]+'","'+value[2]+'","'+value[3]+'","'+value[4]+'")' ,function (err, rows, fields) {
        if (err) throw err;

    });
});
module.exports = router;