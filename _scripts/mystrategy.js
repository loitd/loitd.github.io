// Nguyên tắc giao dịch của tôi là:
// - Chỉ giao dịch với giá nến đóng CLOSE -> nếu khung 4H thì sẽ giao dịch và check mỗi 4H.
// - Khung thời gian 4H
// - Các đồng tiền có USD
// - Sử dụng fixed quantity ~ 1 khối lượng giao dịch cố định cho tất cả các giao dịch default_qty_value
// - R/R tương đối là 1:2. 2 đồng lợi nhuận / 1 đồng rủi ro
// - Rút tiền hàng tuần hoặc ngay khi đủ, duy trì cố định số tiến giao dịch initial_capital = 1000$
// - Không scalping hay pyramiding (không vào lệnh chồng, lệnh nối, gấp và thay đổi target profit)
// - Tham chiếu và confirm trend tại $H, 1D và 1W khớp nhau
//      - Slingshot tại 3 khung đang trending và có trend giống nhau
// - MACD cho tín hiệu cắt giữa Singal & MACD khớp với trend đã confirm ở trên (trend buy -> buy signal)
// - Stop bằng đỉnh đáy gần nhất
// - Target bằng Stop * 2
// - Chấp nhận slippage=2
// - Một tuần chỉ trade tối đa 1 lệnh -> 7D -> 168H -> 10080M

//@version=4
// STEP 1. Define strategy settings. default_qty_value tối thiểu = 1, nếu nhỏ hơn sẽ không có trade nào.
strategy(title="Leo_Strategy", overlay=true, initial_capital=1000, default_qty_type=strategy.cash, default_qty_value=5, pyramiding=0, slippage=2, calc_on_every_tick=true)
// Actually the highest supported minute resolution is “1440” (which is the number of minutes in 24 hours).
// Requesting data of "1h" or "1H" resolution would result in an error. Use "60" instead.
tf_anchor1 = input(title="Anchor 1 timeframe", type=input.resolution, defval="240")
tf_anchor2 = input(title="Anchor 2 timeframe", type=input.resolution, defval="1D")
ma1_len = input(title="MA1 Len", type=input.integer, defval=13, minval=1, maxval=9999)
ma2_len = input(title="MA2 Len", type=input.integer, defval=21, minval=1, maxval=9999)
ma3_len = input(title="MA3 Len", type=input.integer, defval=34, minval=1, maxval=9999)
ma4_len = input(title="MA4 Len", type=input.integer, defval=89, minval=1, maxval=9999)

// swing stop loss
sw_sl = atr(14)
sw_tp = sw_sl * 2

// tradeDirection = input(title="Trade Direction", options=["Long", "Short", "Both"], defval="Both")
// Options that configure the backtest date range
// startDate = input(title="Start Date", type=input.time, defval=timestamp("01 Jan 1970 00:00"))
// endDate = input(title="End Date", type=input.time, defval=timestamp("31 Dec 2170 23:59"))
// inDateRange = (time >= startDate) and (time < endDate)

// STEP 2. Calculate strategy values
deftrend(ma1, ma2, ma3, ma4, rema) => 
    // tr = True range. Same as tr(false). It is max(high - low, abs(high - close[1]), abs(low - close[1]))
    upper = ma4 + rema * 0.5
    lower = ma4 - rema * 0.5
    uptrend = (ma1 > upper and ma2 > upper and ma3 > upper)
    downtrend = (ma1 < lower and ma2 < lower and ma3 < lower)
    // to return
    [uptrend, downtrend]

//EMA Definitions
ma1 = ema(close, 13)
ma2 = ema(close, 21)
ma3 = ema(close, 34)
ma4 = ema(close, 89)
rema = ema(tr, 89)
//Define Up and Down Trend for Trend Arrows at Top and Bottom of Screen
[uptrend,downtrend] = deftrend(ma1, ma2, ma3, ma4, rema)

ma1ac1 = security(syminfo.tickerid, tf_anchor1, ma1)
ma2ac1 = security(syminfo.tickerid, tf_anchor1, ma2)
ma3ac1 = security(syminfo.tickerid, tf_anchor1, ma3)
ma4ac1 = security(syminfo.tickerid, tf_anchor1, ma4)
remaac1 = security(syminfo.tickerid, tf_anchor1, rema)
[uptrendac1, downtrendac1] = deftrend(ma1ac1, ma2ac1, ma3ac1, ma4ac1, remaac1)

ma1ac2 = security(syminfo.tickerid, tf_anchor2, ma1)
ma2ac2 = security(syminfo.tickerid, tf_anchor2, ma2)
ma3ac2 = security(syminfo.tickerid, tf_anchor2, ma3)
ma4ac2 = security(syminfo.tickerid, tf_anchor2, ma4)
remaac2 = security(syminfo.tickerid, tf_anchor2, rema)
[uptrendac2, downtrendac2] = deftrend(ma1ac2, ma2ac2, ma3ac2, ma4ac2, remaac2)

