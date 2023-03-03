// import * as $ from 'jquery';
// document.addEventListener('DOMContentLoaded', function () {

// const { Calendar } = require("fullcalendar");


//   var Calendar = FullCalendar.Calendar;
//   var Draggable = FullCalendar.Draggable;

//   var containerEl = document.getElementById('external-events');
//   var calendarEl = document.getElementById('calendar');
//   var checkbox = document.getElementById('drop-remove');

//   // initialize the external events
//   // -----------------------------------------------------------------

//   new Draggable(containerEl, {
//       itemSelector: '.fc-event',
//       editable: true,
//       eventData: function(eventEl) {
//       return {
//           title: eventEl.innerText,
//           duration: eventEl.getAttribute("duration"),
//           editable: true
//       };
//       }
//   });



//   // initialize the calendar
//   // -----------------------------------------------------------------

//   var calendar = new Calendar(calendarEl, {
//       //timeZone: "UTC",
//       headerToolbar: {
//           left: 'prev,next today addEventButton',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay'
//       },
//       customButtons: {
//           addEventButton: {
//             text: 'Add Appointment',
//             click: function() {
//               addEvent();
//               // var dateStr = prompt('Enter a date in YYYY-MM-DD format');
//               // var date = new Date(dateStr + 'T00:00:00'); // will be in local time

//               // if (!isNaN(date.valueOf())) { // valid?
//               //   calendar.addEvent({
//               //     title: 'dynamic event',
//               //     start: date,
//               //     allDay: true
//               //   });
//               //   alert('Great. Now, update your database...');
//               // } else {
//               //   alert('Invalid date.');
//               // }
//             }
//           //   click: addEvent(),
//           }
//       },
//       nowIndicator: true,
//       businessHours: [
//           {
//               daysOfWeek: [ 1, 2, 3, 4, 5 ],
//               startTime: '08:00',
//               endTime: '12:00'
//           },
//           { 
//               daysOfWeek: [ 1, 2, 3, 4, 5 ],
//               startTime: '13:00',
//               endTime: '17:00'
//           }
//       ],
//       editable: true,
//       droppable: true, // this allows things to be dropped onto the calendar
//       eventReceive: async function(info) {
//           console.log(info.event);
//           axios.post('/events', {
//             title: info.event.title,
//             start: info.event.startStr,
//             end: info.event.endStr
//           }).then((response) => {
//             console.log(response);
//           }).catch((error) => {
//             console.log(error);
//           });
//           // const options = {
//           //     method: "POST",
//           //     body: JSON.stringify(info),
//           //     headers: {
//           //         "Content-Type": "application/json"
//           //     }
//           // };

//           // const response = await fetch("/addAppointment", options);
//           // const json = await response.json();
//           // console.log(json);


//           // $.ajax({
//           // type: "Post",
//           // url: "/addAppointment",
//           // success: function (data) {

//           // },
//           // error: function(data){

//           // }
//           // });
//           // console.log(JSON.stringify(info))
//           // var name = prompt("Enter Name: ")
//           // info.event._def.title = info.event._def.title + " for " + name
//       },
//       eventClick: function (info) {
//           calendar.changeView('list', info.event.start);
//       },
//       dateClick: function (info) {
//           if(calendar.view.type == 'timeGridWeek')
//               calendar.changeView('timeGridDay', info.dateStr);
//           else if(calendar.view.type == 'timeGridDay')
//           {
//               addEvent(info);
//           }
//           else
//               calendar.changeView('timeGridWeek', info.dateStr);
//       }
//   });
//   calendar.render();
// });

// document.addEventListener('DOMContentLoaded', function() {
//   var calendarEl = document.getElementById('calendar');

//   var calendar = new FullCalendar.Calendar(calendarEl, {
//     initialView: 'dayGridMonth',
//     selectable: true,
//     select: function(info) {
//       var title = prompt('Enter event title:');
//       if (title) {
//         calendar.addEvent({
//           title: title,
//           start: info.startStr,
//           end: info.endStr
//         });

