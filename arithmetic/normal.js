/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 翻转链表 

var reverseList = function(head) {
    var prev = null;
    var cur = head;
    var temp = null;
    while (cur !== null) {
        temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp;
    }
    return prev;
}

// 斐波那契数列

var cache = {
    0: 0,
    1: 1
};

function fibonacci(n) {
    if (typeof cache[n] === 'number') { 
        return cache[n];
    }
    var result = cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return result;
}

// 前序遍历

var preorder = function(root) {
    const res = [];
    function order(node) {
        if (node) {
            res.push(node.val);
            order(node.left);
            order(node.right);
        }
    }
    order(root)
    return res;
};

// 中序遍历

var inorder = function(root) {
    const res = [];
    function order(node) {
        if (node) {
            order(node.left)
            res.push(node.val)
            order(node.right)
        }
    }
    order(root)
    return res;
};

// 后序遍历

var postorder = function(root) {
    const res = [];
    function order(node) {
        if (node) {
            order(node.left)
            order(node.right)
            res.push(node.val)
        }
    }
    order(root)
    return res
};

// 翻转二叉树

var invertTree = function(root) {
    if(root == null) {
        return null;
    }
    invertTree(root.left);
    invertTree(root.right);
    [root.left, root.right] = [root.right, root.left];
    return root;
};

// 最大深度

var maxDepth = function(root) {
    if(root === null) {
        return 0;
    }
    var leftMaxDepth = maxDepth(root.left);
    var rightMaxDepth = maxDepth(root.right);
    return Math.max(leftMaxDepth, rightMaxDepth) + 1;
};