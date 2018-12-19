class ReadImg {
  constructor(fileName) {
    this.fileName  = fileName
    this.loadFromDisk() // 初始化即从硬盘中加载，模拟
  }
  display() {
    console.log('display...' + this.fileName)
  }
  loadFromDisk() {
    console.log('loading...' + this.fileName)
  }
}

class ProxyImg {
  constructor(fileName) {
    this.readImg = new ReadImg(fileName)
  }
  display() {
    this.readImg.display()
  }
}

let proxyImg = new ProxyImg('1.png')

proxyImg.display()


$('#div').click(function() {
  var _this = this
  setTimeout(function() {
    $(_this).addClass('red')
  }, 1000);
})

$('#div').click(function() {
	var _this = this
	setTimeout($.proxy(function() {
		$(_this).addClass('red')
	}, this), 1000)
})

let start = {
  name: '1',
  age: 25,
  phone: '19112222345'
}

let agent = new Proxy(start, {
  get: function (target, key) {
    if (key === 'phone') {
      // 返回经纪人的自己额手机号
      return '18233332222'
    }
    if (key === 'price') {
      // 明星不保价，经纪人报价
      return 120000
    }
    return target[key]
  },
  set: function (target, key, val) {
    if (key === 'customPrice') {
      // 最低10w
      throw new Error('价格太低')
    } else {
      target[key] = val
      return true
    }
  }
})