//         axios.post('/events', {
//           title: title,
//           start: info.startStr,
//           end: info.endStr
//         }).then((response) => {
//           console.log(response);
//         }).catch((error) => {
//           console.log(error);
//         });
//       }
//     }
//   });

//   calendar.render();
// });
var Calendar;
var calendar;
var Calendar2;
var calendar2;

function openForm(info) {
  if (info != null) {
    document.getElementById("formStartTime").value = datetimeLocal(info.dateStr);
    document.getElementById("formEndTime").value = datetimeLocalEndTime(info.dateStr);
  }
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("formTitle").value = "";
  document.getElementById("formStartTime").value = "";
  document.getElementById("formEndTime").value = "";
  document.getElementById("formClientName").value = "";
  document.getElementById("formClientPhone").value = "";
  document.getElementById("formExamRoom").checked = false;
  document.getElementById("formFarmCall").checked = false;
  document.getElementById("formFarmAddress").value = "";
  document.getElementById("formNotes").value = "";
}

function showMoreOptions() {
  if (document.getElementById("morOptionsDiv").style.display == "none") {
    document.getElementById("morOptionsDiv").style.display = "block";
    document.getElementById("moreOptionsBtn").innerHTML = "^";
  }
  else {
    document.getElementById("morOptionsDiv").style.display = "none";
    document.getElementById("moreOptionsBtn").innerHTML = "⌄";
  }
}

function datetimeLocal(datetime) {
  const dt = new Date(datetime);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  return dt.toISOString().slice(0, 16);
}

function datetimeLocalEndTime(datetime) {
  const dt = new Date(datetime);
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  dt.setHours(dt.getHours() + 1);
  return dt.toISOString().slice(0, 16);
}

async function submitForm() {
  var info = {
    title: document.getElementById("formTitle").value,
    start: new Date(document.getElementById("formStartTime").value).toISOString(),
    end: new Date(document.getElementById("formEndTime").value).toISOString(),
    client: document.getElementById("formClientName").value,
    phone: document.getElementById("formClientPhone").value,
    examRoom: document.getElementById("formExamRoom").checked,
    farmCall: document.getElementById("formFarmCall").checked,
    address: document.getElementById("formFarmAddress").value,
    notes: document.getElementById("formNotes").value,
    duration: (new Date(document.getElementById("formEndTime").value).getHours()
      - new Date(document.getElementById("formStartTime").value).getHours()).toString().padStart(2, '0')
      + ":" + (new Date(document.getElementById("formEndTime").value).getMinutes()
        - new Date(document.getElementById("formStartTime").value).getMinutes()).toString().padStart(2, '0')
  };
  // var start = new Date(document.getElementById("formStartTime").value);
  // var end = new Date(document.getElementById("formEndTime").value);

  console.log(info.end);
  axios.post('/events', {
    title: info.title,
    start: info.start,
    end: info.end,
    id: Date.now().toString(),
    client: info.client,
    phone: info.phone,
    examRoom: info.examRoom,
    farmCall: info.farmCall,
    address: info.address,
    notes: info.notes,
    duration: info.duration
  }).then((response) => {
    // console.log(response);
    calendar.refetchEvents()
  }).catch((error) => {
    console.log(error);
  });
  closeForm();
  // $('#calendar').fullCalendar('rerenderEvents');
}

