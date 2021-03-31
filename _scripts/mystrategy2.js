// Tính chất: khung 4h, target P/L: 60/40, PNL Rate: 1.5, chỉ số: BTCUSD, ETHUSD với tần suất 1 tuần (1 ngày?) 1 lệnh
// Mục tiêu: lợi nhuận 3% vốn/tháng -> 1 tuần 1 lệnh -> 10% vốn 1 lệnh
// Profit Factor: số tiền kiếm được trên mỗi đơn vị tiền thua mất = gross profit/gross loss

// Hiện theo backtest, chiến thuật giao dịch này không phù hợp với các khung thời gian nhỏ. 
// Đối với cặp BTCUSD, 1D, 20/2/20/1.5/hold6/1.5/3/100/false////true/4 có PF 6.63 percentage 67% với 6 giao dịch
// Đối với cặp AUDUSD, 4h, sl_ratio: 1.1 có thể đạt profit factor 2.16 với khoảng 29 giao dịch, percentage=67%
// Đối với cặp AUDUSD, 4h, 20/2/20/1.5/hold6/1.5/3/100/false////true/4 có PF 5.9, percentage 80% với khoảng 20 giao dịch
// Đối với cặp GBPUSD, 4h, 20/2/20/1.5/hold6/1.5/3/100/false////true/4 có PF 3.4, percentage 67% với khoảng 18 giao dịch

// © loi9985
//@version=4
strategy(title="Leo_Strategy_2", overlay=true, initial_capital=1000, default_qty_type=strategy.cash, default_qty_value=10, pyramiding=0, slippage=2, calc_on_every_tick=true)
// All Declarations
lengthBB 		= input(20, title="BB Length") // độ dài đường BB. 20 for a little early than 21
mult 			= input(2.0,title="BB MultFactor") // tham số mult cho BB
lengthKC 		= input(20, title="KC Length") // độ dài đường KC
multKC 			= input(1.5, title="KC MultFactor")
maxCandles2Hold = input(6, title="Maximum of candles to hold") // số lượng candles nắm giữ tối đa
sl_ratio 		= input(1.5, title="Stoploss ratio") // tỷ lệ loss chấp nhận
tp_ratio 		= input(3.0, title="TakeProfit ratio") // tỷ lệ profit chấp nhận
backtestFrom 	= input(100, title="Far Most Day of Backtest") // Backtest From
backTestTo      = input(1, title="Last Day Of BackTest") // Backtest TO
withTrending	= input(false, title="Apply trending filter?")
fastEMALength	= input(34, title="Fast EMA Length")
slowEMALength	= input(55, title="Slow EMA Length")
emaDeviationR	= input(5, title="EMA Deviation Factor")
withCandleColor = input(true, title="Apply Candle Color?")
candleBodyRatio = input(4, title="Candle Body Ratio (to be div)")
// SQUEEZE Calculations ---------------------------------------------------------------------------------
// histogram
val = linreg(close - avg(avg(highest(high, lengthKC), lowest(low, lengthKC)),sma(close,lengthKC)), lengthKC,0)
shadedRed 	= (val < 0) and (val > nz(val[1])) //choose shaded red when long
shadedGreen = (val > 0) and (val < nz(val[1])) //choose shaded green when short
lightRed 	= (val < 0) and (val <= nz(val[1]))
lightGreen 	= (val > 0) and (val >= nz(val[1]))
// Calculate BB
basis 		= sma(close, lengthBB)
dev 		= multKC * stdev(close, lengthBB)
upperBB 	= basis + dev
lowerBB 	= basis - dev
// Calculate KC
ma = sma(close, lengthKC)
rangema 	= sma(tr, lengthKC)
upperKC 	= ma + rangema * multKC
lowerKC 	= ma - rangema * multKC
// squeeze or not? Nguyên tắc chung là không trade tại thời điểm Squeeze do tt không có định hướng rõ ràng và có thể dẫn tới nhiều biến động bất thường.
sqzOn  = (lowerBB > lowerKC) and (upperBB < upperKC) //no order when squeeze on
sqzOff = (lowerBB < lowerKC) and (upperBB > upperKC) //we will trade only when sqzOff 
noSqz  = (sqzOn == false) and (sqzOff == false)
//Histogram cross zero?
isZERO = min( ema(val,20)/100, 0.00099 ) // giá trị có thể coi là 0, có tính đến các giá trị trung bình
isHisCrossZero = abs(val) <= isZERO or (val[1] > 0 and val < 0) or (val[1] < 0 and val > 0) ? 1 : 0

// Back Test Window
// With that five day gap we account for days when the market is closed. Chỉ tính cho đến ngày hôm qua
//               the bar's time    1 day       1w   10weeks				to yesterday
backtestWindow = time > (timenow - 86400000 * backtestFrom) and time < (timenow - 86400000 * backTestTo) ? 1 : 0

