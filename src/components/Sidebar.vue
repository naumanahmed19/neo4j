<template>
    <div class="sidebar">
        <button class="close-btn" @click="$emit('onClose')">X</button>
        <slot />
      
    </div>   
</template>

<style  scoped>
.sidebar{  
    top:0; 
    position: fixed;
    height: 100vh;
    right: 0;
    width: 300px;
    background: #fff;
    padding: 2rem;
}
.close-btn{
    position: absolute;
    top: 0;
    left: 0;
}
</style>