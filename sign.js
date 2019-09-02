
Vue.component("sign",{
    data(){
      return{
    
      }
    },
    props:['signshow'],
    template:`<div class="sign"  v-if="signshow" v-cloak>
        <div id="box">
            <canvas id="canvas" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
        </div>
        <div class="flex-row space-around">
            <button class="btn2" @click="exit">退出</button>
           <button class="btn2" @click="reset">重置</button>
           <button class="btn2" @click="save">保存</button> 
           <button class="btn2" @click="empty">清空签名</button> 
        </div>
    
    </div>`,
    methods:{
      exit(){
            vm.signShow=false;
            $('#a').removeClass("fix") 
            $(window).scrollTop(vm.top);
       },
       touchstart(e){
               vm.cxt.beginPath();
               vm.cxt.moveTo(e.changedTouches[0].pageX-vm.canvas.offsetLeft, e.changedTouches[0].pageY-10);
            },
       touchmove(e){
                vm.cxt.lineTo(e.changedTouches[0].pageX-vm.canvas.offsetLeft, e.changedTouches[0].pageY-10);    
                vm.cxt.stroke();  
            },
       touchend(e){
                vm.cxt.closePath(); 
           },
       reset(){
                vm.cxt.clearRect(0,0,vm.canvas.width,vm.canvas.height);
                vm.cxt.fillRect(0,0,vm.canvas.width,vm.canvas.height);
       },
       empty(){
               $("#"+vm.signature).empty();
       },
       save:function(){
                vm.signShow=false;
                $('#a').removeClass("fix") 
                $(window).scrollTop(vm.top);
                this.canvas2=document.createElement("canvas");
                this.context=this.canvas2.getContext('2d');
                var img=new Image();
                img.src=vm.canvas.toDataURL();
                var that=this;
                this.canvas2.width=200;
                this.canvas2.height=50;
                img.onload=function(){
                  that.context.drawImage(img,0,0,img.width,img.height,0,0,200,50);
                }
                setTimeout(function(){
                   var a=document.getElementById(vm.signature);
                   var childImg=a.getElementsByTagName("img")[0];
                   if(vm.status && childImg){
                    childImg.parentNode.removeChild(childImg);
                   }
                   var img2=document.createElement("img");
                   img2.src=that.canvas2.toDataURL();
                   vm.img2 = img2;
                   a.appendChild(img2);
                },50)   
                 
               
            },

    },
    watch:{
      signshow(){
            if(this.signshow){
            var that=vm;
            this.$nextTick(function(){
             that.box=document.getElementById("box");
             that.canvas=document.getElementById("canvas");
             that.cxt=that.canvas.getContext("2d");
             that.canvas.width=that.box.offsetWidth;
             that.canvas.height=that.box.offsetHeight;
             that.cxt.fillStyle="#fff";
             that.cxt.lineWidth=4;
             that.cxt.fillRect(0,0,that.canvas.width,that.canvas.height);
             
            })
            }
           },
    }

    
  })
