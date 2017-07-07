/**
 * Created by chen on 2017/7/7.
 */


// var ids = [34112, 98325, 68125];
//
// (function sendRequest() {
//     var id = ids.shift();
//     if(id) {
//         $.ajax({url: '/get', data: {id}}).always(function () {
//             console.log('finished');
//             sendRequest();
//         })
//     } else {
//         console.log('finished')
//     }
// })()


// function getElementById(node, id) {
//     "use strict";
//     if(!node) return null;
//     if(node.id = id) return node;
//     for (var i = 0; i < node.childNodes.length; i++) {
//         var found = getElementById(node.childNodes[i], id);
//         if(found) return found;
//     }
//     return null;
// }
//
//
// getElementById(document, "test")


function getByElementId(node, id) {
    while (node) {
        if(node.id === id) return node;
        node = nextElement(node);
    }
    return null;
}
function nextElement(node) {
    if(node.children.length) {
        return node.children[0]
    }
    if(node.nextElementSibling) {
        return node.nextElementSibling;
    }
    while (node.parentNode) {
        if(node.parentNode.nextSibling) {
            return node.parentNode.nextElementSibling;
        }
        node = node.parentNode;
    }
    return null;
}