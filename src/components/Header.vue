<template>
  <div>
    <div class="topo">
      <div class="container">
        <div class="item">
          <img
            alt="Aircom logo"
            src="../assets/aircom.png"
            width="83px"
            height="51px"
          />,
        </div>
        <div class="item">
          <img src="../assets/totalvoice.png" alt="TotalVoice logo" width="93px" height="15px" />
        </div>
      </div>
    </div>

    <div class="logociaaerea">
      <img src="../assets/travel.png" alt="Travel" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
.topo {
  width: 100%;
  height: 70px;
  left: 0px;
  top: 0px;
  background: #3742fa;
}

.container {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
  padding: none;
}

.item {
  margin: 10px;
}

.logociaaerea {
  height: 100px;
  background: #f1f2f6;
  padding: 20px;
  display: flex;
  align-items: center;
}
.logociaaerea img {
    width: 90px;
    height: 100px;
    margin-left: 625px;
}
</style>
