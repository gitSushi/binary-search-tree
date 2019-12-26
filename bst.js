class BST{
    constructor(){
        this.root = null
    }

    insertRecurse(val){
        
    }

    add(value){
        const node = this.root
        const newNode = new Node(value)
        if(node === null){
            this.root = newNode
            this.balanceInsert(this.root)
        }else{
            const searchTree = (n) => {
                if(value < n.value){
                    if(n.left === null){
                        n.left = newNode
                        n.left.parent = n
                        this.balanceInsert(n.left)
                    }
                    else{
                        return searchTree(n.left)
                    }
                }
                if(value > n.value){
                    if(n.right === null){
                        n.right = newNode
                        n.right.parent = n
                        this.balanceInsert(n.right)
                    }
                    else{
                        return searchTree(n.right)
                    }
                }
            }
            return searchTree(node)
        }
    }

    remove(value){
        const node = this.root
        if(node === null){
            return null
        }
        const removeNode = (n, val) => {
            if(val === n.value){
                //if no children
                if(n.left === null && n.right === null){
                    return null
                }
                //if no left child
                if(n.left === null){
                    return n.right
                }
                //if no right child
                if(n.right === null){
                    return n.left
                }
                // if both
                let temp = n.right
                while(temp.left !== null){
                    temp = temp.left
                }
                n.value = temp.value
                n.right = removeNode(n.right, temp.value)
                return n
            }else if(val < n.value){
                n.left = removeNode(n.left, val)
                return n
            }else{
                n.right = removeNode(n.right, val)
                return n
            }
        }
        this.root = removeNode(node, value)
    }

    preOrder() {
        const node = this.root
        if (node == null) {
          return null
        } else {
          var result = []
          const traverse = (n) => {
            result.push(n.value)
            if(n.left !== null){
                traverse(n.left)
            }
            if(n.right !== null){
                traverse(n.right)
            }
          }
          traverse(node)
          return result
        }
    }

    findMinHeight(node = this.root) {
        if (node == null) {
            return -1
        }
        let left = this.findMinHeight(node.left)
        let right = this.findMinHeight(node.right)
        if (left < right) {
            return left + 1
        } else {
            return right + 1
        }
    }

    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1
        }
        let left = this.findMaxHeight(node.left)
        let right = this.findMaxHeight(node.right)
        if (left > right) {
            return left + 1
        } else {
            return right + 1
        }
    }

    minHeight(node = this.root){
        if(!node) return -1
        if(!node.left && !node.right) return 0
        if(!node.left) return this.minHeight(node.right) + 1
        if(!node.right) return this.minHeight(node.left) + 1
        return Math.min(this.minHeight(node.left), this.minHeight(node.right)) + 1
    }

    maxHeight(node = this.root){
        if(!node) return -1
        if(!node.left && !node.right) return 0
        if(!node.left) return this.maxHeight(node.right) + 1
        if(!node.right) return this.maxHeight(node.left) + 1
        return Math.max(this.maxHeight(node.left), this.maxHeight(node.right)) + 1
    }

    replaceNode(original, replacement) {
        if (original.parent === null) {
            this.root = replacement
        } else {
            if (original === original.parent.left) {
                original.parent.left = replacement
            } else {
                original.parent.right = replacement
            }
        }
        
        if (replacement !== null) {
            replacement.parent = original.parent
        }
    }
    
    rotateLeft(node) {
        var righty = node.right
        this.replaceNode(node, righty)
        
        // Update pointers
        node.right = righty.left
        if (righty.left !== null) righty.left.parent = node
        righty.left = node
        node.parent = righty
    }

    rotateRight(node) {
        var lefty = node.left
        this.replaceNode(node, lefty)
        
        // Update pointers
        node.left = lefty.right
        if (lefty.right !== null) lefty.right.parent = node
        lefty.right = node
        node.parent = lefty
    }

    nodeColor(node) {
        return node === null ? COLOR.black : node.color
    }

    balanceInsert(n){
        // root case
        const insertCase1 = node => {
            if(node.parent === null){
                node.color = COLOR.black
            }else{
                insertCase2(node)
            }
        }
        // black parent case
        const insertCase2 = node => {
            if(this.nodeColor(node.parent) === COLOR.black) return
            else insertCase3(node)
        }
        // uncle is red case
        const insertCase3 = node => {
            const uncle = node.uncle()
            const grandParent = node.grandParent()
            
            if (uncle !== null && this.nodeColor(uncle) === COLOR.red) {
                node.parent.color = COLOR.black
                uncle.color = COLOR.black
                grandParent.color = COLOR.red
                insertCase1(grandParent)
            } else {
                insertCase4(node)
            }
        }
        // first left or right case
        const insertCase4 = node => {
            const grandparent = node.grandParent()

            if (node === node.parent.right && node.parent === grandparent.left) {
                this.rotateLeft(node.parent)
                node = node.left
            } else if (node === node.parent.left && node.parent === grandparent.right) {
                this.rotateRight(node.parent)
                node = node.right
            }
            
            insertCase5(node)
        }
        // second left or right case
        const insertCase5 = node => {
            const grandparent = node.grandParent()
            
            node.parent.color = COLOR.black
            grandparent.color = COLOR.red
            
            if (node === node.parent.left && node.parent === grandparent.left) {
                this.rotateRight(grandparent)
            } else if (node === node.parent.right && node.parent === grandparent.right) {
                this.rotateLeft(grandparent)
            }
        }
        // for a result of 4 different cases : left-left, left-right, right-right OR right-left

        insertCase1(n)
    }
}