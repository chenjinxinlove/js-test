
const p = [39.95, 116.33]
const baseUrl = 'https://www.chenjinxinlove.com'
const appkey = '28368882e7af97daf9b91f0dd279a5d5'

(function() {
    init()
    function init() {
        getInfoData(p)
    }
    // 根据经纬读取 国内1*1公里3天逐小时格点预报
    function getForecast_3d_1h (position) {
        let lat = position[1]
        let lng = position[0]
        return new Promise((resolve,reject)=>{
            axios.get(`${baseUrl}/tianyi/grid_rmi_forecast_3d_1h`, {
                params: {
                    lat,
                    lng,
                    serialNo: '1000511',
                    appkey: appkey
                }
            })
            .then(function (response) {
                let res = response.data.result.obs1h[`${Math.round(lat*100)/100}_${Math.round(lng*100)/100}`][0].WEATHER
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    }
    // 根据经纬读取 格点实况
    function getWeatherSK (position) {
        let lat = position[1]
        let lng = position[0]
        return new Promise((resolve,reject)=>{
            axios.get(`${baseUrl}/tianyi/grid_rmi_observe`, {
                params: {
                    lat,
                    lng,
                    serialNo: '1000513',
                    appkey: appkey
                }
            })
            .then(function (response) {
                let res = response.data.result.obs1h[`${Math.round(lat*100)/100}_${Math.round(lng*100)/100}`][0].WEATHER
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    }
    // 根据经纬读取 分钟级降雨
    function getRainNew(position) {
        let lat = position[1]
        let lng = position[0]
        return new Promise((resolve,reject)=>{
            axios.get(`${baseUrl}/tianyi/webgis_rain_new`, {
                params: {
                    lat,
                    lng,
                    serialNo: '1000512',
                    appkey: appkey
                }
            })
            .then(function (response) {
                let res = response.data.result.obs1h[`${Math.round(lat*100)/100}_${Math.round(lng*100)/100}`][0].WEATHER
                resolve(res);
            })
            .catch(function (error) {
                reject(error);
            });
        })
    }
    // 获取所有的页面需要的数据
    function getInfoData(position) {
        Promise.all([getForecast_3d_1h(position), getWeatherSK(position), getRainNew(position)])
            .then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error)
            })
    }
    // 渲染地址和提示内容
    function renderHintAddr() {
        
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
        VIS: "6.50",
        reftime: "201903051510"
     *
        分钟级降雨字段
        msg: 提示音
        values: 雨量值
        times: 时间
     */
    function renderCurrentRain() {

    }
    // 渲染逐小时内容
    function renderForecastHour() {

    }
})