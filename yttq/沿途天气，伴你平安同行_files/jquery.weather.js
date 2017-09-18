// 天气页面
// 获取基本信息
var start = base.linkPar('start'),
    end = base.linkPar('end'),
    date = unescape(base.linkPar('date')),
    dateReg = /^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}\s{1}\d{2}\:{1}\d{2}$/,
    starts = base.linkPar('starts'),
    ends = base.linkPar('ends'),
    $back = $('.back'),
    $arrivalTime = $('#arrival-time'),
    $weatherForecast = $('#weather-forecast'),
    $city = $('#city'),
    $cityName = $('#city-name'),
    $weatherMore = $('#weather-more'),
    $loadingWrap = $('#loading-wrap'),
    $route = $('#route'),
    $routeDetails = $('#route-details'),
    $showDetails = $('.show-details'),
    $mapTips = $('.map-tips'),
    wCallback = null,
    getCityAll = 0,
    weatherArr = [['00','晴'],['01','多云'],['02','阴'],['03','阵雨'],['04','雷阵雨'],['05','雷阵雨伴有冰雹'],['06','雨夹雪'],['07','小雨'],['08','中雨'],['09','大雨'],['10','暴雨'],['11','大暴雨'],['12','特大暴雨'],['13','阵雪'],['14','小雪'],['15','中雪'],['16','大雪'],['17','暴雪'],['18','雾'],['19','冻雨'],['20','沙尘暴'],['21','小到中雨'],['22','中到大雨'],['23','大到暴雨'],['24','暴雨到特大暴雨'],['25','大暴雨到特大暴雨'],['26','小到中雪'],['27','中到大雪'],['28','大到暴雪'],['29','浮尘'],['30','扬沙'],['31','强沙尘暴'],['32','浓雾'],['49','强浓雾'],['53','霾'],['54','中度霾'],['55','重度霾'],['56','严重霾'],['57','大雾'],['58','特强浓雾'],['99','无'],['301','雨'],['302','雪'],['冰雹','冰雹'],['雾2','雾2'],['雾3','雾3']],
    windArr = {
      direction:[['0','无持续风向'],['1','东北风'],['2','东风'],['3','东南风'],['4','南风'],['5','西南风'],['6','西风'],['7','西北风'],['8','北风'],['9','旋转风']],
      intensity:[['0','微风'],['1','3-4级'],['2','4-5级'],['3','5-6级'],['4','6-7级'],['5','7-8级'],['6','8-9级'],['7','9-10级'],['8','10-11级'],['9','11-12级']]
    };
if(!start||!end||!dateReg.test(date)){
  location.href = 'index.html';  
};
var dateArr = date.split(' '),
    dateArr2 = [dateArr[0].split('.'),dateArr[1].split(':')],
    departTime = new Date(dateArr2[0][0],dateArr2[0][1]-1,dateArr2[0][2],dateArr2[1][0],dateArr2[1][1]),
    arrivalTime;
//事件
$('.header h3').html(dateArr2[0][1]+'/'+dateArr2[0][2]+'&nbsp;'+decodeURI(starts)+'&nbsp;-&nbsp;'+decodeURI(ends));
$('.share-wrap').html('<div class="share-mask"></div><div class="bdsharebuttonbox share-box"><a title="分享到新浪微博" href="#" class="bds_tsina" data-cmd="tsina"></a><a title="分享到QQ空间" href="#" class="bds_qzone" data-cmd="qzone"></a><a title="分享到QQ好友" href="#" class="bds_sqq" data-cmd="sqq"></a><a title="分享到腾讯微博" href="#" class="bds_tqq" data-cmd="tqq"></a><a title="分享到微信" href="#" class="bds_weixin" data-cmd="weixin"></a><span class="bds-a">微博</span><span class="bds-b">QQ朋友圈</span><span class="bds-c">QQ</span></div>');
base.snsShare(base.date('M月D日',departTime)+starts+'到'+ends+'的沿途天气','http://i.weather.com.cn/images/mobile/mtqtj/2016/04/22/30217108BDCB3C07289D3A6461539E65.jpg',location.href);
$('.show-sns').tap(function(){
  $('.share-wrap').addClass('share-show').removeClass('share-hide');
  return false;
});
//天气符号提示
var hideMapTips = function(){
  if($mapTips.is(':visible')){
    setTimeout(function(){
      $('.map-tips').hide();
    },3000);   
  };
};
if(!base.cookie('weatherMapTips')){
  base.cookie('weatherMapTips',1,{e:365});
  $mapTips.show();
  $('body>div:not(".loading-wrap")').tap(function(){
    $mapTips.hide();  
  });
};
$('.share-mask').tap(function(){
  $('.share-wrap').addClass('share-hide').removeClass('share-show');
  return false;
});
$back.attr('href','index.html?starts='+starts+'&ends='+ends+'&start='+start+'&end='+end+'&date='+date+'&_cmpt');
$showDetails.tap(function(){
  var $this = $showDetails,
      flag = $this.data('show'),
      wH = $(window).height(),
      rH = $route.innerHeight(),
      rhH = $('.route-header').height();
  if(flag==1){
    $this.data('show',false);
    $route.animate({top:wH-rH},500,function(){
      $('.route-header').hide();
      $route.css({'top':'auto','bottom':0})
      $('html,body').css('overflow','hidden');
      $('.wrap').show();
      $this.data('show',2).html('详情');
    });
    $routeDetails.animate({top:wH-rH},500,function(){
      $routeDetails.hide();
    });  
  }else if(flag==2){
    $this.data('show',false);
    $route.css({'top':wH-rH,'bottom':'auto'}).animate({top:rhH},300,function(){
      $('.route-header').show();
      $('html,body').css('overflow','auto');
      $('.wrap').hide(); 
      $this.data('show',1).html('收起'); 
    });
    $routeDetails.show().css('top',wH).animate({top:rH},300); 
  };
});
$('.route-back').tap(function(){
  $showDetails.tap();
});
// 百度地图API功能
var map = new BMap.Map("allmap",{minZoom:5,maxZoom:10,enableMapClick:false}),
    driving,
    routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];//三种驾车策略：最少时间，最短距离，避开高速
