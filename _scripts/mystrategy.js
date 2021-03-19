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
strategy(title="Leo_Strategy", overlay=true, initial_capital=1000, default_qty_value=1, pyramiding=0, slippage=2)
// Actually the highest supported minute resolution is “1440” (which is the number of minutes in 24 hours).
// Requesting data of "1h" or "1H" resolution would result in an error. Use "60" instead.
tf_anchor1 = input(title="Anchor 1 timeframe", type=input.resolution, defval="120")
tf_anchor2 = input(title="Anchor 2 timeframe", type=input.resolution, defval="1D")
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
    rangeema = ema(true, 89)
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



fast = ema(close, fast_len)
slow = ema(close, slow_len)
// calculate on anchor 1 time frame
fast_ac1 = security(syminfo.tickerid, tf_anchor1, fast)
fast_ac2 = security(syminfo.tickerid, tf_anchor2, fast)
// calculate on anchor 2 time frame
slow_ac1 = security(syminfo.tickerid, tf_anchor1, slow)
slow_ac2 = security(syminfo.tickerid, tf_anchor2, slow) 
// With that five day gap we account for days when the market is closed
//               the bar's time    1 day       1w   52weeks
backtestWindow = time > (timenow - 86400000 *  7    * 52)

// STEP 3. Determine long trading conditions
// implement the time stop that has us close trades after 8 bars. Always exit without checking backtestwindow
// exitLong = (barssince(enterLong) > 8)
// enterLong = crossover(fast_ac1, slow_ac1) and backtestWindow
enterLong = crossover(fast_ac2, slow_ac2) and backtestWindow 
exitLong = (strategy.position_size > 0) and (crossunder(fast, slow) or (barssince(enterLong) > 3))

// STEP 4. Code short trading conditions
// enterShort = crossunder(fast_ac1, slow_ac1) and backtestWindow
enterShort = crossunder(fast_ac2, slow_ac2) and backtestWindow 
exitShort = (strategy.position_size < 0) and (crossover(fast, slow) or (barssince(enterShort) > 3))

// STEP 5. Output strategy data
plot(series=fast, color=color.blue, title="fast")
plot(series=slow, color=color.navy, title="slow")
plot(series=fast_ac2, color=color.lime, title="fast_ac2")
plot(series=slow_ac2, color=color.green, title="slow_ac2")
// plot(series=fast_ac2, color=fuchsia, title="fast_ac2")
// plot(series=slow_ac2, color=red, title="slow_ac2")

// plot(series=fastMA, color=(fastMA > slowMA) ? green : red, linewidth=2, title="Fast EMA")
// bgColour = enterLong ? green : enterShort ? red : na
// bgcolor(color=bgColour, transp=90)

// STEP 6. Submit entry orders
strategy.entry(id="eL", long=true, when=enterLong)
strategy.entry(id="eS", long=false, when=enterShort)

// STEP 7. Submit exit orders
//short default amount of lots that have been long before
strategy.order(id="xL", long=false, when=exitLong)
strategy.order(id="xS", long=true, when=exitShort)

