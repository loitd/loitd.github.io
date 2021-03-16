---
layout: post
category: trading
tags: trading, book
title: How to squeeze trading?
---

## Mục đích squeeze
Chúng ta đang không nói về việc overbought hay oversold, điều đó thực sự không mang lại nhiều ý nghĩa lắm, khi overbought cũng chẳng thể chắc để sell và ngược lại. Chúng ta đang nói về tình trạng của thị trường: 
- Thị trường đang neutral
- Thị trường không neutral
    - TT đang góp năng lượng
    - TT đang xả năng lượng
    - TT đã can năng lượng

Xác định được điều này đưa đến cho chúng ta 2 điểm:
- Xác định phân bố dòng tiền như thế nào?
- Xác định chiến thuật tối ưu hóa dòng tiền hiện tại

Tóm lại là dựa vào trạng thái của thị trường, xác định được chiến thuật cho tối ưu và squeeze là một công cụ xác định trạng thái thị trường rất tốt.

## Timeframes
Squeeze có thể sử dụng ở mọi khung thời gian nhưng tốt hơn cả là ở các khung thời gian lớn. Đối với daytrader, khung thời gian phổ biến là 5 phút. Tuy vậy không phải cứ nhìn chằm chằm khung 5 phút mà cần xem xét cả các khung lớn hơn. Nếu như khung tuần, khung ngày đang trong quá trình squeeze giảm thì không có lý do gì lại theo khung 5 phút tăng để chống lại việc giảm trên -> trend is a friend.

## Swing trader
Nếu chiến thuật của bạn là day trader thì cần hiểu rằng có nhiều điểm bùng nổ vào thời điểm ban đêm và swing trader thu được rất nhiều lợi nhuận. So với daytrader thì swingtrader tại mỗi thời điểm bùng nổ có thể đạt tới lãi suất nhiều tuần của daytrader.

Điểm trừ là swing trader đòi hỏi điểm vào lệnh tốt, tâm lý vững vàng. Cuốn sách không thể thiếu của swing trader là "How I made 2 million dollars in the stock market" viết bởi Nicolas Darvas. Cuốn sách viết từ vài thập kỷ trước nhưng vẫn rất hữu dụng.

Một điểm quan trọng nữa là position size. Nếu 1 swing trader không ngủ được vì lo cho 1 lệnh swing thì có nghĩa là swing position size anh ấy đặt đã quá lớn so với bản thân anh ấy và cần điều chỉnh lại.

## Volatility
Khi bạn trông lũ trẻ ở nhà, nếu chúng ồn ào, gây tiếng động chứng tỏ chúng vẫn bình thường. Ngược lại, nếu chúng im lặng, im lặng đến mức ngạc nhiên là có vấn đề gì lớn sắp xảy ra. Thị trường cũng tương tự như vậy và squeeze cho bạn ưu thế trong khoảng im lặng của thị trường. Khi này năng lượng đang được tích lũy và có thể sắp giải phóng. Khoảng im lặng này được gọi là low volatility.

Theo chỉ báo bollinger thì trạng thái low Volatility là trạng thái mà các đương bollinger bands ở rất gần nhau, co lại so với bình thường, nó giống như là bọ trẻ đang ngồi 1 góc nào đó và im lặng. Không sớm thì muộn thị trường sẽ bùng nổ. Vấn đề là khi nào thì bùng nổ? Và đó là lý do mà kênh Keltner và 1 momentum index oscillator được thêm vào!

Giải thích thêm 1 chút về các chỉ số kỹ thuật ở đây:  
- Bollinger Bands: là đường chứa độ lệch chuẩn (standard deviation level) trên và dưới 1 đường trung bình (moving average). Độ rộng của dải BB sẽ tương ứng với các trạng thái volatility của thị trường. BB càng hẹp thị trường càng low volatility (sideway).
- Keltner Channels: là đường hình thành dựa trên đường trung bình động tiêu chuẩn (standard moving average). So với BB thì KC thường biến động chậm hơn (steady).
- Momentum Index oscillator: dùng để đo đạc hướng đi, tốc độ và điểm quay đầu (direction, velocity and turning points). Trong phương pháp này tôi đặt Momentum 12.

