class Node{
    constructor(key,value){
        this.key = key;
        this.value = value;
        this.next = null;
    };
};

class HashMap{

    constructor(loadFactor,capacity){
        this.loadFactor = loadFactor;
        this.capacity = capacity
        this.arr = new Array(capacity)

    };

    pyroHash(fuel,buckets = this.capacity) {
        let oxygen = 4111;
        const spark = 31;
        let temperature = spark;
        let ashes = 0;

        if (fuel.length === 0) return 0;

        for (let i = 0; i < fuel.length; i++) {
            const fuelElement = fuel.charCodeAt(i);

            // La energía se acumula y alimenta el fuego
            temperature = (fuelElement * oxygen);

            //Se acumulan las cenizas
            ashes += fuelElement % (temperature + oxygen);

            // El fuego se calienta con cada nueva letra
            oxygen = Math.floor(temperature/ashes);

        };

        ashes ^= (spark * oxygen * fuel.length);
        return ashes % buckets;
    };

    set(key, value){


        let position = this.pyroHash(key);
        if (!this.arr[position]){
            let node = new Node(key,value);
            this.arr[position] = node;
        }
        else{
            let currentNode = this.arr[position];
            while(true){
                if(currentNode.key === key){
                    console.log(`'${currentNode.key}' value changed from ${currentNode.value} to ${value}`);
                    currentNode.value = value;
                    return
                }else if (currentNode.next === null){
                    break;
                }
                currentNode = currentNode.next;
            };
            currentNode.next = new Node(key,value);
        };

        let factor = this.length() / this.capacity;
        if(factor > this.loadFactor){
            this.resize();
        };
    };

    get(key){
        let position = this.pyroHash(key);
        if(!this.arr[position]){return null};
        let currentNode = this.arr[position];
        while (true){
            if (currentNode.key === key){
                return currentNode.value;
            }else if (currentNode.next === null){
                return null;
            }
            currentNode = currentNode.next;
        };

    };

    has(key){
        let position = this.pyroHash(key);
        if(!this.arr[position]){return false};
        let currentNode = this.arr[position];
        while(true){
            if (currentNode.key === key){
                return true;
            }else if (currentNode.next === null){
                return false;
            }
            currentNode = currentNode.next
        };


    };

    remove(key){
        let position = this.pyroHash(key);
        let currentNode = this.arr[position];
        if(!currentNode){return false};

        if (currentNode.key === key){
            this.arr[position] = currentNode.next;
            return true;
        };

        let prevNode = currentNode;
        currentNode = currentNode.next;
        while(currentNode){
            if(currentNode.key === key){
                prevNode.next = currentNode.next;
                return true;
            }
            prevNode = currentNode;
            currentNode = currentNode.next;
        };
        return false;
    };

    length(){
        let count = 0;
        for(let i = 0; i < this.arr.length; i++){
            let currentNode = this.arr[i];
            while(currentNode){
                count++;
                currentNode = currentNode.next;
            };
        };
        return count;
    };

    clear(){
        for (let i = 0; i < this.arr.length; i++){
            let currentNode = this.arr[i];
            if (currentNode){
                this.arr[i] = null;
            };
        };
    };

    keys(){
        let newArr = [];
        for (let i = 0; i < this.arr.length; i++){
            let currentNode = this.arr[i];
            while(currentNode){
                newArr.push(currentNode.key)
                currentNode = currentNode.next;
            };
        };
        return newArr;
    };

    values(){
        let newArr = [];
        for (let i = 0; i < this.arr.length; i++){
            let currentNode = this.arr[i];
            while(currentNode){
                newArr.push(currentNode.value)
                currentNode = currentNode.next;
            };
        };
        return newArr;
    };

    entries(){
        let newArr = [];
        for (let i = 0; i < this.arr.length; i++){
            let currentNode = this.arr[i];
            while(currentNode){
                let pair = [currentNode.key,currentNode.value]
                newArr.push(pair)
                currentNode = currentNode.next;
            };
        };
        return newArr;
    };

    resize(){
        this.capacity *= 2;
        let oldArr = this.entries();
        console.log('......Expanding Buckets......');
        this.arr = new Array(this.capacity);
        for(let e of oldArr){
            this.set(e[0],e[1]);
        };
    };
}

export{HashMap}
