<template>
    <div>
        <a-modal v-model="isModalActiveLocal" title="Import Dari Excel" :width="1000">
            <a-form-model :model="fileList" :label-col="labelCol" :wrapper-col="wrapperCol">
                <h3>Import XLSX</h3>
                <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" accept=".xls,.xlsx" style="width: 100%">
                    <a-button block> <a-icon type="upload" /> Select File </a-button>
                </a-upload>
                <xlsx-read :file="fileList[0]" class="mt-10" v-if="fileList[0]">
                    <xlsx-sheets>
                        <template #default="{ sheets }">
                            <a-select mode="multiple" placeholder="Pilih Sheet" style="width: 100%" v-model="selectedSheet" class="mt-10">
                                <a-select-option v-for="sheet in sheets" :key="sheet">
                                    {{ sheet }}
                                </a-select-option>
                            </a-select>
                        </template>
                    </xlsx-sheets>
                    <xlsx-json :options="{ header: 1 }" v-for="(sheet, idx) in selectedSheet" :key="idx" :sheet="sheet">
                        <template #default="{ collection }">
                            <a-row class="mt-10">
                                <a-col :span="6">
                                    <h5>Judul BOP :</h5>
                                </a-col>
                                <a-col :span="6">
                                    <h5>{{ collection[0].join('') }}</h5>
                                </a-col>
                            </a-row>
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
            labelCol: { span: 2 },
            wrapperCol: { span: 14 },
            idToPut: '',
            fileList: [],
            selectedSheet: [],
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
        handleRemove(file) {
            const index = this.fileList.indexOf(file);
            const newFileList = this.fileList.slice();
            newFileList.splice(index, 1);
            this.fileList = newFileList;
        },
        beforeUpload(file) {
            this.fileList = [...this.fileList, file];
            console.log(this.fileList)
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
            this.file = null
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
  