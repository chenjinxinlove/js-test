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

var preorderTraversal = function(root) {
    const res = [];
    function preorder(node) {
        if (node) {
            res.push(node.val);
            preorder(node.left);
            preorder(node.right);
        }
    }
    preorder(root)
    return res;
};

// 中序遍历

var inorderTraversal = function(root) {
    const res = [];
    function mid (node) {
        if (node) {
            mid(node.left)
            res.push(node.val)
            mid(node.right)
        }
    }
    mid(root)
    return res;
};

// 后序遍历

var postorderTraversal = function(root) {
    const res = [];
    function n(node) {
        if (node) {
            n(node.left)
            n(node.right)
            res.push(node.val)
        }
    }
    n(root)
    return res
};

// 翻转链表

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