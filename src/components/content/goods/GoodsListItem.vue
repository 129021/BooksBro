<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="product.cover_url" alt="" />
    <div class="goods-info">
      <p>{{product.title}}</p>
      <span class="price"><small>$</small>{{product.price}}</span>
      <span class="collect">{{product.collects_count}}</span>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
  name: "GoodsListItem",
  props: {
    product: Object,
    default() {
      return {};
    },
  },

  setup(props) {
    const router=useRouter()

    const itemClick=()=>{
      router.push({path:'/detail',query:{id:props.product.id}})
    }


    return {
      itemClick
    }
    
  }

};
</script>

<style  scoped>
.goods-list-item {
  width: 45%;
  padding-bottom: 40px;
  position: relative;
  
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-list-item .goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0px;
  right: 0px;
 
}

.goods-list-item .goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-list-item .goods-info .price {
  color: red;
  margin-right: 20px;
 
}

.goods-list-item .goods-info .collect {
  position: relative;
}

.goods-list-item .goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;

  background: url("~assets/images/collect1.png") 0 0/14px 14px;
}
</style>