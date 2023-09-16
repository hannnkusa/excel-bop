<template>
    <div>
        <a-modal v-model="isModalActiveLocal" title="Import Dari Excel" :width="1000">
            <a-form-model :model="fileList" :label-col="labelCol" :wrapper-col="wrapperCol">
                <h3>Import XLSX</h3>
                <a-upload-dragger name="file" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload"
                    accept=".xls,.xlsx" style="width: 100%">
                    <p class="ant-upload-drag-icon">
                        <a-icon type="inbox" />
                    </p>
                    <p class="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p class="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </a-upload-dragger>
                <xlsx-read :file="fileList[0]" class="mt-10" v-if="fileList[0]">
                    <xlsx-sheets @parsed="getSheetFromWorkbook($event)">
                        <template #default="{ sheets }">
                            <a-select mode="multiple" placeholder="Pilih Sheet" style="width: 100%" v-model="selectedSheet"
                                class="mt-10">
                                <a-select-option v-for="(sheet, idx) in sheets" :key="idx">
                                    {{ sheet }}
                                </a-select-option>
                            </a-select>
                        </template>
                    </xlsx-sheets>
                    <xlsx-json :options="{ header: 1 }" v-for="(sheet, idx) in selectedSheet" :key="idx" :sheet="sheet"
                        @parsed="handleSelectedSheet($event, sheet)">
                        <!-- <template #default="{ collection }">
                        </template> -->
                    </xlsx-json>
                </xlsx-read>
                <a-list item-layout="horizontal" :data-source="properData">
                    <a-list-item slot="renderItem" slot-scope="item, index">
                        <a-list-item-meta :description="`Buku yang terdeteksi: ${item.books.length}`" :key="index">
                            <a slot="title" href="#">{{ item.title }}</a>
                            <a-avatar slot="avatar" src="/images/Excel-Icon.png" />
                        </a-list-item-meta>
                        <div>Berasal dari sheet: {{ item.sheetName }}</div>
                    </a-list-item>
                </a-list>
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
            sheetExisting: [],
            selectedSheet: [],
            properData: [],
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
            this.fileList = [file]
            this.selectedSheet = []
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
        },
        createValidBooks(books) {
            if (Array.isArray(books) && books.length > 0) {
                return books.filter((val) => {
                    if (val.length === 5 && val.some(val => !!val)) return val
                })
            }
            return
        },
        handleSelectedSheet(event, sheet) {
            const dataToPush = {
                title: event[0].join(''),
                books: this.createValidBooks(event),
                sheetName: this.sheetExisting[sheet],
                sheetIndex: sheet,
            }
            this.properData.push(dataToPush)
        },
        getSheetFromWorkbook(event) {
            this.sheetExisting = event
        },
        handleDeselectSheet(index) {
            const findIndex = this.properData.findIndex(val => val.sheetIndex === index)
            this.properData.splice(findIndex, 1)
            console.log(this.properData)
        }
    },
    watch: {
        isModalActive(val) {
            if (!val) return
            const dataEntries = Object.entries(this.dataToEdit)
            if (dataEntries.length > 0) {
                for (const [key, value] of dataEntries) {
                    this.form[key] = value
                }
                this.idToPut = this.dataToEdit._id
            }
        },
        selectedSheet: {
            handler (newVal, oldVal) {
                if (newVal.length !== oldVal.length) { return }
                return
            },
            deep: true
        }
    },
};
</script>
  