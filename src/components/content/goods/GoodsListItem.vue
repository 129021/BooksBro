<template>
  <div class="goods-list-item">
    <img src="~assets/images/11.png" alt="" />
    <div class="goods-info">
      <p>标题</p>
      <span class="price"><small>$</small>100</span>
      <span class="collect">3</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
};
</script>

<style  scoped>
.goods-list-item{
width: 45%;
padding-bottom:40px ;
position: relative;
}

.goods-list-item img{
    width: 100%;
    border-radius: 5px;
}

.goods-list-item  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0px;
    right: 0px;

}

.goods-list-item .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}

.goods-list-item .goods-info .price{
    color:red;
    margin-right: 20px;
}

.goods-list-item .goods-info .collect{
    position: relative;
}

.goods-list-item .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;

    background: url('~assets/images/collect1.png') 0 0/14px 14px;
}
</style>