Tóm lại: để setup được phương pháp này, cần 3 chỉ số đã nêu. Khoảng lặng của thị trường (sideway, low volatility) mà tôi tìm kiếm được xác định khi BB nằm trong KC. Điều đó cho thấy thị trường đang trong thời kỳ im lặng chờ đợi bùng nổ. Tín hiệu trade xuất hiện khi mà BB phá vỡ KC. Khi có tín hiệu xuất hiện rồi thì tôi sẽ dùng 1 oscillator Momentum index chu kỳ 12 để xác định lên long hay short. Khi này nếu oscillator > 0 tại thời điểm phá vỡ của BB => tôi sẽ long. ngược lại nếu oscillator < 0, tôi sẽ short. 

Tôi sử dụng các tham số mặc định cho các công cụ này, 20 & 1.5 cho KC và 20 & 2 cho BB. Chúng ta cũng cần tunned để cho indicator này trở nên dễ đọc hơn.

## Làm sao để vào đúng lúc
Tôi sử dụng squeeze cho cả day trading và swing trading. Time frame càng nhỏ thì xác suất có tín hiệu trade càng nhiều. Trên đồ thị 2 phút, biểu đồ có thể xuất hiện 3-5 lần/ngày trong khi trên biểu đồ ngày có thể xuất hiện tín hiệu từ 6-7 lần/năm. Có những thời điểm thị trường ảm đạm, do đó tôi phải đa dạng hóa danh mục của mình. Tôi dành phần lớn thời gian tập trung vào S&P và DOW tuy nhiên cũng không ngoại trừ forex, gold, oil, ...

Bù lại, trên biểu đồ 2 phút, đường squeeze chỉ có thể đưa thị trường đi 10-20 điểm YM tương đương 377 tick chart. Trên biểu đồ 15 phút, đường squeeze có thể đưa thị trường đi 30-50 điểm. Trên biểu đồ ngày, số điểm có thể lên đến vài trăm điểm.

Ghi nhớ 1 điều, trong 1 ngày, cơ hội xuất hiện không nhiều. Nếu thấy cơ hội xuất hiện nhiều chắc chắn không đúng. Miếng format miễn phí chỉ có trong cái bẫy chuột.

## Các setups tôi dùng
Nói đến các setups có nghĩa là mong chờ có nhiều hơn 1 setup.
### Setup 1
![squeeze-setup-01]({{ site.baseurl }}/images/20210315/squeeze-setup-01.png)
- Thiết lập biểu đồ 24h để các tín hiện qua đêm cũng được đưa vào. Đối với intraday, cài biểu đồ 5 phút. Biểu đồ 1 phút và 2 phút sẽ tốt cho scalping tuy nhiên tín hiệu không được mạnh như 5 phút.
- Sử dụng các chỉ báo KC 20 1.5, BB 20 2.0, Momentum 12 close hoặc chỉ 1 indi Squeeze đã được tổng hợp 3 công cụ trên của LazyBear theo cấu hình mặc định.
- Chỉ báo mũi tên màu đen gọi là heads-up là chỉ bảo cho biết BB đang nằm trong KC và thị trường đang sideway.
- Chỉ báo tương tự nhưng màu xám xuất hiện ngay sau 1 series của màu đen là 1 chỉ báo cho biết BB đang nằm ngoài KC.
- Khi mũi tên xám đầu tiên xuất hiện, nếu **histogram** > 0 => go long và ngược lại nếu **histogram** < 0 tôi sẽ go short. Cho dù không phổ biến lắm nhưng vẫn có trường hợp khi xuất hiện gray thì momentum vẫn ở dưới 0 (dù có tăng dần), tín hiệu này cũng cấu thành được 1 lệnh long.
- Kể cả khi chỉ xuất hiện 1 mũi tên đen, tôi vẫn coi đó là điểm vào lệnh như bình thường. Không yêu cầu phải có cả dãy điểm đen tôi mới vào lệnh.
- Trong các trường hợp tôi đều không dùng limit order mà dùng market order. Nói cách khác, khi có tín hiệu là tôi vào lệnh chứ không đợi giá để vào lệnh. Limit order là hình thức chỉ vào lệnh khi giá thỏa mãn điều kiện.
- Đối với daytrader, thực hiện quản lý tiền như sau:
    - Xác định stop bằng ATR14 * 2. Tôi nghĩ có thể dùng KC 14 2 để cho dễ nhìn.
    - Nếu vào lệnh tại 1104 trong khi daily pivot là 1101.75 -> stop sẽ dưới pivot 1 chút là 1101.50 (tức là 2.5 thay cho 2.0) -> xem xét daily pivot
    - Các stop phổ biến tôi thường dùng:
        - YM: 20 điểm
        - ES: 2 điểm
        - NQ: 4 điểm
        - TF: 1.5 điểm (points)
        - EC: 20 ticks
        - EURUSD: 20 pips
        - US: 7 ticks
        - Gold: 1.50
        - Stocks: 50 cents
