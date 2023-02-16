<template>
  <div class="content-header" id="abstract">
    <div class="container-fluid">
      <div class="container-fluid mt-2 bg-white corner-rounded p-3">
        <div class="row">
          <b-table
            hover
            :items="abstracts"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            :responsive="true"
            :busy="isBusy"
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
                No E-Poster Abstracts were found.
              </div>
            </template>
            <template v-slot:cell(authors)="row">
              <ul class="no-bullets">
                <li v-for="author in row.item.authors" :key="author.id">
                  <span>{{ author.first_name + " " + author.last_name }}</span>
                </li>
              </ul>
            </template>
            <template v-slot:cell(email)="row">
              <ul class="no-bullets">
                <li v-for="author in row.item.authors" :key="author.id">
                  <span>{{ author.email }}</span>
                </li>
              </ul>
            </template>
            <template v-slot:cell(action)="row">
              <button class="btn btn-blue py-2 corner-22px opensans w-50 corner-pill mb-2" @click="openAbstractModal(row.item.id)">View</button>
<!--              <button v-if="adminCapability.can_delete_abstract"-->
<!--                      class="btn btn-red py-2 corner-22px opensans w-50 corner-pill" :class='"btn-delete-abstract-" + row.item.id'-->
<!--                      @click="deleteAbstract(row.item.id)">-->
<!--                Delete-->
<!--              </button>-->
            </template>
            <template v-slot:cell(created_at)="row">
              {{ new Date(row.item.created_at) | moment("MMMM D, YYYY") }}
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
    <ModalAbstractPreview ref="AbstractPreviewModal"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { disableButton } from "~/components/Helper/functions.js"
export default {
  middleware: "auth",
  data() {
    return {
      abstracts: [],
      searchTerm: null,

      fields: [
        { key: 'id', label: 'Abstract ID #', thClass: "text-center", tdClass: "align-middle text-center", sortable: true },
        { key: 'authors', label: 'Submitting Author', thClass: "text-center", tdClass: "align-middle text-center" },
        { key: 'email', label: 'Email', thClass: "text-center", tdClass: "align-middle text-center" },
        { key: 'action', label: 'Abstract File', thClass: "text-center", tdClass: "align-middle text-center"},
        { key: 'created_at', label: 'Date Submitted', thClass: "text-center", tdClass: "align-middle text-center", sortable: true },
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
    getEposters() {
      this.$store.dispatch("abstract/getAllEposterAbstracts")
        .then(res => {
          this.abstracts = res.data
          this.rows = this.abstracts.length
        })
        .catch(err => {
          console.error(err)
        })
    },
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
    openAbstractModal(abstract_id) {
      this.$refs.AbstractPreviewModal.openModal(abstract_id, true);
    },
    deleteAbstract(id) {
      this.$confirm('This will delete the abstract. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        disableButton('.btn-delete-abstract-' + id, true)
        this.$store.dispatch("abstract/delete", id)
          .then((res) => {
            this.$message.success(res.data.message)
            this.getEposters()
            disableButton('.btn-delete-abstract-' + id, false)
          })
          .catch((err) => {
            this.$message.error(err)
            disableButton('.btn-delete-abstract-' + id, false)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete Cancelled'
        });
      });
    }
  },
  mounted() {
    this.setNavbarTitle('E-Poster Presentation')
    this.setNavbarSubpageTitle('')
    this.setNavbarIcon('')

    this.getEposters()
  }
}
</script>

<style>
ul {
  list-style-type: none;
}
</style>
