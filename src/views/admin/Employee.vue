<template>
  <div>
    <h1 class="mb-12 font-bold">Data Employee</h1>
    <form @submit.prevent="saveEmployee" class="space-x-2">
      <input
        v-model="newEmployee.name"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newEmployee.address"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newEmployee.notelp"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <select
        v-model="newEmployee.status"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      >
        <option value="active">Active</option>
        <option value="non active">Non Active</option>
      </select>
      <input
        v-model="newEmployee.salary"
        type="text"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newEmployee.email"
        type="email"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
      />
      <input
        v-model="newEmployee.password"
        type="password"
        class="mb-12 mr-4 border-0 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring"
        required
      />
      <button
        type="submit"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center"
      >
        {{ isEditMode ? "Update" : "Add" }}
      </button>
      <button @click="resetForm" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center">
        Reset
      </button>
    </form>
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
            <th class="border border-slate-600">Password</th>
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
              {{ employee.password }}
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
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      employees: [],
      newEmployee: {
        name: "",
        address: "",
        notlp: "",
        salary: "",
        status: "",
        email: "",
        password: "",
      },
      currentEmployee: null,
      isEditMode: false,
    };
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees() {
      axios
        .get("http://localhost:8000/api/employee")
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    saveEmployee() {
      const {
        isEditMode,
        currentEmployee,
        newEmployee,
        updateEmployee,
        createEmployee,
      } = this;

      if (isEditMode && currentEmployee) {
        updateEmployee(currentEmployee.id, newEmployee);
      } else {
        createEmployee();
      }
    },
    createEmployee() {
      const { newEmployee } = this;
      const employeeData = {
        name: newEmployee.name,
        address: newEmployee.address,
        notelp: newEmployee.notelp,
        status: newEmployee.status,
        salary: newEmployee.salary,
        email: newEmployee.email,
        password: newEmployee.password,
      };

      axios
        .post("http://localhost:8000/api/employee", employeeData)
        .then((response) => this.employees.push(response.data))
        .catch(console.error);
        alert("Employee created successfully")

      this.resetNewEmployeeForm();
    },
    resetNewEmployeeForm() {
      this.newEmployee = {
        name: "",
        address: "",
        notlp: "",
        salary: "",
        status: "",
        email: "",
        password: "",
      };
    },
    updateEmployee(id, updatedData) {
      axios
        .put(`http://localhost:8000/api/employee/${id}`, updatedData)
        .then(({ data }) => {
          const updatedEmployeeIndex = this.employees.findIndex(
            (employee) => employee.id === id
          );
          if (updatedEmployeeIndex !== -1) {
            this.employees[updatedEmployeeIndex] = data;
          }
          alert("Employee updated successfully");
          this.fetchEmployees();
          this.resetForm();
        })
        .catch((error) => {
          console.error(
            `Failed to update employee with id ${id}:`,
            error
          );
        });
    },
    async onDelete(id) {
      try {
        await axios.delete(`http://localhost:8000/api/employee/${id}`);
        this.employees = this.employees.filter(
          (employee) => employee.id !== id
        );
        this.fetchEmployees();
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
      };
      this.isEditMode = true;
    },
    resetForm() {
      this.newEmployee = {
        name: "",
        address: "",
        notlp: "",
        salary: "",
        status: "",
        email: "",
        password: "",
      };
      this.currentEmployee = null;
      this.isEditMode = false;
    },
  },
};
</script>
