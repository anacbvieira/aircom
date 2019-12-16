<template>
  <div>
    <Header></Header>
    <div class="box">
      <div>
       <router-link to="confirmflight">
         <button class="btn-options">Confirmar voo</button>
        </router-link>
      </div>
      <div>
        <router-link to="alterflight">
          <button class="btn-options">Alterar dados do voo</button>
        </router-link>
      </div>
      <div>
        <router-link to="cancelflight">
          <button class="btn-options">Cancelar voo</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  name: 'options',
  components: {
    Header,
  },
};
</script>

<style>
.box{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px;
  height: 236px;
  background: #f1f2f6
}
.btn-options {
  width: 300px;
  height: 56px;
  color: white;
  border: none;
  margin: 14px;
  background: #1e90ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  font-size: 25px
}
</style>
