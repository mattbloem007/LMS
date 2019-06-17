const express = require('express');
var mysql      = require('mysql');
var bodyParser = require('body-parser')
const path = require('path')
var json2xls = require('json2xls');
var fs = require('fs');
const parse      = require('csv-parse');
const util       = require('util');
const async      = require('async');
const co         = require('co');
const csvHeaders = require('csv-headers');
const leftpad    = require('leftpad');
const XLSX = require('xlsx');




const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(json2xls.middleware);
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'client/public/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// })

app.get('/saveProgramme', function(req, res) {
  new Promise((resolve, reject) => {
      csvHeaders({
          file      : csvfn,
          delimiter : ','
      }, function(err, headers) {
          if (err) reject(err);
          else resolve({ headers });
      });
  })
  .then(context => {
      return new Promise((resolve, reject) => {

          context.db = mysql.createConnection({
            host     : '41.185.8.125',
            user     : 'xiconco1_mikeb',
            password : 'X4k474ssPz',
            database : 'xiconco1_lms'
          });

          context.db.connect((err) => {
              if (err) {
                  console.error('error connecting: ' + err.stack);
                  reject(err);
              } else {
                  resolve(context);
              }
          });
      })
  })
  // .then(context => {
  //     return new Promise((resolve, reject) => {
  //         context.db.query(`DROP TABLE IF EXISTS ${tblnm}`,
  //         [ ],
  //         err => {
  //             if (err) reject(err);
  //             else resolve(context);
  //         })
  //     });
  // })
  .then(context => {
      return new Promise((resolve, reject) => {
          var fields = '';
          var fieldnms = '';
          var qs = '';
          context.headers.forEach(hdr => {
              hdr = hdr.replace(' ', '_');
              if (fields !== '') fields += ',';
              if (fieldnms !== '') fieldnms += ','
              if (qs !== '') qs += ',';
              fields += ` ${hdr} TEXT`;
              fieldnms += ` ${hdr}`;
              qs += ' ?';
          });
          context.qs = qs;
          context.fieldnms = fieldnms;
          console.log(`about to create CREATE TABLE IF NOT EXISTS ${tblnm} ( ${fields} )`);
          context.db.query(`CREATE TABLE IF NOT EXISTS ${tblnm} ( ${fields} )`,
          [ ],
          err => {
              if (err) reject(err);
              else resolve(context);
          })
      });
  })
  .then(context => {
      return new Promise((resolve, reject) => {
          fs.createReadStream(csvfn).pipe(parse({
              delimiter: ',',
              columns: true,
              relax_column_count: true
          }, (err, data) => {
              if (err) return reject(err);
              async.eachSeries(data, (datum, next) => {
                  // console.log(`about to run INSERT INTO ${tblnm} ( ${context.fieldnms} ) VALUES ( ${context.qs} )`);
                  var d = [];
                  try {
                      context.headers.forEach(hdr => {
                          // In some cases the data fields have embedded blanks,
                          // which must be trimmed off
                          let tp = datum[hdr].trim();
                          // For a field with an empty string, send NULL instead
                          d.push(tp === '' ? null : tp);
                      });
                  } catch (e) {
                      console.error(e.stack);
                  }
                  // console.log(`${d.length}: ${util.inspect(d)}`);
                  if (d.length > 0) {
                      context.db.query(`INSERT INTO ${tblnm} ( ${context.fieldnms} ) VALUES ( ${context.qs} )`, d,
                      err => {
                          if (err) { console.error(err); next(err); }
                          else setTimeout(() => { next(); });
                      });
                  } else { console.log(`empty row ${util.inspect(datum)} ${util.inspect(d)}`); next(); }
              },
              err => {
                  if (err) reject(err);
                  else resolve(context);
              });
          }));
      });
  })
  .then(context => { context.db.end(); })
  .catch(err => { console.error(err.stack); });
})


app.post('/save',function(req, res) {
  // console.log(req.body)
  //res.xls('data.xlsx', req.body);

  console.log("IN")
  var xls = json2xls(req.body);
  fs.writeFileSync('data1.xlsx', xls, 'binary');


  // var xFile = fs.readFile(__dirname + '/data1.xlsx', function (err, data) {
  //   res.contentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  // })
  // res.send(new Buffer(xFile))
//  let file = fs.readFileSync(__dirname + '/data1.xlsx')
//  var buffer = new Buffer(file)
  //var buffer = new Buffer(file)
  res.set("Content-Disposition", "attachment;filename=data1.xls");
  res.set("Content-Type", "application/octet-stream");
  res.sendFile(__dirname + '/data1.xlsx');
  //var file = __dirname;
  //res.download(__dirname, 'data1.xlsx');
});

app.get('/download', function(req, res) {
  let file = __dirname + '/data1.xlsx';
  res.download(file, 'data1.xlsx')
})

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// })

