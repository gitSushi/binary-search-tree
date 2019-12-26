class Node{
    constructor(value){
        this.value = value,
        this.left = null,
        this.right = null,
        this.parent = null,
        this.color = COLOR.red
    }

    grandParent(){
        if(this.parent === null) return null
        return this.parent.parent
    }
    sibling(){
        if(this.parent === null) return null
        return this === this.parent.left ? this.parent.right : this.parent.left
    }
    uncle(){
        if(this.parent === null) return null
        return this.parent.sibling()
    }
}

const COLOR = {
    red: 'red',
    black: 'black'
}