// RISK MANAGEMENT --------------------------------------------------------------------------------------
rr_base 	= atr(144)
sw_sl 		= rr_base * sl_ratio
sw_tp 		= rr_base * tp_ratio
long_sl 	= min(strategy.position_avg_price - sw_sl, low[1]) // Ngoài ATR, có tính tới giá trị LOW/HIGH của cây nên trước đó để tránh bỏ lỡ support/resistant lines.
long_tp 	= max(strategy.position_avg_price + sw_tp, high[1]) //nếu đu đỉnh thì chịu
short_sl 	= max(strategy.position_avg_price + sw_sl, high[1])
short_tp 	= min(strategy.position_avg_price - sw_tp, low[1])
long_break 	= high >= long_tp or low <= long_sl ? 1 : 0 // the CLOSE price touch stoploss or takeprofit
short_break = low <= short_tp or high >= short_sl ? 1 : 0 // trong thực tế chỉ cần HIGH hoặc LOW chạm là đã bị dừng -> phải để HIGH & LOW mới đúng
// chỗ này cần lưu ý không nên đổi high low về close. Nếu cần gồng lệnh thì đổi sl_ratio lên cao hơn. -> các bộ tham số INPUT cần chỉnh lại cho hợp lý đối với các khung thời gian và cặp tiền khác nhau.
// Trend calculator ---------------------------------------------------------------------------------------
fastEMA = ema(close, fastEMALength)
slowEMA = ema(close, slowEMALength)
emaDeviation = rr_base/emaDeviationR
upTrend = fastEMA > (slowEMA+emaDeviation) ? 1 : 0 //high + 34*syminfo.mintick
downTrend = fastEMA < (slowEMA-emaDeviation) ? 1 : 0
// Candles calculations ---------------------------------------------------------------------------------
redBigCandle = close < open - rr_base/candleBodyRatio ? 1 : 0
greenBigCandle = close > open + rr_base/candleBodyRatio ? 1 : 0
redCandle = close < open ? 1 : 0
greenCandle = close > open ? 1 : 0
// ----------------------------------------------------------------------------------------------------------
// ENTRY by EMAs cross/break
// Lọc candle color: có 1 thanh đó xuất hiện trong uptrend, nhưng không được có 2 thanh đỏ liên tiếp xuất hiện trong uptrend do có thể là dấu hiệu downtrend. TT với downtrend.
entryUP3 = withCandleColor ? shadedRed[1] and shadedRed and redBigCandle and greenCandle[1] : shadedRed[1] and shadedRed //lightRed[2] and 
entryDN3 = withCandleColor ? shadedGreen[1] and shadedGreen and greenBigCandle and redCandle[1] : shadedGreen[1] and shadedGreen //lightGreen[2] and 
//entryUP3 = lightRed[2] and shadedRed[1] and shadedRed
//entryDN3 = lightGreen[2] and shadedGreen[1] and shadedGreen
// SET the active entry algorithm
entryUP = withTrending ? entryUP3 and upTrend : entryUP3
entryDN = withTrending ? entryDN3 and downTrend : entryDN3
// ----------------------------------------------------------------------------------------------------------
// STEP 3. Determine long trading conditions and manually limits
enterLong 	= entryUP and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitLong 	= (strategy.position_size > 0) and (isHisCrossZero or barssince(enterLong) >= maxCandles2Hold or long_break)

// STEP 4. Code short trading conditions and manually limits
enterShort 	= entryDN and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitShort 	= (strategy.position_size < 0) and (isHisCrossZero or barssince(enterShort) >= maxCandles2Hold or short_break)

// ----------------------------------------------------------------------------------------------------------
// STEP 6. Submit entry orders
strategy.entry(id="eL", long=true, comment="eL", when=enterLong) //, stop=sw_sl, limit=sw_tp
strategy.entry(id="eS", long=false, comment="eS", when=enterShort)
// ----------------------------------------------------------------------------------------------------------
// STEP 7. Submit Close lệnh
strategy.close(id="eL", when=exitLong, comment="xL") // Lệnh close không đặt được stoploss, limitprofit, When là điều kiện thoát lệnh cuối cùng.
strategy.close(id="eS", when=exitShort, comment="xS")
// ----------------------------------------------------------------------------------------------------------
// STEP 5. PLOTTING 
// Vẽ dấu mũi tên tại điểm vào lệnh
plotarrow(enterLong ? enterLong : na, title="Up Entry Arrow", colorup=color.lime, maxheight=30, minheight=30, transp=0)
plotarrow(enterShort*-1 ? enterShort*-1 : na, title="Down Entry Arrow", colordown=color.red, maxheight=30, minheight=30, transp=0)
// Vẽ stoploss và takeprofit
l1 = plot( strategy.position_size > 0 ? long_sl : na, title="Long SL", style=plot.style_linebr, linewidth=3, color=color.red)
l2 = plot( strategy.position_size > 0 ? long_tp : na, title="Long TP", style=plot.style_linebr, linewidth=3, color=color.lime)
fill(l1, l2, color=color.silver, transp=89)
s1 = plot( strategy.position_size < 0 ? short_sl : na, title="Short SL", style=plot.style_linebr, linewidth=3, color=color.red)
s2 = plot( strategy.position_size < 0 ? short_tp : na, title="Short TP", style=plot.style_linebr, linewidth=3, color=color.lime)
fill(s1, s2, color=color.silver, transp=89)
//Trend Triangles at Top and Bottom of Screen
plotshape(withTrending and upTrend ? upTrend : na, title="Trend Triangle",style=shape.triangleup, location=location.bottom, color=color.lime, transp=0, offset=0)
plotshape(withTrending and downTrend ? downTrend : na, title="Trend Triangle",style=shape.triangledown, location=location.top, color=color.red, transp=0, offset=0)
//Moving Average Plots and Fill
col = upTrend ? color.lime : downTrend ? color.orange : na
p1 = plot(withTrending ? fastEMA : na, title="Fast MA", style=plot.style_linebr, linewidth=1, color=col)
p2 = plot(withTrending ? slowEMA : na, title="Slow MA", style=plot.style_linebr, linewidth=1, color=col)
fill(p1, p2, color=color.silver, transp=50)
// ----------------------------------------------------------------------------------------------------------