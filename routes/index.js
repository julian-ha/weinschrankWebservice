var express = require('express');
const cors = require('cors');
var router = express.Router();

const databaseApi = require('../database');
const places = ['bottle1', 'bottle2', 'bottle3'];


/* GET home page. */
router.get('/', async (req, res, next) =>  {
  
  //display the whole dashboard
  const sqlGetData = 'SELECT * FROM weinschrank WHERE id = 1';
  var data = await databaseApi.queryDB(sqlGetData);


  res.render('index', { 
    title: 'Weinschrank Dashboard',
    data: data
  });
});

router.put('/vent/:rpm', cors(), async (req, res, next) => {
  console.log(`A request on that api occured with data ${req.params.rpm}`);

  //store data in database
  const sqlUpdateVent = 'UPDATE weinschrank SET vent_rpm = ? WHERE id = 1';
  var variablesUpdateVent = [req.params.rpm];
  await databaseApi.queryDB(sqlUpdateVent, variablesUpdateVent);

  res.sendStatus(200)
});


router.put('/doorlock/:value',cors(), async (req, res, next) => {
  console.log(`A request on that api occured with data ${req.params.value}`);
  
  //store the data in the database
  const sqlUpdateDoorlock = 'UPDATE weinschrank SET door_open = ? WHERE id = 1';
  var variablesUpdateDoorlock = [req.params.value]; 
  await databaseApi.queryDB(sqlUpdateDoorlock, variablesUpdateDoorlock);

  res.sendStatus(200)
});

router.put('/reading/:temperature/:humidity/:pressure', cors(), async (req, res, next) => {
  console.log(`A request on that api occured with data ${req.params.temperature} and ${req.params.humidity}`);
  
  //store the data in the database
  const sqlUpdateReadings = 'UPDATE weinschrank SET temperature = ?, humidity = ?, pressure = ? WHERE id = 1';
  var variablesUpdateReadings = [req.params.temperature, req.params.humidity, req.params.pressure];
  await databaseApi.queryDB(sqlUpdateReadings, variablesUpdateReadings);

  res.sendStatus(200)

});

router.put('/bottle/:place/:value', cors(), async (req, res, next) => {
  console.log(`A request on that api occured with data ${req.params.place} and ${req.params.value}`);
  
  if (!places.includes(req.params.place)) return res.sendStatus(406)

  if (req.params.value != 1 && req.params.value != 0) return res.sendStatus(406)
  
  //store the data in the database
  const sqlUpdateBottleData = `UPDATE weinschrank SET ${req.params.place} = ? WHERE ID = 1`;
  var variablesUpdateBottleData = [req.params.value];
  await databaseApi.queryDB(sqlUpdateBottleData, variablesUpdateBottleData);

  res.sendStatus(200)
});

module.exports = router;
