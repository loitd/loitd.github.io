// © loi9985
//@version=4
study("SSupertrend", overlay=true, resolution="", resolution_gaps=true)

atrPeriod   = input(21, "ATR Length")
factor      = input(1.1, "Factor")
length1     = input(21, title="MA-1 period", minval=1)

[supertrend, direction] = supertrend(factor, atrPeriod)
ema1        = ema(close, length1)

bodyMiddle  = plot((open + close) / 2, display=display.none)
tpUp1       = ema1 > supertrend ? ema1*2-supertrend : na 
tpUp2       = ema1 > supertrend ? ema1*3-2*supertrend : na 
tpDn1       = ema1 < supertrend ? ema1+(ema1-supertrend) : na 
tpDn2       = ema1 < supertrend ? ema1+(ema1-supertrend)*2 : na 

upTrend     = plot(direction < 0 ? supertrend : na, "Up Trend", color = color.green, style=plot.style_linebr)
upTp1       = plot(direction < 0 ? tpUp1 : na, "TP Up1", color = color.green, style=plot.style_cross)
upTp2       = plot(direction < 0 ? tpUp2 : na, "TP Up2", color = color.green, style=plot.style_cross)

downTrend   = plot(direction < 0? na : supertrend, "Down Trend", color = color.red, style=plot.style_linebr)
dnTP1       = plot(direction < 0? na : tpDn1, "TP Down1", color = color.red, style=plot.style_cross)
dnTP2       = plot(direction < 0? na : tpDn2, "TP Down2", color = color.red, style=plot.style_cross)

//ema
plot(ema1, title="MA-1", color=color.white, linewidth=2)

fill(bodyMiddle, upTrend, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle, downTrend, color.new(color.red, 90), fillgaps=false)