- Đối với swingtrader và position traders, sử dụng biểu đồ daily khung thời gian lớn, vẫn sử dụng ATR14 trên chart daily. Đối với khung thời gian này range biến đổi có thể thay đổi rất mạnh, tăng hoặc giảm, do đó không có lý do gì để có thể thực hiện catch 1 bigger move chỉ với 2 points stop như với intraday được (nếu làm được ai cũng làm). Lưu ý là pivot lúc này không còn phù hợp đối với swing trade do đó không áp dụng pivot như phần trên. Sau đây là các stop tôi dùng với swing: 
    - YM: 150 points
    - ES: 15 points
    - NQ: 25 points
    - TF: 8 points
    - EC: 100 ticks
    - EURUSD: 100 pips
    - US: 35 ticks
    - Gold: 20.0
    - Stocks: $2.5
- Tôi đặt target hoàn toàn dựa theo momentum. Khi tín hiệu momentum yếu đi tôi sẽ thoát lệnh, không có 1 target cụ thể. Tín hiệu yếu dần đi được hiểu là khi **histogram** vẫn cho tín hiệu thuận, vd: tôi đang short, histogram vẫn đang giảm dần và thanh sau lớn hơn thanh trước. Đến khi histogram có thanh đầu tiên ngắn hơn thanh trước, tôi sẽ thoát lệnh.
- Tôi không sử dụng trail stops.

Vẫn ví dụ trên, sau đây sẽ có thêm chỉ báo ATR
![squeeze-setup-01-with-atr]({{ site.baseurl }}/images/20210315/squeeze-setup-01-1.png)

## Sai lầm lớn nhất mà new traders gặp phải là gì?
Vấn đề đầu tiên cần nói là *nhập tiệc muộn*: khi 1 trader vào xem chart và bỗng thấy AAPL đang up 5 điểm và anh ta cố gắng vớt theo bằng cách mua thêm AAPL. Một khi đã nhập tiệc muộn thì bạn chỉ còn xương để ăn. Hành động trên được gọi là cố đuổi theo thị trường, cũng giống như chó con đuổi theo xe ô tô, không sớm thì muộn, cũng sẽ kiệt sức. Thời điểm bạn vào thị trường thì đa phần các trader khác đã sắp thoát lệnh. Họ đã ăn xong bữa tiệc.

Tôi thích đánh lén khi thị trường vẫn đang ở giai đoạn *im lặng* trước khi mọi người biết điều gì đang diễn ra và squeeze giúp tôi biết chính xác trạng thái của thị trường. Tôi không quá rắc rối với lệnh trade của mình. Khi động lực (momentum) của thị trường giảm, tôi lập tức out.

Nhiều daytrader thực sự đắn đo khi đặt các lệnh swing. Họ lo sợ sẽ có 1 vụ 11/9 và thị trường lao dốc không phanh lần nữa. Theo kinh nghiệm của tôi, sau vụ 11/9, 1 trong số các biện pháp của các chính phủ là kiểm soát và theo dõi toàn bộ các lệnh của thị trường. Nếu xuất hiện các lệnh bán tháo cổ phiếu của ngay cả các hàng hàng không, các hãng bảo hiểm lớn rất nhiều người sẽ bị điều tra.

Có thể trở lại biểu đồ của các cuộc đại suy thoái hoặc các thảm họa tấn công kiểu 11/9 hay sóng thần và áp dụng phương pháp trên ta vẫn thấy không có vấn đề gì do ta không đi ngược hướng thị trường.