upTrend = (uptrend and uptrendac1 and uptrendac2)
downTrend = (downtrend and downtrendac1 and downtrendac2)
counter = 0

emaFast = ma1ac1
emaSlow = ma2ac1
// With that five day gap we account for days when the market is closed
//               the bar's time    1 day       1w   8weeks
backtestWindow = time > (timenow - 86400000 *  7    * 8)
//Conservative Entry True/False Condition -> xác định điểm vào lệnh theo tín hiệu close crossover với ema.
// Long khi emafase > emaslow + close trước và close hiện tại cắt đường emafast. Short khi ngược lại.
// tương đối giống với việc phá bollinger bands. Bổ sung thêm điều kiện UpTrend
// Tìm phương án bổ sung thêm điều kiện lastkiss để hình thành lastkisstrade
entryUpTrend = upTrend and (emaFast > emaSlow) and (close[1] < emaFast) and (close > emaFast) ? 1 : 0
entryDnTrend = downTrend and (emaFast < emaSlow) and (close[1] > emaFast) and (close < emaFast) ? 1 : 0
//Definition for Conseervative Entry Up and Down PlotArrows
// codiff = entryUpTrend == 1 ? entryUpTrend : 0
// codiff2 = entryDnTrend == 1 ? entryDnTrend : 0
// STEP 3. Determine long trading conditions
// implement the time stop that has us close trades after 8 bars. Always exit without checking backtestwindow
// exitLong = (barssince(enterLong) > 8)
// enterLong = crossover(fast_ac1, slow_ac1) and backtestWindow
enterLong = entryUpTrend and backtestWindow 
// exitLong = (strategy.position_size > 0) and (crossunder(fast, slow) or (barssince(enterLong) > 3))
exitLong = (strategy.position_size > 0) 

// STEP 4. Code short trading conditions
// enterShort = crossunder(fast_ac1, slow_ac1) and backtestWindow
enterShort = entryDnTrend and backtestWindow 
// exitShort = (strategy.position_size < 0) and (crossover(fast, slow) or (barssince(enterShort) > 3))
exitShort = (strategy.position_size < 0) 

// STEP 5. Output strategy data
// plot(series=fast, color=color.blue, title="fast")
// plot(series=slow, color=color.navy, title="slow")
// plot(series=fast_ac2, color=color.lime, title="fast_ac2")
// plot(series=slow_ac2, color=color.green, title="slow_ac2")
// plot(series=fast_ac2, color=fuchsia, title="fast_ac2")
// plot(series=slow_ac2, color=red, title="slow_ac2")
codiff = enterLong ? 1 : 0
codiff2 = enterShort ? 1 : 0
plotarrow(codiff ? codiff : na, title="Up Entry Arrow", colorup=color.lime, maxheight=30, minheight=30, transp=0)
plotarrow(codiff2*-1 ? codiff2*-1 : na, title="Down Entry Arrow", colordown=color.red, maxheight=30, minheight=30, transp=0)
//Trend Triangles at Top and Bottom of Screen
plotshape(upTrend ? upTrend : na, title="Conservative Buy Entry Triangle",style=shape.triangleup, location=location.bottom, color=color.lime, transp=0, offset=0)
plotshape(downTrend ? downTrend : na, title="Conservative Short Entry Triangle",style=shape.triangledown, location=location.top, color=color.red, transp=0, offset=0)
// plot sl & tp levels
p1 = plot(enterLong ? low - sw_sl : na, title="SL", style=plot.style_linebr, linewidth=4, color=color.red)
p2 = plot(enterLong ? close + sw_tp : na, title="TP", style=plot.style_linebr, linewidth=2, color=color.red)
fill(p1, p2, color=color.silver, transp=50)
//Moving Average Plots and Fill
col = emaFast > emaSlow ? color.lime : emaFast < emaSlow ? color.red : color.yellow
p3 = plot(emaSlow, title="Slow MA", style=plot.style_linebr, linewidth=1, color=col)
p4 = plot(emaFast, title="Slow MA", style=plot.style_linebr, linewidth=1, color=col)
fill(p3, p4, color=color.silver, transp=88)

// plot(series=fastMA, color=(fastMA > slowMA) ? green : red, linewidth=2, title="Fast EMA")
// bgColour = enterLong ? green : enterShort ? red : na
// bgcolor(color=bgColour, transp=90)

// STEP 6. Submit entry orders
strategy.entry(id="eL", long=true, when=enterLong) //, stop=sw_sl, limit=sw_tp
strategy.entry(id="eS", long=false, when=enterShort)

// STEP 7. Submit exit orders
//short default amount of lots that have been long before
// strategy.order(id="xL", long=false, when=exitLong)
// strategy.order(id="xS", long=true, when=exitShort)
strategy.exit(id="xL", from_entry="eL", limit=sw_tp, stop=sw_sl, when=exitLong)
strategy.exit(id="xS", from_entry="eS", limit=sw_tp, stop=sw_sl, when=exitShort)

