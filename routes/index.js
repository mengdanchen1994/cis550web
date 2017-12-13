var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var neo4j = require('neo4j-driver').v1;

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'timesquaredata.cduvdiu5r6xm.us-east-2.rds.amazonaws.com',
  user     : 'cis550',
  password : 'password',
  database : 'tsdata'
});

var neo4jDriver = neo4j.driver(
  "bolt://hobby-dhgbijnckhclgbkeccgcoial.dbs.graphenedb.com:24786",
  neo4j.auth.basic("cis-550-web-app", "b.ORiW52tKkzOD.9tHRWOoo434F2QMx"));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});


router.get('/food', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'food.html'));
});

router.get('/food2', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'violation.html'));
});

router.get('/hotel', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'hotel.html'));
});

router.get('/hotel2', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'hotel2.html'));
});

router.get('/hotel3', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'hotel3.html'));
});

router.get('/subway', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'subway.html'));
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
    var query1 = 'SELECT NAME, "Restuarant" AS TYPE, STREETNAME, LATITUDE, LONGITUDE, BUILDING, PHONENUMBER, WEBSITE from Food where NAME LIKE "%' + name + '%"' ;
    var query2 = 'SELECT NAME, "Hotel" AS TYPE, STREETNAME, LATITUDE, LONGITUDE, BUILDING ,PHONENUMBER, WEBSITE from Hotel where NAME LIKE "%' + name + '%"' ;
    var query3 = 'SELECT NAME, "Entertainment" AS TYPE, STREETNAME, LATITUDE, LONGITUDE, BUILDING,PHONENUMBER, WEBSITE from Entertainment where NAME LIKE "%' + name + '%"' ;
    var query4 = 'SELECT NAME AS NAME, "Signage" AS TYPE, STREETNAME AS STREETNAME, NULL AS LATITUDE, NULL AS LONGITUDE, BUILDING AS BUILDING, NULL AS PHONENUMBER, NULL AS WEBSITE from Signage where NAME LIKE "%' + name + '%"' ;
    query = query1 +' UNION '+ query2 + ' UNION ' + query3 + ' UNION '+ query4;
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
  var query = 'SELECT * from Food';
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

router.get('/datafoodname/:newname', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = '';
  var value = req.params.newname.split('+');
  var name = value[0];
  var streetname = value[1];
  var building = value[2];
  console.log("newname:"+name);
  if (name != 'undefined') {
    query = 'SELECT * from InspectionResult where NAME = "' + name + '" AND STREETNAME = "'+streetname+'" AND BUILDING = "'+building+'"' ; 
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/datahotelname/:newname', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = '';
  var value = req.params.newname.split('+');
  var name = value[0];
  var streetname = value[1];
  var building = value[2];
  console.log("newname:"+name);
  if (name != 'undefined') {
<<<<<<< HEAD
   var query = 'SELECT F.NAME AS NAME, F.STREETNAME AS STREETNAME,F.CUISINE AS CUISINE, F.BUILDING AS BUILDING, F.PHONENUMBER, F.WEBSITE, 111.111* DEGREES(ACOS(COS(RADIANS(H.LATITUDE))* COS(RADIANS(F.LATITUDE))* COS(RADIANS(F.LONGITUDE - H.LONGITUDE))+ SIN(RADIANS(H.LATITUDE))* SIN(RADIANS(F.LATITUDE)))) AS DISTENCE from Food F CROSS JOIN Hotel H WHERE H.NAME = "'+ name +'" AND H.STREETNAME = "'+streetname+'" AND H.BUILDING= "'+building+'" HAVING DISTENCE<0.1 ORDER BY DISTENCE ASC';
  }
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }  
    });
});

