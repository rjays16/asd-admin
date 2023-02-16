<template>
<div class="content-header" id="abstract">
<div class="container-fluid">
  <div class="container-fluid mt-2 bg-white corner-rounded p-3">
    <div class="row">
      <b-table
        hover
        :items="abstract"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        class="m-2"
        :show-empty="rows == 0"
        @filtered="onFiltered">
        <template slot="table-busy">
          <div class="text-center text-success my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #empty>
          <div class="text-center">
            No submitting authors found.
          </div>
        </template>
      </b-table>
      <div class="w-100 m-2" v-if="rows > 0">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          class="float-right green-pagination"
          prev-text="Previous"
          next-text="Next"
          first-number
          last-number
        ></b-pagination>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  middleware: "auth",
  data() {
    return {
      searchTerm: null,

      abstract: [],
      fields: [
        { key: 'author', label: 'Submitting Author', tdClass: "align-middle" },
        { key: 'email', label: 'Email', tdClass: "align-middle" },
        { key: 'abstract', label: 'Abstract File', tdClass: "align-middle" },
      ],

      rows: 0,
      currentPage: 1,
      perPage: 10,
      feeCriteria: '',
      feeFilterTimeout: null,
      isBusy: false,
    }
  },
  methods: {
    setNavbarTitle(title) {
      this.$store.commit('SET_NAVBAR_TITLE', title)
    },
    setNavbarIcon(icon) {
      this.$store.commit('SET_NAVBAR_ICON', icon)
    },
    setNavbarSubpageTitle(subtitle) {
      this.$store.commit('SET_NAVBAR_SUBPAGE_TITLE', subtitle)
    },

    onFiltered(filtered_items) {
      this.rows = filtered_items.length
      this.currentPage = 1
    },

  },
  mounted() {
    this.setNavbarTitle('Submitting Authors')
    this.setNavbarSubpageTitle('')
    this.setNavbarIcon('')
  }
}
</script>
