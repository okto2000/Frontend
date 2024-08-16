<template>
  <div>
    <h1 class="mb-12 font-bold">Data Employee</h1>
    <button
      type="button"
      @click="openModal"
      class="mb-2 text-sm font-semibold bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
    >
      Tambah Employee
    </button>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 flex flex-row justify-between mb-4"
                >
                  {{ isEditMode ? "Edit Employee" : "Tambah Employee" }}

                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    X
                  </button>
                </DialogTitle>
                <form @submit.prevent="saveEmployee" class="space-x-2">
                  <div class="flex flex-col justify-between">
                    <input
                      v-model="newEmployee.name"
                      type="text"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      placeholder="Name"
                    />
                    <input
                      v-model="newEmployee.address"
                      type="text"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      placeholder="Alamat"
                    />
                    <input
                      v-model="newEmployee.notelp"
                      type="text"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      placeholder="No Telepon"
                    />
                    <input
                      v-model="newEmployee.salary"
                      type="text"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      placeholder="Gaji"
                    />
                    <input
                      v-model="newEmployee.email"
                      type="email"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      placeholder="Email"
                    />
                    <select
                      v-model="newEmployee.status"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                    >
                      <option value="active">Active</option>
                      <option value="non active">Non Active</option>
                    </select>
                    <select
                      v-model="newEmployee.role"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                    >
                      <option value="admin">Admin</option>
                      <option value="packing">Packing</option>
                      <option value="purchasing">Purchasing</option>
                    </select>
                    <input
                      v-if="!isEditMode"
                      v-model="newEmployee.password"
                      type="password"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      required
                      placeholder="Password"
                    />
                    <div class="flex flex-row space-x-2">
                      <button
                        type="submit"
                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
                      >
                        {{ isEditMode ? "Update" : "Add" }}
                      </button>
                      <button
                        @click="resetForm"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div class="flex justify-between mb-4">
      <PerPageSelect
        :value="perPage"
        :options="perPageOptions"
        @input="perPage = $event"
        @change="fetchEmployees(currentPage)"
      />
      <SearchInput
        v-model="searchQuery"
        @search="fetchEmployees(currentPage)"
      />
    </div>
    <div>
      <DataTable
        :items="employees"
        :headers="headers"
        :keys="keys"
        @edit="onEdit"
        @delete="onDelete"
        :currentPage="currentPage"
        :perPage="perPage"
      />
      <Pagination
        :pagination="pagination"
        :currentPage="currentPage"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
import {
  fetchEmployeesData,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/helpers/apiService";
import PageButton from "@/components/Button/Pagination.vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import DataTable from "@/components/Table/DataTable.vue";
import Pagination from "@/components/Table/Pagination.vue";
import PerPageSelect from "@/components/Table/PerPageSelect.vue";
import SearchInput from "@/components/Table/SearchInput.vue";
export default {
  components: {
    PerPageSelect,
    SearchInput,
    DataTable,
    Pagination,
    PageButton,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  data() {
    return {
      employees: [],
      newEmployee: {
        name: "",
        address: "",
        notelp: "",
        salary: "",
        status: "",
        email: "",
        password: "",
        role: "",
      },
      currentEmployee: null,
      isEditMode: false,
      pagination: {
        from: 0,
        to: 0,
        total: 0,
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null,
      },
      headers: [
        { key: "id", label: "No" },
        { key: "name", label: "name" },
        { key: "address", label: "address" },
        { key: "notelp", label: "notelp" },
        { key: "salary", label: "salary" },
        { key: "status", label: "status" },
        { key: "email", label: "email" },
        { key: "role", label: "role" },
        { label: "aksi" },
      ],
      keys: ["name", "address", "notelp", "salary", "status", "email", "role"],
      currentPage: 1,
      perPageOptions: [5, 10, 15, 20],
      searchQuery: "",
      isOpen: false,
    };
  },
  created() {
    this.fetchEmployees(this.currentPage);
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    },
    openModal() {
      this.resetNewEmployeeForm();
      this.isEditMode = false;
      this.isOpen = true;
    },
    async fetchEmployees(page) {
      try {
        const { employees, pagination } = await fetchEmployeesData(
          page,
          this.perPage,
          this.searchQuery
        );
        this.employees = employees;
        this.pagination = pagination;
        this.currentPage = page;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },
    handlePageChange(page) {
      console.log("Page Change Triggered: ", page); // Add log here
      this.currentPage = page;
      this.fetchEmployees(this.currentPage);
    },
    saveEmployee() {
      console.log(this.newEmployee);
      if (this.isEditMode && this.currentEmployee) {
        this.updateEmployee(this.currentEmployee.id, this.newEmployee);
        this.isOpen = false;
      } else {
        this.createEmployee();
      }
    },
    async createEmployee() {
      try {
        const response = await createEmployee(this.newEmployee);
        this.employees.push(response.data);
        alert("Employee created successfully");
        this.resetNewEmployeeForm();
        this.fetchEmployees(this.currentPage);
      } catch (error) {
        console.error("Error creating employee:", error);
      }
    },
    async updateEmployee(id, updatedData) {
      try {
        const { data } = await updateEmployee(id, updatedData);
        const updatedEmployeeIndex = this.employees.findIndex(
          (employee) => employee.id === id
        );
        if (updatedEmployeeIndex !== -1) {
          this.employees[updatedEmployeeIndex] = data;
        }
        alert("Employee updated successfully");
        this.fetchEmployees(this.currentPage);
        this.resetForm();
      } catch (error) {
        console.error(`Failed to update employee with id ${id}:`, error);
      }
    },
    async onDelete(id) {
      try {
        if (confirm("Are you sure you want to delete this product?")) {
          await deleteEmployee(id);
          this.employees = this.employees.filter(
            (employee) => employee.id !== id
          );
          this.fetchEmployees(this.currentPage);
        } else {
          this.fetchEmployees(this.currentPage);
        }
      } catch (error) {
        console.error(error);
      }
    },
    onEdit(employee) {
      this.currentEmployee = employee;
      this.newEmployee = {
        name: employee.name,
        address: employee.address,
        notelp: employee.notelp,
        status: employee.status,
        salary: employee.salary,
        email: employee.email,
        role: employee.role,
      };
      this.isOpen = true;
      this.isEditMode = true;
    },
    resetNewEmployeeForm() {
      this.newEmployee = {
        name: "",
        address: "",
        notelp: "",
        salary: "",
        status: "active",
        email: "",
        password: "",
        role: "packing",
      };
    },
    resetForm() {
      this.newEmployee = {
        name: "",
        address: "",
        notelp: "",
        salary: "",
        status: "active",
        email: "",
        password: "",
        role: "packing",
      };
      this.currentEmployee = null;
      this.isEditMode = false;
    },
  },
};
</script>
