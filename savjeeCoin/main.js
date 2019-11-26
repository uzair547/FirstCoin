const SHA256 = require('crypto-js/sha256');

class Block{

    constructor(index,timestamp,data,previousHash){
        this.index =index;
        this.timestamp = timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp +  this.previousHash+ JSON.stringify(this.data)).toString();
    }
}


class BlockChain{
    constructor(){
        this.chain=[this.createGenisisBlock()];
    }

    createGenisisBlock(){
        return new Block(0,'25/11/2019','Genisis Block','0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }

    isValid(){
        for(let i=1;i< this.chain.length;i++)
        {
            const currentblock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            console.log(JSON.stringify(currentblock,null,4));
            console.log(currentblock.hash);

            console.log(JSON.stringify(currentblock,null,4));
            console.log(currentblock.calculateHash());

            if(currentblock.hash !== currentblock.calculateHash())
            {
                return false;
            }
            if(currentblock.previousHash !== previousBlock.hash)
            {
                return false;
            }
           
        }
        return true;
    }
}


savjeeCoinObj = new BlockChain();
savjeeCoinObj.addBlock(new Block(1,'26/11/2019',{amount:4}));
//console.log(JSON.stringify(savjeeCoinObj,null,4));
console.log('is chain valid : '+ savjeeCoinObj.isValid() );
savjeeCoinObj.chain[1].data = {amount:411};
//console.log(JSON.stringify(savjeeCoinObj,null,4));
console.log('is chain valid : '+ savjeeCoinObj.isValid() );