function loadTemplates() {
  var extEvents = document.getElementById("external-events");
  $.ajax({
    type: "Get",
    url: "/templates",
    success: function (data) {
      $.each(data, function (i, v) {
        var newEventDiv = document.createElement("div");
        newEventDiv.setAttribute("class", "fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event");
        newEventDiv.setAttribute("duration", v.duration);
        var newEvent = document.createElement("div");
        newEvent.setAttribute("class", "fc-event-main");
        newEvent.innerHTML = v.title;
        newEventDiv.appendChild(newEvent);
        extEvents.appendChild(newEventDiv);
      })
    },
    error: function (error) {
      alert("failed to get templates");
    }
  });

  var waitList = document.getElementById("event-parkingSpot")
  $.ajax({
    type: "Get",
    url: "/loadWaitList",
    success: function (data) {
      $.each(data, function (i, v) {
        var newEventDiv = document.createElement("div");
        newEventDiv.setAttribute("class", "fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event");
        newEventDiv.setAttribute("duration", v.duration);
        newEventDiv.setAttribute("start", v.start);
        newEventDiv.setAttribute("end", v.end);
        newEventDiv.setAttribute("id", v.id);
        newEventDiv.setAttribute("notes", v.notes);
        newEventDiv.setAttribute("farmCall", v.farmCall);
        newEventDiv.setAttribute("examRoom", v.examRoom);
        newEventDiv.setAttribute("address", v.address);
        newEventDiv.setAttribute("client", v.client);
        newEventDiv.setAttribute("phone", v.phone);
        newEventDiv.setAttribute("title", v.title);
        var newEvent = document.createElement("div");
        newEvent.setAttribute("class", "fc-event-main");
        newEvent.innerHTML = v.title;
        newEventDiv.appendChild(newEvent);
        waitList.appendChild(newEventDiv);
      })
    },
    error: function (error) {
      alert("failed to get templates");
    }
  });

}


