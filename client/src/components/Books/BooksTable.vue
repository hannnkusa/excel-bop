<template>
	<div>
		<!-- Authors Table Card -->
		<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{ padding: 0 }">
			<template #title>
				<a-row type="flex" align="middle">
					<a-col :span="24" :md="12">
						<h5 class="font-semibold m-0">Data Buku</h5>
					</a-col>
					<a-col :span="24" :md="12" style="
              display: flex;
              align-items: center;
              justify-content: flex-end;
              gap: 10px;
            ">
						<a-button type="primary" icon="plus" @click="showModal">
							Input Manual
						</a-button>
						<a-button type="dashed" @click="showExcelModal">
							<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z"
									fill="#111827" />
							</svg>
							Import Dari Excel
						</a-button>
					</a-col>
				</a-row>
			</template>
			<a-table :columns="columns" :data-source="data" :pagination="false" :loading="isLoading">
				<template slot="author" slot-scope="author">
					<div class="table-avatar-info">
						<a-avatar shape="square" :src="author.avatar" />
						<div class="avatar-info">
							<h6>{{ author.name }}</h6>
							<p>{{ author.email }}</p>
						</div>
					</div>
				</template>

				<template slot="func" slot-scope="func">
					<div class="author-info">
						<h6 class="m-0">{{ func.job }}</h6>
						<p class="m-0 font-regular text-muted">{{ func.department }}</p>
					</div>
				</template>

				<template slot="status" slot-scope="status">
					<a-tag class="tag-status" :class="status ? 'ant-tag-primary' : 'ant-tag-muted'">
						{{ status ? "ONLINE" : "OFFLINE" }}
					</a-tag>
				</template>

				<template slot="actionBtn" slot-scope="row">
					<div>
						<a-button type="link" :data-id="row.key" @click="editData(row)">
							<a-icon type="edit" />
						</a-button>
						<a-button type="link" :data-id="row.key" @click="deleteData(row._id)">
							<a-icon type="delete" />
						</a-button>
					</div>
				</template>
			</a-table>
		</a-card>
		<!-- / Authors Table Card -->
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			default: () => [],
		},
		columns: {
			type: Array,
			default: () => [],
		},
		isFetching: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			// Active button for the "Authors" table's card header radio button group.
			authorsHeaderBtns: "all",
			isLoading: false,
		};
	},
	computed: {
		isFetchingLocal: {
			get() {
				return this.isFetching;
			},
			set(val) {
				if (!val) this.$emit("fetching")
				else this.$emit("fetched", true)
			},
		},
	},
	methods: {
		showModal() {
			this.$emit('openModal', true);
		},
		showExcelModal() {
			this.$emit('openExcelModal', true);
		},
		editData(data) {
			this.showModal()
			this.$emit("editData", data)
		},
		async deleteData(id) {
			this.isFetchingLocal = true
			this.$axios.delete(`/book/${id}`).then(() => {
				this.isFetchingLocal = false
				this.$emit('bookDeleted')
			})
		}
	},
};
</script>
