//Created By ChrisMoody on 1-20-2014
//Credit Goes To Chris Capre from 2nd Skies Forex
// 4 Simple but Effective Price Patterns!
// Yellow = Inside Bar – Breakout Patterns
// Orange = Outside Bar – Breakout Patterns
// Green/Red = Pin Bars
// Aqua/Fuchsia = Shaved Bars

study("CM_Price-Action-Bars", overlay=true)

pctP = input(66, minval=1, maxval=99, title="Percentage Input For PBars, What % The Wick Of Candle Has To Be")
pblb = input(6, minval=1, maxval=100, title="PBars Look Back Period To Define The Trend of Highs and Lows")
pctS = input(5, minval=1, maxval=99, title="Percentage Input For Shaved Bars, Percent of Range it Has To Close On The Lows or Highs")
spb = input(false, title="Show Pin Bars?")
ssb = input(false, title="Show Shaved Bars?")
sib = input(false, title="Show Inside Bars?")
sob = input(false, title="Show Outside Bars?")
sgb = input(false, title="Check Box To Turn Bars Gray?")

//PBar Percentages
pctCp = pctP * .01
pctCPO = 1 - pctCp

//Shaved Bars Percentages
pctCs = pctS * .01
pctSPO = pctCs

range = high - low

///PinBars
pBarUp() => spb and open > high - (range * pctCPO) and close > high - (range * pctCPO) and low <= lowest(pblb) ? 1 : 0
pBarDn() => spb and open < high - (range *  pctCp) and close < high-(range * pctCp) and high >= highest(pblb) ? 1 : 0

//Shaved Bars
sBarUp() => ssb and (close >= (high - (range * pctCs)))
sBarDown() => ssb and close <= (low + (range * pctCs))

//Inside Bars
insideBar() => sib and high <= high[1] and low >= low[1] ? 1 : 0
outsideBar() => sob and (high > high[1] and low < low[1]) ? 1 : 0

//PinBars
barcolor(pBarUp() ? lime : na)
barcolor(pBarDn() ? red : na)
//Shaved Bars
barcolor(sBarDown() ? fuchsia : na)
barcolor(sBarUp() ? aqua : na)
//Inside and Outside Bars
barcolor(insideBar() ? yellow : na )
barcolor(outsideBar() ? orange : na )

barcolor(sgb and close ? gray : na)