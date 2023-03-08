// const express = require('express');
// const db = require('./database');
// const ejs = require('ejs');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// app.use(express.json());


// app.listen(port, () => {
//     console.log(`Server running on port ${port}.`);
//   });

// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');

// app.get('/events', (req, res) => {
//     db.all(`SELECT * FROM events`, (err, rows) => {
//       if (err) {
//         console.error(err.message);
//         res.status(500).send('Failed to retrieve events.');
//       } else {
//         res.status(200).send(rows);
//       }
//     });
//   });


// app.post('/events', (req, res) => {
//   const { title, start, end } = req.body;
//   db.run(`INSERT INTO events (title, start, end)
//           VALUES (?, ?, ?)`, [title, start, end], (err) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Failed to save event.');
//     } else {
//       res.status(200).send('Event saved successfully.');
//     }
//   });
// });

// import * as $ from 'jquery';
const express = require('express');
const db = require('./database');
// const ejs = require('ejs');
// const axios = require('axios');
// // require('fullcalendar');
// const fullcalendar = require('fullcalendar');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

app.get('/', function(req, res){
    res.render('index.ejs');
  });

app.get('/events', (req, res) => {
    db.all(`SELECT * FROM events`, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Failed to retrieve events.');
      } else {
        res.status(200).send(rows);
      }
    });
  });

app.post('/events', (req, res) => {
  const { title, start, end, id, 
    client, phone, examRoom, farmCall, 
    address, notes, duration, doctor } = req.body;
  db.run(`INSERT INTO events (title, start, end, id,
     client, phone, examRoom, farmCall, address, notes, duration, doctor)
          VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?, ?)`,
        [title, start, end, id, client, phone, examRoom,
        farmCall, address, notes, duration, doctor], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Failed to save event.');
    } else {
      res.status(200).send('Event saved successfully.');
      console.log(req.body);
    }
  });
});

app.get('/templates', (req, res) => {
    db.all(`SELECT * FROM templates`, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Failed to retrieve events.');
      } else {
        res.status(200).send(rows);
      }
    });
  });

app.post('/updateEvent', (req, res) => {
    const { title, start, end, id} = req.body;
    db.run(`UPDATE events 
            SET title = ?, start = ?, end = ?
            WHERE id = ?`, [title, start, end, id], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Failed to save event.');
        console.log(req.body);
      } else {
        res.status(200).send('Event update saved successfully.');
        console.log(req.body);
      }
    });
  });

app.post('/remove', (req, res) => {
    const {id} = req.body;
        const deleteStatement = db.prepare(`DELETE FROM events WHERE id = ${id}`);
        deleteStatement.run();
        deleteStatement.finalize();
});

app.post('/removeWait', (req, res) => {
  const {id} = req.body;
      const deleteStatement = db.prepare(`DELETE FROM waitList WHERE id = ${id}`);
      deleteStatement.run();
      deleteStatement.finalize();
});

app.post('/waitList', (req, res) => {
  const {title, start, end, id, 
    client, phone, examRoom, farmCall, 
    address, notes, duration } = req.body;
    db.run(`INSERT INTO waitList (title, start, end, id,
      client, phone, examRoom, farmCall, address, notes, duration)
           VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?)`,
         [title, start, end, id, client, phone, examRoom,
         farmCall, address, notes, duration], (err) => {
     if (err) {
       console.error(err.message);
       res.status(500).send('Failed to save event.');
     } else {
       res.status(200).send('Event saved successfully.');
       console.log(req.body);
     }
   });

      const deleteStatement = db.prepare(`DELETE FROM events WHERE id = ${id}`);
      deleteStatement.run();
      deleteStatement.finalize();
});

app.get('/loadWaitList', (req, res) => {
  db.all(`SELECT * FROM waitList`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Failed to retrieve events.');
    } else {
      res.status(200).send(rows);
    }
  });
});



  app.get('/eventsMoss', (req, res) => {
    db.all(`SELECT * FROM mossEvents`, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Failed to retrieve events.');
      } else {
        res.status(200).send(rows);
      }
    });
  });

