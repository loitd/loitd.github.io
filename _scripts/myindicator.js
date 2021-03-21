// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © loi9985

//@version=4
study(title="Leo_Indicator", overlay=true)
// Actually the highest supported minute resolution is “1440” (which is the number of minutes in 24 hours).
// Requesting data of "1h" or "1H" resolution would result in an error. Use "60" instead.
tf_anchor1 = input(title="Anchor 1 timeframe", type=input.resolution, defval="1D")
tf_anchor2 = input(title="Anchor 2 timeframe", type=input.resolution, defval="2D")
ma1_len = input(title="MA1 Len", type=input.integer, defval=13, minval=1, maxval=9999)
ma2_len = input(title="MA2 Len", type=input.integer, defval=21, minval=1, maxval=9999)
ma3_len = input(title="MA3 Len", type=input.integer, defval=34, minval=1, maxval=9999)
ma4_len = input(title="MA4 Len", type=input.integer, defval=89, minval=1, maxval=9999)
// tradeDirection = input(title="Trade Direction", options=["Long", "Short", "Both"], defval="Both")
// Options that configure the backtest date range
// startDate = input(title="Start Date", type=input.time, defval=timestamp("01 Jan 1970 00:00"))
// endDate = input(title="End Date", type=input.time, defval=timestamp("31 Dec 2170 23:59"))
// inDateRange = (time >= startDate) and (time < endDate)

// STEP 2. Calculate strategy values
deftrend(ma1, ma2, ma3, ma4) => 
    // tr = True range. Same as tr(false). It is max(high - low, abs(high - close[1]), abs(low - close[1]))
    rangeema = ema(tr, 89)
    upper = ma4 + rangeema * 0.5
    lower = ma4 - rangeema * 0.5
    uptrend = (ma1 > upper and ma2 > upper and ma3 > upper)
    downtrend = (ma1 < lower and ma2 < lower and ma3 < lower)
    // to return
    [uptrend, downtrend]

ma1 = ema(close, ma1_len)
ma2 = ema(close, ma2_len)
ma3 = ema(close, ma3_len)
ma4 = ema(close, ma4_len)
[uptrend, downtrend] = deftrend(ma1, ma2, ma3, ma4)

ma1ac1 = security(syminfo.tickerid, tf_anchor1, ma1)
ma2ac1 = security(syminfo.tickerid, tf_anchor1, ma2)
ma3ac1 = security(syminfo.tickerid, tf_anchor1, ma3)
ma4ac1 = security(syminfo.tickerid, tf_anchor1, ma4)
[uptrendac1, downtrendac1] = deftrend(ma1ac1, ma2ac1, ma3ac1, ma4ac1)

ma1ac2 = security(syminfo.tickerid, tf_anchor2, ma1)
ma2ac2 = security(syminfo.tickerid, tf_anchor2, ma2)
ma3ac2 = security(syminfo.tickerid, tf_anchor2, ma3)
ma4ac2 = security(syminfo.tickerid, tf_anchor2, ma4)
[uptrendac2, downtrendac2] = deftrend(ma1ac2, ma2ac2, ma3ac2, ma4ac2)

isUPTrend = (uptrend and uptrendac1 and uptrendac2)
isDOWNTrend = (downtrend and downtrendac1 and downtrendac2)
// plotting trend indicator
plotshape( isUPTrend ? isUPTrend : na, style=shape.triangleup, color = color.lime, location=location.abovebar, size = size.small)
plotshape( isDOWNTrend ? isDOWNTrend : na, style=shape.triangledown, color = color.red, location=location.belowbar, size = size.small)

// plot MAs
// scolor = uptrendac2 ? color.lime : downtrendac2 ? color.red : color.blue
// plot(ma1, title="Fast MA", color=scolor, style=plot.style_circles, linewidth=1)
// plot(ma2, title="Medium MA",color=scolor, style=plot.style_circles, linewidth=2)
// plot(ma3, title="Slow MA", color=scolor, style=plot.style_circles, linewidth=3)

fastLength = input(12, minval=1), 
slowLength=input(26,minval=1)
signalLength=input(9,minval=1)
fastMA = ema(close, fastLength)
slowMA = ema(close, slowLength)
macd = fastMA - slowMA
signal = sma(macd, signalLength)
hist = macd - signal
macd_long = crossover(signal, macd)
macd_short = crossunder(signal, macd)
plotchar(macd_long and isUPTrend ? isUPTrend : na, title="UP", offset=0, char='↑', location=location.absolute, color=color.lime)
plotchar(macd_short and isDOWNTrend ? isDOWNTrend : na, title="DOWN", offset=0, char='↓', location=location.absolute, color=color.red)