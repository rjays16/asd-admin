<template>
  <section>
    <div class="modal fade" id="abstract-preview" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header ">
            <h5 class="modal-title" id="abstract-guidelines">Preview</h5>
            <button type="button" class="close upper-right-close btn-close corner-circle" data-dismiss="modal" aria-label="Close">X</button>
          </div>
          <div class="modal-body" id="print">
            <div class="content">
              <p>
                <b>Types of Presentation: </b><span>{{ form.abstract_type === 1 ? "E-Poster" : "Free Paper Presentation"}}</span><br/>
              </p>
              <p>
                <b class="fw-bold">Title: </b><span>{{ form.title }}</span>
              </p>
              <p v-for="author, index in form.authors" :key="author.id">
                <b v-if="index === 0" class="fw-bold">Submitting author:</b>
                <b v-else class="fw-bold">Co-Author:</b>
                <span>{{ author.first_name }} {{ author.last_name }}</span>
                <b v-if="index === 0" class="fw-bold pl">Email: </b><span class="pl-3px" v-if="index === 0" >{{form.authors[0].email}}</span>
                <br/>
                <b class="fw-bold">Affiliation:</b> {{ author.country }}, {{ author.city }}
              </p>
              <p>
                <span class="text-justify">{{ form.structured_abstract }}</span>
              </p>
              <p>
                <b>Keywords: </b><span>{{form.keywords}}</span>
              </p>
              <p>
                <b class="fw-bold">Conflict of interest: </b><span>{{ form.conflict_interest !== null ? "YES - " + form.conflict_interest : "None" }}</span><br/>
                <b class="fw-bold">Commercial funding: </b><span>{{ form.commercial_funding !== null ? "YES - " + form.commercial_funding : "None" }}</span>
              </p>
              <p>
                <b class="fw-bold">Date Submitted: </b><span>{{ form.submission_date }}</span><br/>
              </p>
            </div>
          </div>
          <!--        for download section-->
          <div class="modal-footer avenir-bold justify-content-center">
            <button type="button" class="btn btn-blue corner-22px text-uppercase fa fa-download" @click="downloadPdf">
              download
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery';
import * as pdfMake from 'pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
export default {
  name: "Preview",
  data(){
    return {
      is_preview: false,
      form:{
        abstract_type: null,
        title: null,
        structured_abstract: null,
        keywords: null,
        conflict_interest: null,
        is_commercial_funding: null,
        commercial_funding: null,
        submission_date: null,
        abstract_category: null,
        study_design: null,
        authors: [{
          first_name: null, last_name: null,
          city: null, country: null,
          email: null,
          institution: null, department: null,
          affiliation_city: null, affiliation_country: null
        }],
      },
    }
  },
  methods: {
    preview(abstractData, formAuthor){
      const moment = require('moment');

      console.log("Abstract Data for Preview: ", abstractData)
      this.form.title = abstractData.title
      this.form.commercial_funding = abstractData.commercial_funding
      this.form.is_commercial_funding = abstractData.is_commercial_funding
      this.form.is_conflict_interest = abstractData.is_conflict_interest
      this.form.study_design = abstractData.study_design
      this.form.keywords = abstractData.keywords
      this.form.abstract_type = abstractData.abstract_type
      this.form.conflict_interest = abstractData.conflict_interest
      this.form.abstract_category = abstractData.abstract_category
      this.form.structured_abstract = abstractData.structured_abstract
      this.form.submission_date = moment(new Date(abstractData.created_at)).format("MMMM DD, YYYY")
      this.form.authors = formAuthor;
    },
    openModal(id, is_preview){
      this.is_preview = is_preview
      this.$store.dispatch("abstract/getAbstract", id)
        .then(res => {
          var data = res.data;
          this.preview(data, data.authors)
          $('#abstract-preview').modal('show');
        })
        .then()
    },
    downloadPdf(){
      var pdf = document.getElementById('print')
      var html = htmlToPdfmake(pdf.innerHTML);
      pdfMake.fonts = {
        Calibri: {
          normal: 'calibri.ttf',
          bold: 'calibrib.ttf',
          italics: 'calibrii.ttf',
          bolditalics: 'calibriz.ttf'
        },
      }
      var documentBody = {
        pageSize: {width: 615, height: 792.50},
        content: [
          { text: '25TH REGIONAL CONFERENCE OF DERMATOLOGY', fontSize: 14, alignment: 'center', marginBottom:10,},
          { text: html, style: 'content'},
          html,
        ],
        defaultStyle: {
          font: 'Calibri'
        },
        styles:{
          content: {
            fontSize: 12,
            alignment: 'justify',
            margin: 1,
          }
        },
      }
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentBody).download(this.form.title + ".pdf");
      $('#abstract-preview').modal('hide');
    }
  },
}
</script>

<style lang="scss" scoped>
.btn-blue{
  border-radius: 20px !important;
}
#print{
  text-align: justify;
}
</style>
