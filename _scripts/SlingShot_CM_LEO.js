//Created by ChrisMoody on 10-05-2014
//Known as SlingShot Method that keeps Traders on Trending Side of Market.
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © loi9985

//@version=4
study("Slingshot_CM_LEO", overlay=true)
sae = input(true, title="Show Aggressive Entry?, Or Use as Alert To Potential Conservative Entry?")
sce = input(true, title="Show Conservative Entry?")
st = input(true, title="Show Trend Arrows at Top and Bottom of Screen?")
def = input(false, title="Only Choose 1 - Either Conservative Entry Arrows or 'B'-'S' Letters")
pa = input(true, title="Show Conservative Entry Arrows?")
sl = input(false, title="Show 'B'-'S' Letters?")
tf_anchor1 = input(title="Anchor 1 timeframe", type=input.resolution, defval="1D")
tf_anchor2 = input(title="Anchor 2 timeframe", type=input.resolution, defval="1W")

deftrend(ma1, ma2, ma3, ma4, rema) => 
    // tr = True range. Same as tr(false). It is max(high - low, abs(high - close[1]), abs(low - close[1]))
    upper = ma4 + rema * 0.5
    lower = ma4 - rema * 0.5
    uptrend = (ma1 > upper and ma2 > upper and ma3 > upper)
    downtrend = (ma1 < lower and ma2 < lower and ma3 < lower)
    // to return
    [uptrend, downtrend]

//EMA Definitions
ma1 = ema(close, 13)
ma2 = ema(close, 21)
ma3 = ema(close, 34)
ma4 = ema(close, 89)
rema = ema(tr, 89)
//Define Up and Down Trend for Trend Arrows at Top and Bottom of Screen
[uptrend,downtrend] = deftrend(ma1, ma2, ma3, ma4, rema)

ma1ac1 = security(syminfo.tickerid, tf_anchor1, ma1)
ma2ac1 = security(syminfo.tickerid, tf_anchor1, ma2)
ma3ac1 = security(syminfo.tickerid, tf_anchor1, ma3)
ma4ac1 = security(syminfo.tickerid, tf_anchor1, ma4)
remaac1 = security(syminfo.tickerid, tf_anchor1, rema)
[uptrendac1, downtrendac1] = deftrend(ma1ac1, ma2ac1, ma3ac1, ma4ac1, remaac1)

ma1ac2 = security(syminfo.tickerid, tf_anchor2, ma1)
ma2ac2 = security(syminfo.tickerid, tf_anchor2, ma2)
ma3ac2 = security(syminfo.tickerid, tf_anchor2, ma3)
ma4ac2 = security(syminfo.tickerid, tf_anchor2, ma4)
remaac2 = security(syminfo.tickerid, tf_anchor2, rema)
[uptrendac2, downtrendac2] = deftrend(ma1ac2, ma2ac2, ma3ac2, ma4ac2, remaac2)

upTrend = (uptrend and uptrendac1 and uptrendac2)
downTrend = (downtrend and downtrendac1 and downtrendac2)
counter = 0

emaFast = ma1ac1
emaSlow = ma2ac1
//Aggressive Entry or Alert To Potential Trade
pullbackUpT() => emaFast > emaSlow and close < emaFast
pullbackDnT() => emaFast < emaSlow and close > emaFast

//Conservative Entry Code For Highlight Bars
entryUpT() => emaFast > emaSlow and close[1] < emaFast and close > emaFast
entryDnT() => emaFast < emaSlow and close[1] > emaFast and close < emaFast
//Conservative Entry True/False Condition -> xác định điểm vào lệnh theo tín hiệu close crossover với ema.
// Long khi emafase > emaslow + close trước và close hiện tại cắt đường emafast. Short khi ngược lại.
// tương đối giống với việc phá bollinger bands. Bổ sung thêm điều kiện UpTrend
// Tìm phương án bổ sung thêm điều kiện lastkiss để hình thành lastkisstrade
entryUpTrend = upTrend and (emaFast > emaSlow) and (close[1] < emaFast) and (close > emaFast) ? 1 : 0
entryDnTrend = downTrend and (emaFast < emaSlow) and (close[1] > emaFast) and (close < emaFast) ? 1 : 0
//Definition for Conseervative Entry Up and Down PlotArrows
codiff = entryUpTrend == 1 ? entryUpTrend : 0
codiff2 = entryDnTrend == 1 ? entryDnTrend : 0

//Color definition for Moving Averages
col = emaFast > emaSlow ? color.lime : emaFast < emaSlow ? color.red : color.yellow
//Moving Average Plots and Fill
p1 = plot(emaSlow, title="Slow MA", style=plot.style_linebr, linewidth=4, color=col)
p2 = plot(emaFast, title="Slow MA", style=plot.style_linebr, linewidth=2, color=col)
fill(p1, p2, color=color.silver, transp=50)

//Aggressive Entry, Conservative Entry Highlight Bars
// barcolor(sae and pullbackUpT() ? color.yellow : sae and pullbackDnT() ? color.yellow : na)
// barcolor(sce and entryUpT() ? color.aqua : sce and entryDnT() ? color.aqua : na)

//Trend Triangles at Top and Bottom of Screen
plotshape(st and upTrend ? upTrend : na, title="Conservative Buy Entry Triangle",style=shape.triangleup, location=location.bottom, color=color.lime, transp=0, offset=0)
plotshape(st and downTrend ? downTrend : na, title="Conservative Short Entry Triangle",style=shape.triangledown, location=location.top, color=color.red, transp=0, offset=0)

//Plot Arrows OR Letters B and S for Buy Sell Signals
plotarrow(pa and codiff ? codiff : na, title="Up Entry Arrow", colorup=color.lime, maxheight=30, minheight=30, transp=0)
plotarrow(pa and codiff2*-1 ? codiff2*-1 : na, title="Down Entry Arrow", colordown=color.red, maxheight=30, minheight=30, transp=0)
plotchar(sl and codiff ? low - tr : na, title="Buy Entry", offset=0, char='B', location=location.absolute, color=color.lime, transp=0)
plotchar(sl and codiff2 ? high + tr : na, title="Short Entry", offset=0, char='S', location=location.absolute, color=color.red, transp=0)