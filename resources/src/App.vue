<template>
  <div>
    <router-view></router-view>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    
    ...mapGetters(["getThemeMode","isAuthenticated","currentUser"]),
    themeName() {
      return this.getThemeMode.dark ? "dark-theme" : " ";
    },
    rtl() {
      return this.getThemeMode.rtl ? "rtl" : " ";
    },

    isPosPage() {
      return this.$route.path === '/app/pos';
    },
    titleTemplate() {
      return `%s | ${this.currentUser?.page_title_suffix || "Ultimate Inventory With POS"}`;
    }
  },

  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: "Stocky",
      titleTemplate: this.titleTemplate,

      bodyAttrs: {
        class: [this.themeName, "text-left"]
      },
      htmlAttrs: {
        dir: this.rtl
      },
      
    };
  },
 methods:{
    ...mapActions([
      "refreshUserPermissions",
    ]),

    handleGlobalKeydown(e) {
      // Avoid triggering shortcuts when typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }

      if (e.key === 'F2' || (e.altKey && (e.key === '2' || e.code === 'Digit2'))) {
        e.preventDefault();
        if (this.$route.name !== 'store_sale') {
          this.$router.push({ name: 'store_sale' }).catch(() => {});
        }
      } else if (e.key === 'F3' || (e.altKey && (e.key === '3' || e.code === 'Digit3'))) {
        e.preventDefault();
        if (this.$route.name !== 'store_deposit') {
          this.$router.push({ name: 'store_deposit' }).catch(() => {});
        }
      }
    }
  },

  mounted() {
    window.addEventListener('keydown', this.handleGlobalKeydown);
    // Refresh user permissions in background (non-blocking)
    this.refreshUserPermissions();
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleGlobalKeydown);
  },
};
</script>