jQuery(function () {
  $(function () {
    $("#tabs").tabs();
  });

  $(function() {
    $( "#tabs" ).tabs({ activate: function(event ,ui){
                    //console.log(event);
                    //alert(  ui.newTab.index());
        // alert( ui.newTab.attr('li',"innerHTML")[0].getElementsByTagName("a")[0].innerHTML);
        calendar2.render();
        //alert( this.text);
                } });});

  Calendar = FullCalendar.Calendar;


  var Draggable = FullCalendar.Draggable;

  var containerEl = document.getElementById('external-events');
  var calendarEl = document.getElementById('calendar');


  new Draggable(containerEl, {
    itemSelector: '.fc-event',
    editable: true,
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
        duration: eventEl.getAttribute("duration"),
        editable: true
      };
    }
  });


  var DragParking = FullCalendar.Draggable;
  var parkingEl = document.getElementById('event-parkingSpot');
  new DragParking(parkingEl, {
    itemSelector: '.fc-event',
    editable: true,
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
        duration: eventEl.getAttribute("duration"),
        client: eventEl.getAttribute("client"),
        phone: eventEl.getAttribute("phone"),
        notes: eventEl.getAttribute("notes"),
        address: eventEl.getAttribute("address"),
        examRoom: eventEl.getAttribute("examRoom"),
        farmCall: eventEl.getAttribute("farmCall"),
        id: eventEl.getAttribute("id"),
        editable: true
      };
    }
  });



  calendar = new Calendar(calendarEl, {
    //timeZone: "UTC",
    // plugins: ['interaction', 'dayGrid', 'timeGrid'],
    headerToolbar: {
      left: 'prev,next today addEventButton',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
    },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List'
    },
    initialView: 'timeGridWeek',
    events: "/events",
    customButtons: {
      addEventButton: {
        text: 'Add Appointment',
        click: function () {
          openForm();
        }
      }
    },
    // EventSources: [
    //   "/events"
    // ],
    nowIndicator: true,
    // eventDidMount: function(){
    //   // calendar.refetchEvents()
    // },
    businessHours: [
      {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '08:00',
        endTime: '12:00'
      },
      {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '13:00',
        endTime: '17:00'
      }
    ],
    slotMinTime:"05:00:00",
    slotMaxTime:"22:00:00",
    slotDuration:"00:15:00",
    scrollTime:"08:00:00",
    // slotLabelInterval:"00:15:00",
    expandRows: true,
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    eventReceive: async function (info) {
      // info.event.id = Date.now().toString();
      info.event.setProp('id', Date.now().toString());
      var tempEnd;
      if(info.event.duration && !info.event.endStr)
      {
        var startDate = new Date(info.event.startStr);
        var endDate = new Date();
        endDate.setDate(startDate.getDate());
        endDate.setHours(startDate.getHours() + parseInt(duration.split(":")[0]));
        endDate.setMinutes(startDate.getMinutes() + parseInt(duration.split(":")[1]));
        tempEnd = endDate.toISOString().slice(0, 16);
      }
      else
        tempEnd = info.event.endStr;
      console.log(tempEnd);
      // console.log("eventReceive");
      // console.log(info.event);
      axios.post('/events', {
        title: info.event.title,
        start: info.event.startStr,
        end: tempEnd,
        id: info.event.id,
        duration: info.event.duration
      }).then((response) => {
        // console.log(response);
        if (info.event.startStr == info.event.endStr)//if it is an all day event
          calendar.refetchEvents();
      }).catch((error) => {
        console.log(error);
      });
    },
    eventDrop: async function (info) {
      axios.post('/updateEvent', {
        title: info.event.title,
        start: info.event.startStr,
        end: info.event.endStr,
        id: info.event.id,
        client: info.event.client,
        phone: info.event.phone,
        examRoom: info.event.examRoom,
        farmCall: info.event.farmCall,
        address: info.event.address,
        notes: info.event.notes,
        duration: info.event.duration
      }).then((response) => {
        // console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    drop: async function (info) {
      var index = $("#tabs").tabs('option', 'active');
      console.log(index);
      if (info.draggedEl.parentNode.getAttribute("id") == "event-parkingSpot") {
        info.draggedEl.parentNode.removeChild(info.draggedEl);
        console.log(info);
        axios.post('/removeWait', {
          id: info.draggedEl.id,
        }).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    eventResize: async function (info) {
      // console.log(info.event.id);
      axios.post('/updateEvent', {
        title: info.event.title,
        start: info.event.startStr,
        end: info.event.endStr,
        id: info.event.id
      }).then((response) => {
        // console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    eventClick: function (info) {
      calendar.changeView('list', info.event.start);
    },
    dateClick: function (info) {
      if (calendar.view.type == 'timeGridWeek')
        calendar.changeView('timeGridDay', info.dateStr);
      else if (calendar.view.type == 'timeGridDay') {
        openForm(info);
      }
      else
        calendar.changeView('timeGridDay', info.dateStr);
    },
    eventDragStop: function (info) {
      console.log(info);
      console.log(info.jsEvent.target.parentElement.parentElement);
      if (info.jsEvent.target.getAttribute('id') == "event-parkingSpot" ||
        info.jsEvent.target.parentElement.getAttribute('id') == "event-parkingSpot" ||
        info.jsEvent.target.parentElement.parentElement.getAttribute('id') == "event-parkingSpot") {
        console.log("Yay!");
        var parking = document.getElementById("event-parkingSpot");

        var duration = (new Date(info.event.endStr).getHours()
          - new Date(info.event.startStr).getHours()).toString().padStart(2, '0')
          + ":" + (new Date(info.event.endStr).getMinutes()
            - new Date(info.event.startStr).getMinutes()).toString().padStart(2, '0')

        var newEventDiv = document.createElement("div");
        newEventDiv.setAttribute("class", "fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event");
        newEventDiv.setAttribute("duration", duration);
        newEventDiv.setAttribute("client", info.event.extendedProps.client);
        newEventDiv.setAttribute("phone", info.event.extendedProps.phone);
        newEventDiv.setAttribute("notes", info.event.extendedProps.notes);
        newEventDiv.setAttribute("address", info.event.extendedProps.address);
        newEventDiv.setAttribute("examRoom", info.event.extendedProps.examRoom);
        newEventDiv.setAttribute("farmCall", info.event.extendedProps.farmCall);
        newEventDiv.setAttribute("id", info.event.id);

        info.event.remove();
        var newEvent = document.createElement("div");
        newEvent.setAttribute("class", "fc-event-main");
        newEvent.innerHTML = info.event.title;
        newEventDiv.appendChild(newEvent);
        parking.appendChild(newEventDiv);


        axios.post('/waitList', {
          title: info.event.title,
          start: info.event.startStr,
          end: info.event.endStr,
          id: info.event.id,
          client: info.event.client,
          phone: info.event.phone,
          examRoom: info.event.examRoom,
          farmCall: info.event.farmCall,
          address: info.event.address,
          notes: info.event.notes,
          duration: info.event.duration
        }).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
      } else if (info.jsEvent.target.getAttribute('id') == "trashCan" ||
        info.jsEvent.target.parentElement.getAttribute('id') == "trashCan" ||
        info.jsEvent.target.parentElement.parentElement.getAttribute('id') == "trashCan") {
        info.event.remove();
        axios.post('/remove', {
          id: info.event.id,
        }).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
      }
    }

  });
  loadTemplates()
  calendar.render();





  Calendar2 = FullCalendar.Calendar;
  var Draggable2 = FullCalendar.Draggable;
  var containerEl2 = document.getElementById('external-events2');
  var calendarEl2 = document.getElementById('calendar2');


  new Draggable2(containerEl2, {
    itemSelector: '.fc-event',
    editable: true,
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
        duration: eventEl.getAttribute("duration"),
        editable: true
      };
    }
  });


  calendar2 = new Calendar2(calendarEl2, {
    //timeZone: "UTC",
    // plugins: ['interaction', 'dayGrid', 'timeGrid'],
    headerToolbar: {
      left: 'prev,next today addEventButton',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
    },
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List'
    },
    initialView: 'timeGridWeek',
    events: "/events",//prevEvents,
    customButtons: {
      addEventButton: {
        text: 'Add Appointment',
        click: function () {
          openForm();
        }
      }
    },
    // EventSources: [
    //   "/events"
    // ],
    nowIndicator: true,
    // eventDidMount: function(){
    //   // calendar.refetchEvents()
    // },
    businessHours: [
      {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '08:00',
        endTime: '12:00'
      },
      {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '13:00',
        endTime: '17:00'
      }
    ],
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    eventReceive: async function (info) {
      // info.event.id = Date.now().toString();
      info.event.setProp('id', Date.now().toString());
      // console.log("eventReceive");
      // console.log(info.event);
      axios.post('/events', {
        title: info.event.title,
        start: info.event.startStr,
        end: info.event.endStr,
        id: info.event.id,
        duration: info.event.duration
      }).then((response) => {
        // console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    eventDrop: async function (info) {
      axios.post('/updateEvent', {
        title: info.event.title,
        start: info.event.startStr,
        end: info.event.endStr,
        id: info.event.id,
        client: info.event.client,
        phone: info.event.phone,
        examRoom: info.event.examRoom,
        farmCall: info.event.farmCall,
        address: info.event.address,
        notes: info.event.notes,
        duration: info.event.duration
      }).then((response) => {
        // console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    eventResize: async function (info) {
      // console.log(info.event.id);
      axios.post('/updateEvent', {
        title: info.event.title,
        start: info.event.startStr,
        end: info.event.endStr,
        id: info.event.id
      }).then((response) => {
        // console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    drop: async function (info) {
      var index = $("#tabs").tabs('option', 'active');
      console.log(index);
    },
    eventClick: function (info) {
      calendar2.changeView('list', info.event.start);
    },
    dateClick: function (info) {
      if (calendar2.view.type == 'timeGridWeek')
        calendar2.changeView('timeGridDay', info.dateStr);
      else if (calendar2.view.type == 'timeGridDay') {
        openForm(info);
      }
      else
        calendar2.changeView('timeGridDay', info.dateStr);
    }
  });
  loadTemplates2()
  // getEvents(); // Call the function to load existing events from the database
  calendar2.render();
});
function loadTemplates2() {
  var extEvents = document.getElementById("external-events2");
  $.ajax({
    type: "Get",
    url: "/templates",
    success: function (data) {
      $.each(data, function (i, v) {
        var newEventDiv = document.createElement("div");
        newEventDiv.setAttribute("class", "fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event");
        newEventDiv.setAttribute("duration", v.duration);
        var newEvent = document.createElement("div");
        newEvent.setAttribute("class", "fc-event-main");
        newEvent.innerHTML = v.title;
        newEventDiv.appendChild(newEvent);
        extEvents.appendChild(newEventDiv);
      })
    },
    error: function (error) {
      alert("failed to get templates");
    }
  });
}