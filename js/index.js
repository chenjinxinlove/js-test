function searchJudge(e) {
    "输入城市名、景点名 查天气" != e ? readData(e, 0) : hide()
}
function readData(e, t) {
    keyvalueOld = e, $.ajax({
        type: "GET",
        url: "http://toy1.weather.com.cn/search?cityname=" + e,
        dataType: "jsonp",
        requestCount: ++requestCount,
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        timeout: 3e3,
        async: !1,
        success: function (a) {
            requestCount === this.requestCount && (0 == t && ("" == a ? ($("#show ul").html("<span style='color:#f00;'>对不起，未找到您查询的城市天气!</a></span>"), $("#show").show()) : displayData(e, a)), 1 == t && ("" == a ? window.location = "http://www.weather.com.cn/forecast/index.shtml#input" : (displayData(e, a), areaid = $("#show li.select").attr("num"), regEn.test(areaid) && (window.location = "http://www.weather.com.cn/html/province/" + areaid + ".shtml#input"), regNum.test(areaid) && (window.location = "http://www.weather.com.cn/weather1d/" + areaid + ".shtml#input"))))
        },
        error: function () {
            1 == t && (window.location = "http://www.weather.com.cn/weather1d/" + areaid + ".shtml#input")
        }
    })
}
function displayData(e, t) {
    var a = [];
    $.each(t, function (e, t) {
        a[e] = t.ref.split("~")
    });
    var i = a.sort(by("0")), n = "", c = "";
    regNum.test(e) && $.each(i, function (t, a) {
        var i = a[2] + "-" + a[9], n = RegExp(e, "ig");
        return n.test(a[6]) && (i += "-" + a[6]), n.test(a[7]) && (i += "-" + a[7]), i = i.replace(n, "<b>" + e + "</b>"), 0 == t && (c += '<li class="select" num=' + a[0] + ">" + i + "</li>"), 12 > t && t > 0 && (c += '<li class="unselect" num=' + a[0] + ">" + i + "</li>"), 11 == t ? !1 : void 0
    }), regEn.test(e) && $.each(i, function (t, a) {
        var i = "" != a[9] ? a[2] + "-" + a[9] : a[2], n = RegExp(e, "ig");
        return n.test(a[3]) && (i += "-" + a[3]), n.test(a[5]) && (i = a[2] + "-" + a[9] + "-" + a[5]), i = i.replace(n, "<b>" + e + "</b>"), n.test(a[8]) && (i += "-<b>" + a[8].toUpperCase() + "</b>"), 0 == t && (c += '<li class="select" num=' + a[0] + ">" + i + "</li>"), 12 > t && t > 0 && (c += '<li class="unselect" num=' + a[0] + ">" + i + "</li>"), 11 == t ? !1 : void 0
    }), regCn.test(e) && $.each(i, function (t, a) {
        var i = "" != a[9] ? a[2] + "-" + a[9] : a[2], n = RegExp(e, "ig"), n = RegExp(e, "ig"), i = i.replace(n, "<b>" + e + "</b>");
        return 0 == t && (c += '<li class="select" num=' + a[0] + ">" + i + "</li>"), 12 > t && t > 0 && (c += '<li class="unselect" num=' + a[0] + ">" + i + "</li>"), 11 == t ? !1 : void 0
    }), $("#show ul").html(c), $("#show").show(), $("#show li").mouseover(function () {
        $("#show li.select").removeClass("select").addClass("unselct"), $(this).removeClass("unselect").addClass("select")
    }).mouseout(function () {
        $(this).removeClass("select").addClass("unselect")
    }).click(function () {
        var e = $("#show li.select").text(), e = e.split("-");
        n = $("#show li.select").attr("num"), regEn.test(n) && (window.location = "http://www.weather.com.cn/html/province/" + n + ".shtml#input"), regNum.test(n) && (window.location = "http://www.weather.com.cn/weather1d/" + n + ".shtml#input"), 1 < e.length && $("#txtZip").val(e[0]), hide()
    })
}
function hide() {
    $("#show").hide()
}
function keysearch(e) {
    38 == e.keyCode || 40 == e.keyCode || 13 == e.keyCode || 27 == e.keyCode || 9 == e.keyCode ? (40 == e.keyCode && ("" != $("#show li.select").next().text() ? $("#show li.select").removeClass("select").addClass("unselect").next().removeClass("unselect").addClass("select") : ($("#show li.select").removeClass("select").addClass("unselect"), $("#show li:first").removeClass("unselect").addClass("select"))), 38 == e.keyCode && ("" != $("#show li.select").prev().text() ? $("#show li.select").removeClass("select").addClass("unselect").prev().removeClass("unselect").addClass("select") : ($("#show li.select").removeClass("select").addClass("unselect"), $("#show li:last").removeClass("unselect").addClass("select"))), 13 == e.keyCode && (e = $("#show li.select").text(), e = e.split("-"), areaid = $("#show li.select").attr("num"), regEn.test(areaid) && (window.location = "http://www.weather.com.cn/html/province/" + areaid + ".shtml#input"), regNum.test(areaid) && (window.location = "http://www.weather.com.cn/weather1d/" + areaid + ".shtml#input"), 1 < e.length && $("#txtZip").val(e[0]), hide())) : 0 == $("#txtZip").val().length && hide()
}
function istrue(e) {
    var t = /^((?=[0-9]+[A])|[0-9]+(?=[0-9]))[a-z0-9]+$/gi;
    return t.test(e)
}
var by = function (e) {
    return function (t, a) {
        var i, n;
        if ("object" == typeof t && "object" == typeof a && t && a)return i = t[e], n = a[e], i === n ? 0 : typeof i == typeof n ? n > i ? -1 : 1 : typeof n > typeof i ? -1 : 1;
        throw"error"
    }
}, requestCount = 0, keyvalueOld = "", regNum = /^[0-9]*[0-9][0-9]A*$/, regEn = /^[A-Za-z]+$/, regCn = RegExp("[一-龥]"), requestOccur = 0;
define(function (require) {
    function initDzCity() {
        DZ._initCookieDatas()
    }

    function cookieMaker(e, t, a) {
        if ("undefined" == typeof t) {
            var i = null;
            if (document.cookie && "" != document.cookie)for (var n = document.cookie.split(";"), c = 0; c < n.length; c++) {
                var o = jQuery.trim(n[c]);
                if (o.substring(0, e.length + 1) == e + "=") {
                    i = decodeURIComponent(o.substring(e.length + 1));
                    break
                }
            }
            return i
        }
        a = a || {}, null === t && (t = "", a.expires = -1);
        var s = "";
        if (a.expires && ("number" == typeof a.expires || a.expires.toUTCString)) {
            var r;
            "number" == typeof a.expires ? (r = new Date, r.setTime(r.getTime() + 1e3 * 60 * 60 * 24 * a.expires)) : r = a.expires, s = "; expires=" + r.toUTCString()
        }
        var l = a.path ? "; path=" + a.path : "", h = a.domain ? "; domain=" + a.domain : "", d = a.secure ? "; secure" : "";
        document.cookie = [e, "=", encodeURIComponent(t), s, l, h, d].join("")
    }

    require("jquery"), $(".city-tt a").click(function (e) {
        e.stopPropagation(), $(this).addClass("cur").siblings().removeClass("cur"), $(".w_city").eq($(".city-tt a").index($(this))).show().siblings(".w_city").hide()
    }), $(".text").click(function () {
        $(".city-box").addClass("show_head")
    });
    var fxClass = {
        10101: "http://bj.weather.com.cn/",
        10102: "http://sh.weather.com.cn/",
        10103: "http://tj.weather.com.cn/",
        10104: "http://cq.weather.com.cn/",
        10105: "http://hlj.weather.com.cn/",
        10106: "http://jl.weather.com.cn/",
        10107: "http://ln.weather.com.cn/",
        10108: "http://nmg.weather.com.cn/",
        10109: "http://hebei.weather.com.cn/",
        10110: "http://shanxi.weather.com.cn/",
        10111: "http://shaanxi.weather.com.cn/",
        10112: "http://sd.weather.com.cn/",
        10113: "http://xj.weather.com.cn/",
        10114: "http://xz.weather.com.cn/",
        10115: "http://qh.weather.com.cn/",
        10116: "http://gs.weather.com.cn/",
        10117: "http://nx.weather.com.cn/",
        10118: "http://henan.weather.com.cn/",
        10119: "http://js.weather.com.cn/",
        10120: "http://hubei.weather.com.cn/",
        10121: "http://zj.weather.com.cn/",
        10122: "http://ah.weather.com.cn/",
        10123: "http://fj.weather.com.cn/",
        10124: "http://jx.weather.com.cn/",
        10125: "http://hunan.weather.com.cn/",
        10126: "http://gz.weather.com.cn/",
        10127: "http://sc.weather.com.cn/",
        10128: "http://gd.weather.com.cn/",
        10129: "http://yn.weather.com.cn/",
        10130: "http://gx.weather.com.cn/",
        10131: "http://hainan.weather.com.cn/",
        10132: "http://www.weather.com.cn/html/province/xianggang.shtml",
        10133: "http://mo.weather.com.cn/",
        10134: "http://www.weather.com.cn/html/province/taiwan.shtml"
    };
    $.getScript("http://wgeo.weather.com.cn/ip/", function () {
        var e = id.toString(), e = e.substr(0, 5), e = parseInt(e), t = addr.split(",");
        $(".shengjz").html(t[0] + "站"), $(".shengjz").attr("href", fxClass[e])
    }), void 0 == $("#colorids").val() ? $(".w_li_logo span").text($("#colorid").val()) : $(".w_li_logo span").html("<a href='" + $("#colorids").val() + "'>" + $("#colorid").val() + "</a>"), $(".select_li b").click(function () {
        var e = $(".select_li b").index(this);
        $(".select_li b").removeClass("m_li"), $(".select_li b").eq(e).addClass("m_li"), $(".select_li p").html($(".select_li b").eq(e).html())
    }), $(".more_li").hover(function () {
        $(".weather_li_open").show()
    }, function () {
        $(".weather_li_open").hide()
    }), $(".head-right .email-img").hover(function () {
        $(this).attr("src", "http://i.tq121.com.cn/i/ucenter/pc/email_on.png")
    }, function () {
        $(this).attr("src", "http://i.tq121.com.cn/i/ucenter/pc/email.png")
    }), $(".city-tt b").click(function () {
        $(".city-box").hide()
    }), $(".sheng").click(function () {
        $(".sheng-show").slideToggle(500)
    }), $(".sjz").click(function () {
        $(".provinceLinks").animate({height: "toggle"}, "normal")
    }), $(".nav a[id=" + $("#colorid").val() + "]").addClass("sheng"), $(".menu a[id=" + $("#colorid").val() + "]").parent().addClass("sheng"), $(".menu a[id=" + $("#colorid").val() + "]").addClass("color"), $(".nav a[id=" + $("#colortid").val() + "]").addClass("sheng");
    var navid = $(".nav a").attr("id"), dizhi = window.location.href, dizhi = dizhi.split("/"), dizhi = dizhi.pop().split("."), str = dizhi[0];
    if (istrue(str)) {
        var aaa = str.length;
        if (7 == aaa || 6 == aaa) {
            var rs = "http://wgeo.weather.com.cn/ip/";
            $.getScript(rs, function () {
                $.getScript("http://d1.weather.com.cn/index_around/" + id + ".html", function () {
                    var e = around.n;
                    $.each(e, function (e, t) {
                        $(".city_guonei").eq(1).find("dd").eq(0).append("<a href='http://www.weather.com.cn/weather1d/" + t.ac + ".shtml' title='" + t.an + "'>" + t.an + "</a>")
                    });
                    var t = around.jd;
                    $.each(t, function (e, t) {
                        $(".city_guonei").eq(1).find("dd").eq(1).append("<a href='http://www.weather.com.cn/weather1d/" + t.ac + ".shtml' title='" + t.an + "'>" + t.an + "</a>")
                    })
                })
            })
        } else $.getScript("http://d1.weather.com.cn/index_around/" + dizhi[0] + ".html", function () {
            var e = around.n;
            $.each(e, function (e, t) {
                $(".city_guonei").eq(1).find("dd").eq(0).append("<a href='http://www.weather.com.cn/weather1d/" + t.ac + ".shtml#around1' title='" + t.an + "'>" + t.an + "</a>")
            });
            var t = around.jd;
            $.each(t, function (e, t) {
                $(".city_guonei").eq(1).find("dd").eq(1).append("<a href='http://www.weather.com.cn/weather1d/" + t.ac + ".shtml#around1' title='" + t.an + "'>" + t.an + "</a>")
            })
        })
    } else {
        var rs = "http://wgeo.weather.com.cn/ip/";
        $.getScript(rs, function () {
            $.getScript("http://d1.weather.com.cn/index_around/" + id + ".html", function () {
                var e = around.n;
                $.each(e, function (e, t) {
                    $(".city_guonei").eq(1).find("dd").eq(0).append("<a href='http://www.weather.com.cn/weather1d/" + t.ac + ".shtml#around1' title='" + t.an + "'>" + t.an + "</a>")
                });
                var t = around.jd;
                $.each(t, function (e, t) {
                    $(".city_guonei").eq(1).find("dd").eq(1).append("<a href='http://www.weather.com.cn/weather1d/" + t.ac + ".shtml#around1' title='" + t.an + "'>" + t.an + "</a>")
                })
            })
        })
    }
    $("#txtZip").focus(function () {
        ("" == $("#txtZip").val() || "输入城市名、景点名 查天气" == $("#txtZip").val()) && ($(".city-box").show(), hide()), $(this).val() == this.defaultValue ? $(this).val("") : "" != $("#txtZip").val() && "输入城市名、景点名 查天气" != $("#txtZip").val() && $("#show").show(), setInterval(function () {
            var e = $("#txtZip").val();
            "" == e && hide(), e != keyvalueOld && ($(".city-box").hide(), searchJudge(e))
        }, 300)
    }), $(document).click(function () {
        "" == $("#txtZip").val() ? ($("#show").hide(), $("#txtZip").val("输入城市名、景点名 查天气")) : ($("#show").hide(), $(".city-box").hide())
    }), $("#txtZip").add("#selectsionTabs").click(function (e) {
        return e.stopPropagation(), !1
    }), $("#selectsionTabs span").click(function () {
        var e = $("#selectsionTabs span").index(this);
        $("#selectsionGroups ul").hide(), $("#selectsionGroups ul").eq(e).show(), $("#selectsionTabs span").removeClass("active"), $(this).addClass("active")
    }), $("#selectsionTabs .tab").click(function () {
        return event.stopPropagation(), !1
    }), $("#btnZip").bind("click", function (e) {
        return e.stopPropagation(), e = $("#txtZip").val(), "" == e || "输入城市名、景点名 查天气" == $.trim(e) ? (window.location = "http://www.weather.com.cn/forecast/index.shtml#input", !1) : (readData(e, 1), void 0)
    }), $("#txtZip").keyup(function (e) {
        var t = $("#txtZip");
        t.offset(), t.height(), "" == $("#txtZip").val() && (keyvalueOld = ""), keysearch(e)
    }), $(document).click(function () {
        $(".city-box").hasClass("show_head") && $(".city-box").hide()
    });
    var DZ = {
        COOKIE_NAME: "f_city",
        default_id: 101010100,
        default_name: "北京,北京,北京",
        weaJsonUrl: "http://d1.weather.com.cn/dingzhi/_id_.html",
        cookieDatas: [],
        _initCookieDatas: function () {
            $(".w_weather").empty();
            var e = cookieMaker(DZ.COOKIE_NAME);
            if (DZ.cookieDatas = [], e) {
                for (var t = e.split(","), a = 0, i = t.length; i > a; a++) {
                    var n = t[a].split("|");
                    DZ.cookieDatas.unshift({cityName: n[0], cityId: n[1], cityCusName: n[2]})
                }
                DZ._goWeaDatas()
            } else $.ajax({
                type: "get",
                dataType: "script",
                url: "http://wgeo.weather.com.cn/ip/",
                success: function () {
                    var e = {cityName: addr.split(",").pop(), cityId: id, cityCusName: ""};
                    DZ.cookieDatas.push(e), DZ._goWeaDatas();
                    var t = e.cityName + "|" + e.cityId + "|" + e.cityCusName;
                    cookieMaker(DZ.COOKIE_NAME, t, {expires: 999, path: "/", domain: "weather.com.cn"})
                }
            });
            $(".w_weather .delete").live("click", function () {
                var e = $(this).parents("li").attr("data-n");
                DZ._remove(e), DZ._goWeaDatas()
            })
        },
        _remove: function (e) {
            for (var t = [], a = DZ.cookieDatas.length - 1; a >= 0; a--) {
                var i = DZ.cookieDatas[a];
                i.cityId == e ? DZ.cookieDatas.splice(a, 1) : t.push(i.cityName + "|" + i.cityId + "|" + i.cityCusName)
            }
            cookieMaker(DZ.COOKIE_NAME, t.join(","), {expires: 999, path: "/", domain: "weather.com.cn"})
        },
        _goWeaDatas: function () {
            function gets() {
                var d = DZ.cookieDatas[point];
                $.ajax({
                    type: "get",
                    dataType: "script",
                    url: DZ.weaJsonUrl.replace("_id_", d.cityId),
                    success: function () {
                        var city = eval("cityDZ" + d.cityId).weatherinfo, weaDatas = {
                            id: city.city,
                            name: city.cityname,
                            tem1: city.temp,
                            tem2: city.tempn,
                            txt: city.weather,
                            icon1: city.weathercode,
                            icon2: city.weathercoden,
                            wind: city.wd,
                            windl: city.ws,
                            alarms: eval("alarmDZ" + d.cityId).w
                        }, moreClass = DZ.cookieDatas.length > 1 && "dz_right" || "";
                        point == DZ.cookieDatas.length - 1 ? DZ._setDomHeadCity(weaDatas, moreClass) : DZ._setDomMoreCity(weaDatas), point-- ? gets() : $(".w_weather ul").append('<li class="add"> <a href="http://www.weather.com.cn/profile/city.shtml"  target="_self">+</a> </li>')
                    }
                })
            }

            var point = DZ.cookieDatas.length - 1;
            gets()
        },
        _setDomHeadCity: function (e, t) {
            var a = '<a href="http://www.weather.com.cn/weather1d/' + e.id + '.shtml#dingzhi_first" target="_self" title="' + e.txt + '"><span class="city_name"><em>' + e.name + '</em></span> <big class="icon ' + e.icon1 + ' fl"></big> <big class="icon ' + e.icon2 + ' fl"></big> <em class="fl s">' + e.tem1 + "/" + e.tem2 + "</em> </a>";
            e.alarms.length && (a += '<a class="fl w_yj" href="http://www.weather.com.cn/alarm/newalarmlist.shtml?areaId=' + e.id + '"></a>'), a += '<a class="add fl ' + t + '" href="http://www.weather.com.cn/profile/city.shtml" target="_self">+</a>', a += '<ul class="more" style="display: none;"></ul>', $(".w_weather").empty().html(a)
        },
        _setDomMoreCity: function (e) {
            function t(e) {
                e.live("mouseover mouseout", function (e) {
                    "mouseover" == e.type ? (r.show(), l.addClass("dz_down")) : (r.hide(), l.removeClass("dz_down"))
                })
            }

            var a = "";
            e.alarms.length && (a = '<em class="w_yj"></em>'), $(".w_weather ul").append('<li data-n="' + e.id + '"><a title="' + e.txt + '" target="_self" href="http://www.weather.com.cn/weather1d/' + e.id + '.shtml#dingzhi_more" class="clearfix"><span>' + e.name + '</span><big class="' + e.icon1 + ' ic"></big><big class="' + e.icon2 + ' ic"></big><em>' + e.tem1 + "/" + e.tem2 + '</em></a><b class="delete"></b></li>');
            var i = $(".w_weather"), n = i.find(".city_name"), c = n.children("em"), o = n.width(), s = c.width();
            s > o && c.hover(function () {
                $(this).stop(!0).animate({left: "-" + (s - o) + "px"}, "slow")
            }, function () {
                $(this).css("left", "0px")
            });
            var r = i.find(".more");
            t(r);
            var l = i.find("a.dz_right");
            t(l)
        }
    };
    DZ._initCookieDatas();
    var Event = require("../m_event"), dzEvent = (W.data || (W.data = {}))["event.dz_city"] = new Event;
    dzEvent.on("modify", DZ._initCookieDatas)
});