const withTry = require('../HigherOrderFunctions/withTry');

//#region helpers

/**
 * _search
 * @param root root of the tree  
 * @param data data you want to search for in the tree
 */
function _search(root, data){
    if(!root ) return -1;
    return (data > root.data)? _search(root.right, data):
    (data < root.data)? _search(root.left, data):
    root;
  
}

/**
 * Recursive insert help
 */
function _insert(root, node){
if(! root) return node;
if(root.data > node.data )root.left =  _insert(root.left, node)
else if(root.data < node.data) root.right =  _insert(root.right, node);
return root;
}

/**
 *   _delete
 *   @param root the root of the tree
 *   @param data data you want to delete
 * * delete a node from the tree by its value.
 */
function _delete(root, data){
        if(!root) return root;
        if(root.data > data) {
            root.left = _delete(root.left, data);
            return root;
        }
        else if(root.data < data) {
            root.right = _delete(root.right, data);
            return root;
        }
        else{
            let newNode;
            if(!root.left){
                newNode = root.right;
                root = null;
                return newNode;
            }

            if(!root.right){
                newNode = root.left;
                root = null;
                return newNode
            }

            newNode = _getMinNode(root.right);
            root.data = newNode.data;
            root.right = _delete(root.right, newNode.data);

            return root
        }

    }

/**
 *   _view
 *   @param root root of the tree
 * * Recursive view helper to get all data from the tree
 */
function _view(root){
    if(! root) return [];
    let v = root.data;
    let r = _view(root.right);
    let l = _view(root.left);
    return [v, r, l];
    }

/**
 *   Recursive getMaxDepth
 *   @param root root of the tree
 * * get the max depth of the tree
 */
function _getMaxDepth(root){
            if(! root) return 1;
        
            const left  = _getMaxDepth(root.left);
            const right = _getMaxDepth(root.right);
            
            return Math.max(left, right) + 1;
        }

/**
 *   _getMaxNode 
 *   @param root root of the tree
 * * get the max node from a tree root
 */
function _getMaxNode(root){
    return (root.right)? _getMaxNode(root.right):root;
}

/**
 *   _getMinNode 
 *   @param root root of the tree
 * * get the min node from a tree root
 */
function _getMinNode(root){
    return (root.left)? _getMinNode(root.left): root; 
}

//#endregion

function BSTNode(data){
    this.data = data;
    this.left = null;
    this.right = null;
}

function BST(data = []){
    this.root = null;
    this.size = 0;

    if(data.length > 0 ){
        data.forEach(element => {
            this.insert(element);
        })
    }
}

/**
 *   insert
 *   @param data the data you want to insert in the tree
 * * Inserts a node in the tree.
 */
BST.prototype.insert = withTry(function(data){
    const newNode = new BSTNode(data);
    this.root = (this.size === 0)? newNode : _insert(this.root, newNode);
    this.size += 1;
    return this;
});


/**
 *   getMaxDepth
 * * gets the max depth of the tree
 */
BST.prototype.getMaxDepth = withTry(function(){
    if(this.size === 0) throw "Can not get depth od an empty tree";
    if(this.size === 1) return 0;
    return _getMaxDepth(this.root) - 1;
});

/**
 *   delete
 *   @param data data you want to delete
 * * delete a node from the tree by its value
 */
BST.prototype.delete = withTry(function(data){
    if(this.size === 0)throw 'Can not delete from an empty tree'

    this.root = _delete(this.root, data);
    this.size -= 1;
    return  this;
})

/**
 *   view
 * * Display the tree
 */
BST.prototype.view = withTry(function(){ 
    if(this.size === 0 ) throw "Can not display an enmpty tree";
    const maxDepth = this.getMaxDepth();
    console.log(`Tree max depth : ${maxDepth}\nTree Items: ${this.size}\nTree:\n`)
    const root = this.root.data;
    const left = `${_view(this.root.left)}`;
    const right =`${_view(this.root.right)}`;
    const leftPush = len => ' '.repeat(left.length + len)
    let log = ` ${leftPush(3)} ${root}\n ${leftPush(3)}/ \\\n${leftPush(3)}/   \\\n${leftPush(2)}/     \\\n{${left}}       {${right}}` 
    console.log(log);
    return this;
});

/**
 *   getMaxNode
 * * returns the node that contains the max value in the tree;
 */
BST.prototype.getMaxNode = withTry(function(){
    if(this.size === 0)throw 'Can not delete from an empty tree';

    return _getMaxNode(this.root);
});

/**
 *   getMinNode
 * * returns the node that contains the min value in the tree;
 */
BST.prototype.getMinNode = withTry(function(){
    if(this.size === 0)throw 'Can not delete from an empty tree';
    return _getMinNode(this.root);
});

/**
 *   search
 *   @param root
 *   @param data
 * * search for a certian node in the tree
 */
BST.prototype.search = withTry(function(data){
    return _search(this.root, data);
});

module.exports = BST;