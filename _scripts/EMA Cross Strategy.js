// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// This strategy has been created for illustration purposes only and should not be relied upon as a basis for buying, selling, or holding any asset or security.
// © kirilov

//@version=4
strategy("EMA Cross Strategy", overlay=true, calc_on_every_tick=true, currency=currency.USD)

// INPUT:

// Options to enter fast and slow Exponential Moving Average (EMA) values
emaFast = input(title="Fast EMA", type=input.integer, defval=10, minval=1, maxval=9999)
emaSlow = input(title="Slow EMA", type=input.integer, defval=20, minval=1, maxval=9999)

// Option to select trade directions
tradeDirection = input(title="Trade Direction", options=["Long", "Short", "Both"], defval="Both")

// Options that configure the backtest date range
startDate = input(title="Start Date", type=input.time, defval=timestamp("01 Jan 1970 00:00"))
endDate = input(title="End Date", type=input.time, defval=timestamp("31 Dec 2170 23:59"))


// CALCULATIONS:

// Use the built-in function to calculate two EMA lines
fastEMA = ema(close, emaFast)
slowEMA = ema(close, emaSlow)


// PLOT:

// Draw the EMA lines on the chart
plot(series=fastEMA, color=color.orange, linewidth=2)
plot(series=slowEMA, color=color.blue, linewidth=2)


// CONDITIONS:

// Check if the close time of the current bar falls inside the date range
inDateRange = (time >= startDate) and (time < endDate)

// Translate input into trading conditions
longOK  = (tradeDirection == "Long") or (tradeDirection == "Both")
shortOK = (tradeDirection == "Short") or (tradeDirection == "Both")

// Decide if we should go long or short using the built-in functions
longCondition = crossover(fastEMA, slowEMA)
shortCondition = crossunder(fastEMA, slowEMA)


// ORDERS:

// Submit entry (or reverse) orders
if (longCondition and inDateRange)
   strategy.entry(id="long", long=true, when = longOK)
if (shortCondition and inDateRange)
   strategy.entry(id="short", long=false, when = shortOK)
   
// Submit exit orders in the cases where we trade only long or only short
if (strategy.position_size > 0 and shortCondition)
   strategy.exit(id="exit long", stop=close)
if (strategy.position_size < 0 and longCondition)
   strategy.exit(id="exit short", stop=close)
