var watch = {
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
  isRunning: false,
  timer: null,
  interval: 10,
  lapList: []
 };
 
 var display = {
  hour: document.getElementById("hour"),
  minute: document.getElementById("minute"),
  second: document.getElementById("second"),
  millisecond: document.getElementById("millisecond")
 }
 
 var controls = {
  start: document.getElementById("start"),
  stop: document.getElementById("stop"),
  reset: document.getElementById("reset"),
  lap: document.getElementById("lap")
 }
 
 var laps = {
  list: document.getElementById("lapList")
 }
 
 function update() {
  watch.millisecond += watch.interval;
 
  if (watch.millisecond >= 1000) {
   watch.second++;
   watch.millisecond = 0;
  }
 
  if (watch.second >= 60) {
   watch.minute++;
   watch.second = 0;
  }
 
  if (watch.minute >= 60) {
   watch.hour++;
   watch.minute = 0;
  }
 
  display.hour.innerHTML = formatNumber(watch.hour);
  display.minute.innerHTML = formatNumber(watch.minute);
  display.second.innerHTML = formatNumber(watch.second);
  display.millisecond.innerHTML = formatNumber(watch.millisecond / 10);
 }
 
 function start() {
  if (!watch.isRunning) {
   watch.isRunning = true;
   watch.timer = setInterval(update, watch.interval);
  }
 }
 
 function stop() {
  if (watch.isRunning) {
   watch.isRunning = false;
   clearInterval(watch.timer);
  }
 }
 
 function reset() {
  stop();
  watch.hour = 0;
  watch.minute = 0;
  watch.second = 0;
  watch.millisecond = 0;
  updateDisplay();
  laps.list.innerHTML = "";
  watch.lapList = [];
 }
 
 function lap() {
  if (watch.isRunning) {
   watch.lapList.push(getTime());
   updateLaps();
  }
 }
 
 function updateLaps() {
  laps.list.innerHTML = "";
  for (var i = 0; i < watch.lapList.length; i++) {
   var li = document.createElement("li");
   var time = watch.lapList[i];
   var formattedTime = formatNumber(time.hour) + ":" + formatNumber(time.minute) + ":" + formatNumber(time.second) + "." + formatNumber(time.millisecond, 3);
   var text = document.createTextNode(formattedTime);
   li.appendChild(text);
   laps.list.appendChild(li);
  }
 }
 
 function updateDisplay() {
  display.hour.innerHTML = formatNumber(watch.hour);
  display.minute.innerHTML = formatNumber(watch.minute);
  display.second.innerHTML = formatNumber(watch.second);
  display.millisecond.innerHTML = formatNumber(watch.millisecond / 10);
 }
 
 function getTime() {
  return {
   hour: watch.hour,
   minute: watch.minute,
   second: watch.second,
   millisecond: watch.millisecond
  };
 }
 
 function formatNumber(number, length = 2) {
  var string = String(number);
  while (string.length < length) {
   string = "0" + string;
  }
  if (string.length > length) {
   string = string.substring(string.length - length, string.length);
  }
  return string;
 }
 
 controls.start.addEventListener("click", start);
 controls.stop.addEventListener("click", stop);
 controls.reset.addEventListener("click", reset);
 controls.lap.addEventListener("click", lap);
 