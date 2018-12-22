function each(data) {
	let iterator = data[Symbol.iterator]()
	let item = { done: false }
	while (!item.done) {
		item = iterator.next()
		if (!item.done) {
			if (item.value === 'a') {
				break
			}
			console.log(item.value)
		}
	}
}



function  each(data){
  for(let item in data) {
    if (item === 'a') {
				break
			}
    console.log(item)
  }
}




