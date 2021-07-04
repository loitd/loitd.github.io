// ===============================================================================================================================
// © loi9985
//@version=4
study(title="Continous", overlay=true)
// -----------------------------------------------------------------------
minCBodyRatio   = input(0.5, title="Min Candle Body Ratio")
maxCSpreadRatio = input(0.3, title="Max Candle Spread Ratio")
maxCSpread      = input(9000, title="Max Candle Body in PIP")
lossInUSD       = input(1, title="Desired SL in USD")
minSL           = input(10, title="Min SL in PIP") //auto sub/plus when sl = entry
aggressiveEntry = input(true, title="Aggressive entry?")
// With ATR
withATR         = input(true, title="Apply ATR filter?")
minATRRatio     = input(0.3, title="Min Candle Body vs ATR Ratio")
maxATRRatio     = input(2.9, title="Max Candle Body vs ATR Ratio")
// Trending EMAs ---------------------------------------------------------
withTrending    = input(true, title="Apply trending filter?")
ema1            = input(8, title="Trending EMA 1 Period")
ema2            = input(13, title="Trending EMA 2 Period")
ema3            = input(21, title="Trending EMA 3 Period")

// Trending qualification
// ema34 > ema89 > ema200 + ema34 > ema34[1]
// isUpTrend   = ema(close, ema1) > ema(close, ema2) and ema(close, ema2) > ema(close, ema3) and ema(close, ema1)[1] > ema(close, ema2)[1] and ema(close, ema1)[1] > ema(close, ema1)[2]
// isDownTrend = ema(close, ema1) < ema(close, ema2) and ema(close, ema2) < ema(close, ema3) and ema(close, ema1)[1] < ema(close, ema2)[1] and ema(close, ema1)[1] < ema(close, ema1)[2]
isUpTrend    = ema(close, ema1) > ema(close, ema2) and ema(close, ema2) > ema(close, ema3) and ema(close, ema1)[1] > ema(close, ema2)[1] and ema(close, ema1) > ema(close, ema1)[1] and ema(close, ema1)[1] > ema(close, ema1)[2] and ema(close, ema2) > ema(close, ema2)[1] and ema(close, ema2)[1] > ema(close, ema2)[2]
isDownTrend  = ema(close, ema1) < ema(close, ema2) and ema(close, ema2) < ema(close, ema3) and ema(close, ema1)[1] < ema(close, ema2)[1] and ema(close, ema1) < ema(close, ema1)[1] and ema(close, ema1)[1] < ema(close, ema1)[2] and ema(close, ema2) < ema(close, ema2)[1] and ema(close, ema2)[1] < ema(close, ema2)[2] 
isWithUpTrend = (not withTrending or isUpTrend)
isWithDownTrend = (not withTrending or isDownTrend)

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
entryUP = isCandleQualified and isWithUpTrend and isWithATRQualified and isCandleGreen and (candleUpperRatio <= maxCSpreadRatio) and (candleUpper < maxCSpread * syminfo.mintick) // (high < ema(close, emaPeriod)) 
entryDN = isCandleQualified and isWithDownTrend and isWithATRQualified and isCandleRed and (candleLowerRatio <= maxCSpreadRatio) and (candleLower < maxCSpread * syminfo.mintick)
// ----------------------------------------------------------------------------------------------------------
// STEP 5. PLOTTING 
// Plot EMAs
plot(ema(close, ema1), title="MA1", color=#f5eb5d, linewidth=2)
plot(ema(close, ema2), title="MA2", color=#f5b771, linewidth=2)
plot(ema(close, ema3), title="MA3", color=#f5b056, linewidth=2)
// Change color bar
barcolor((entryUP or entryDN) ? color.yellow : na)
// Draw a label for shaded bar
yLocation   = entryUP ? yloc.belowbar : entryDN ? yloc.abovebar : yloc.price
styleLabel  = entryUP ? label.style_labelup : label.style_labeldown
styleColor  = entryUP ? color.new(color.lime, 9) : entryDN ? color.new(color.red, 9) : color.new(color.yellow, 9)
label1      = label.new(x=bar_index, y=na, yloc=yLocation, style=styleLabel, color=styleColor, text="")
// Calculate SL & TP
slUP        = aggressiveEntry ? high-minSL*syminfo.mintick : min(close,high-minSL*syminfo.mintick) // tối thiểu lấy 10 tick trong trường hợp không có râu nến trên
tpUP1       = aggressiveEntry ? high+(high-slUP)*10 : high+(high-slUP)
tpUP        = aggressiveEntry ? high+(high-slUP)*20 : high+(high-slUP)*3
slDN        = aggressiveEntry ? low+minSL*syminfo.mintick : max(close,low+minSL*syminfo.mintick) // không có râu nến dưới
tpDN1       = aggressiveEntry ? low-(slDN-low)*10 : low-(slDN-low)
tpDN        = aggressiveEntry ? low-(slDN-low)*20 : low-(slDN-low)*3
entryUPTxt = "SL: " + tostring(slUP,'#.#####') + "\nET: " + tostring(high,'#.#####')+"\nTP: "+tostring(tpUP,'#.#####')+"\nLOT: "+tostring(lossInUSD/(high-slUP),'#.###')
entryDNTxt = "SL: " + tostring(slDN,'#.#####') + "\nET: " + tostring(low,'#.#####') + "\nTP: " +tostring(tpDN,'#.#####')+"\nLOT: "+tostring(lossInUSD/(slDN-low),'#.###')
sltpTxt     = entryUP ? entryUPTxt : entryDNTxt
label.set_text(label1, "CaR: "+tostring(candleBody/candleHeight,'#.#')+"\nATR: "+tostring(candleBody/atr(14), '#.#') + "\n"+ sltpTxt)
// fill(s1, s2, color=color.new(color.silver, 89) )
if (entryUP)
    l1 = line.new(bar_index[1], slUP, bar_index, slUP, color=color.red, style=line.style_dotted, width=3) //SL
    l2 = line.new(bar_index[1], high, bar_index, high, color=color.yellow, style=line.style_dotted, width=3) 
    l3 = line.new(bar_index[1], tpUP1, bar_index, tpUP1, color=color.lime, style=line.style_dotted, width=3) 
    l4 = line.new(bar_index[1], tpUP, bar_index, tpUP, color=color.lime, style=line.style_dotted, width=3) 
if (entryDN)
    l4 = line.new(bar_index[1], slDN, bar_index, slDN, color=color.red, style=line.style_dotted, width=3) //SL
    l5 = line.new(bar_index[1], low, bar_index, low, color=color.yellow, style=line.style_dotted, width=3) 
    l6 = line.new(bar_index[1], tpDN1, bar_index, tpDN1, color=color.lime, style=line.style_dotted, width=3) 
    l7 = line.new(bar_index[1], tpDN, bar_index, tpDN, color=color.lime, style=line.style_dotted, width=3) 
// ----------------------------------------------------------------------------------------------------------