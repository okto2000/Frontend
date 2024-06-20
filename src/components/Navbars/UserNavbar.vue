<template>
  <Disclosure as="nav" class="bg-transaparent z-50" v-slot="{ open }">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-gradient-to-t from-transparent to-cyan-200 rounded-bl-full rounded-br-full"
    >
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="/src/assets/img/logo.jpg"
              alt="Your Company"
            />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? ' text-white'
                    : 'hover:bg-emerald-50 hover:text-black',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
          <div
            class="flex space-x-4 items-center sm:relative sm:right-0 absolute right-4"
          >
            <a href="/shoppingcart">
              <CartIcon
                class="rounded-full p-0.5 h-7 w-auto hidden sm:ml-6 sm:block hover:bg-emerald-50 hover:text-black"
              />
            </a>
          </div>
        </div>
        <ul class="justify-end items-center flex flex-wrap list-none">
          <li class="inline-block relative">
            <!-- <notification-dropdown /> -->
          </li>
          <li v-if="LoggedIn" class="inline-block relative">
            <UserDropdown :user="user"/>
          </li>
          <div v-else class="hidden sm:ml-6 sm:block">
            <a
              href="/login"
              class="text-black-600 hover:bg-emerald-50 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >Login</a
            >
            <a
              href="/register"
              class="text-black-600 hover:bg-emerald-50 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >Register</a
            >
          </div>
        </ul>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          class="bg-gray-200 text-black hover:bg-emerald-200 hover:text-white, block rounded-md px-3 py-2 text-base font-medium"
          >{{ item.name }}</DisclosureButton
        >
        <div v-if="!LoggedIn">
          <a
            href="/login"
            class="bg-gray-200 text-black hover:bg-emerald-200 hover:text-white, block rounded-md px-3 py-2 text-base font-medium"
            >Login</a
          >
        </div>
        <div v-if="!LoggedIn">
          <a
            href="/register"
            class="bg-gray-200 text-black hover:bg-emerald-200 hover:text-white, block rounded-md px-3 py-2 text-base font-medium"
            >Register</a
          >
        </div>
        <a
          href="/shoppingcart"
          class="bg-gray-200 text-black hover:bg-emerald-200 hover:text-white, block rounded-md px-3 py-2 text-base font-medium"
        >
          Shopping Cart
        </a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import XMarkIcon from "@/components/icons/XMark.vue";
import Bars3Icon from "@/components/icons/Bar3.vue";
import CartIcon from "@/components/icons/cart.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";
export default {
  props: {
    userchange:{
      default: false
    },
  },
  watch:{
    userchange(){
      alert("User updated successfully");
      this.getUser();
    },
  },
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Bars3Icon,
    XMarkIcon,
    CartIcon,
    UserDropdown,
  },
  data() {
    return {
      navigation: [{ name: "Home", href: "/" }],
    };
  },
  created() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.LoggedIn = true;
    }
  },
};
</script>
