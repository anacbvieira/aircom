<template>
  <div>
    <Header></Header>
    <FlightView :flight=flight></FlightView>
    <div class="confirmacao">
        <div>
            <button class="btn-confirm" v-on:click="SendMensage(flight)">Finalizar</button>
        </div>
        <div>
            <router-link to="options"><button class="btn-back">Voltar</button></router-link>
        </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import Header from '@/components/Header.vue';
import FlightView from '@/components/FlightView.vue';

export default {
  name: 'confirm',
  data() {
    return {
      gate: '',
      flight: [],
      info: [],
      modal: false,
    };
  },
  components: {
    Header,
    FlightView,
  },
  methods: {
    GetItems() {
      this.$http.get(`${this.$config.server}/flights`)
        .then((response) => { this.info = response.data; })
        .catch(ex => console.log(ex));
    },
    FilterFlight() {
      this.FilteredFlight = this.info.filter(
        dado => dado.code.toLowerCase().startsWith(this.flight.code.toLowerCase()),
      );
    },
    SendMensage(flight) {
      this.$http.put(`${this.$config.server}/flights-lists/${flight.id}`, this.flight)
        .then(() => {
          swal('Ação finalizada', 'Confirmação enviada', 'success');
          this.flight = {};
        })
        .catch((ex) => {
          console.log(ex);
          swal('Ação não finalizada', 'Ocorreu um erro tente novamente', 'error');
        });
    },
  },
  mounted() {
    this.GetItems();
  },
};
</script>

<style>
.confirmacao {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  margin: 10px;
}
.btn-confirm {
  width: 166px;
  height: 33px;
  color: white;
  border: none;
  margin: 14px;
  background: #72ce97;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
}
.btn-back {
  width: 166px;
  height: 33px;
  color: white;
  border: none;
  margin: 14px;
  background: linear-gradient(252.4deg, #01a1ff 4.29%, #017aff 89.82%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
}
</style>
