// Tính chất: khung 4h, target P/L: 60/40, PNL Rate: 1.5, chỉ số: BTCUSD, ETHUSD với tần suất 1 tuần (1 ngày?) 1 lệnh
// Mục tiêu: lợi nhuận 3% vốn/tháng -> 1 tuần 1 lệnh -> 10% vốn 1 lệnh
// Profit Factor: số tiền kiếm được trên mỗi đơn vị tiền thua mất = gross profit/gross loss

// Hiện theo backtest, chiến thuật giao dịch này không phù hợp với các khung thời gian nhỏ. 
// Đối với cặp BTCUSD, 1D, 20/2/20/1.5/hold6/1.5/3/100/false////true/4 có PF 6.63 percentage 67% với 6 giao dịch
// Đối với cặp AUDUSD, 4h, 20/2/20/1.5/hold6/1.5/3/100/false////true/4 có PF 5.9, percentage 80% với khoảng 20 giao dịch/100 ngày
// Đối với cặp GBPUSD, 4h, 20/2/20/1.5/hold6/1.5/3/100/false////true/4 có PF 3.4, percentage 67% với khoảng 18 giao dịch/100 ngày

// © loi9985
//@version=4
// Nếu để calc_on_every_tick sẽ khó khăn trong việc apply realtime
strategy(title="Leo_Strategy_3", overlay=true, initial_capital=1000, default_qty_type=strategy.cash, default_qty_value=10, pyramiding=0, slippage=2, calc_on_every_tick=true)
// All Declarations
sl_ratio 		= input(1.5, title="Stoploss ratio") 				// tỷ lệ loss chấp nhận
tp_ratio 		= input(2.5, title="TakeProfit ratio") 				// tỷ lệ profit chấp nhận
backtestFrom 	= input(100, title="Far Most Day of Backtest") 		// Backtest From
backTestTo      = input(0, title="Last Minutes Of BackTest") 		// Backtest TO
maxCandles2Hold = input(5, title="Maximum of candles to hold") 		// số lượng candles nắm giữ tối đa
candleBodyRatio = input(5, title="Candle Body Ratio (to be div)")
// Back Test Window
// With that five day gap we account for days when the market is closed. Chỉ tính cho đến ngày hôm qua
//               the bar's time    1 day       1w   10weeks				to        1m        last
backtestWindow = time > (timenow - 86400000 * backtestFrom) and time < (timenow - 60000 * backTestTo) ? 1 : 0

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
// Candles calculations ---------------------------------------------------------------------------------
redBigCandle 	= close < open - rr_base/candleBodyRatio ? 1 : 0
greenBigCandle 	= close > open + rr_base/candleBodyRatio ? 1 : 0
redCandle 		= close < open ? 1 : 0
greenCandle 	= close > open ? 1 : 0
// ----------------------------------------------------------------------------------------------------------
// ENTRY by EMAs cross/break
// Lọc candle color: có 1 thanh đó xuất hiện trong uptrend, nhưng không được có 2 thanh đỏ liên tiếp xuất hiện trong uptrend do có thể là dấu hiệu downtrend. TT với downtrend.
entryUP3 	= greenBigCandle[2] and greenBigCandle[1] and greenBigCandle 
entryDN3 	= redBigCandle[2] and redBigCandle[1] and redBigCandle 
// SET the active entry algorithm
entryUP 	= entryUP3
entryDN 	= entryDN3
// ----------------------------------------------------------------------------------------------------------
// STEP 3. Determine long trading conditions and manually limits
enterLong 	= entryUP and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitLong 	= (strategy.position_size > 0) and (barssince(enterLong) >= maxCandles2Hold or long_break)
// STEP 4. Code short trading conditions and manually limits
enterShort 	= entryDN and backtestWindow and (strategy.position_size == 0) ? 1 : 0
exitShort 	= (strategy.position_size < 0) and (barssince(enterShort) >= maxCandles2Hold or short_break)
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