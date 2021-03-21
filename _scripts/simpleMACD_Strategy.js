strategy(title="simpleMACD", overlay=false, default_qty_value=3, initial_capital=10000, currency=currency.EUR)

// Create inputs
fastLen = input(title="Fast Length", type=integer, defval=12)
slowLen = input(title="Slow Length", type=integer, defval=26)
sigLen  = input(title="Signal Length", type=integer, defval=9)

// Get MACD values
[macdLine, signalLine, _] = macd(close, fastLen, slowLen, sigLen)

// Plot MACD values and line
plot(series=macdLine, color=#6495ED, linewidth=2)
plot(series=signalLine, color=orange, linewidth=2)

hline(price=0)

// Determine long and short conditions
longCondition  = crossover(macdLine, signalLine)
shortCondition = crossunder(macdLine, signalLine)

// Submit orders
strategy.entry(id="Long Entry", long=true, when=longCondition)
strategy.entry(id="Short Entry", long=false, when=shortCondition)