app.post('/eventsMoss', (req, res) => {
  const { title, start, end, id, 
    client, phone, examRoom, farmCall, 
    address, notes, duration, patient, doctor } = req.body;
  db.run(`INSERT INTO mossEvents (title, start, end, id,
     client, phone, examRoom, farmCall, address, notes, duration, patient, doctor)
          VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?, ?, ?)`,
        [title, start, end, id, client, phone, examRoom,
        farmCall, address, notes, duration, patient, doctor], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Failed to save event.');
    } else {
      res.status(200).send('Event saved successfully.');
      console.log(req.body);
    }
  });
});
// title: info.title,
//       start: info.start,
//       end: info.end,
//       id: info.id,
//       client: info.client,
//       phone: info.phone,
//       examRoom: info.examRoom,
//       farmCall: info.farmCall,
//       address: info.address,
//       notes: info.notes,
//       duration: info.duration,
//       patient: info.patient,
//       doctor: "Moss"
  app.post('/updateMossEvent', (req, res) => {
    const { title, start, end, id, client, 
      phone, examRoom, farmCall, address, notes,
      duration, patient, doctor} = req.body;
    db.run(`UPDATE mossEvents 
            SET title = ?, start = ?, end = ?, client = ?, 
            phone = ?, examRoom = ?, farmCall = ?, address = ?,
            notes = ?, duration = ?, patient = ?, doctor = ?
            WHERE id = ?`, [title, start, end, client, 
              phone, examRoom, farmCall, address, notes,
              duration, patient, doctor, id], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Failed to save event.');
        console.log(req.body);
      } else {
        res.status(200).send('Event update saved successfully.');
        console.log(req.body);
      }
    });
  });

app.post('/removeMossEvents', (req, res) => {
  const {id} = req.body;
      const deleteStatement = db.prepare(`DELETE FROM mossEvents WHERE id = ${id}`);
      deleteStatement.run();
      deleteStatement.finalize();
});

app.post('/waitListFromMoss', (req, res) => {
  const {title, start, end, id, 
    client, phone, examRoom, farmCall, 
    address, notes, duration } = req.body;
    db.run(`INSERT INTO waitList (title, start, end, id,
      client, phone, examRoom, farmCall, address, notes, duration)
           VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?)`,
         [title, start, end, id, client, phone, examRoom,
         farmCall, address, notes, duration], (err) => {
     if (err) {
       console.error(err.message);
       res.status(500).send('Failed to save event.');
     } else {
       res.status(200).send('Event saved successfully.');
       console.log(req.body);
     }
   });

      const deleteStatement = db.prepare(`DELETE FROM mossEvents WHERE id = ${id}`);
      deleteStatement.run();
      deleteStatement.finalize();
});







app.get('/eventsRussell', (req, res) => {
  db.all(`SELECT * FROM russellEvents`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Failed to retrieve events.');
    } else {
      res.status(200).send(rows);
    }
  });
});

app.post('/eventsRussell', (req, res) => {
const { title, start, end, id, 
  client, phone, examRoom, farmCall, 
  address, notes, duration, patient, doctor } = req.body;
db.run(`INSERT INTO russellEvents (title, start, end, id,
   client, phone, examRoom, farmCall, address, notes, duration, patient, doctor)
        VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?, ?, ?)`,
      [title, start, end, id, client, phone, examRoom,
      farmCall, address, notes, duration, patient, doctor], (err) => {
  if (err) {
    console.error(err.message);
    res.status(500).send('Failed to save event.');
  } else {
    res.status(200).send('Event saved successfully.');
    console.log(req.body);
  }
});
});

app.post('/updateRussellEvent', (req, res) => {
  const { title, start, end, id, client, 
    phone, examRoom, farmCall, address, notes,
    duration, patient, doctor} = req.body;
  db.run(`UPDATE russellEvents 
          SET title = ?, start = ?, end = ?, client = ?, 
          phone = ?, examRoom = ?, farmCall = ?, address = ?,
          notes = ?, duration = ?, patient = ?, doctor = ?
          WHERE id = ?`, [title, start, end, client, 
            phone, examRoom, farmCall, address, notes,
            duration, patient, doctor, id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Failed to save event.');
      console.log(req.body);
    } else {
      res.status(200).send('Event update saved successfully.');
      console.log(req.body);
    }
  });
});

