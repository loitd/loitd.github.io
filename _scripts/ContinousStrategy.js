// ===============================================================================================================================
// © loi9985
//@version=4
strategy(   title="ContinousStrategy", overlay=true, initial_capital=100, default_qty_type=strategy.fixed, default_qty_value=1, pyramiding=0, slippage=2, calc_on_every_tick=false, commission_value=0.01, commission_type=strategy.commission.percent, process_orders_on_close=false)
// All Declarations
// -----------------------------------------------------------------------
stoploss 		= input(100, title="Stoploss in PIP") // tỷ lệ loss chấp nhận
takeprofit 		= input(3000, title="TakeProfit in PIP") // tỷ lệ profit chấp nhận
maxCandles2Hold = input(1, title="Maximum of candles to hold") // số lượng candles nắm giữ tối đa
// -----------------------------------------------------------------------
minCBodyRatio   = input(0.7, title="Min Candle Body Ratio")
maxCSpreadRatio = input(0.3, title="Max Candle Body Ratio")
maxCSpread      = input(500, title="Max Candle Body in PIP")
// With ATR
withATR         = input(true, title="Apply ATR filter?")
minATRRatio     = input(0.5, title="Min Candle Body vs ATR Ratio")
maxATRRatio     = input(2.9, title="Max Candle Body vs ATR Ratio")
// Trending EMAs ---------------------------------------------------------
withTrending    = input(true, title="Apply trending filter?")
ema1            = input(8, title="Trending EMA 1 Period")
ema2            = input(13, title="Trending EMA 2 Period")
ema3            = input(21, title="Trending EMA 3 Period")
// -----------------------------------------------------------------------
fromDate         = input(60, title="From date")
toDate           = input(0, title="To date")
// ============================================================================================================
// QUALIFICATIONS
// ============================================================================================================
// Back Test Window
backtestWindow = time >= (timenow - 86400000 * fromDate) and time <= (timenow - 86400000 * toDate) ? 1 : 0

// Trending qualification
// ema34 > ema89 > ema200 + ema34 > ema34[1]
isUpTrend   = ema(close, ema1) > ema(close, ema2) and ema(close, ema2) > ema(close, ema3) and ema(close, ema1)[1] > ema(close, ema2)[1] and ema(close, ema1)[1] > ema(close, ema1)[2]
isDownTrend = ema(close, ema1) < ema(close, ema2) and ema(close, ema2) < ema(close, ema3) and ema(close, ema1)[1] < ema(close, ema2)[1] and ema(close, ema1)[1] < ema(close, ema1)[2]
isWithUpTrend = (not withTrending or isUpTrend)
isWithDownTrend = (not withTrending or isDownTrend)

// RISK MANAGEMENT --------------------------------------------------------------------------------------
// long_sl 	= strategy.position_avg_price - (stoploss * syminfo.mintick)
long_sl 	= close - (stoploss * syminfo.mintick) // The close during unconfirmed bar represent the current price of the asset.
long_tp 	= close + (takeprofit * syminfo.mintick)
short_sl 	= close + (stoploss * syminfo.mintick)
short_tp 	= close - (takeprofit * syminfo.mintick)
long_break 	= high >= long_tp or low <= long_sl ? 1 : 0 // the CLOSE price touch stoploss or takeprofit
short_break = low <= short_tp or high >= short_sl ? 1 : 0 // trong thực tế chỉ cần HIGH hoặc LOW chạm là đã bị dừng -> phải để HIGH & LOW mới đúng

// Candles calculations ---------------------------------------------------------------------------------
candleHeight = abs(high-low)
candleBody = abs(close-open)
candleUpper = high - max(open, close)
candleLower = min(open, close) - low
isCandleQualified = candleBody/candleHeight >= minCBodyRatio ? 1 : 0
candleUpperRatio = candleUpper/candleHeight
candleLowerRatio = candleLower/candleHeight
isCandleGreen = open < close ? 1 : 0
isCandleRed = open > close ? 1 : 0

// ATR Calculations
isATRQualified = candleBody/atr(14) >= minATRRatio and candleBody/atr(14) <= maxATRRatio ? 1 : 0
isWithATRQualified = (not withATR or isATRQualified)
// ----------------------------------------------------------------------------------------------------------
// ENTRY by EMAs cross/break
// Lọc candle color: có 1 thanh đó xuất hiện trong uptrend, nhưng không được có 2 thanh đỏ liên tiếp xuất hiện trong uptrend do có thể là dấu hiệu downtrend. TT với downtrend.
entryUP = isCandleQualified and isWithUpTrend and isWithATRQualified and isCandleGreen // (high < ema(close, emaPeriod)) 
entryDN = isCandleQualified and isWithDownTrend and isWithATRQualified and isCandleRed// (low > ema(close, emaPeriod))
// ----------------------------------------------------------------------------------------------------------
// STEP 3. Determine long trading conditions and manually limits
enterLong 	= entryUP and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitLong 	= (strategy.position_size > 0) and (long_break or barssince(enterLong) >= maxCandles2Hold) 

// STEP 4. Code short trading conditions and manually limits
enterShort 	= entryDN and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitShort 	= (strategy.position_size < 0) and (short_break or barssince(enterLong) >= maxCandles2Hold)

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
// Change color bar
barcolor((entryUP or entryDN) ? color.yellow : na)
// Draw a label for shaded bar
yLocation   = entryUP ? yloc.belowbar : entryDN ? yloc.abovebar : yloc.price
styleLabel  = entryUP ? label.style_labelup : label.style_labeldown
styleColor  = entryUP ? color.new(color.lime, 9) : entryDN ? color.new(color.red, 9) : color.new(color.yellow, 9)
label1      = label.new(x=bar_index, y=na, yloc=yLocation, style=styleLabel, color=styleColor, text="")
sltpTxt     = entryUP ? "SL: " + tostring(long_sl) + "\nTP: " + tostring(long_tp) : "SL: " + tostring(short_sl) + "\nTP: " + tostring(short_tp)
label.set_text(label1, "CaR: "+tostring(candleBody/candleHeight, '#.#')+"\nATR: "+tostring(candleBody/atr(14), '#.#') + "\n"+ sltpTxt)
// fill(s1, s2, color=color.new(color.silver, 89) )
if (entryUP)
    l1 = line.new(bar_index[1], long_sl, bar_index, long_sl, color=color.red, style=line.style_dotted, width=3) //line.new(x1, y1, x2, y2, xloc, extend, color, style, width)
    l2 = line.new(bar_index[1], long_tp, bar_index, long_tp, color=color.lime, style=line.style_dotted, width=3) 
if (entryDN)
    l3 = line.new(bar_index[1], short_tp, bar_index, short_tp, color=color.lime, style=line.style_dotted, width=3) 
    l4 = line.new(bar_index[1], short_sl, bar_index, short_sl, color=color.red, style=line.style_dotted, width=3) 
// ----------------------------------------------------------------------------------------------------------