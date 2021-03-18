//Created us usgears on 10-7-2014
//ChrisMoody contributed a few cosmetic options.
study("Modified_SlingShot_CM_UCS_Leo", overlay=true)
sae = input(true, title="Show Aggressive Entry?, Or Use as Alert To Potential Conservative Entry?")
sce = input(true, title="Show Conservative Entry?")
st = input(true, title="Show Trend Arrows at Top and Bottom of Screen?")
def = input(false, title="Only Choose 1 - Either Conservative Entry Arrows or 'B'-'S' Letters")
pa = input(true, title="Show Conservative Entry Arrows?")
sl = input(false, title="Show '↑'-'↓' Letters?")

ma1 = ema(close, 13)
ma2 = ema(close, 21)
ma3 = ema(close, 34)
ma = ema(close, 89)

range =  tr 
rangema = ema(range, 89)
upper = ma + rangema * 0.5
lower = ma - rangema * 0.5
midChan = (upper + lower)/2
//Trend Definition
tr_up = ma1 > upper and ma2 > upper and ma3 > upper
tr_down = ma1 < lower and ma2 < lower and ma3 < lower
//Aggressive Entry
pullbackUpT() => tr_up and close < upper
pullbackDnT() => tr_down and close > lower
//Conservative Entry
entryUpT() => tr_up and close[1] < upper and close > upper
entryDnT() => tr_down and close[1] > lower and close < lower
//Conservative Entry True/False Condition
entryUpTrend = ma1 > upper and ma2 > upper and ma3 > upper and close[1] < upper and close > upper ? 1 : 0
entryDnTrend = ma1 < lower and ma2 < lower and ma3 < lower and close[1] > lower and close < lower ? 1 : 0

//Define Up and Down Trend for Trend Arrows at Top and Bottom of Screen
upTrend = ma1 > upper and ma2 > upper and ma3 > upper
downTrend = ma1 < lower and ma2 < lower and ma3 < lower

//Definition for Conseervative Entry Up and Down PlotArrows
codiff = entryUpTrend == 1 ? entryUpTrend : 0
codiff2 = entryDnTrend == 1 ? entryDnTrend : 0

//Trend Color Definition for Moving Averages and Channel
scolor = tr_up ? green : tr_down ? red : blue

barcolor(sae and pullbackUpT() ? yellow : sae and pullbackDnT() ? yellow : na)
barcolor(sce and entryUpT() ? aqua : sce and entryDnT() ? aqua : na)
//Plot 3 MA's
plot(ma1, title="Fast MA", color=scolor, style=circles, linewidth=1)
plot(ma2, title="Medium MA",color=scolor, style=circles, linewidth=2)
plot(ma3, title="Slow MA", color=scolor, style=circles, linewidth=3)
//Channel Plots
p1 = plot(upper, title="Upper Channel", color=scolor, style=line, linewidth=3)
p2 = plot(midChan, title="Upper Channel", color=silver, style=line, linewidth=1)
p3 = plot(lower, title="Lower Channel", color=scolor, style=line, linewidth=3)
fill(p1, p2, color=lime, transp=70)
fill(p2, p3, color=red, transp=70)

//Trend Triangles at Top and Bottom of Screen
plotshape(st and upTrend ? upTrend : na, title="Conservative Buy Entry Triangle",style=shape.triangleup, location=location.bottom, color=lime, transp=0, offset=0)
plotshape(st and downTrend ? downTrend : na, title="Conservative Short Entry Triangle",style=shape.triangledown, location=location.top, color=red, transp=0, offset=0)

//Plot Arrows OR Letters ↑ and ↓ for Buy Sell Signals
plotarrow(pa and codiff ? codiff : na, title="Up Entry Arrow", colorup=lime, maxheight=60, minheight=50, transp=0)
plotarrow(pa and codiff2*-1 ? codiff2*-1 : na, title="Down Entry Arrow", colordown=red, maxheight=60, minheight=50, transp=0)
plotchar(sl and codiff ? low - tr : na, title="Buy Entry", offset=0, char='↑', location=location.absolute, color=lime, transp=0)
plotchar(sl and codiff2 ? high + tr : na, title="Short Entry", offset=0, char='↓', location=location.absolute, color=red, transp=0)