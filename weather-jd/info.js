// 天气现象的编码
var WEATHERCODE = {
    '00': '晴',
    '01': '多云',
    '02': '阴',
    '03': '阵雨',
    '04': '雷阵雨',
    '05': '雷阵雨伴有冰雹',
    '06': '雨夹雪',
    '07': '小雨',
    '08': '中雨',
    '09': '大雨',
    '10': '暴雨',
    '11': '大暴雨',
    '12': '特大暴雨',
    '13': '阵雪',
    '14': '小雪',
    '15': '中雪',
    '16': '大雪',
    '17': '暴雪',
    '18': '雾',
    '19': '冻雨',
    '20': '沙尘暴',
    '21': '小到中雨',
    '22': '中到大雨',
    '23': '大到暴雨',
    '24': '暴雨到大暴雨',
    '25': '大暴雨到特大暴雨',
    '26': '小到中雪',
    '27': '中到大雪',
    '28': '大到暴雪',
    '29': '浮尘',
    '30': '扬沙',
    '31': '强沙尘暴',
    '53': '霾',
    '99': '无',
    '32': '浓雾',
    '49': '强浓雾',
    '54': '中度霾',
    '55': '重度霾',
    '56': '严重霾',
    '57': '大雾',
    '58': '特强浓雾',
    '97': '雨',
    '98': '雪'
}
// 风向编码
var WINDCODE = {
    '00': '无持续风向',
    '01': '东北风',
    '02': '东风',
    '03': '东南风',
    '04': '南风',
    '05': '西南风',
    '06': '西风',
    '07': '西北风',
    '08': '北风',
    '09': '旋转风'
};

(function (window) {
    var p = [116.33, 39.95]
    var baseUrl = 'https://www.chenjinxinlove.com'
    var appkey = '28368882e7af97daf9b91f0dd279a5d5'

    function info() {

    }
    info.prototype.init = function () {
        this.getInfoData(p)
    }
    // 根据经纬读取 国内1*1公里3天逐小时格点预报
    info.prototype.getForecast_3d_1h = function (position) {
        let lat = position[1]
        let lng = position[0]
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}/tianyi/grid_rmi_forecast_3d_1h`, {
                    params: {
                        lat,
                        lng,
                        serialNo: '1000511',
                        appkey: appkey
                    }
                })
                .then(function (response) {
                    let res = response.data.result.n1h[`${Math.round(lat*100)/100}_${Math.round(lng*100)/100}`]
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
        })
    }
    // 根据经纬读取 格点实况
    info.prototype.getWeatherSK = function (position) {
        let lat = position[1]
        let lng = position[0]
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}/tianyi/grid_rmi_observe`, {
                    params: {
                        lat,
                        lng,
                        serialNo: '1000513',
                        appkey: appkey
                    }
                })
                .then(function (response) {
                    let res = response.data.result.obs1h[`${Math.round(lat*100)/100}_${Math.round(lng*100)/100}`]
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
        })
    }
    // 根据经纬读取 分钟级降雨
    info.prototype.getRainNew = function (position) {
        let lat = position[1]
        let lon = position[0]
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}/tianyi/webgis_rain_new`, {
                    params: {
                        lat,
                        lon,
                        serialNo: '1000512',
                        appkey: appkey
                    }
                })
                .then(function (response) {
                    let res = response.data
                    resolve(res);
                })
                .catch(function (error) {
                    reject(error);
                });
        })
    }
    // 获取所有的页面需要的数据
    info.prototype.getInfoData = function (position) {
        var self = this;
        Promise.all([this.getForecast_3d_1h(position), this.getWeatherSK(position), this.getRainNew(position)])
            .then((result) => {
                self.renderCurrentRain(result[1][0], result[2])
                self.renderForecastHour(result[0])
            }).catch((error) => {
                throw (error)
            })
    }
    // 渲染地址和提示内容
    info.prototype.renderHintAddr = function () {

    }
    /**
     * 渲染实况和分钟级降雨内容
     *  
     *  天气实况字段
        TEM: "18", 温度  C
        RHU: "35",   相对湿度  %
        PRE1h: "0.0",   降水量
        PRE10m: "0.0",   降水量
        WINS: "1",   风力  级
        WIND: "04",  风向  code
        WEATHER: "02",   天气现象
        PRS: "1011",  气压
        VIS: "6.50",   能见度
        reftime: "201903051510"
     *
        分钟级降雨字段
        msg: 提示音
        values: 雨量值
        times: 时间
     */
    info.prototype.renderCurrentRain = function (sk, rain) {
        var renderTel = '<h1>' +
            '<span>' + sk['TEM'] + '</span>' +
            '<b>°</b>' +
            '<em>' + WEATHERCODE[sk['WEATHER']] + '</em>' +
            '</h1>' +
            '<h2>' +
            '<span class="rain">降雨: ' + rain['msg'] + '</span>' +
            '</h2>' +
            '<h2>' +
            '<span class="njd iconli"> 能见度 ' + sk['VIS'] + 'km</span>' +
            '</h2>' +
            '<h2>' +
            '<span class="flfx iconli">' + WINDCODE[sk['WIND']] + ' ' + sk['WINS'] + '级</span>' +
            '<span class="xdsd iconli">相对湿度 ' + sk['RHU'] + '%</span>' +
            '</h2>'
        $('.n_wd').html(renderTel)
    }
    // 渲染逐小时内容
    info.prototype.renderForecastHour = function (data) {
        function renderSlideTel(item) {
            return '<div class="swiper-slide" style="background:none;">' +
                '<div class="timeLi">' + item.reftime.slice(8, 10) + '时</div>' +
                '<i class="svnicon housr_icons d' + item.WEATHER + '"></i>' +
                '<div class="tempLi">' + item.TEM + '°</div>'+
            '</div>'
        }
        var strTel = ''
        for (var i = 0; i < 24; i++) {
            strTel += renderSlideTel(data[i])
        }
        $('.swiper-wrapper').html(strTel)
        this.initSwiper()
    }
    // 初始化滑动列表
    info.prototype.initSwiper = function () {
        var zeroDateIndex = new Array();
        $(".timeLi").each(function (i, c) {
            if ($(this).text().substring(0, 2) == "00") {
                zeroDateIndex.push(i - 1);
            }
        })
        var swiper = new Swiper('#hours72 .swiper-containerLi', {
            pagination: '#hours72 .swiper-containerLi .swiper-paginationLi',
            slidesPerView: 6.5,
            spaceBetween: 0,
            initialSlide: 0,
            freeMode: true,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            onSlideChangeStart: function (swiper) {
                if (swiper.activeIndex > zeroDateIndex[0]) {
                    $(".tianqicontDiv").find('li').removeClass('activeLi');
                    $(".tianqicontDiv").find('li').eq(2).addClass('activeLi');
                } else {
                    $(".tianqicontDiv").find('li').removeClass('activeLi');
                    $(".tianqicontDiv").find('li').eq(1).addClass('activeLi');
                }
            },
            onSlideChangeEnd: function (swiper) {
                if (swiper.activeIndex > zeroDateIndex[0]) {
                    $(".tianqicontDiv").find('li').removeClass('activeLi');
                    $(".tianqicontDiv").find('li').eq(2).addClass('activeLi');
                } else {
                    $(".tianqicontDiv").find('li').removeClass('activeLi');
                    $(".tianqicontDiv").find('li').eq(1).addClass('activeLi');
                }
            }
        })
    }
    window.Info = new info();
})(window)

window.Info.init()