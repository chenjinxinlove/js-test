var vnode;
function render(data) {
    var newVnode = h('table', {}, data.map(function(item){
        var tds = []
        var i
        for (i in item) {
            if (item.hasOwnProperty(i)) {
                tds.push(h('td', {}, [item[i] + '']))
            }
        }
    }))
    return h('tr', {}, tds)
    if (vnode) {
        path(vnode, newVnode)
    } else {
        path(container, newVnode)
    }
    vnode = newVnode
}