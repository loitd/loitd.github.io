// Tính chất: khung 4h, target P/L: 60/40, PNL Rate: 1.5, chỉ số: BTCUSD, ETHUSD với tần suất 1 tuần (1 ngày?) 1 lệnh
// Mục tiêu: lợi nhuận 3% vốn/tháng -> 1 tuần 1 lệnh -> 10% vốn 1 lệnh
// Profit Factor: số tiền kiếm được trên mỗi đơn vị tiền thua mất = gross profit/gross loss

// © loi9985
//@version=4
// Nếu để calc_on_every_tick sẽ khó khăn trong việc apply realtime
strategy(   title="SQZStrategy", overlay=true, initial_capital=100, default_qty_type=strategy.fixed, default_qty_value=1, pyramiding=0, slippage=2, calc_on_every_tick=false, commission_value=0.01, commission_type=strategy.commission.percent)
// All Declarations
lengthBB 		= input(21, title="BB Length") // độ dài đường BB. 20 for a little early than 21
mult 			= input(2.0,title="BB MultFactor") // tham số mult cho BB
lengthKC 		= input(21, title="KC Length") // độ dài đường KC
multKC 			= input(1.5, title="KC MultFactor")
sqzMin  		= input(1, title="SQZ Min") //optimized
sqzMax	    	= input(39, title="SQZ Max")
// -----------------------------------------------------------------------
stoploss 		= input(1000, title="Stoploss in PIP") // tỷ lệ loss chấp nhận
takeprofit 		= input(3000, title="TakeProfit in PIP") // tỷ lệ profit chấp nhận
// -----------------------------------------------------------------------
minCBodyRatio   = input(0.6, title="Min Candle Body Ratio")
// Trending EMAs ---------------------------------------------------------
withTrending    = input(false, title="Apply trending filter?")
ema1            = input(34, title="Trending EMA 1 Period")
ema2            = input(89, title="Trending EMA 2 Period")
ema3            = input(200, title="Trending EMA 3 Period")
// -----------------------------------------------------------------------
fromDate         = input(30, title="From date")
toDate           = input(0, title="To date")
// SQUEEZE Calculations ---------------------------------------------------------------------------------
// histogram
val = linreg(close - avg(avg(highest(high, lengthKC), lowest(low, lengthKC)),sma(close,lengthKC)), lengthKC,0)
shadedRed 	= (val < 0) and (val > nz(val[1])) //choose shaded red when long
shadedGreen = (val > 0) and (val < nz(val[1])) //choose shaded green when short
lightRed 	= (val < 0) and (val <= nz(val[1])) //nz = Replaces NaN values with zeros (or given value) in a series
lightGreen 	= (val > 0) and (val >= nz(val[1]))
firstShadedRed = lightRed[1] and shadedRed
firstShadedGreen = lightGreen[1] and shadedGreen
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

// ============================================================================================================
// QUALIFICATIONS
// ============================================================================================================
// Back Test Window
// With that five day gap we account for days when the market is closed. Chỉ tính cho đến ngày hôm qua
//               the bar's time    1 day       1w   10weeks				to        1d        last
backtestWindow = time > (timenow - 86400000 * fromDate) and time < (timenow - 86400000 * toDate) ? 1 : 0
// backtestWindow = 1

// Squeeze qualifications
sqzOn  = (lowerBB > lowerKC) and (upperBB < upperKC) //no order when squeeze on
sqzOff = (lowerBB < lowerKC) and (upperBB > upperKC) //we will trade only when sqzOff 
noSqz  = (sqzOn == false) and (sqzOff == false)
//Histogram cross zero?
isSQZQualified = abs(val) >= abs(sqzMin) and abs(val) < abs(sqzMax) ? 1 : 0

// Trending qualification
// ema34 > ema89 > ema200 + ema34 > ema34[1]
isUpTrend   = ema(close, ema1) > ema(close, ema2) and ema(close, ema2) > ema(close, ema3) and ema(close, ema2) > ema(close, ema2)[1] 
isDownTrend = ema(close, ema1) < ema(close, ema2) and ema(close, ema2) < ema(close, ema3) and ema(close, ema2) < ema(close, ema2)[1]

// RISK MANAGEMENT --------------------------------------------------------------------------------------
long_sl 	= strategy.position_avg_price - (stoploss * syminfo.mintick)
long_tp 	= strategy.position_avg_price + (takeprofit * syminfo.mintick)
short_sl 	= strategy.position_avg_price + (stoploss * syminfo.mintick)
short_tp 	= strategy.position_avg_price - (takeprofit * syminfo.mintick)
long_break 	= high >= long_tp or low <= long_sl ? 1 : 0 // the CLOSE price touch stoploss or takeprofit
short_break = low <= short_tp or high >= short_sl ? 1 : 0 // trong thực tế chỉ cần HIGH hoặc LOW chạm là đã bị dừng -> phải để HIGH & LOW mới đúng

// Candles calculations ---------------------------------------------------------------------------------
candleHeight = abs(high-low)
candleBody = abs(close-open)
isCandleQualified = candleBody/candleHeight >= minCBodyRatio ? 1 : 0

// ----------------------------------------------------------------------------------------------------------
// ENTRY by EMAs cross/break
// Lọc candle color: có 1 thanh đó xuất hiện trong uptrend, nhưng không được có 2 thanh đỏ liên tiếp xuất hiện trong uptrend do có thể là dấu hiệu downtrend. TT với downtrend.
entryUP = firstShadedRed and isCandleQualified and isSQZQualified and (not withTrending or isUpTrend) // (high < ema(close, emaPeriod)) 
entryDN = firstShadedGreen and isCandleQualified and isSQZQualified and (not withTrending or isDownTrend) // (low > ema(close, emaPeriod))
// ----------------------------------------------------------------------------------------------------------
// STEP 3. Determine long trading conditions and manually limits
enterLong 	= entryUP and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitLong 	= (strategy.position_size > 0) and long_break

// STEP 4. Code short trading conditions and manually limits
enterShort 	= entryDN and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitShort 	= (strategy.position_size < 0) and short_break

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
// ----------------------------------------------------------------------------------------------------------