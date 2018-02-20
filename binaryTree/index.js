var arr = [1,4,5,6,7,8,9,10,12,3];

var BinaryTree = function () {
    var Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }

    function inserNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                inserNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                inserNode(node.right, newNode);
            }
        }
    }

    var root = null;
    this.insert = function (key) {
        var newNode = new Node(key);
        if(root === null) {
            root = newNode;
        } else {
            inserNode(root, newNode);
        }
    };
    //中序遍历  用于排序
    var inOrderTraverse = function (node, callback) {
      if (node !== null) {
          inOrderTraverse(node.left, callback);
          callback(node.key);
          inOrderTraverse(node.right, callback);
      }
    };

    this.inOrderTraverse = function (callback) {
        inOrderTraverse(root, callback);
    }
    //前序遍历  用于复制二叉树
    var preOrderTraverse = function (node, callback) {
      if (node !== null) {
          callback(node.key);
          preOrderTraverse(node.left, callback);
          preOrderTraverse(node.right, callback);
      }
    };

    this.preOrderTraverse = function (callback) {
        preOrderTraverse(root, callback);
    }

    //后序遍历  用于文件扫描等

    var nextOrderTraverse = function (node, callback) {
        if (node !== null) {
            nextOrderTraverse(node.left, callback);
            nextOrderTraverse(node.right, callback);
            callback(node.key);
        }
    }

    this.nextOrderTraverse = function (callback) {
        nextOrderTraverse(root, callback);
    }

    //查找最小

    var minNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }

            return node.key;
        }
    }

    this.min = function () {
        return minNode(root);
    }

    //查找最大

    var maxNode = function (node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right;
            }

            return node.key;
        }
    }

    this.max = function () {
        return maxNode(root);
    }

    //查找

    var searchNode = function (node, value) {
        if (node == null) {
            return false;
        }
        if (node.key > value) {
            searchNode(node.left, value);
        } else if (node.key < value) {
            searchNode(node.right, value);
        } else {
            return true;
        }
    };

    this.search = function (value) {
        searchNode(root, value);
    }
};

var binarytree = new BinaryTree();

arr.forEach(item => binarytree.insert(item));

var callback = function (key) {
    console.log(key);
};

// binarytree.inOrderTraverse(callback);
// binarytree.preOrderTraverse(callback);
// binarytree.nextOrderTraverse(callback);

// console.log(binarytree.min());
// console.log(binarytree.max());
// console.log(binarytree.search(8));


function deepCopy(p, c) {
    var c = c || {};
    for (let key in p) {
        if (!p.hasOwnProperty(key)) {
            continue;
        }
        if(typeof p[key] === 'object') {
            c[key] =  p[key].contrcutor === Array ? [] : {};
            deepCopy(p[key], c[key] )
        } else {
            c[key] = p[key];
        }
    }
    return c;
}

var obj = {'d': [1,2,3], 'c': 'ddd', 'f': {'g': 'f'}};


function isPalindrome(str) {
    return str === str.split('').reverse().join('');
}

function uniqe(arr) {
    return [... new set(arr)]
}

