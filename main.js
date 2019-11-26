const SHA256 = require('crypto-js/sha256');

class Block{

    constructor(index,timestamp,data,previousHash){
        this.index =index;
        this.timestamp = timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }
    calculateHash(){
        return SHA256(this.index + this.timestamp +  this.previousHash+ JSON.stringify(this.data)+this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();

        }
    }
}


class BlockChain{
    constructor(){
        this.difficulty=4;
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
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);

    }

    isValid(){
        for(let i=1;i< this.chain.length;i++)
        {
            const currentblock = this.chain[i];
            const previousBlock = this.chain[i - 1];

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


firstCoinObj = new BlockChain();
firstCoinObj.addBlock(new Block(1,'26/11/2019',{amount:4}));
firstCoinObj.addBlock(new Block(1,'26/11/2019',{amount:4}));
console.log(JSON.stringify(firstCoinObj,null,4));
console.log('is chain valid : '+ firstCoinObj.isValid() );
//firstCoinObj.chain[1].data = {amount:411};
//console.log(JSON.stringify(firstCoinObj,null,4));
//console.log('is chain valid : '+ firstCoinObj.isValid() );

