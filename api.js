const express = require('express');
const schedule = require('node-schedule');
const app = express();
const port = 5000;

var date = new Date(2019, 5,  14, 20);// API call here
var j = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});

app.get('/test', (req, res) => {
  var date = new Date(2019, 5,  14, 11, 0); // Will call API here
  var q = schedule.scheduleJob(date, function(){
   console.log('Hurray!!');
  });
  res.send('hello there');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


var times = [];
var tasks = [];

function addTask(time, fn) {
    var timeArr = time.split(':');
    var cronString = timeArr[1] + ' ' + timeArr[0] + ' * * *';
    // according to https://github.com/node-schedule/node-schedule#cron-style-scheduling
    var newTask = schedule.scheduleJob(cronString, fn);

    // check if there was a task defined for this time and overwrite it
    // this code would not allow inserting two tasks that are executed at the same time
    var idx = times.indexOf(time);
    if (idx > -1) tasks[idx] = newTask;
    else {
        times.push(time);
        tasks.push(newTask);
    }
}

function cancelTask(time) {
    // https://github.com/node-schedule/node-schedule#jobcancelreschedule
    var idx = times.indexOf(time);
    if (idx > -1) {
        tasks[idx].cancel();
        tasks.splice(idx, 1);
        times.splice(idx, 1);
    }
}

function init(tasks) {
    for (var i in tasks){
        addTask(i, tasks[i]);
    }
}

init({
    "10:00": function(){ console.log("It's 10:00"); },
    "11:00": function(){ console.log("It's 11:00"); },
    "13:00": function(){ console.log("It's 13:00"); }
});

app.post('/addTask', (req, res) => {
    if (!req.body.time.match(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)) {
        // regex from https://stackoverflow.com/a/7536768/8296184
        return res.status(400).json({'success': false, 'code': 'ERR_TIME'});
    }
    function fn() {
        // I suppose you will not use this feature just to do console.logs 
        // and not sure how you plan to do the logic to create new tasks
        console.log("It's " + req.body.time);
    }
    addTask(req.body.time, fn);
    res.status(200).json({'success': true});
});

// @Scheduled(cron="* */15 * * * MON-FRI")
// public void doSomething() {
//     // something that should execute on weekdays only
// }

// * :("all values") - used to select all values within a field. For example, "*" in the minute field means "every minute".

// / :- used to specify increments. For example, "0/15" in the seconds field means "the seconds 0, 15, 30, and 45". And "5/15" in the seconds field means "the seconds 5, 20, 35, and 50".

// Trigger trigger = TriggerBuilder
//     .newTrigger()
//     .withIdentity("someTriggerName", "someGroup")
//     .withSchedule(
//         CronScheduleBuilder.cronSchedule("0 5,15,30 * * * ?"))
//     .build();

//     public class MyJob implements Job
// {
//     public void execute(JobExecutionContext context throws JobExecutionException {
//         // do something useful  
//     }
// }
// and schedule it using this trigger:

// Scheduler sched = new StdSchedulerFactory().getScheduler();
//     sched.start();
//     sched.scheduleJob(new MyJob(), trigger);