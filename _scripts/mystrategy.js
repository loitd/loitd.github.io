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
// - Một ngày chỉ trade tối đa 1 lệnh.

//@version=3
// STEP 1. Define strategy settings
strategy(title="Leo_Strategy", overlay=true, initial_capital=1000, default_qty_value=0.01, pyramiding=0, slippage=2)

tf_anchor1 = input(title="Anchor 1 timeframe", type=resolution, defval="4H")
tf_anchor2 = input(title="Anchor 2 timeframe", type=resolution, defval="1D")

ema1_len = input(title="EMA1 Length", type=integer, defval=7)
ema2_len = input(title="EMA2 Length", type=integer, defval=30)

// STEP 2. Calculate strategy values
ema1 = ema(close, ema1_len)
ema2 = ema(close, ema2_len)
// calculate on anchor 1 time frame
ema1_ac1 = security(tickerid, tf_anchor1, ema1)
ema1_ac2 = security(tickerid, tf_anchor2, ema1)
// calculate on anchor 2 time frame
ema2_ac1 = security(tickerid, tf_anchor1, ema2)
ema2_ac2 = security(tickerid, tf_anchor2, ema2)
// Set backtest window: up to 5 days before 
// With that five day gap we account for days when the market is closed
backtestWindow = time < (timenow - 86400000 * 90)

// STEP 3. Determine long trading conditions
enterLong = crossover(ema1, ema2) and crossover(ema1_ac1, ema2_ac1) and crossover(ema1_ac2, ema2_ac2) and backtestWindow
// implement the time stop that has us close trades after 8 bars
exitLong = (barssince(enterLong) > 6)

// STEP 4. Code short trading conditions


// STEP 5. Output strategy data
plot(series=ema1, color=blue, title="ema1")
plot(series=ema2, color=navy, title="ema2")
plot(series=ema1_ac1, color=lime, title="ema1_ac1")
plot(series=ema2_ac1, color=green, title="ema2_ac1")
plot(series=ema1_ac2, color=fuchsia, title="ema1_ac2")
plot(series=ema2_ac2, color=red, title="ema2_ac2")

// plot(series=fastMA, color=(fastMA > slowMA) ? green : red, linewidth=2, title="Fast EMA")
// bgColour = enterLong ? green : enterShort ? red : na
// bgcolor(color=bgColour, transp=90)

// STEP 6. Submit entry orders
strategy.entry(id="eL", long=true, when=enterLong)

// strategy.entry(id="ES", long=false, when=enterShort)

// STEP 7. Submit exit orders
//short default amount of lots that have been long before
strategy.order(id="xL", long=false, when=exitLong)

// strategy.order(id="xS", long=true, when=exitShort)

