
class Notifier{
    constructor(){
        this.events={}
    }

    on(eventName, handler){
        if(!this.events[eventName]) this.events[eventName]= new Map();
        const id= Symbol();
        this.events[eventName].set(id, handler);

        return ()=>{
            this.events[eventName].delete(id);
            if(this.events[eventName].size===0) delete this.events[eventName];
        }
    }

    send(eventName, ...args){
        if(!this.events[eventName]){
            retur
        }
        for( [key, val] of this.events[eventName]){
            val(...args);
        }
    }
}