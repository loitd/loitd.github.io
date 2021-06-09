//@version=4
study(title="Parabolic SAR", shorttitle="SAR", overlay=true, resolution="")
start = input(0.02)
increment = input(0.02)
maximum = input(0.2, "Max Value")
out = sar(start, increment, maximum)
plot(out, "ParabolicSAR", style=plot.style_cross, color=#3A6CA8)


//@version=4
// strategy("Parabolic SAR Strategy", overlay=true)
// start = input(0.02)
// increment = input(0.02)
// maximum = input(0.2)
// var bool uptrend = na
// var float EP = na
// var float SAR = na
// var float AF = start
// var float nextBarSAR = na
// if bar_index > 0
// 	firstTrendBar = false
// 	SAR := nextBarSAR
// 	if bar_index == 1
// 		float prevSAR = na
// 		float prevEP = na
// 		lowPrev = low[1]
// 		highPrev = high[1]
// 		closeCur = close
// 		closePrev = close[1]
// 		if closeCur > closePrev
// 			uptrend := true
// 			EP := high
// 			prevSAR := lowPrev
// 			prevEP := high
// 		else
// 			uptrend := false
// 			EP := low
// 			prevSAR := highPrev
// 			prevEP := low
// 		firstTrendBar := true
// 		SAR := prevSAR + start * (prevEP - prevSAR)
// 	if uptrend
// 		if SAR > low
// 			firstTrendBar := true
// 			uptrend := false
// 			SAR := max(EP, high)
// 			EP := low
// 			AF := start
// 	else
// 		if SAR < high
// 			firstTrendBar := true
// 			uptrend := true
// 			SAR := min(EP, low)
// 			EP := high
// 			AF := start
// 	if not firstTrendBar
// 		if uptrend
// 			if high > EP
// 				EP := high
// 				AF := min(AF + increment, maximum)
// 		else
// 			if low < EP
// 				EP := low
// 				AF := min(AF + increment, maximum)
// 	if uptrend
// 		SAR := min(SAR, low[1])
// 		if bar_index > 1
// 			SAR := min(SAR, low[2])
// 	else
// 		SAR := max(SAR, high[1])
// 		if bar_index > 1
// 			SAR := max(SAR, high[2])
// 	nextBarSAR := SAR + AF * (EP - SAR)
// 	if barstate.isconfirmed
// 		if uptrend
// 			strategy.entry("ParSE", strategy.short, stop=nextBarSAR, comment="ParSE")
// 			strategy.cancel("ParLE")
// 		else
// 			strategy.entry("ParLE", strategy.long, stop=nextBarSAR, comment="ParLE")
// 			strategy.cancel("ParSE")
// plot(SAR, style=plot.style_cross, linewidth=3, color=color.orange)
// plot(nextBarSAR, style=plot.style_cross, linewidth=3, color=color.aqua)
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)