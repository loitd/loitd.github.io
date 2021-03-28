// Tính chất: khung 4h, target P/L: 60/40, PNL Rate: 1.5, chỉ số: BTCUSD, ETHUSD với tần suất 1 tuần (1 ngày?) 1 lệnh
// Mục tiêu: lợi nhuận 30% vốn/tháng -> 1 tuần 1 lệnh -> 10% vốn 1 lệnh

//@version=4
strategy(title="Leo_Strategy_2", overlay=true, initial_capital=1000, default_qty_type=strategy.cash, default_qty_value=10, pyramiding=0, slippage=2, calc_on_every_tick=true)
// SQUEEZE Calculations
// Squeeze declare
length = input(21, title="BB Length")
mult = input(2.0,title="BB MultFactor")
lengthKC=input(21, title="KC Length")
multKC = input(1.5, title="KC MultFactor")
// histogram
val = linreg(close - avg(avg(highest(high, lengthKC), lowest(low, lengthKC)),sma(close,lengthKC)), lengthKC,0)
shadedRed = (val < 0) and (val > nz(val[1])) //choose shaded red when long
shadedGreen = (val > 0) and (val < nz(val[1])) //choose shaded green when short
lightRed = (val < 0) and (val <= nz(val[1]))
lightGreen = (val > 0) and (val >= nz(val[1]))
// Calculate BB
source = close
basis = sma(source, length)
dev = multKC * stdev(source, length)
upperBB = basis + dev
lowerBB = basis - dev
// Calculate KC
ma = sma(source, lengthKC)
range = tr
rangema = sma(range, lengthKC)
upperKC = ma + rangema * multKC
lowerKC = ma - rangema * multKC
// squeeze or not? Nguyên tắc chung là không trade tại thời điểm Squeeze do tt không có định hướng rõ ràng và có thể dẫn tới nhiều biến động bất thường.
sqzOn  = (lowerBB > lowerKC) and (upperBB < upperKC) //no order when squeeze on
sqzOff = (lowerBB < lowerKC) and (upperBB > upperKC) //we will trade only when sqzOff -> Có xu hướng rõ ràng
noSqz  = (sqzOn == false) and (sqzOff == false)

// StochRSI Calculations
smoothK = input(3, "K", minval=1)
smoothD = input(3, "D", minval=1)
lengthRSI = input(14, "RSI Length", minval=1)
lengthStoch = input(14, "Stochastic Length", minval=1)
src = input(close, title="RSI Source")
rsi1 = rsi(src, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)

// Crossover = cắt dưới lên, Crossunder = cắt trên xuống
SRSIOverBought = crossunder(k,d) ? 1 : 0
SRSIOverSold = crossover(k,d) ? 1 : 0

// With that five day gap we account for days when the market is closed
//               the bar's time    1 day       1w   10weeks
backtestWindow = time > (timenow - 86400000 *  7    * 10)

// ----------------------------------------------------------------------------------------------------------
// ENTRY by EMAs cross/break
// Entry by Squeeze historgram shading and StochRSI
entryUP3 = shadedRed and shadedRed[1]
entryDN3 = shadedGreen and shadedGreen[1] 

// SET the active entry algorithm
entryUP = entryUP3
entryDN = entryDN3
// ----------------------------------------------------------------------------------------------------------
// STEP 3. Determine long trading conditions
enterLong = entryUP and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitLong = (strategy.position_size > 0) and SRSIOverBought 

// STEP 4. Code short trading conditions
enterShort = entryDN and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitShort = (strategy.position_size < 0) and SRSIOverSold
// ----------------------------------------------------------------------------------------------------------
// STEP 5. Output strategy data - Vẽ dấu mũi tên tại điểm vào lệnh
plotarrow(enterLong ? enterLong : na, title="Up Entry Arrow", colorup=color.lime, maxheight=30, minheight=30, transp=0)
plotarrow(enterShort*-1 ? enterShort*-1 : na, title="Down Entry Arrow", colordown=color.red, maxheight=30, minheight=30, transp=0)
// plot overbought and oversold
// Vẽ dấu + tại điểm thoát lệnh
plot( SRSIOverBought or SRSIOverSold ? high : na, title="SRSI", style=plot.style_cross, color=color.purple, linewidth=2 )