map.centerAndZoom(new BMap.Point(116.404,39.915),5);
var myGeo = new BMap.Geocoder();
//路线切换
var $routeSwiper = $('#route-swiper'),
    routeSwiper = $routeSwiper.swiper({
  pagination:'.swiper-pagination',
  paginationClickable:true,
  paginationBulletRender:function(index,className){
    var txt = index==0?'最少时间':index==1?'最短距离':'避开高速';
    return '<span class="'+className+' swiper-pagination-bullet-'+index+'">'+txt+'<i></i></span>';
  },
  onInit:function(swiper){
    map.clearOverlays(); 
    mapSearch(routePolicy[swiper.activeIndex]);
  },
  onSlideChangeStart:function(swiper){
    $('.route-p1').html('计算中...');
  },
  onSlideChangeEnd:function(swiper){
    $loadingWrap.show();
    routeSwiper.lockSwipes();//锁住滑动
    map.clearOverlays(); 
    mapSearch(routePolicy[swiper.activeIndex]);
  }
});
//路线搜索
function mapSearch(route){ 
  driving = new BMap.DrivingRoute(map,{renderOptions:{map:map,autoViewport:true},policy:route,onSearchComplete:searchComplete});
  getPoint(start,starts,function(newS){
    getPoint(end,ends,function(newE){
      driving.search(newS,newE);
    });
  });
};
//获取距离、路程、到达时间
function searchComplete(results){
  var weatherP = [];
  if(driving.getStatus()!=BMAP_STATUS_SUCCESS){
    $('.swiper-slide-active .route-p1').html('未获取到路线信息！');
    return;
  };
  $('.BMap_mask').next().children('div:eq(1)').css('z-index',499);//始终图标降层级
  var plan = results.getPlan(0),
      route = plan.getRoute(0),
      path = route.getPath();
  //输出驾车线路
  var s = [],
      sReg = /<div.*?>(.*?)<\/div>/i;
  for(var j=0;j<plan.getNumRoutes();j++){
    var route = plan.getRoute(j);
    for(var i=0;i<route.getNumSteps();i++){
      var step = route.getStep(i);
      s.push('<li>'+(i+1)+"&emsp;"+sReg.exec(step.getDescription())[1]+'</li>');
    }
  };
  $routeDetails.find('h2').html('<i></i>'+decodeURI(starts));
  $routeDetails.find('ul').html(s.join(' '));
  //到达时间计算
  var getDuration = plan.getDuration(true),
      newFormat = [],
      newDuration = 0;
  newFormat[0] = (/(\d*)天/.exec(getDuration)||['',0])[1];
  newFormat[1] = (/(\d*)小时/.exec(getDuration)||['',0])[1];
  newFormat[2] = (/(\d*)分钟/.exec(getDuration)||['',0])[1];
  newDuration = (newFormat[0]*24*60*60+newFormat[1]*60*60+newFormat[2]*60)*1000;
  arrivalTime = new Date(departTime-(-newDuration));
  //面板信息
  $('.swiper-slide-active .route-p1').html(plan.getDuration(true)+'<span>'+plan.getDistance(true)+'</span>');
  //路程数据组
  weatherP[0] = path[0];
  console.log(path);
  $.each(path,function(i,v){
    var distance = map.getDistance(weatherP[weatherP.length-1],v);
    if(i==0){
      weatherP.push(v);
    }else if(distance>=100*1000){
      weatherP.push(v);
    };
    if(i==path.length-1){
      weatherP.push(v); 
    };
  });
  if(weatherP.length>2){//删除起点坐标50公里内坐标
    if(map.getDistance(weatherP[0],weatherP[1])<50*1000){
      weatherP.splice(1,1);
    };
  };
  if(weatherP.length>2){//删除终点坐标50公里内坐标
    if(map.getDistance(weatherP[weatherP.length-2],weatherP[weatherP.length-1])<50*1000){
      weatherP.splice(weatherP.length-2,1);
    };
  };
  //配置位置数组及具体信息
  var cityContent = [],
      cityInfo = [],
      num = 0,
      timeStep = newDuration/(weatherP.length-1);
  getCityAll = weatherP.length;
  $.each(weatherP,function(i,v){
    var pt = new BMap.Point(v.lng,v.lat);
    getCityId(pt,function(cityId,cityName){//根据坐标获取城市ID
      if(cityId&&cityName){
        cityContent.push({
          num:i,
          pt:pt,
          cityId:cityId,
          cityName:cityName,
          ATS:new Date(departTime-(-timeStep*i)),//当前
          ATS2:new Date(departTime-(-timeStep*i)+24*60*60*1000)//次日
        });
      };
      if(num==weatherP.length-1){//城市ID获取完毕
        $.each(cityContent,function(ii,vv){//请求参数配置
          cityInfo.push('{"id":"'+vv.cityId+'","lng":"'+vv.pt.lng+'","lat":"'+vv.pt.lat+'","date":"'+base.date('YMDHI',vv.ATS)+'"}');
          cityInfo.push('{"id":"'+vv.cityId+'","lng":"'+vv.pt.lng+'","lat":"'+vv.pt.lat+'","date":"'+base.date('YMDHI',vv.ATS2)+'"}');
        });
        var LQ = {};
        wCallback = function(data){//回调天气信息
          if(data.status=='success'){
            var weatherTxt = '天气不错',
                tomorrow = new Date(new Date()-(-23*60*60*1000)),//延迟1小时
                
                weatherInfo = function(json){
			//if(LQ[json['state']]){
			//if(!LQ[json['cityId']]){
			//	LQ[json['cityId']] = {};
			//}
			//LQ[json['cityId']][json['state']] = json;
			//}
			// if(!json['weather1'] && json.state=='jh'){
				
			//	json['weather1'] = {fa:LQ[json['cityId']]?LQ[json['cityId']]['f']['weather1']['fa']:"01"};
			//}
			console.log(json);
                  var ME = json.ATS.getHours()>=6&&json.ATS.getHours()<18?'d':'n',//早晚判断
                      wGet = json.w[0]?json.w[0]:{w5:'',w7:'',w11:''},//城市预警
                     
                      imgCode = json.state=='jh'?json.weather1.ja:(ME=='d'?json.weather1.fa:json.weather2.fb),//天气图标
                      codeToTxt = function(weather,flag){
			//console.log(json);
                        if(json.state=='jh'&&flag){
                          var jhW = '',
                              dateTxt = '到达时间：<font style="color:#6AADDB">'+base.date('D日 H:I',json.ATS)+'</font>&nbsp;';
                          $.each(weatherArr,function(x,y){
                            if(weather.ja==y[0]){
                              jhW = y[1];
                              return false;
                            };
                          });
                          return dateTxt+jhW+'&nbsp;'+json.weather1.jb+'℃&nbsp;';//48小时天气文字
                        }else{
                          var fWCode = ME=='d'?[weather.fa,weather.fe,weather.fg]:[weather.fb,weather.ff,weather.fh],
                              fW = [weather.fd,weather.fc],
                              dateTxt = (json.state=='jh'||flag?json.ATS.getDate():new Date(json.ATS-(-24*60*60*1000)).getDate())+'日：';
                          $.each(weatherArr,function(x,y){//天气
                            if(fWCode[0]==y[0]){
                              fW[2] = y[1];
                              return false; 
                            };
                          });
                          $.each(windArr.direction,function(x,y){//风向
                            if(fWCode[1]==y[0]){
                              fW[3] = y[1];
                              return false;  
                            };
                          });
                          $.each(windArr.intensity,function(x,y){//风力
                            if(fWCode[2]==y[0]){
                              fW[4] = y[1];
                              return false;  
                            };
                          });
                          return dateTxt+fW[2]+'&nbsp;'+fW[0]+'-'+fW[1]+'℃&nbsp;'+fW[3]+fW[4];//15天预报文字
                        };
                      };
                  //判断不利天气
                  if(imgCode!='00'&&imgCode!='01'&&imgCode!='02'){
                    weatherTxt = '有不利天气';
                  };
                  //配置天气信息
            
                  return {
                    i:json.num,
                    pt:json.pt,
                    name:json.cityName,
                    time:json.ATS,
                    firstT:codeToTxt(json.weather1,true),
                    secondT:codeToTxt(json.weather2),
                    img:'i/icon/'+ME+imgCode+'.png',//气泡图
                    url:'http://e.weather.com.cn/d/index/'+json.cityId+'.shtml',//更多链接
                    wT:(wGet.w5&&wGet.w7&&wGet.w11?wGet.w7+wGet.w5+'预警':''),//预警文字
                    wUrl:'http://e.weather.com.cn/d/warning/publish_area.shtml?code='+json.cityId+'&fromid='+json.cityId//预警链接    
                  };
                };
            $.each(cityContent,function(m,n){//循环路径站点
              $.each(data.result,function(mm,nn){//循环天气站点
             // console.log(nn['jh']);
              	/*if(nn['jh'].length==0){
              		nn['jh'][0] = {fa:nn['f'][0]['fa'],fb:nn['f'][0]['fb'],qdate:nn['f'][0]['qdate']};
              		nn['jh'][1] = {fa:nn['f'][1]['fa'],fb:nn['f'][1]['fb'],qdate:nn['f'][1]['qdate']};
              		console.log(nn);
              	}*/
                if(n.cityId==mm){//匹配站点ID
                  cityContent[m].w = nn.w;
                  if(n.ATS.getTime()-tomorrow.getTime()<0){//分情况获取天气信息 1.24小时预报
                    cityContent[m].state ='jh';
		    

                    
                    $.each(nn.f,function(mmm,nnn){//循环天气信息
                      if(base.date('YMDHI',n.ATS)==nnn.qdate){//匹配时间节点2
                        cityContent[m].weather2 = nnn;
                      };
                    });
			$.each(nn.jh,function(mmm,nnn){//循环天气信息
  		
                    if(base.date('YMDHI',n.ATS)==nnn.qdate){//匹配时间节点1
                        cityContent[m].weather1 = nnn;
                      };
                    });
                    
                    if(!cityContent[m].weather1){
			cityContent[m].weather1 = {ja:nn['f'][0]['fa']?nn['f'][1]['fa']:"00",jb:nn['f'][0]['fb'],qdate:nn['f'][0]['qdate']};
              		//nn['jh'][1] = {fa:nn['f'][1]['fa'],fb:nn['f'][1]['fb'],qdate:nn['f'][1]['qdate']};                    
                    }
                    
                    map.addOverlay(new ComplexCustomOverlay(weatherInfo(cityContent[m])));
                  }else{//分情况获取天气信息 2.超出24小时预报
                    cityContent[m].state ='f';
                    $.each(nn.f,function(mmm,nnn){//匹配日期
                      if(base.date('YMDHI',n.ATS)==nnn.qdate){//匹配时间节点1
                        cityContent[m].weather1 = nnn;
                      };
                      if(base.date('YMDHI',n.ATS2)==nnn.qdate){//匹配时间节点2
                        cityContent[m].weather2 = nnn;
                      };
                    });
                    map.addOverlay(new ComplexCustomOverlay(weatherInfo(cityContent[m])));
                  };
                };
              });
            });
            //写入不利天气
            $('.swiper-slide-active .route-p2').html(weatherTxt);
          }else if(data.status=='error'){
            alert('参数错误，请重新选择！');
            location.href = 'index.html';
          }else{
            alert('天气获取失败，请刷新重试！');
          };
          $loadingWrap.hide();
          hideMapTips();
          $('.BMap_Marker').hide();
          routeSwiper.unlockSwipes();//解锁滑动
        };
        base.ajax('http://d4.weather.com.cn/api/yt/v1/api/?params={"method":"yttqfc","types":["f","w","jh"],"stations":['+cityInfo.join(',')+'],"callback":"wCallback"}');
      };
      num++;
    });
  });
};
//创建天气图标
function ComplexCustomOverlay(data){
  this._num = data.i;
  this._point = data.pt;
  this._city = data.name;
  this._time = data.time;
  this._img = data.img;
  this._url = data.url;
  this._text = data.firstT;
  this._text2 = data.secondT;
  this._text3 = data.wT;
  this._url2 = data.wUrl;
};
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map){
  this._map = map;
  var div = this._div = document.createElement("div");
  var that = this;
  div.style.position = "absolute";
  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat)+100;
  div.style.width = 60*0.5*(document.body.clientWidth/320)+'px';
  div.style.height = 60*0.5*(document.body.clientWidth/320)+'px';
  var addImg = this._addImg = document.createElement("img");
  addImg.style.display = "block";
  addImg.src = this._img;
  addImg.style.width = "100%";
  addImg.style.height = "100%";
  addImg.style.verticalAlign = "middle";
  div.appendChild(addImg);
  if(that._text3){//预警天气添加泡泡跳跃
    $(addImg).addClass('img-adverse');
  };
  div.addEventListener("touchstart",function(){
    var num = Number($city.attr('data-num'));
    if(num==that._num){
      popChane(div);
      $city.removeClass('city-show').attr('data-num','-1');
      $weatherForecast.html('');
      $cityName.html(''); 
    }else{
      popChane(div,true);
      $city.addClass('city-show').attr('data-num',that._num);
      $weatherForecast.html(that._text+'<br>'+that._text2); 
      $cityName.html(that._city);
      $weatherMore.attr('href',that._url);
      $arrivalTime.html('');//base.date('M-D',that._time)
      if(that._text3){//预警天气展示预警横幅
        $city.addClass('city-adverse').find('.city-adverse-a').html(that._text3).attr('href',that._url2);  
      }else{
        $city.removeClass('city-adverse');
      };
    };
  });
  map.getPanes().labelPane.appendChild(div);
  return div;
};
ComplexCustomOverlay.prototype.draw = function(){
  var pixel = this._map.pointToOverlayPixel(this._point);
  var zoom = this._map.getZoom();
  this._div.style.left = pixel.x - parseInt(this._div.style.width)/2 + "px";
  this._div.style.top  = pixel.y - parseInt(this._div.style.height) + "px";
  this._div.style.display = 'block';
  if(zoom<9&&this._num%(9-zoom)!=0){//根据缩放级别显示隐藏天气图标
    if(this._num!=getCityAll-1){
      this._div.style.display = 'none';  
    };
  };
};
//根据坐标获取城市ID(获取不到则获取同级城市ID)
function getCityId(pt,handler){
  var cityName = '',
      cityID = '';
  myGeo.getLocation(pt,function(rs){
    var addComp = rs.addressComponents;
    cityName = addComp.district;
    for(var i in city){
      if(addComp.province.indexOf(i)>-1){
        for(var j in city[i]){
          if(addComp.city.indexOf(j)>-1){
            var x = 0;
            for(var k in city[i][j]){
              if(x==0){//默认配置ID为首个城市
                cityID = city[i][j][k].AREAID;  
              };
              if(addComp.district.indexOf(k)>-1){//如果城市名称存在,则精确配置ID
                cityID = city[i][j][k].AREAID;
              };
              x++;
            };
          };
        };
        if(!cityID){//市级匹配失败，进行县级海选
          for(var j in city[i]){
            for(var k in city[i][j]){
              if(addComp.district.indexOf(k)>-1){
                cityID = city[i][j][k].AREAID;
                cityName = addComp.district;
              };
            };
          };
        };
      };
    };
    handler(cityID,cityName);
  });
};
//根据城市名称获取坐标
function getPoint(s,a,handler){
  var newS;
  myGeo.getPoint(decodeURI(s),function(point){
    if(point){
      newS = new BMap.Point(point.lng,point.lat);
		}else{
			newS = decodeURI(s);
		};
    handler(newS);
	},decodeURI(a));  
};
//气泡选中效果
function popChane(obj,flag){
  var $this = $(obj),
      $s = $this.parent().find('.pop-select'),
      w = $this.width(),
      h = $this.height(),
      l = Number($this.css('left').replace('px','')),
      t = Number($this.css('top').replace('px',''));
  if(flag){
    $this.addClass('pop-select').css({'width':w+20,'height':h+20,'left':l-10,'top':t-20});
  };
  if($s.length){
    var ww = $s.width(),
        hh = $s.height(),
        ll = Number($s.css('left').replace('px','')),
        tt = Number($s.css('top').replace('px',''));
    $s.removeClass('pop-select').css({'width':ww-20,'height':hh-20,'left':ll+10,'top':tt+20});  
  };
};