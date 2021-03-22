// Finds Market Bottoms: VIX = VOLATILITY S&P 500 INDEX
// Larry Williams Developed This Incredible Indicator. It Gives The Same Readings The VIX does for Stock Index’s…But This Indicator Works on All Asset Classes. I Customized The Settings Slightly To Create “Percentile” Based Highlight Bars…So You May Need To Adjust Slightly For Your Asset Class. These Are The Standard Settings Shown Here. Designed For Daily Charts…But Works GREAT On Intra-Day Charts!!!
study("CM_Williams_Vix_Fix", overlay=false)
pd = input(22, title="LookBack Period Standard Deviation High")
bbl = input(20, title="Bolinger Band Length")
mult = input(2.0    , minval=1, maxval=5, title="Bollinger Band Standard Devaition Up")
lb = input(50  , title="Look Back Period Percentile High")
ph = input(.85, title="Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%")
pl = input(1.01, title="Lowest Percentile - 1.10=90%, 1.05=95%, 1.01=99%")
hp = input(false, title="Show High Range - Based on Percentile and LookBack Period?")
sd = input(false, title="Show Standard Deviation Line?")

// WVF line
wvf = ((highest(close, pd)-low)/(highest(close, pd)))*100

sDev = mult * stdev(wvf, bbl)
midLine = sma(wvf, bbl)
lowerBand = midLine - sDev
upperBand = midLine + sDev

rangeHigh = (highest(wvf, lb)) * ph
rangeLow = (lowest(wvf, lb)) * pl

// WVF > Upperband or WVF > rangeHigh => This is the bottom of the market
// Only Long, no Short here.
col = wvf >= upperBand or wvf >= rangeHigh ? lime : gray


plot(hp and rangeHigh ? rangeHigh : na, title="Range High Percentile", style=line, linewidth=4, color=orange)
plot(hp and rangeLow ? rangeLow : na, title="Range High Percentile", style=line, linewidth=4, color=orange)
plot(wvf, title="Williams Vix Fix", style=histogram, linewidth = 4, color=col)
plot(sd and upperBand ? upperBand : na, title="Upper Band", style=line, linewidth = 3, color=aqua)