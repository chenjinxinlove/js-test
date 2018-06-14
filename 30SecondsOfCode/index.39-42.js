/**
 * runAsync
 * scrollToTop
 * formatDuration
 * tomorrow
 */

 const scrollToTop = () => {
   const c = document.documentElement.scrollTop || document.body.scrollTop;
   if (c > 0) {
     window.requestAnimationFrame(screenTop);
     window.scrollTo(0, c - c / 8)
   }
 }

 const formatDuration = ms => {
   if (ms < 0) ms = -ms;
   const time = {
     day: Math.floor(ms / 86400000),
     hour: Math.floor(ms / 3600000) % 24,
     minute: Math.floor(ms / 60000) % 60,
     second: Math.floor(ms / 1000) % 60,
     millisecond: Math.floor(ms) % 1000
   };
   return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(val => val[1] + ' ' + (val[1] !== 1 ? val[0] + 's' : val[0]))
    .join(', ');
 }

 console.log(formatDuration(34325055574));


 const tomorrow = (long = false) => {
   let t = new Date();
   t.setDate(t.getDate() + 1);
   const ret = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
   return !long ? ret : `${ret}T00:00:00`;
 }

console.log(tomorrow());
console.log(tomorrow(true)); 