<template>
  <div>
    <Header></Header>
    <div class="lista-voo">
      <div class="lista">
      <div class="selecao">
        <div>
          Selecione o voo:
        </div>
        <div>
          <input type="text"
          autocomplete="off"
          v-model="flight.code"
          @input="FilterFlight"
          class="enterdata"
          @focus="modal = true"/>
          <div v-if="FilteredFlight && modal">
            <ul class="filterdata">
              <li v-for="FilterFlight in FilteredFlight "
                :key="FilterFlight.code"
                @click="SetFlight(FilterFlight)"
                class="listdata">
                {{ FilterFlight.code }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      <div class="informacao-voo">
        <div class="cards">
          <div class="row">
            <div >Local de Partida:</div>
            <div >{{flight.origin}} </div>
          </div>
          <div class="row">
            <div >Data/Hora: </div>
            <div><span type="date">{{flight.arrival_date}}</span> </div>
          </div>
        </div>

        <div class="icon"></div>

        <div class="cards">
          <div class="row">
            <div >Local de Chegada:</div>
            <div >{{flight.destiny}}</div>
          </div>
          <div class="row">
            <div >Data/Hora:</div>
            <div > {{flight.departure_date}}</div>
          </div>
        </div>
        <div class="icon"></div>
        <div class="cards">
          <div class="row">
            <div>Portão de embarque:</div>
            <div>{{flight.port}}</div>
          </div>
        </div>
      </div>
    <div class="confirmacao">
        <div>
            <button class="btn-confirm" v-on:click="SendMensage(flight)">Finalizar</button>
        </div>
        <div>
            <router-link to="options"><button class="btn-back">Voltar</button></router-link>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import Header from '@/components/Header.vue';

export default {
  name: 'cancelflight',
  data() {
    return {
      gate: '',
      flight: [],
      info: [],
      FilteredFlight: [],
      FilteredGate: [],
      modal: false,
    };
  },
  components: {
    Header,
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
    SetFlight(flight) {
      this.flight = flight;
      this.flight.departure_date = new Date(this.flight.departure_date).toLocaleString('pt-BR');
      this.flight.arrival_date = new Date(this.flight.arrival_date).toLocaleString('pt-BR');
      this.modal = false;
      console.log(flight);
    },
    SetGate(gate) {
      this.gate = gate;
    },
    SendMensage(flight) {
      this.$http.post(`${this.$config.server}/flights-lists/${flight.id}`, this.flight)
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
