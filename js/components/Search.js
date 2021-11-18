'use strict';

Vue.component('search', {
    data() {
        return {
            validateString: '',
        }
    },

    template: `
      <form action="#" class="search-form" @submit.prevent="$emit('filter', validateString)">
          <input type="text" class="search-field" v-model="validateString">
          <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
          </button>
      </form>
    `
})