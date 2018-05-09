<template>
  <div class="deity"   >
    
    <div class="cardBox" id="cardBox">
        <div class="timebox">
            <div v-if="arrObj">{{time}}</div>
        </div>
        <div v-if="!arrObj" @click="init" class="startbox">
            <div class="startbutton">{{buttonText}}</div>
        </div>
        <div v-if="!arrObj" class="endbox">{{end}}</div>
        <Card 
        v-for="(ia, index) in deck" 
        :key="'aa'+index" 
        :class="ia" 
        :setName="ia"
        :setStyle="index"
        @getSelectCard="getSelectCard"
        :canClick="canClick"
        ref="Card"
        v-if="arrObj"
        />
    </div>
</div>
  
</template>
<script>
import './Deity.scss';
import Card from './Card';
export default {
    name:'Deity',
    components: {
        Card
    },
    data:function(){
        return{
            arrObj:false,
            deck:this.GLOBAL.deck,
            SelectCardName:[],
            SelectCardIndex:[],
            canClick:true,
            matchCont:0,
            buttonText:'开始游戏',
            time:0,
            end:''
        }
    },
    created:function(){
        
    },
    methods:{
        init: function () {
            this.GLOBAL.deck.sort(this.shuffle)
            this.arrObj = true;
            let _this = this;
            this.matchCont = 0;
            this.intervalid = setInterval(function(){
                _this.time++;
            },1000)
        },
        /**
         * 洗牌功能
         */
        shuffle:function(){
            //Math.random能返回0~1之间的数
            return Math.random()>0.5 ? -1 : 1
        },
        /**
         * 点击卡牌
         * 判断当前翻牌数为2张以下
         * 两张时开始判断是否match
         */
        getSelectCard:function(data){
            if(this.SelectCardName.length==0){
                this.SelectCardName.push(data.name);
                this.SelectCardIndex.push(data.index);
            }
            if(this.SelectCardName.length==1){
                    if(data.index==this.SelectCardIndex[0]){
                        return;//重复点同一张牌无效
                    }else{
                        this.SelectCardName.push(data.name);
                        this.SelectCardIndex.push(data.index);
                    }
            }
            if(this.SelectCardName.length==2){
                this.canClick = false;//已选两张卡牌，可点击功能设为不能
                let _this = this;
                setTimeout(function(){
                    _this.checkPattern();
                },700);
            }
            
        },
        /**
         * 判断两张牌是否match
         * 对相应index的子组件进行子组件方法调用
         */
        checkPattern:function(){
            if(this.SelectCardName[0]==this.SelectCardName[1]){
                this.$refs.Card[this.SelectCardIndex[0]].matchTrue()
                this.$refs.Card[this.SelectCardIndex[1]].matchTrue()
                this.matchCont++
            }else{
                this.$refs.Card[this.SelectCardIndex[0]].matchFalse()
                this.$refs.Card[this.SelectCardIndex[1]].matchFalse()
            }
            //重置，并恢复可点击
            this.SelectCardName=[];
            this.SelectCardIndex=[];
            this.canClick = true;
        }
    },
    watch:{
        matchCont:function(val){
            console.log(val)
            if(val==(this.GLOBAL.deck.length/2)){
                this.arrObj=false
                this.buttonText="再来一盘"
                this.end="游戏结束得分"+this.time+'秒';
                clearInterval(this.intervalid);
            }
        }
    }
    
}
</script>