// var connection = mysql.createConnection({
//   connectionLimit : 1000,
//   connectTimeout  : 60 * 60 * 1000,
//   aquireTimeout   : 60 * 60 * 1000,
//   timeout         : 60 * 60 * 1000,
//   host     : '41.185.8.125',
//   user     : 'xiconco1_mikeb',
//   password : 'X4k474ssPz',
//   database : 'xiconco1_lms',
//   port     : port
// });

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'lms',
//   port     : port
// });
var club = mysql.createPool({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  aquireTimeout   : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host     : '41.185.8.125',
  user     : 'xic02_xiconco1',
  password : '7MmHzK4W8xJf',
  database : 'xic02_iosgroup_clubs'
})
var pool  = mysql.createPool({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  aquireTimeout   : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host     : '41.185.8.125',
  user     : 'xic02_xiconco1',
  password : '7MmHzK4W8xJf',
  database : 'xic02_lms'
  // host     : 'localhost',
  // user     : 'root',
  // password : '',
  // database : 'lms'
   });



// connection.connect(function(err){
// if(!err) {
//     console.log("Database is connected ... nn");
// } else {
//     console.log("Error connecting database ... nn", err);
// }
// });

// app.get("/",function(req,res){
// connection.query('SELECT * from lms_info LIMIT 2', function(err, rows, fields) {
// connection.end();
//   if (!err) {
//     console.log('The solution is: ', rows);
//     res.send({express: rows});
//   } else{
//     console.log('Error while performing Query.');
//     }
//   });
// });

app.get('/api/clubs', (req, res) => {
  club.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `club_name` FROM `ppSD_member_data`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/lms_batch', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT * FROM `lms_batch` ORDER BY `batch_no`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})


app.get('/api/client', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");


    connection.query('SELECT `name` FROM `lms_client`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/clients', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");


    connection.query('SELECT `name`, `telephone`, `address`, `contact`, `municipality` FROM `lms_client`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})


app.get('/api/facilitator', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `name` FROM `lms_facilitator`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/facilitators', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `name`, `ID`, `Cell_no` FROM `lms_facilitator`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/assessor', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `name` FROM `lms_assessor`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/assessors', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `name`, `ID`, `Reg_no`, `SETA`, `Expiry Date` FROM `lms_assessor`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/moderator', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `name` FROM `lms_moderator`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/moderators', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `name`, `ID`, `Reg_no`, `SETA`, `Expiry Date` FROM `lms_moderator`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/learner', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `national_id`, `firstname`, `surname` FROM `lms_learner`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/learners', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `national_id`,`firstname`,`surname`,`equity`,`nationality`, `last_school`, `language`, `education`, `gender`,`year_attended`, `batch_no`, `programme_names`, `client_names`, `ass_status`, `disability`, `employed` FROM `lms_learner`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/qualifications', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT * FROM `lms_q_programmes`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/qualificationsMod', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(jsondata)
    connection.query('SELECT * FROM `lms_q_modules` WHERE Number = ?', [jsondata.index], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({express: rows})
      connection.release();
    })
  })

})

app.post('/api/learnerProgrammes', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made Programmes");

    let jsondata = req.body;
    console.log("THIS", jsondata)

    connection.query('SELECT `programme_names`, `batch_no`, `client_names` FROM `lms_learner` WHERE `national_id` = ?', [jsondata.id], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/batchProgramme', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made Programmes");

    let jsondata = req.body;
    console.log("THIS", jsondata)

    connection.query('SELECT `programme`, `client_name` FROM `lms_batch` WHERE `batch_no` = ?', [jsondata.batch], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/user', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;

    connection.query('SELECT * FROM `lms_users` WHERE username= ?',[jsondata.username], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/deleteBatch', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(req.body)

    connection.query('DELETE FROM `lms_batch` WHERE `batch_no` IN (?)', [req.body], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/deleteClient', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(req.body)

    connection.query('DELETE FROM `lms_client` WHERE `name` IN (?)', [req.body], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/deleteFacilitator', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(req.body)

    connection.query('DELETE FROM `lms_facilitator` WHERE `ID` IN (?)', [req.body], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/deleteModerator', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(req.body)

    connection.query('DELETE FROM `lms_moderator` WHERE `ID` IN (?)', [req.body], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/deleteAssessor', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(req.body)

    connection.query('DELETE FROM `lms_assessor` WHERE `ID` IN (?)', [req.body], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/deleteLearner', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(req.body)

    connection.query('DELETE FROM `lms_learner` WHERE `national_id` IN (?)', [req.body], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/deleteBatchLearners', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(req.body)
    var ids = [];
    var batch = [];
    for(var i in jsondata){
      ids.push(jsondata[i].id)
      batch.push(jsondata[i].batch)
    }
      console.log(ids, batch)
    connection.query('DELETE FROM `lms_learner_batch` WHERE `learner_ID` IN (?) AND `batch_no` IN (?)', [ids, batch], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/unitstd', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT * FROM `lms_unitstd`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.get('/api/spp', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT * FROM `lms_sp_programmes`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/spMod', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(jsondata)
    connection.query('SELECT * FROM `lms_sp_modules` WHERE Number = ?', [jsondata.index], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({express: rows})
      connection.release();
    })
  })

})

app.get('/api/sc', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT * FROM `lms_short_courses`', function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})



app.post('/api/learnerInfo', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");
    console.log(req.body)

    connection.query('SELECT * FROM `lms_learner` WHERE national_id = ?', [req.body.ID], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();
    })
  })
})

app.post('/api/learner_batch', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    connection.query('SELECT `learner_ID` FROM `lms_learner_batch` WHERE batch_no = ?', [req.body.batch_no], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({express: rows})
      connection.release();
    })
  })

})
app.post('/api/learner_batch2', (req, res) => {
  let learners = [];
  let learnersInfo = [];
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    console.log("connection made");

    let jsondata = req.body;
    console.log(jsondata)
    connection.query('SELECT * FROM `lms_learner` WHERE national_id IN (?)', [jsondata], function(err, rows, fields) {

      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({express: rows})
      connection.release();
    })
  })

})

