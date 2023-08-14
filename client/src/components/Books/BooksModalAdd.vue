<template>
    <div>
        <a-modal v-model="isModalActiveLocal" :title="`${idToPut === '' ? 'Buat' : 'Update' } Data Buku`" :width="700">
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="No">
                    <a-input placeholder="Masukkan Nomor BOP" v-model="form.no" />
                </a-form-model-item>
                <a-form-model-item label="Judul">
                    <a-input placeholder="Masukkan Judul Buku" v-model="form.judul" />
                </a-form-model-item>
                <a-form-model-item label="Penulis">
                    <a-input placeholder="Masukkan Nama Penulis" v-model="form.penulis" />
                </a-form-model-item>
                <a-form-model-item label="Tahun Terbit">
                    <a-input placeholder="Masukkan Tahun Terbit" v-model="form.tahun_terbit" />
                </a-form-model-item>
                <a-form-model-item label="Penerbit">
                    <a-input placeholder="Masukkan Penerbit" v-model="form.penerbit" />
                </a-form-model-item>
            </a-form-model>
            <template slot="footer">
                <a-button key="back" @click="handleCancel">
                    Cancel
                </a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                    {{ idToPut === '' ? 'Create' : 'Update' }}
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
            default: () => {},
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
  