/**
 * Created by chen on 2017/4/11.
 */
if (typeof Array.prototype.map != "function") {
  Array.prototype.map = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {
        arr.push(fn.call(context, this[k], k, this));
      }
    }
    return arr;
  };
}

  //画图函数
  function dw(drawBaseOb, obj) {
    var xr = drawBaseOb.xr;
    var line = drawBaseOb.line;
    var color = obj.color, dotColor = obj.dotColor, dotDiameter = obj.dotDiameter, dotStrokeColor = obj.dotStrokeColor, dotStroke = obj.dotStroke, opacity = obj.opacity;
    PADDING = obj.PADDING, W = obj.W, H = obj.H, r = Raphael(drawBaseOb.id, W, H), textStyle = obj.textStyle, values = obj.values, len = values.length;
    var valuesMax = Math.max.apply({}, values),
      valuesMin = Math.min.apply({}, values);
    var valuesInt;
    if(valuesMax === valuesMin) {
      valuesInt = valuesMax/2
    } else{
      valuesInt = valuesMax - valuesMin;
    }
    function sY(y) {
      if (!xr) {
        return H - PADDING.top - ((H - PADDING.top - PADDING.buttom - 20) / valuesInt ) * (y - valuesMin)
      } else {
        return H - PADDING.top - 20 - ((H - PADDING.top - PADDING.buttom - 20) / valuesInt ) * (y - valuesMin)
      }
    }
    //xy 坐标转换
    function translate(x, y) {
      return [
        PADDING.left + (W - PADDING.left - PADDING.right) / (values.length - 1) * x,
        sY(y)
      ];
    }
    var p = [["M"].concat(translate(0, values[0]))],
      X = [],
      Y = [],
      blankets = r.set(),
      buttons = r.set(),
    //边距
      w = (W - PADDING) / values.length,
      isDrag = -1,
      start = null,
    //设置颜色与线宽
      sub = r.path().attr({stroke: "none", fill: color, opacity: opacity});
    var path;
    if (line) {
      path = r.path().attr({stroke: color, "stroke-width": 2});
    } else {
      path = r.path().attr({stroke: color, "stroke-width": 0});
    }
    var unhighlight = function () {
    };
    var lenght;
    for (i = 0, lenght = values.length - 1; i < lenght; i++) {
      var xy = translate(i, values[i]),
        xy1 = translate(i + 1, values[i + 1]),
        f;
      X[i] = xy[0];
      Y[i] = xy[1];
      (f = function (i, xy) {
        var attrObg;
        if (line){
          attrObg = {
            fill: dotColor,
            stroke: dotStrokeColor,
            "stroke-width": dotStroke
          }
        }else{
          if (!i) {
            attrObg = {
              fill: 'RGB(194,194,195)',
              stroke: 'RGB(194,194,195)',
              "stroke-width": '1',
            }
          }else{
            attrObg = {
              fill: dotColor,
              stroke: dotStrokeColor,
              "stroke-width": dotStroke
            }
          }
        }

        buttons.push(r.circle(xy[0], xy[1], dotDiameter).attr(attrObg));

      })(i, xy);
      if (i == lenght - 1) {
        f(i + 1, xy1);
      }
    }
    xy = translate(lenght, values[lenght]);
    X.push(xy[0]);
    Y.push(xy[1]);
    if (!line) {
      if (!xr) {
        var text = r.text(X[0], Y[0] - 15, values[0] + '°C');
        text.attr({
          "fill": "RGB(194,194,195)", "font-size": "16px", "text-anchor": "center"
        });
      } else {
        var text = r.text(X[0], Y[0] + 15, values[0] + '°C');
        text.attr({
          "fill": "RGB(194,194,195)", "font-size": "14px", "text-anchor": "center"
        });
      }
    }else{
      // var text = r.text(X[0], Y[i] + 40, values[i] + '°C');
      // text.attr(textStyle);
    }

    var i;
    if(!line) {
      i = 1
    } else {
      i = 0;
    }

    for (i , lenght = values.length; i < lenght; i++) {
      if (!xr) {
        var text = r.text(X[i], Y[i] - (obj.fontWz || 15), values[i] + '°C');
        text.attr(textStyle);
      } else {
        var text = r.text(X[i], Y[i] + (obj.fontWz || 15), values[i] + '°C');
        text.attr(textStyle);
      }
    }
    //画图
    function drawPath() {
      var p = [];
      for (var j = 1, jj = X.length; j < jj; j++) {
        p.push(X[j], Y[j]);
      }
      p = ["M", X[0], Y[0], "R"].concat(p);
      var subaddon;
      if (xr) {
        subaddon = "L" + (W - PADDING.left) + "," + 0 + ",42," + (0) + "z";
      } else {
        subaddon = "L" + (W - PADDING.left) + "," + (H - PADDING.buttom) + ",42," + (H - PADDING.top) + "z";
      }

      path.attr({path: p});
      sub.attr({path: p + subaddon});

    }
    drawPath();

  
  }


var drawBaseOb = {
          id: 'drawTE', //id
          xr: 'xr',//判断上下
          line: 'line'//判断是否是画线
        };
        var drawOobject = {
          color: "#e99a58",//背景颜色
          dotColor: '#e9914c',//点颜色
          dotDiameter: 5,//点的大小
          dotStrokeColor: '#fff',//点的外围颜色
          dotStroke: '3', //点的外圈的宽度
          opacity: 0,//透明度
          PADDING: {left: 41, top: 7, right: 41, buttom: 7},//图表的内边距
          W: 1629,//图表宽度
          H: 80,//图表高度
          textStyle: {"fill": "#999", "font-size": "16px", "text-anchor": "center"},//设置文字样式
          values:xsData,//数据
          fontWz:20
        };
        dw(drawBaseOb, drawOobject)


