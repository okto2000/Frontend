<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#pablo"
      ref="btnDropdownRef"
      @:click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-white-500 hover:ring-blue-300 dark:hover:ring-gray-300"
            :src="user.picture"
          />
        </span>
        <p class="ml-3 font-medium text-Gray-700 hover:text-gray-500">{{ user.name }}</p>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      :class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
    <button
    @click="profile"
    class="text-start text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-300"
    >
    Profile
    </button>
    <button
      @click="logout"
      class="text-start text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-gray-300"
    >
      Logout
    </button>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import image from "@/assets/img/user.svg";

export default {
  props: {
    user: {
      default:{}
    }
  }, 
  data() {
    return {
      dropdownPopoverShow: false,
      image: image,
      // user: JSON.parse(localStorage.getItem('user')) || {},
    };
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
    profile() {
      this.$router.push({ name: "dashboard-user" });
    },
    logout() {
      localStorage.clear();
      window.location.href = '/login';
    },
  },
};
</script>
