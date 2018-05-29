/**
 * getScrollPosition
 * getStyle
 * on/off
 * onUserInputChange
 *
**/

// getScrollPosition

const getScrollPositin = (el, window) => ({
	x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
	y: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollTop
})

// getStyle

const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];


// on/offf


// onUserInputChange


const onUserInputChange = callback => {
	let type = 'mouse',
		lastTime = 0;
	const mousemoveHandler = () => {
		const now = performance.now();
		if (now - lastTime < 20) 
			(type = 'mouse'), callback(type), document.removeEventListener('mousemove', mousemoveHandler);
		lastTime = now;	
	}
	document.addEventListener('touchstart', () => {
		if (type === 'touch') return;
		(type = 'touch'), callback(type), document.addEventListener('mousemove', mousemoveHandler)
	})
}