router.get('/datahotelthreename/:newname', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
  var query = '';
  var value = req.params.newname.split('+');
  var name = value[0];
  var streetname = value[1];
  var building = value[2];
  console.log("newname:"+name);
  if (name != 'undefined') {
<<<<<<< HEAD
   var query = 'SELECT F.NAME AS NAME, F.STREETNAME AS STREETNAME, F.BUILDING AS BUILDING, F.TYPE AS TYPE, F.PHONENUMBER, F.WEBSITE, 111.111* DEGREES(ACOS(COS(RADIANS(H.LATITUDE))* COS(RADIANS(F.LATITUDE))* COS(RADIANS(F.LONGITUDE - H.LONGITUDE))+ SIN(RADIANS(H.LATITUDE))* SIN(RADIANS(F.LATITUDE)))) AS DISTENCE from Entertainment F CROSS JOIN Hotel H WHERE H.NAME = "'+ name +'" AND H.STREETNAME = "'+streetname+'" AND H.BUILDING= "'+building+'" HAVING DISTENCE<0.1 ORDER BY DISTENCE ASC';
=======
   var query = 'SELECT F.NAME AS NAME, F.STREETNAME AS STREETNAME, F.BUILDING AS BUILDING, F.TYPE AS TYPE, F.PHONENUMBER, F.WEBSITE, 111.111* DEGREES(ACOS(COS(RADIANS(H.LATITUDE))* COS(RADIANS(F.LATITUDE))* COS(RADIANS(F.LONGITUDE - H.LONGITUDE))+ SIN(RADIANS(H.LATITUDE))* SIN(RADIANS(F.LATITUDE)))) AS DISTENCE from Entertainment F CROSS JOIN Hotel H WHERE H.NAME = "'+ name +'" AND H.STREETNAME = "'+streetname+'" AND H.BUILDING= "'+building+'" HAVING DISTENCE<0.05 ORDER BY DISTENCE ASC';
>>>>>>> 8fee372ffc8f541b0accf448368bd7de7e01c016
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
  var value = req.params.values.split('&');
  var streetname = value[0];
  var preferance = value[1];
  var first = ' SELECT H_FOOD.NAME AS NAME, H_FOOD.STREETNAME AS STREETNAME, H_FOOD.BUILDING AS BUILDING, H_FOOD.PHONENUMBER, H_FOOD.WEBSITE,'
+'H_FOOD.REST_N AS REST_N, H_ENT.ENT_N AS ENT_N FROM '
+'(SELECT HH.NAME AS NAME, HH.STREETNAME AS STREETNAME, HH.BUILDING AS BUILDING, HH.PHONENUMBER, HH.WEBSITE,COALESCE(NEW_HOTEL.ENT_COUNT,0) AS ENT_N FROM '
+'(SELECT A.NAME AS NAME, A.STREETNAME AS STREETNAME, A.BUILDING AS BUILDING, A.PHONENUMBER, A.WEBSITE, COUNT(DISTENCE) AS ENT_COUNT FROM '
+'(SELECT  H.NAME, H.STREETNAME, H.BUILDING,  H.PHONENUMBER, H.WEBSITE,'
+'111.111*  DEGREES(ACOS(COS(RADIANS(H.LATITUDE))'
         +"* COS(RADIANS(F.LATITUDE))"
         +"* COS(RADIANS(F.LONGITUDE - H.LONGITUDE))"
         +"+ SIN(RADIANS(H.LATITUDE))"
         +"* SIN(RADIANS(F.LATITUDE))))"
+'AS DISTENCE '
+'from Entertainment F CROSS JOIN Hotel H HAVING DISTENCE<0.1) A '
+'group by A.NAME, A.STREETNAME, A.BUILDING ORDER BY A.NAME) NEW_HOTEL RIGHT JOIN Hotel HH on NEW_HOTEL.NAME = HH.NAME '
+'AND NEW_HOTEL.STREETNAME = HH.STREETNAME AND NEW_HOTEL.BUILDING =HH.BUILDING';
  var second = ' )H_ENT LEFT JOIN '
+'(SELECT HH.NAME AS NAME, HH.STREETNAME AS STREETNAME, HH.BUILDING AS BUILDING, HH.PHONENUMBER, HH.WEBSITE, COALESCE(NEW_HOTEL.REST_COUNT,0) AS REST_N FROM '
+'(SELECT A.NAME AS NAME, A.STREETNAME AS STREETNAME, A.BUILDING AS BUILDING,  A.PHONENUMBER, A.WEBSITE, COUNT(DISTENCE) AS REST_COUNT FROM '
+'(SELECT  H.NAME, H.STREETNAME, H.BUILDING, H.PHONENUMBER, H.WEBSITE,'
  +'111.111* DEGREES(ACOS(COS(RADIANS(H.LATITUDE))'
         +'* COS(RADIANS(F.LATITUDE))'
         +'* COS(RADIANS(F.LONGITUDE - H.LONGITUDE))'
         +'+ SIN(RADIANS(H.LATITUDE))'
         +'* SIN(RADIANS(F.LATITUDE))))'
+'AS DISTENCE '
+'from Food F CROSS JOIN Hotel H HAVING DISTENCE < 0.1) A '
+'group by A.NAME, A.STREETNAME, A.BUILDING ORDER BY A.NAME) NEW_HOTEL RIGHT JOIN Hotel HH on NEW_HOTEL.NAME = HH.NAME '
+'AND NEW_HOTEL.STREETNAME = HH.STREETNAME AND NEW_HOTEL.BUILDING =HH.BUILDING) H_FOOD '
+'ON H_FOOD.NAME = H_ENT.NAME AND H_FOOD.STREETNAME=H_ENT.STREETNAME AND H_FOOD.BUILDING=H_ENT.BUILDING'   
var query = first + second;
  if (streetname != 'all') {
    first = first + ' WHERE HH.STREETNAME = "' + streetname + '"';
    query = first + second;
  }
  // var value = req.params.values.split('&');
  // var first = ' (SELECT HH.NAME AS NAME, HH.STREETNAME AS STREETNAME, HH.BUILDING AS BUILDING, COALESCE(NEW_HOTEL.ENT_COUNT,0) AS ENT_N FROM (SELECT A.NAME AS NAME, A.STREETNAME AS STREETNAME, A.BUILDING AS BUILDING, COUNT(DISTENCE) AS ENT_COUNT FROM (SELECT  H.NAME, H.STREETNAME, H.BUILDING, SQRT(POW(F.LONGITUDE-H.LONGITUDE,2) + POW(F.LATITUDE-H.LATITUDE,2)) AS DISTENCE from Entertainment F CROSS JOIN Hotel H HAVING DISTENCE<0.00045) A';
  // var second = ' group by A.NAME, A.STREETNAME, A.BUILDING ORDER BY A.NAME) NEW_HOTEL RIGHT JOIN Hotel HH on NEW_HOTEL.NAME = HH.NAME AND NEW_HOTEL.STREETNAME = HH.STREETNAME AND NEW_HOTEL.BUILDING =HH.BUILDING) H_ENT'
  // var first_two = '(SELECT HH.NAME AS NAME, HH.STREETNAME AS STREETNAME, HH.BUILDING AS BUILDING, COALESCE(NEW_HOTEL.REST_COUNT,0) AS REST_N FROM (SELECT A.NAME AS NAME, A.STREETNAME AS STREETNAME, A.BUILDING AS BUILDING, COUNT(DISTENCE) AS REST_COUNT FROM (SELECT  H.NAME, H.STREETNAME, H.BUILDING, SQRT(POW(F.LONGITUDE-H.LONGITUDE,2) + POW(F.LATITUDE-H.LATITUDE,2)) AS DISTENCE from Food F CROSS JOIN Hotel H HAVING DISTENCE<0.00045) A'
  // var second_two = ' group by A.NAME, A.STREETNAME, A.BUILDING ORDER BY A.NAME) NEW_HOTEL RIGHT JOIN Hotel HH on NEW_HOTEL.NAME = HH.NAME AND NEW_HOTEL.STREETNAME = HH.STREETNAME AND NEW_HOTEL.BUILDING =HH.BUILDING) H_FOOD ON H_FOOD.NAME = H_ENT.NAME AND H_FOOD.STREETNAME=H_ENT.STREETNAME AND H_FOOD.BUILDING=H_ENT.BUILDING '
  // var query_one = first + second;
  // var query_two = first_two + second;
  // var query = 'SELECT H_FOOD.NAME AS NAME, H_FOOD.STREETNAME AS STREETNAME, H_FOOD.BUILDING AS BUILDING, H_FOOD.REST_N AS REST_N, H_ENT.ENT_N AS ENT_N FROM' + query_one + ' LEFT JOIN' + query_two + ' ORDER BY REST_N, ENT_N'
  // var streetname = value[0];
  // var preferance = value[1];

  
  // if (streetname != 'all') {
  //   first = first + ' WHERE H.STREETNAME = "' + streetname + '"';
  //   first_two = first_two + ' WHERE H.STREETNAME = "' + streetname + '"'
  // var query_one = first + second;
  // var query_two = first_two + second;
  // var query = 'SELECT A.NAME, A.STREETNAME, A.BUILDING, A.RESTUARANT_AMOUNT as RESTUARANT_AMOUNT, B.ENTERTAINMENT_AMOUNT as ENTERTAINMENT_AMOUNT FROM ('+ query_two+') A LEFT JOIN ('+query_one+') B ON A.NAME = B.NAME AND A.STREETNAME = B.STREETNAME AND A.BUILDING = B.BUILDING';
  // }
  if(preferance != 'all') {
    if(preferance == 'Food ASC') {
      query = query + ' ORDER BY REST_N ASC';
    } else if (preferance == 'Food DESC') {
      query = query + ' ORDER BY REST_N DESC';
    } else if (preferance =='Ent ASC') {
            query = query + ' ORDER BY ENT_N ASC';
    } else {
          query = query + ' ORDER BY ENT_N DESC';
    }
  } else {
    query = query + ' ORDER BY REST_N DESC, ENT_N DESC;'
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
  var query = 'SELECT * from Entertainment';
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


router.get('/routessubway/:values', function(req,res) {
  var value = req.params.values.split('&');
  var session = neo4jDriver.session();

  var query = "MATCH (user_station:Station)\n" +
  "WITH user_station, abs(user_station.longitude+" + value[0] + ") + abs(user_station.latitude-" + value[1] + ") AS user_dist\n" +
  "ORDER BY user_dist LIMIT 1 // Closest station to user\n" +
  "MATCH (dest_station:Station)\n" +
  "WITH user_station, dest_station, \n" +
  "     abs(dest_station.longitude+" + value[2] + ") + abs(dest_station.latitude-" + value[3] + ") AS dest_dist\n" +
  "ORDER BY dest_dist LIMIT 1 // Closest station to the destination\n" +
  "MATCH (line1:Line) // Line before transfer\n" +
  "WHERE (line1)-[:GOTO]->(user_station)\n" +
  "MATCH (line2:Line) // Line after transfer\n" +
  "WHERE (line2:Line)-[:GOTO]->(dest_station)\n" +
  "MATCH (transfer_at_station:Station) // Transfer station\n" +
  "WHERE (line1)-[:GOTO]->(transfer_at_station)<-[:GOTO]-(line2)\n" +
  "RETURN user_station, transfer_at_station, dest_station, line1, line2,\n" +
  "       abs(user_station.longitude-transfer_at_station.longitude) \n" +
  "       + abs(user_station.latitude-transfer_at_station.longitude)\n" +
  "       + abs(dest_station.longitude-transfer_at_station.longitude) \n" +
  "       + abs(dest_station.latitude-transfer_at_station.longitude) AS total_dist\n" +
  "ORDER BY total_dist LIMIT 5\n" +
  "UNION\n" +
  "MATCH (user_station:Station)\n" +
  "WITH user_station, abs(user_station.longitude+" + value[0] + ") + abs(user_station.latitude-" + value[1] + ") AS user_dist\n" +
  "ORDER BY user_dist LIMIT 1 // Closest station to user\n" +
  "MATCH (dest_station:Station)\n" +
  "WITH user_station, dest_station, \n" +
  "     abs(dest_station.longitude+" + value[2] + ") + abs(dest_station.latitude-" + value[3] + ") AS dest_dist\n" +
  "ORDER BY dest_dist LIMIT 1 // Closest station to the destination\n" +
  "MATCH (line1:Station) // Direct line\n" +
  "WHERE (user_station)<-[:GOTO]-(line1)-[:GOTO]->(dest_station)\n" +
  "RETURN user_station, NULL AS transfer_at_station, dest_station, line1, NULL AS line2,\n" +
  "       abs(user_station.longitude-dest_station.longitude) \n" +
  "       + abs(user_station.latitude-dest_station.longitude) AS total_dist;";

  session
      .run(query)
      .then(function(result) {

          var processRecord = function(record) {
            var values = record['_fields'];
            var lookup = record['_fieldLookup'];
            var processed = {};
            processed['start'] = values[lookup['user_station']]['properties'];
            processed['destination'] = values[lookup['dest_station']]['properties'];
            processed['transfer_station'] = values[lookup['transfer_at_station']]['properties'];
            processed['first_line'] = values[lookup['line1']]['properties'];
            processed['second_line'] = values[lookup['line2']]['properties'];
            return processed;
          }

          res.json(result['records'].map(processRecord));
          session.close();
      })
      .catch(function(error) {
          console.log(error);
      });
});

module.exports = router;