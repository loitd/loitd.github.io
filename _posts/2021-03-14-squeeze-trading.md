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
- Sử dụng các chỉ báo KC 20 1.5, BB 20 2.0, Momentum 12 close, Squeeze của LazyBear theo cấu hình mặc định.
- Chỉ báo mũi tên màu đen gọi là heads-up là chỉ bảo cho biết BB đang nằm trong KC và thị trường đang sideway.
- Chỉ báo tương tự nhưng màu xám xuất hiện ngay sau 1 series của màu đen là 1 chỉ báo cho biết BB đang nằm ngoài KC.
- Khi mũi tên xám đầu tiên xuất hiện, nếu histogram > 0 => go long. Cho dù không phổ biến lắm nhưng vẫn có trường hợp khi xuất hiện gray thì momentum vẫn ở dưới 0 (dù có tăng dần), tín hiệu này cũng cấu thành được 1 lệnh long. Ngược lại, nếu
- Trong các trường hợp tôi đều không dùng limit order mà dùng market order. Nói cách khác, khi có tín hiệu là tôi vào lệnh chứ không đợi giá để vào lệnh. Limit order là hình thức chỉ vào lệnh khi giá thỏa mãn điều kiện.
- Đối với daytrader, thực hiện quản lý tiền như sau:
    - Xác định stop bằng cách sử dụng ATR14 sau đó gấp đôi giá trị hiện thời để làm stop.
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
- Đối với swingtrader và position traders, sử dụng biểu đồ daily khung thời gian lớn, vẫn sử dụng ATR14 trên chart daily. Đối với khung thời gian này range biến đổi có thể thay đổi rất mạng, tăng hoặc giảm, do đó không có lý do gì để có thể thực hiện catch 1 bigger move chỉ với 2 points stop như với intraday được (nếu làm được ai cũng làm). Sau đây là các stop tôi dùng với swing: 
    - YM: 150 points
    - ES: 15 points
    - NQ: 25 points
    - TF: 8 points
    - EC: 100 ticks
    - EURUSD: 100 pips
    - US: 35 ticks
    - Gold: 20.0
    - Stocks: $2.5
- Tôi đặt target hoàn toàn dựa theo momentum. Khi tín hiệu momentum yếu đi tôi sẽ thoát lệnh, không có 1 target cụ thể.
- Tôi không sử dụng trail stops.


