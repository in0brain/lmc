<template>
  <div class="card">
    <div class="box" >
      <img  src="http://www.icircle.it/wp-content/uploads/2016/06/strawberry.png" alt=""/>
      <div class="text-block">
        <h3 class="title">Strawberry</h3>
        <h4 class="price"><span class="old">4,30 &euro;</span> 2,30 &euro;</h4>
        <p class="description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
        </p>
      </div>
    </div>
    <div class="buttons">
      <a href="#"><i class="fa fa-heart"></i></a>
      <a href="#"><i class="fa fa-shopping-cart"></i></a>
    </div>
  </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:400,300,700);
*{ box-sizing: border-box;}
body, html { height: 100%; min-height: 100%; }
body {
  background: #ffe9e9;
  overflow: hidden;
  font-family:"Lato", sans-serif;
}
.card{
  color:#222;
  width:375px;
  height:290px;
  position:absolute;
  top:0; left:0; right:0; bottom:0;
  margin:auto;
  box-shadow: 0px 30px 30px -20px rgba(0,0,0,0.2);
  transition:all .2s cubic-bezier(1,.4,.4,.6);
  background:
      linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0) 37%,rgba(255,255,255,1) 100%);
}
.card:hover{
  bottom:-10px;
  box-shadow: 0px 20px 20px -15px rgba(0,0,0,0.2);
}

.card > .box{
  width:345px;
  height:250px;
  display:border-box;
  position:absolute;
  left:15px; bottom:23px;
  margin:auto;
  box-shadow: 0px -10px 35px -5px rgba(0,0,0,0.06);
  transition:all .4s cubic-bezier(1,.4,.4,1);
  background:
      #fff;
}

.card > .box > img{
  position:absolute;
  top:-100px;
  left:0px;
  width:100%;
}

.card > .box > .text-block {position:absolute; bottom:0px; left:20px;}
.card > .box > .text-block > .title{margin:3px 0; font-size: 1.4em;}
.card > .box > .text-block > .price{margin:6px 0 0 0; color:#d40000; font-size: 1.1em;}
.card > .box > .text-block > .price > .old{text-decoration: line-through;color:#a6a6a6; font-size: .75em;display: inline-block; margin-right:4px;}
.card > .box > .text-block > .description{color:#a6a6a6; font-size: .8em;}

.card > .buttons {transition:all .2s cubic-bezier(1,.4,.4,.6);
  position:absolute; bottom:-10px; width:50%; left:25%; text-align: center; opacity:0;}
.card:hover .buttons{bottom:-18px; opacity:1;}
.card > .buttons > a {
  font-size: .9em;
  width: 2.5em; height: 2.5em;
  display: inline-block;
  padding:.7em;
  border-radius: 100%;
  background: #d40000;
  color:#fff;
  text-decoration: none;
  transition:all .2s cubic-bezier(1,.4,.4,1);
  box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.3);
}
.card > .buttons > a:hover{
  background: #9e0000;
}
</style>