## Phương pháp trade nào tốt nhất cho người vẫn đi làm việc
Bạn không phải là trader chuyên nghiệp và không trading for a living, thì theo anh John, squeeze trên biểu đồ daily hoặc weekly là phương án tốt nhất. Các loại cổ phiếu lựa chọn cũng không cần chọn nhiều mà cứ theo danh sách IBD50 là xong. Tại sao lại như vậy?

Đơn giản là các kiểu giao dịch này không cần quản lý, theo dõi trong ngày. Ngay cả tôi là trader chuyên nghiệp theo dõi thị trường cả ngày nhưng tôi cũng không theo dõi swing trade trong ngày, vì không cần thiết phải như thế. Thậm chí việc không liên tục theo dõi lại là điểm tốt do tôi không phải táy máy đến các giao dịch của mình. Khi ngồi không và táy máy vào các giao dịch sẽ có rất nhiều hiệu ứng tâm lý đã nói trong chương 2 xuất hiện.

Tóm lại, nếu bạn trade là phụ, đặt lệnh, cấu hình chuẩn tham số, đi làm và sau đó thỉnh thoảng login vào để xem tình hình. Cách giao dịch này thực sự ổn.

Một ưu điểm khác của swing trade là các tín hiệu fake hay các squeeze làm việc không hiệu quả rất ít xuất hiện ở các khung thời gian lớn. Các tín hiệu ở khung 5 phút hoặc nhỏ hơn thường không mạnh và có thể sinh ra nhiều squeeze giả.

## Cách để lọc bỏ bớt các squeeze lỗi
Có nhiều squeeze kém hiệu quả hoặc thậm chí là không hiệu quả. Thông thường ít khi xuất hiện trên các đồ thị tuần hoặc tháng và ngược lại khá phổ biến trên các biểu đồ intraday như 5 phút, 39 phút. Vậy thì có cách nào để lọc bớt các tín hiệu fake/lỗi này?

Như tôi đã có lần nói trong phần trước, vấn đề mấu chốt là ta cần phải check cả các khung thời gian lớn hơn nữa kể cả khi không có plan trade trên các khung thời gian đó. Việc chống lại trend trên các khung lớn hơn là điều hoàn toàn vô nghĩa.

![squeeze-setup-02]({{ site.baseurl }}/images/20210315/squeeze-setup-01-2.png)

Giả sử tại khung hourly chỉ số S&P đang giảm tuy nhiên tại week chart, chỉ số này lại đang tăng và tại khung hourly xuất hiện các chỉ dấu cho việc short tại squeeze. Như trong phần trên đã bàn, hãy bỏ qua các tín hiệu này và chỉ chấp nhận các tín hiệu có cùng trend với khung weekly. Như hình trên là bỏ tín hiệu 1, nhận tín hiệu 2 và 3.

# RTM - Reverting back to the mean
## ATR hay câu hỏi Khi nào thị thị trường hết động lực?
Pivots thì khá là ổn cho thị trường intraday, tuy nhiên với các khung thời gian lớn hơn như daily hoặc weekly thì phải làm thế nào? Cần hiểu 1 việc là nếu xác định khung trade là 1 giờ hay 1 phút thì các chỉ báo cũng sẽ hỗ trợ cho bạn *an toàn* khi cầm trade trong 1 giờ/1 phút đã nêu. Pivot chỉ phù hợp cho các khung thời gian intraday mà không phù hợp cho các khung dài hơn.

Khi này khái niệm về *giá trung bình* được đưa ra, khái niệm này không khó, câu hỏi đặt ra là "Giá sẽ được đẩy ra xa bao nhiêu so với giá trung bình trước khi bị kéo trở lại (với giá trung bình)? Để trả lời câu hỏi này ATR ra đời. ATR - Average True Range - Phạm vi trung bình thực thông thường được setup ở khung 14. Vậy ATR cụ thể là gì?

![squeeze-setup-02-ATR]({{ site.baseurl }}/images/20210315/squeeze-setup-01-3.png)

