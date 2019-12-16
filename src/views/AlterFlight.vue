<template>
  <div>
    <Header></Header>
    <div class="lista-voo">
      <div class="lista">
        <div class="selecao">
          <div>Selecione o voo:</div>
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
      <div class="info-voo">
        <div class="card">
          <div class="row">
            <div>Local de Partida:</div>
            <div> {{flight.origin}} </div>
          </div>
          <div class="row">
            <div>Data/Hora: </div>
            <datetime type="datetime" v-model="flight.arrival_date" locale='br'></datetime>
          </div>
        </div>

        <div class="icon"></div>

        <div class="card">
          <div class="row">
            <div>Local de Chegada:</div>
            <div>{{flight.destiny}}</div>
          </div>
          <div class="row">
            <div>Data/Hora:</div>
            <datetime type="datetime" v-model="flight.departure_date" place></datetime>
          </div>
        </div>

        <div class="icon">
        </div>
        <div class="card">
          <div class="row">
            <div>Portão de embarque:</div>
            <input type="text" v-model="flight.port" class="inputgate">
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
import { Datetime } from 'vue-datetime';
import Vue from 'vue';
import swal from 'sweetalert';
import { Settings } from 'luxon';
import Header from '@/components/Header.vue';

Settings.defaultLocale = 'pt-br';
Vue.component('datetime', Datetime);

export default {
  name: 'alter',
  data() {
    return {
      gate: '',
      flight: [],
      info: [],
      FilteredFlight: [],
      modal: false,
      datetime_departure: '',
      datetime_arival: '',
    };
  },
  components: {
    Header,
  },
  methods: {
    GetItems() {
      this.$http.get(`${this.$config.server}/flights`)
        .then(
          (response) => { this.info = response.data; },
        )
        .catch(ex => console.log(ex));
    },
    FilterFlight() {
      this.FilteredFlight = this.info.filter(
        dado => dado.code.toLowerCase().startsWith(this.flight.code.toLowerCase()),
      );
    },
    SetFlight(flight) {
      this.flight = flight;
      this.modal = false;
    },
    SendMensage(flight) {
      this.$http.put(`${this.$config.server}/flights/${flight.id}`, this.flight)
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
.lista {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.selecao {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  margin: 10px;
  position: relative;
}
.lista-voo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #f1f2f6;
}
.info-voo {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  width: 630px;
  margin: 12px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  line-height: 20px;
  color: #3e3e3e;
  margin: 10px;
}
.card{
  margin: 30px;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: linear-gradient(
    91.02deg,
    rgba(1, 161, 255, 0.14) 0.01%,
    #017aff 101.95%
  );
  width: 619px;
  height: 1px;
  left: 298px;
  top: 789px;
  margin-bottom: 30px;
  margin-top: 30px;
}
.confirmacao {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: flex-end;
  margin: 7px;
  padding: none;
  height: 50px;
}
.enterdata{
  height: 26px;
  border-radius: 5px;
  font-size: 18px;
  cursor: text;
  width: 148px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3e3e3e;
  margin-inline-start: 3px;
}
.listdata{
  list-style-type: none;
  text-align:center;
  font-size: 16px;
  cursor: pointer;
  border: black;
  border-color: #3e3e3e;
  background: white;
  margin: 2px;
  padding: 2px;
  height: 26px;
  border-radius: 5px;
}
.filterdata{
  height: 26px;
  border-radius: 5px;
  font-size: 18px;
  cursor: text;
  width: 148px;
  color: #3e3e3e;
  margin: 2px;
  padding: 2px;
  margin-inline-start: 3px;
}
.inputgate{
  margin-inline-start: 3px;
  height: 26px;
  border-radius: 5px;
  font-size: 18px;
  cursor: text;
  width: 148px;
}
.vdatetime-input{
  margin-inline-start: 3px;
  height: 26px;
  border-radius: 5px;
  font-size: 18px;
  cursor: text;
  width: 164px;
font-size: 14px;
}
</style>