app.get('/api/lms_client', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    console.log("Connection made");
    // Use the connection
    connection.query('SELECT `name`, `telephone`, `address`, `contact`, `municipality` FROM `lms_client`', function (err, rows, fields) {
      // And done with the connection.


      // Handle error after the release.
      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
      connection.release();

    });
  });
});

app.get('/api/lms_logistics', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    connection.query('SELECT `venue`,`batchno`,`facilitator`,`assessor`,`moderator` FROM `lms_logistics`', function (err, rows, fields) {

      // And done with the connection.
      connection.release();

      // Handle error after the release.
      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });

    });
  });
});

app.get('/api/lms_dates', (req, res) => {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    connection.query('SELECT `facilitator_date`, `assessment_date`, `moderation_date` FROM `lms_dates`', function (err, rows, fields) {
      // And done with the connection.
      connection.release();

      // Handle error after the release.
      if (err) throw err;

      console.log('The solution is: ', rows);
      res.send({ express: rows });
    });
  });
});


app.post('/data/lms_learner_batch', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
        for(var x in jsondata[i]) {
          values.push(jsondata[i][x])
        }
        console.log(values)
        //IF NOT EXISTS (SELECT * FROM lms_learner_batch WHERE learner_ID = ? AND batch_no = ?) THEN
        connection.query("INSERT INTO `lms_learner_batch` (`learner_ID`, `batch_no`) VALUES (?)", [values], function(err, result){
          if(err) console.log(err);

          console.log("1 record inserted");
            });
        values.splice(0,2);

      }
    console.log(values)


      res.send({ express: req.body });
  });
});

