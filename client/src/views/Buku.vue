<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

 <template>
	<div>

		<!-- Authors Table -->
		<a-row :gutter="24" type="flex">

			<!-- Authors Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Books Table Card -->
				<BooksTable
					:data="booksData"
					:columns="table1Columns"
					@openModal="toggleModal"
					@bookDeleted="fetchBooksData"
					:isFetching="isFetching"
					@fetching="toggleTableLoading"
					@fetched="toggleTableLoading"
					@editData="editData"

					@openExcelModal="toggleExcelModal"
				/>
				<!-- / Books Table Card -->

				<BooksModalAdd
					:isModalActive="modalVisible"
					@closeModal="toggleModal"
					:dataToEdit="modalData"
					@bookSaved="bookSaved"
				/>

				<BooksExcelImport
					:isModalActive="modalExcelVisible"
					@closeModal="toggleExcelModal"
					:dataToEdit="modalData"
					@bookSaved="bookSaved"
				/>

			</a-col>
			<!-- / Authors Table Column -->

		</a-row>
		<!-- / Authors Table -->

	</div>
</template>

<script>

	// "Authors" table component.
	import BooksTable from '../components/Books/BooksTable' ;
	import BooksModalAdd from '../components/Books/BooksModalAdd' ;
	import BooksExcelImport from '../components/Books/BooksExcelImport' ;

	// "Authors" table list of columns and their properties.
	const table1Columns = [
		{
			title: 'NO',
			dataIndex: 'no',
		},
		{
			title: 'JUDUL',
			dataIndex: 'judul',
		},
		{
			title: 'PENULIS',
			dataIndex: 'penulis',
		},
		{
			title: 'TAHUN TERBIT',
			dataIndex: 'tahun_terbit',
			class: 'text-muted',
		},
		{
			title: 'PENERBIT',
			dataIndex: 'penerbit',
			class: 'text-muted',
		},
		{
			title: 'DIIMPORT DARI',
			dataIndex: 'created_from',
			class: 'text-muted',
		},
		{
            class: 'text-center',
			scopedSlots: { customRender: 'actionBtn' },
		},
	];

	export default ({
		components: {
			BooksTable,
			BooksModalAdd,
			BooksExcelImport,
		},
		data() {
			return {
				table1Columns: table1Columns,
                booksData: null,
				modalVisible: false,
				modalData: {},
				isFetching: false,

				modalExcelVisible: false,
			}
		},
		methods: {
			async fetchBooksData() {
				this.isFetching = true
				await this.$axios.get('/book').then((res) => {
					this.booksData = res.data
					this.isFetching = false
				})
			},
			toggleModal(val = false) {
				this.modalVisible = val;
			},
			toggleExcelModal(val = false) {
				this.modalExcelVisible = val;
			},
			toggleTableLoading(val = false) {
				this.isFetching = val;
			},
			bookSaved() {
				this.toggleModal()
				this.fetchBooksData()
			},
			editData(data) {
				console.log({ data })
				this.modalData = data
			},
		},
		beforeMount() {
			this.fetchBooksData()
		}
	})

</script>

<style lang="scss">
</style>