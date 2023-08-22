<template>
    <div>
        <a-modal v-model="isModalActiveLocal" title="Import Dari Excel" :width="1000">
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <h3>Import XLSX</h3>
                <a-upload name="file" @before-upload="onChange" accept=".xls,.xlsx">
                    <a-button> <a-icon type="upload" /> Click to Upload </a-button>
                </a-upload>
                <xlsx-read :file="file">
                    <!-- <xlsx-table class="vue-excel-table" /> -->
                    <xlsx-json :options="{ header: 1 }">
                        <template #default="{ collection }">
                            <a-row :gutter="16">
                                <a-col class="gutter-row" :span="6">
                                    Judul BOP :
                                </a-col>
                                <a-col class="gutter-row" :span="6">
                                    {{ collection[0].join('') }}
                                </a-col>
                            </a-row>
                            <div>
                            </div>
                        </template>
                    </xlsx-json>
                </xlsx-read>
            </a-form-model>
            <template slot="footer">
                <a-button key="back" @click="handleCancel">
                    Cancel
                </a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                    Save
                </a-button>
            </template>
        </a-modal>
    </div>
</template>
  
<script>
export default {
    props: {
        dataToEdit: {
            type: Object,
            default: () => { },
        },
        isModalActive: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            idToPut: '',
            form: {
                no: '',
                judul: '',
                penulis: '',
                tahun_terbit: '',
                penerbit: '',
            },
            file: null,
        };
    },
    computed: {
        isModalActiveLocal: {
            get() {
                return this.isModalActive;
            },
            set(val) {
                if (!val) {
                    this.$emit("closeModal");
                }
            },
        },
    },
    methods: {
        onChange(event) {
            this.file = event.target.files ? event.target.files[0] : null;
            return false;
        },
        showModal() {
            this.visible = true;
        },
        async handleOk(e) {
            this.loading = true
            const idCheck = this.idToPut === ''
            if (idCheck) this.form['created_from'] = 'Input Manual'
            const action = idCheck ? { route: 'post', url: '/book' } : { route: 'put', url: `/book/${this.idToPut}` }
            await this.$axios[action.route](action.url, this.form).then((res) => {
                console.log({ res })
                this.resetFormValue()
                this.loading = false
                this.$emit("bookSaved")
            })
        },
        handleCancel(e) {
            this.$emit("closeModal");
        },
        resetFormValue() {
            this.form = {
                no: '',
                judul: '',
                penulis: '',
                tahun_terbit: '',
                penerbit: '',
            }
        }
    },
    watch: {
        isModalActive(val) {
            if (!val) return
            const dataEntries = Object.entries(this.dataToEdit)
            console.log('ke sini', dataEntries)
            if (dataEntries.length > 0) {
                for (const [key, value] of dataEntries) {
                    this.form[key] = value
                }
                this.idToPut = this.dataToEdit._id
                // dataEntries.forEach(val => {
                //     this.form[val] = this.dataToEdit[val]
                // })

            }
        },
    },
};
</script>
  