Xem xét trên hình trên ta thấy, tại vùng xung quanh điểm 1, ATR có giá trị khoảng 20 có nghĩa là khi vàng có giá trị lệch (tăng hoặc giảm) khỏi mean zone (là zone tạo bởi đường EMA13 và EMA21 - vùng giá trung bình) khoảng 20$/lượng thì lại quay về vùng giá trung bình. Tương tự với vùng 3 ta thấy ATR lên tới 60$ như vậy giá đã có những thời điểm lệch đến 60$/lượng trước khi bị kéo về giá trung bình. 

## Kênh Keltner
Từ khái niệm về ATR trên ta đi đến khái niệm về Keltner Channel, KC hay kênh Keltner. Ta sẽ set tham số của KC là 13 và 1.5 có nghĩa là đường giá trung bình sẽ là 13 (đường chính giữa) còn 2 dải xung quanh sẽ bằng ATR tại thời điểm đó * 1.5 lần. Cũng có nghĩa là, tại 1 thời điểm bất kỳ, dải trên và dưới có giá trị gấp 1.5 lần ATR. Để dễ hình dung hãy xem ví dụ:

![squeeze-setup-02-KC]({{ site.baseurl }}/images/20210315/squeeze-setup-01-4.png)

Tại điểm 1 ta có ATR = 0.0100 tương đương với 100 ticks => điểm 2 và điểm 3 phải cách đường giữa 100*1.5 = 150 ticks. Tại sao lại gấp 1.5 lần? Lý do là KC là 1 chỉ báo có lag, do đó người thiết lập mong muốn nới room cho giá di chuyển qua đó KC sẽ bao quát hơn.

Nói cách khác, KC là 1 hình thức thể hiện của ATR trên đồ thị với 1 số biến đổi (như gấp 1.5 lần). Qua việc ứng dụng ATR có thể trở thành các điểm Resistant/Support mềm trên đồ thị với độ chính xác khá tương đối. Đối với cách ứng dụng KC, tôi (John) cũng sử dụng stop loss ngay ngoài đường biên của KC để tránh các thiệt hại đáng kể (tất nhiên lệnh nào cũng phải có stop). Ta có thể thấy điều này rất rõ trong phần squeeze khi John nói rằng, về cơ bản, lấy ATR *2 là stop loss.

# Lướt sóng chuẩn (catching the wave)
## Tại sao việc hiểu nguyên lý của anchor charts là cốt tử
Tôi đã quan sát squeeze trong 1 thời gian dài và không dùng thêm một bộ lọc cứng nào, tôi cảm thấy khá hài lòng với tỷ lệ P/L của squeeze dù rằng tất nhiên không phải mọi signal đều thành profit. Tôi phát hiện ra 1 số vấn đề như đối với các biểu đồ intraday, rõ ràng squeeze không ổn định (consistent) nhưng mà sự không ổn định ấy xảy ra không ngẫu nhiên mà thường theo quy luật như sau 1 block of trades (khoảng 2-3 trades) thì mới xuất hiện 1 signal thực sự tốt (có profit). Vậy phương án nào có thể xác định chính xác mẫu số này? Câu trả lời là anchor chart.

Anchor chart là tiến trình mà ta thực hiện tham chiếu ở khung thời gian lớn hơn trước khi chính thức trade ở khung thời gian nhỏ hơn.

Ví dụ: tôi đang dùng hourly chart làm anchor chart, nếu tại khung anchor này đang có bearish trend và mọi thứ đang đi xuống, tôi sẽ không tham gia long ở khung thời gian 5 phút dù có squeeze hay không.

## Lướt sóng chuẩn
Anh Rodney có đưa ra 3 loại sóng:
- Sóng ngắn hạn: A Wave - đo trong khoảng 6 cây nến
- Sóng trung hạn: B Wave - đo trong khoảng 15 cây nến
- Sóng dài hạn: C Wave - đo trong khoảng 30 cây nến

Có 1 điểm tôi nhận ra, nếu như các chấm đen đầu tiên xuất hiện mà các waves đang ở trên mức 0 hoặc kể cả dưới mức 0 mà có trend tăng thì 90% khả năng là squeeze này sẽ theo lệnh long và ngược lại. Lưu ý là cả 3 sóng A, B và C đều phải chung trending tăng. Xem ví dụ sau:

![squeeze-setup-waves]({{ site.baseurl }}/images/20210315/squeeze-setup-01-5.png)
