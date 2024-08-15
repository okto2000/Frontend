<template>
  <div class="mb-12">
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 xl:w-3/12 px-4" v-for="(stat, index) in stats" :key="index">
        <card-stats
          :statSubtitle="stat.subtitle"
          :statTitle="stat.title"
          :statDescripiron="stat.description"
          :statIconName="stat.iconName"
          :statIconColor="stat.iconColor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";
import {getStats} from "@/helpers/apiService"

export default {
  components: {
    CardStats,
  },
  data() {
    return {
      stats: [],
    };
  },
  mounted() {
    this.fetchStats();
  },
  methods: {
    async fetchStats() {
      try {
        const response = await getStats();
        const data = response.data;

        this.stats = [
          {
            subtitle: "TOTAL MEMBERS",
            title: data.total_members,
            description: "Since last month",
            iconName: "far fa-chart-bar",
            iconColor: "bg-red-500",
          },
          {
            subtitle: "TOTAL TRANSACTIONS",
            title: data.total_transactions,
            description: "Since last month",
            iconName: "fas fa-chart-pie",
            iconColor: "bg-orange-500",
          },
          {
            subtitle: "PERFORMANCE",
            title: `${data.performance}%`,
            description: "Since last month",
            iconName: "fas fa-percent",
            iconColor: "bg-emerald-500",
          },
        ];
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    },
  },
};
</script>