// Vẽ đường line tại UP & Down trend
plot( SRSIUPTrend ? high + 34*syminfo.mintick : na, title="SRSI UP Trend", style=plot.style_linebr, color=color.blue, linewidth=1 )
plot( SRSIDNTrend ? low - 34*syminfo.mintick : na, title="SRSI DOWN Trend", style=plot.style_linebr, color=color.orange, linewidth=1 )

// Vẽ dấu chấm khi squeeze được shaded
plot( shadedRed ? high + 55*syminfo.mintick : na, title="SQueeze UP Trend", style=plot.style_circles, color=color.blue, linewidth=1 )
plot( shadedGreen ? low - 55*syminfo.mintick : na, title="SQueeze DOWN Trend", style=plot.style_circles, color=color.orange, linewidth=1 )
// ----------------------------------------------------------------------------------------------------------
// RISK MANAGEMENT
rr_base = atr(89)
// swing stop loss
sw_sl = rr_base * 1.5
sw_tp = rr_base * 2
long_sl = strategy.position_avg_price - sw_sl
long_tp = strategy.position_avg_price + sw_tp
short_sl = strategy.position_avg_price + sw_sl
short_tp = strategy.position_avg_price - sw_tp
// ----------------------------------------------------------------------------------------------------------
// STEP 6. Submit entry orders
strategy.entry(id="eL", long=true, comment="eL", when=enterLong) //, stop=sw_sl, limit=sw_tp
strategy.entry(id="eS", long=false, comment="eS", when=enterShort)

// plot sl & tp levels. 
// There's a nice benefit to strategy.position_avg_price. When our strategy scales in or out of a position, then the strategy.position_avg_price variable updates to reflect the then-current entry price. When that happens our stop prices automatically update as well. And that way our stops remain at the correct level, even with multiple entries and exits.
// l1 = plot( strategy.position_size > 0 ? long_sl : na, title="Long SL", style=plot.style_cross, linewidth=3, color=color.red)
// l2 = plot( strategy.position_size > 0 ? long_tp : na, title="Long TP", style=plot.style_cross, linewidth=3, color=color.lime)
// fill(l1, l2, color=color.silver, transp=89)
// s1 = plot( strategy.position_size < 0 ? short_sl : na, title="Short SL", style=plot.style_cross, linewidth=3, color=color.red)
// s2 = plot( strategy.position_size < 0 ? short_tp : na, title="Short TP", style=plot.style_cross, linewidth=3, color=color.lime)
// fill(s1, s2, color=color.silver, transp=89)

// STEP 7. Submit Money Management

// Exit orders - Nếu chỉ chỉ định stoploss mà k chỉ đinh limitprofit thì lệnh sẽ chỉ thoát khi stoploss. When ở đây không phải điều kiện thoát lệnh mà chỉ là điều kiện xem xét cho stoploss và takeprofit. Vì lý do đó, có thể cân nhắc dùng cả close và exit để vừa có điều kiện thoát lệnh when vừa có stoploss & limitprofit.
strategy.exit(id="xL", from_entry="eL", limit=long_tp, stop=long_sl, when=exitLong, comment="xL-exit")
strategy.exit(id="xS", from_entry="eS", limit=short_tp, stop=short_sl, when=exitShort, comment="xS-exit")

// Lệnh close không đặt được stoploss hay limitprofit, tuy nhiên When là điều kiện thoát lệnh cuối cùng.
strategy.close(id="eL", when=exitLong, comment="xL-close")
strategy.close(id="eS", when=exitShort, comment="xS-close")
// ----------------------------------------------------------------------------------------------------------

