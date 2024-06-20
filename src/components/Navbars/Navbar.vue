<template>
  <Disclosure as="nav" class="bg-transaparent z-50" v-slot="{ open }">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-gradient-to-t from-transparent to-cyan-200 rounded-bl-full rounded-br-full"
    >
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                    ? 'bg-gray-900 text-white'
                    : 'text-black-600 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:block">
          <a
            href="/login"
            class="text-black-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Login</a
          >
          <a
            href="/register"
            class="text-black-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >Register</a
          >
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          class="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white, block rounded-md px-3 py-2 text-base font-medium"
          >{{ item.name }}</DisclosureButton
        >
        <div>
          <a
            href="/login"
            class="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white, block rounded-md px-3 py-2 text-base font-medium"
            >Login</a
          >
        </div>
        <div>
          <a
            href="/register"
            class="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white, block rounded-md px-3 py-2 text-base font-medium"
            >Register</a
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import XMarkIcon from "@/components/icons/XMark.vue";
import Bars3Icon from "@/components/icons/Bar3.vue";
export default {
  components: {
    XMarkIcon,
    Bars3Icon,
  },
  data() {
    return {
      navigation: [
        { name: "Home", href: "/" },
        { name: "Data Hewan", href: "#" },
      ],
    };
  },
};
</script>