app.post('/data/lms_batch', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("INSERT INTO `lms_batch` (`batch_no`, `date`,`end_date`, `client_name`,`project`,`venue`,`programme`,`credit`,`facilitator`, `assessor`, `moderator`, `assessment_date`, `moderator_date`, `programmeType`, `unitstd`, `qualification`, `skills_programme`, `short_courses`, `q_modules`, `sp_modules`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_qualification', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("INSERT INTO `lms_q_programmes`(`Number`, `QUALIFICATION_MODULE_DETAILS`, `SAQA_ID`, `NQF_LEV`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_us', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("INSERT INTO `lms_unitstd`(`SAQA_ID`, `UNIT_STANDARD`, `NQF_LEVEL`, `CREDITS`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_sp', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("INSERT INTO `lms_sp_programmes`(`Number`, `MODULE_DETAILS`, `SAQA_ID`, `NQF_LEV`, `CREDITS`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_sc', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("INSERT INTO `lms_short_courses`(`Number`, `Programme`, `NQF LEV`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/register', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
        values.push(jsondata[i]);
      //}
    }
    console.log(values)
      connection.query("INSERT INTO `lms_users`(`first_name`, `last_name`, `username`, `password`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_client', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
      //if (i != "address2" && i != "postCode"){
        values.push(jsondata[i]);
      //}
    }
    console.log(values)
      connection.query("INSERT INTO `lms_client` (`name`, `telephone`, `address`, `contact`, `municipality`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_facilitator', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
        values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("INSERT INTO `lms_facilitator` (`name`,`ID`,`Cell_no`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_assessor', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
       //  if (i == "expiry_date") {
       //    let date = new Date(jsondata[i])
       //    values.push(date)
       //  }
       // else {
          values.push(jsondata[i]);
      //  }
    }
    console.log(values)
      connection.query("INSERT INTO `lms_assessor` (`name`,`ID`,`Reg_no`,`SETA`,`Expiry Date`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_moderator', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
        // if (i == "expiry_date") {
        //   let date = new Date(jsondata[i])
        //   values.push(date)
        // }
        // else {
          values.push(jsondata[i]);
      //  }
    }
    console.log(values)
      connection.query("INSERT INTO `lms_moderator` (`name`,`ID`,`Reg_no`,`SETA`,`Expiry Date`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_learner', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("INSERT INTO `lms_learner`(`id_type`, `national_id`, `last_school`,`year_attended`, `statssa`, `education`, `ass_status`, `equity`, `nationality`, `gender`, `language`, `employed`, `disability`, `surname`, `firstname`, `secondname`, `title`, `dob`, `homeaddr`, `homeno`, `postaddr`, `cellno`, `employer`, `faxno`, `workno`, `email`, `prev_surname`, `assessor`, `moderator`, `facilitator`, `club`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_learnerUpdate', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    // var values = [];
    // for(var i in jsondata){
    //       values.push(jsondata[i]);
    // }
    // console.log(values)
      connection.query("UPDATE `lms_learner` SET `programme_names` = ?, `batch_no` = ?, `client_names` = ? WHERE `national_id` = ?", [jsondata.programme, jsondata.batch,  jsondata.client, jsondata.id], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});


app.post('/data/lms_learnerEdit', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("REPLACE INTO `lms_learner`(`id_type`, `national_id`, `last_school`,`year_attended`, `statssa`, `education`, `ass_status`, `equity`, `nationality`, `gender`, `language`, `employed`, `disability`, `surname`, `firstname`, `secondname`, `title`, `dob`, `homeaddr`, `homeno`, `postaddr`, `cellno`, `employer`, `faxno`, `workno`, `email`, `prev_surname`, `assessor`, `moderator`, `facilitator`, `club`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_clientEdit', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("REPLACE INTO `lms_client`(`name`, `telephone`, `address`, `contact`, `municipality`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_batchEdit', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("REPLACE INTO `lms_batch`(`batch_no`, `date`,`end_date`,`client_name`,`project`,`venue`,`programme`,`credit`,`facilitator`,`assessor`,`moderator`,`assessment_date`,`moderator_date`,`programmeType`,`unitstd`,`qualification`,`skills_programme`,`short_courses`,`q_modules`,`sp_modules`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_facilitatorEdit', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("REPLACE INTO `lms_facilitator`(`name`, `ID`, `Cell_no`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_moderatorEdit', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("REPLACE INTO `lms_moderator`(`name`, `ID`, `Reg_no`, `SETA`, `Expiry Date`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_learnerEdit', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
          values.push(jsondata[i]);
    }
    console.log(values)
      connection.query("REPLACE INTO `lms_learner`(`id_type`, `national_id`, `last_school`,`year_attended`, `statssa`, `education`, `ass_status`, `equity`, `nationality`, `gender`, `language`, `employed`, `disability`, `surname`, `firstname`, `secondname`, `title`, `dob`, `homeaddr`, `homeno`, `postaddr`, `cellno`, `employer`, `faxno`, `workno`, `email`, `prev_surname`, `assessor`, `moderator`, `facilitator`, `club`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_logistics', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
      if (i != "table"){
        values.push(jsondata[i]);
      }
    }

      connection.query("INSERT INTO `lms_logistics` (`venue`, `batchno`, `facilitator`, `assessor`, `moderator`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

app.post('/data/lms_dates', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected
    // Use the connection
    var jsondata = req.body;
    console.log(jsondata);
    var values = [];
    for(var i in jsondata){
      if (i != "table"){
        values.push(jsondata[i]);
      }
    }

      connection.query("INSERT INTO `lms_dates` (`facilitator_date`, `assessment_date`, `moderation_date`) VALUES (?)", [values], function(err, result){
        if(err) console.log(err);

        console.log("1 record inserted");
          });

      res.send({ express: req.body });
  });
});

// app.post('/data', function(req, res) {
//   var jsondata = req.body;
//   var values = [];
//   var index = [];
//      var table;
//    for(var i in jsondata){
//       if(i == "table") {
//         table = jsondata[i];
//       }
//       else {
//         index.push(i);
//         values.push(jsondata[i]);
//       }
//
//   }
//     // var sql = mysql.format("INSERT INTO `" + table + "` (?) VALUES (?)", [index, values]);
//     // console.log(sql);
//     connection.query("INSERT INTO `" + table + "` (??) VALUES (?)", [index, values], function(err, result){
//       if(err) console.log(err);
//
//       console.log("1 record inserted");
//         });
//
//     res.send({ express: req.body });
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
