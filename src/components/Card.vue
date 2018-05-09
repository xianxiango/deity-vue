<template>
  <div 
    class="card" 
    :style="positionObject" 
    :class="cardState+showhide"
    @click="pickCard(canClick)"
    >
  </div>
</template>
<script>

export default {
    name:'Card',
    mounted:function(){
    },
    props: {
        setName: String,
        setStyle: Number,
        canClick: Boolean
    },
    data: function () {
        return {
            cardName: this.setName,//卡名
            cardStyle: this.setStyle,//卡index(控制卡定位)
            cardState: 'back',//卡正反面状态(默认为反)
            showhide: ' cardShow',//卡显示或消失(默认显示)
        }
    },
    methods:{
        /**
         * 点击卡牌
         * 设为已翻样式
         * 被父组件监听
         * 返回当前子组件信息给父组件
         */
        pickCard:function(canClick){
            if(canClick){//父组件props过来的元素，控制当前点击是否有效(一次只能翻两张牌)
                this.cardState="front"
                let data = {
                    name:this.setName,
                    index:this.cardStyle
                }
                this.$emit('getSelectCard',data);
            }
        },
        /**
         * 匹配成功消失
         */
        matchTrue:function(){
            this.showhide=" cardHide"
        },
        /**
         * 匹配失败复原
         */
        matchFalse:function(){
            this.cardState="back"
        },
    },
    computed: {
        positionObject: function(){
            const cardbox = document.getElementById('cardBox');
            
            const canvasWidth = cardbox.offsetWidth;
            const canvasheight = cardbox.offsetWidth;
           
            const cardMargin = canvasWidth*0.04;
            const cardWidth = canvasWidth*0.2;
            const cardHeight = cardWidth*3/2;
            const left = cardMargin+(cardMargin+cardWidth)*(this.cardStyle%4);
            const top =50 + cardMargin + (cardMargin+cardHeight)*Math.floor(this.cardStyle/4);
            return {
                left:`${left}px`,
                top:`${top}px`,
                width:`${cardWidth}px`,
                height:`${cardHeight}px`
            }
        }
    }
}
</script>
