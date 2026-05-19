function getValue(id) {
  const value = document.getElementById(id).value;
  return value === "" ? null : Number(value);
}

function countFilled(values) {
  return values.filter(v => v !== null && !isNaN(v)).length;
}

function setResult(id, message) {
  document.getElementById(id).textContent = message;
}

function clearFields(fieldIds, resultId) {
  fieldIds.forEach(id => document.getElementById(id).value = "");
  setResult(resultId, "Result will appear here.");
}

function solveTSD() {
  const speed = getValue("tsdSpeed");
  const time = getValue("tsdTime");
  const distance = getValue("tsdDistance");

  if (countFilled([speed, time, distance]) !== 2) return setResult("tsdResult", "Enter exactly two values.");

  if (distance === null) setResult("tsdResult", `Distance = ${(speed * time).toFixed(1)} NM`);
  else if (speed === null) setResult("tsdResult", `Speed = ${(distance / time).toFixed(1)} knots`);
  else setResult("tsdResult", `Time = ${(distance / speed).toFixed(2)} hours`);
}

function solveFuel() {
  const fuel = getValue("fuelUsed");
  const burn = getValue("burnRate");
  const time = getValue("fuelTime");

  if (countFilled([fuel, burn, time]) !== 2) return setResult("fuelResult", "Enter exactly two values.");

  if (fuel === null) setResult("fuelResult", `Fuel Used = ${(burn * time).toFixed(1)} gallons`);
  else if (burn === null) setResult("fuelResult", `Burn Rate = ${(fuel / time).toFixed(1)} GPH`);
  else setResult("fuelResult", `Time = ${(fuel / burn).toFixed(2)} hours`);
}

function solveTOD() {
  const altitude = getValue("todAltitude");
  const gradient = getValue("todGradient");
  const distance = getValue("todDistance");

  if (countFilled([altitude, gradient, distance]) !== 2) return setResult("todResult", "Enter exactly two values.");

  if (distance === null) setResult("todResult", `Distance = ${(altitude / gradient).toFixed(1)} NM`);
  else if (altitude === null) setResult("todResult", `Altitude to Lose = ${(gradient * distance).toFixed(0)} feet`);
  else setResult("todResult", `Descent Gradient = ${(altitude / distance).toFixed(0)} ft/NM`);
}

function solveClimb() {
  const rate = getValue("climbRate");
  const speed = getValue("climbSpeed");
  const gradient = getValue("climbGradient");

  if (countFilled([rate, speed, gradient]) !== 2) return setResult("climbResult", "Enter exactly two values.");

  if (gradient === null) setResult("climbResult", `Climb Gradient = ${((rate * 60) / speed).toFixed(0)} ft/NM`);
  else if (rate === null) setResult("climbResult", `Climb Rate = ${((gradient * speed) / 60).toFixed(0)} FPM`);
  else setResult("climbResult", `Groundspeed = ${((rate * 60) / gradient).toFixed(1)} knots`);
}

function solveCrosswind() {
  const runway = getValue("runwayHeading");
  const windDir = getValue("windDirection");
  const windSpeed = getValue("windSpeed");

  if (countFilled([runway, windDir, windSpeed]) !== 3) return setResult("crosswindResult", "Enter all three values.");

  let angle = Math.abs(windDir - runway);
  if (angle > 180) angle = 360 - angle;

  const radians = angle * Math.PI / 180;
  const crosswind = Math.abs(windSpeed * Math.sin(radians));
  const headwind = windSpeed * Math.cos(radians);

  const headTail = headwind >= 0
    ? `Headwind = ${headwind.toFixed(1)} knots`
    : `Tailwind = ${Math.abs(headwind).toFixed(1)} knots`;

  setResult("crosswindResult", `Crosswind = ${crosswind.toFixed(1)} knots • ${headTail} • Angle = ${angle.toFixed(0)}°`);
}

function solvePressureAltitude() {
  const elevation = getValue("fieldElevation");
  const altimeter = getValue("altimeterSetting");

  if (countFilled([elevation, altimeter]) !== 2) return setResult("pressureResult", "Enter both values.");

  const pressureAltitude = elevation + ((29.92 - altimeter) * 1000);
  setResult("pressureResult", `Pressure Altitude = ${pressureAltitude.toFixed(0)} feet`);
}

function solveDensityAltitude() {
  const pressureAlt = getValue("densityPressureAlt");
  const oat = getValue("oat");

  if (countFilled([pressureAlt, oat]) !== 2) return setResult("densityResult", "Enter both values.");

  const isaTemp = 15 - (2 * (pressureAlt / 1000));
  const densityAltitude = pressureAlt + (120 * (oat - isaTemp));

  setResult("densityResult", `Density Altitude ≈ ${densityAltitude.toFixed(0)} feet • ISA Temp ≈ ${isaTemp.toFixed(1)}°C`);
}

function solveWB() {
  const weight = getValue("wbWeight");
  const arm = getValue("wbArm");
  const moment = getValue("wbMoment");

  if (countFilled([weight, arm, moment]) !== 2) return setResult("wbResult", "Enter exactly two values.");

  if (moment === null) setResult("wbResult", `Moment = ${(weight * arm).toFixed(1)}`);
  else if (weight === null) setResult("wbResult", `Weight = ${(moment / arm).toFixed(1)} lb`);
  else setResult("wbResult", `Arm = ${(moment / weight).toFixed(2)} inches`);
}
