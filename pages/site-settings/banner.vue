<template>
	<div class="content-header" id="banner">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Banner</label>
                                    <div class="image-upload regular">
                                        <img v-if="img_url || form.photo" :src="img_url || form.photo" class="avatar w-100" />
                                        <i v-else class="far fa-image"></i>                                        
                                        <el-upload
                                            class="avatar-uploader"
                                            action="/"
                                            accept="image/png, image/jpeg, image/jpg"
                                            :auto-upload="false"
                                            :show-file-list="false"
                                            :on-change="onChangeImage">
                                            <div class="choose-blue-bar text-left py-2 px-3">
                                                <button class="btn btn-white regular">
                                                    Choose File
                                                </button>
                                                <span v-if="form.photo">{{ form.photo.name }}</span>
                                                <span v-else>No file chosen</span>
                                            </div>
                                        </el-upload>

                                        <div v-if="form.photo" class="text-left mt-3">
                                            <button class="btn btn-red" @click="deleteImage()">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 form-group">
                                    <label>First Banner Title</label>
                                    <el-input placeholder="First Banner Title" v-model="$v.form.first_title.$model" />
                                    <div v-if="$v.form.first_title.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.first_title.required">Required Field</div>
                                        <div class="note color-FF2C2C" v-if="!$v.form.first_title.maxLength">Max of {{ $v.form.first_title.$params.maxLength.max }} characters.</div>
                                    </div>
                                </div>
                                <div class="col-12 form-group">
                                    <label>Second Banner Title</label>
                                    <el-input placeholder="Second Banner Title" v-model="$v.form.second_title.$model" />
                                    <div v-if="$v.form.second_title.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.second_title.maxLength">Max of {{ $v.form.second_title.$params.maxLength.max }} characters.</div>
                                    </div>
                                </div>
                                <div class="col-12 form-group">
                                    <label>Subheading</label>
                                    <el-input placeholder="Second Banner Title" v-model="$v.form.sub_title.$model" />
                                    <div v-if="$v.form.sub_title.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.sub_title.maxLength">Max of {{ $v.form.sub_title.$params.maxLength.max }} characters.</div>
                                    </div>
                                </div>
                                <div class="col-12 form-group">
                                    <label>Call to Action Button Text</label>
                                    <el-input placeholder="Call to Action Button Text" v-model="$v.form.cta_button_text.$model" />
                                    <div v-if="$v.form.cta_button_text.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.cta_button_text.maxLength">Max of {{ $v.form.cta_button_text.$params.maxLength.max }} characters.</div>
                                    </div>
                                </div>
                                <div class="col-12 form-group">
                                    <label>Call to Action Button URL</label>
                                    <el-input placeholder="Call to Action Button URL" v-model="$v.form.cta_button_url.$model" />
                                    <div v-if="$v.form.cta_button_url.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.cta_button_url.maxLength">Max of {{ $v.form.cta_button_url.$params.maxLength.max }} characters.</div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <button class="btn btn-green btn-save" @click="recheckInputs">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { createFormData, disableButton } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                first_title: null,
                second_title: null,
                sub_title: null,
                cta_button_text: null,
                cta_button_url: null,
                photo: null,
            },

            img_url: "",
            img_url_change: false,
            img_url_deleted: false,
            image_types: ["image/png", "image/jpg", "image/jpeg"],
            file_max: 10000000,
		}
	},
    validations: {
        form: {
            first_title: {
                required,
                maxLength: maxLength(255)
            },
            second_title: {
                maxLength: maxLength(255)
            },
            sub_title: {
                maxLength: maxLength(255)
            },
            cta_button_text: {
                maxLength: maxLength(255)
            },
            cta_button_url: {
                maxLength: maxLength(255)
            },
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
        onChangeImage(file) {
            this.validateFile(file.raw, "photo", (result) => {
                if (result == true) {
                    this.form.photo = file.raw;
                    this.img_url = URL.createObjectURL(file.raw);
                    this.img_url_change = true;
                }
            });
        },
        validateFile(file, type, callback) {
            let valid_types = this.image_types;
            if (!file) {
                callback(false);
            } else if (file.size > this.file_max) {
                this.$message.error("File is too big!");
                callback(false);
            } else if (!valid_types.includes(file.type)) {
                this.$message.error("Invalid file type");
                callback(false);
            } else {
                callback(true);
            }
        },
        deleteImage() {
            this.form.photo = null;
            this.img_url = null;
            this.img_url_change = true;
            this.img_url_deleted = true;
        },
        getBanner() {
            this.$store.dispatch("settings/banner/getBanner")
            .then((res) => {
                this.form = res.data
            })
            .catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        recheckInputs() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                this.$message.error("Please fill in the required fields.")
            } else {
                this.save()
            }
        },
        save() {
            disableButton('.btn-save', true)
            let properties = Object.keys(this.form)
            let form = createFormData(this.form, properties)

            this.$store.dispatch("settings/banner/updateBanner", form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            })
            .catch(err => {
                this.$message.error('Please fill in the required fields.')
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Main Banner')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

        this.getBanner()
    } 
}
</script>