<template>
  <div>
    <h1 class="mb-12 font-bold">Data Employee</h1>
    <button
      type="button"
      @click="openModal"
      class="mb-2 text-sm font-semibold bg-blue-500  text-white px-3 py-2 rounded-lg hover:bg-blue-700 cursor-pointer "
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
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring" placeholder="Gaji"
                    />
                    <input
                      v-model="newEmployee.email"
                      type="email"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring" placeholder="Email"
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
                      <option value="packing">HHH</option>
                    </select>
                    <input
                      v-if="!isEditMode"
                      v-model="newEmployee.password"
                      type="password"
                      class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
                      required placeholder="Password"
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
      <div>
        <label for="perPage">Display </label>
        <select
          class="rounded-lg text-sm px-2 py-1"
          id="perPage"
          v-model="perPage"
          @change="fetchEmployees(currentPage)"
        >
          <option
            v-for="option in perPageOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
        <label for="perPage"> results:</label>
      </div>
      <input
        class="rounded"
        type="text"
        v-model="searchQuery"
        @input="fetchEmployees(currentPage)"
        placeholder="Search employees"
      />
    </div>
    <div class="mb-12">
      <table
        class="border-spacing-4 border border-slate-500 w-full text-center"
      >
        <thead>
          <tr class="border border-slate-600">
            <th class="border border-slate-600">Id</th>
            <th class="border border-slate-600">Name</th>
            <th class="border border-slate-600">Address</th>
            <th class="border border-slate-600">No Telepon</th>
            <th class="border border-slate-600">Status</th>
            <th class="border border-slate-600">Salary</th>
            <th class="border border-slate-600">Email</th>
            <th class="border border-slate-600">role</th>
            <th class="border border-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id" class="text-xs">
            <td class="border border-slate-700">
              {{ employee.id }}
            </td>
            <td class="border border-slate-700">
              {{ employee.name }}
            </td>
            <td class="border border-slate-700">
              {{ employee.address }}
            </td>
            <td class="border border-slate-700">
              {{ employee.notelp }}
            </td>
            <td class="border border-slate-700">
              {{ employee.status }}
            </td>
            <td class="border border-slate-700">
              {{ employee.salary }}
            </td>
            <td class="border border-slate-700">
              {{ employee.email }}
            </td>
            <td class="border border-slate-700">
              {{ employee.role }}
            </td>
            <td class="space-x-2 border border-slate-700">
              <div class="flex">
                <button
                  @click="onEdit(employee)"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-light rounded-lg text-xs px-2 py-0.5 text-center"
                >
                  Edit
                </button>
                <button
                  @click="onDelete(employee.id)"
                  class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-light rounded-lg text-xs px-2 py-0.5 text-center"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-between">
      <div class="space-x-1 items-center justify-start text-center">
        <PageButton
          @click="fetchEmployees(currentPage - 1)"
          :disabled="!pagination.prev_page_url"
          >Previous</PageButton
        >
        <PageButton
          v-for="page in pagination.last_page"
          :key="page"
          :is-active="currentPage === page"
          @click="fetchEmployees(page)"
        >
          {{ page }}
        </PageButton>
        <PageButton
          @click="fetchEmployees(currentPage + 1)"
          :disabled="!pagination.next_page_url"
          >Next</PageButton
        >
      </div>
      <div>
        <p class="text-sm">
          Showing {{ pagination.from }} to {{ pagination.to }} of
          {{ pagination.total }} items
        </p>
      </div>
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

export default {
  components: {
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
      currentPage: 1,
      perPage: 10,
      perPageOptions: [5, 10, 15, 20],
      searchQuery: "",
      isOpen: false,
    };
  },
  created() {
    this.fetchEmployees(this.currentPage);
  },
  computed: {
    totalPages() {
      return Array.from({ length: this.pagination.last_page }, (_, i) => i + 1);
    },
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
    saveEmployee() {
      if (this.isEditMode && this.currentEmployee) {
        this.updateEmployee(this.currentEmployee.id, this.newEmployee);
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
        await deleteEmployee(id);
        this.employees = this.employees.filter(
          (employee) => employee.id !== id
        );
        this.fetchEmployees(this.currentPage);
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
        password: "",
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
