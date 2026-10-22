// Fascia Math engine: fascia boards for an eave run, soffit area from run and depth, soffit panels from a panel's coverage, and the cost per foot of run. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the roof plan and the package label.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _RUN = "the eave run must be from 1 to 10000 ft with no decimal places";
var _BL = "the board length must be from 1 to 24 ft with no decimal places";
var _DEP = "the soffit depth must be from 1 to 120 inches with no decimal places";
var _COV = "the panel coverage must be from 1 to 100 sq ft with no decimal places";
var _AREA = "the area must be from 1 to 10000000 sq ft with no decimal places";
var _BOARDS = "the board count must be from 1 to 100000 with no decimal places";
var _PANELS = "the panel count must be from 1 to 1000000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function fasciaTruth(runft, boardft) {
  var r = _i(runft, _RUN, 5, 1, 10000), b = _i(boardft, _BL, 2, 1, 24);
  var n = Math.floor((r + b - 1) / b), spare = n * b - r;
  var tail = spare === 0 ? ", with nothing left over" : ", leaving " + spare + " ft of the last one";
  return "The run of " + r + " ft takes " + _pl(n, " board", " boards") + " of " + b + " ft" + tail + ".";
}
function soffitTruth(runft, depin) {
  var r = _i(runft, _RUN, 5, 1, 10000), d = _i(depin, _DEP, 3, 1, 120);
  var sq100 = _hu(r * d * 100, 12);
  return "The run of " + r + " ft at " + d + " inches deep needs " + _dec(sq100, 2) + " sq ft of soffit.";
}
function panelsTruth(area, cover) {
  var a = _i(area, _AREA, 8, 1, 10000000), c = _i(cover, _COV, 3, 1, 100);
  var n = Math.floor((a + c - 1) / c), spare = n * c - a;
  return "The " + a + " sq ft with panels of " + c + " sq ft each takes " + _pl(n, " panel", " panels") + ", leaving " + spare + " sq ft of the last one.";
}
function costTruth(boards, bprice, panels, pprice, runft) {
  var b = _i(boards, _BOARDS, 6, 1, 100000), bp = _p(bprice, _PRICE, 5, 2, 1, 1000000);
  var n = _i(panels, _PANELS, 7, 1, 1000000), pp = _p(pprice, _PRICE, 5, 2, 1, 1000000);
  var r = _i(runft, _RUN, 5, 1, 10000);
  var cents = b * bp + n * pp, per = _hu(cents, r);
  return "The " + _pl(b, " board", " boards") + " at $" + _dec(bp, 2) + " and the " + _pl(n, " panel", " panels") + " at $" + _dec(pp, 2) + " cost $" + _money(cents) + ", or $" + _money(per) + " a foot over the " + r + " ft.";
}