app.post('/removeRussellEvents', (req, res) => {
const {id} = req.body;
    const deleteStatement = db.prepare(`DELETE FROM russellEvents WHERE id = ${id}`);
    deleteStatement.run();
    deleteStatement.finalize();
});

app.post('/waitListFromRussell', (req, res) => {
const {title, start, end, id, 
  client, phone, examRoom, farmCall, 
  address, notes, duration } = req.body;
  db.run(`INSERT INTO waitList (title, start, end, id,
    client, phone, examRoom, farmCall, address, notes, duration)
         VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?)`,
       [title, start, end, id, client, phone, examRoom,
       farmCall, address, notes, duration], (err) => {
   if (err) {
     console.error(err.message);
     res.status(500).send('Failed to save event.');
   } else {
     res.status(200).send('Event saved successfully.');
     console.log(req.body);
   }
 });

    const deleteStatement = db.prepare(`DELETE FROM russellEvents WHERE id = ${id}`);
    deleteStatement.run();
    deleteStatement.finalize();
});






app.get('/eventsCannon', (req, res) => {
  db.all(`SELECT * FROM cannonEvents`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Failed to retrieve events.');
    } else {
      res.status(200).send(rows);
    }
  });
});

app.post('/eventsCannon', (req, res) => {
const { title, start, end, id, 
  client, phone, examRoom, farmCall, 
  address, notes, duration, patient, doctor } = req.body;
db.run(`INSERT INTO cannonEvents (title, start, end, id,
   client, phone, examRoom, farmCall, address, notes, duration, patient, doctor)
        VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?, ?)`,
      [title, start, end, id, client, phone, examRoom,
      farmCall, address, notes, duration, patient, doctor], (err) => {
  if (err) {
    console.error(err.message);
    res.status(500).send('Failed to save event.');
  } else {
    res.status(200).send('Event saved successfully.');
    console.log(req.body);
  }
});
});

app.post('/updateCannonEvent', (req, res) => {
  const { title, start, end, id, client, 
    phone, examRoom, farmCall, address, notes,
    duration, patient, doctor} = req.body;
  db.run(`UPDATE cannonEvents 
          SET title = ?, start = ?, end = ?, client = ?, 
          phone = ?, examRoom = ?, farmCall = ?, address = ?,
          notes = ?, duration = ?, patient = ?, doctor = ?
          WHERE id = ?`, [title, start, end, client, 
            phone, examRoom, farmCall, address, notes,
            duration, patient, doctor, id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Failed to save event.');
      console.log(req.body);
    } else {
      res.status(200).send('Event update saved successfully.');
      console.log(req.body);
    }
  });
});

app.post('/removeCannonEvents', (req, res) => {
const {id} = req.body;
    const deleteStatement = db.prepare(`DELETE FROM cannonEvents WHERE id = ${id}`);
    deleteStatement.run();
    deleteStatement.finalize();
});

app.post('/waitListFromCannon', (req, res) => {
const {title, start, end, id, 
  client, phone, examRoom, farmCall, 
  address, notes, duration } = req.body;
  db.run(`INSERT INTO waitList (title, start, end, id,
    client, phone, examRoom, farmCall, address, notes, duration)
         VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,?)`,
       [title, start, end, id, client, phone, examRoom,
       farmCall, address, notes, duration], (err) => {
   if (err) {
     console.error(err.message);
     res.status(500).send('Failed to save event.');
   } else {
     res.status(200).send('Event saved successfully.');
     console.log(req.body);
   }
 });

    const deleteStatement = db.prepare(`DELETE FROM cannonEvents WHERE id = ${id}`);
    deleteStatement.run();
    deleteStatement.finalize();
});