<template>
  <div class="main-header">
    <div class="logo">
       <router-link to="/app/dashboard">
        <img :src="'/images/'+currentUser.logo" alt width="60" height="60">
       </router-link>
    </div>

    <div @click="sideBarToggle" class="menu-toggle">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div style="margin: auto"></div>

    <div class="header-part-right">
      <router-link 
        v-if="currentUserPermissions && currentUserPermissions.includes('adjustment_add')"
        class="btn btn-outline-secondary tn-sm btn-rounded mr-2"
        to="/app/adjustments/store"
      >
      <span class="ul-btn__text ml-1">Create Production</span>
      </router-link>

      <router-link 
        v-if="currentUserPermissions && currentUserPermissions.includes('Sales_add')"
        class="btn btn-outline-primary tn-sm btn-rounded mr-2"
        to="/app/sales/store"
      >
      <span class="ul-btn__text ml-1">Create Sale</span>
      </router-link>

      <router-link 
        v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_Sales')"
        class="btn btn-outline-danger tn-sm btn-rounded mr-2"
        to="/app/receipts/store"
      >
      <span class="ul-btn__text ml-1">Create Receipt</span>
      </router-link>

      <router-link 
        v-if="currentUserPermissions && currentUserPermissions.includes('Purchases_add')"
        class="btn btn-outline-success tn-sm btn-rounded mr-2"
        to="/app/purchases/store"
      >
      <span class="ul-btn__text ml-1">Create Purchase</span>
      </router-link>

      <router-link 
        v-if="currentUserPermissions && currentUserPermissions.includes('Reports_payments_Purchases')"
        class="btn btn-outline-warning tn-sm btn-rounded mr-2"
        to="/app/payments/store"
      >
      <span class="ul-btn__text ml-1">Create Payment</span>
      </router-link>

      <router-link 
        v-if="currentUserPermissions && currentUserPermissions.includes('transfer_add')"
        class="btn btn-outline-info tn-sm btn-rounded mr-2"
        to="/app/transfers/store"
      >
      <span class="ul-btn__text ml-1">Create Transfer</span>
      </router-link>


      <!-- User avatar dropdown -->
      <div class="dropdown">
        <b-dropdown
          id="dropdown-1"
          text="Dropdown Button"
          class="m-md-2 user col align-self-end d-md-block"
          toggle-class="text-decoration-none"
          no-caret
          variant="link"
        >
          <template slot="button-content" >
            <img
              :src="'/images/avatar/'+currentUser.avatar"
              id="userDropdown"
              alt
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
          </template>

          <div class="dropdown-menu-right" aria-labelledby="userDropdown">
            <div class="dropdown-header">
              <i class="i-Lock-User mr-1"></i> <span >{{currentUser.username}}</span>
            </div>
            <router-link to="/app/profile" class="dropdown-item">{{$t('profil')}}</router-link>
            <router-link
              v-if="currentUserPermissions && currentUserPermissions.includes('setting_system')"
              to="/app/settings/System_settings"
              class="dropdown-item"
            >{{$t('Settings')}}</router-link>
            <a class="dropdown-item" href="#" @click.prevent="logoutUser">{{$t('logout')}}</a>
          </div>
        </b-dropdown>
      </div>
    </div>
  </div>

  <!-- header top menu end -->
</template>
<script>
import Util from "./../../../utils";
// import Sidebar from "./Sidebar";
import { isMobile } from "mobile-device-detect";
import { mapGetters, mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";
// import { setTimeout } from 'timers';

export default {
  mixins: [clickaway],
 
  data() {
  
    return {
     
      isDisplay: true,
      isStyle: true,
      isSearchOpen: false,
      isMouseOnMegaMenu: true,
      isMegaMenuOpen: false,
      is_Load:false,
     
    };
  },
 
   computed: {
     
     ...mapGetters([
       "currentUser",
      "getSideBarToggleProperties",
      "currentUserPermissions",
      "notifs_alert",
    ]),


  },

  methods: {
    
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSidebarProperties",
      "changeThemeMode",
      "logout",
    ]),

    SetLocal(locale) {
      this.$i18n.locale = locale;
      this.$store.dispatch("language/setLanguage", locale);
      Fire.$emit("ChangeLanguage");
      window.location.reload();
    },

    handleFullScreen() {
      Util.toggleFullScreen();
    },
    logoutUser() {
      this.logout();
    },

    closeMegaMenu() {
      this.isMegaMenuOpen = false;
    },
    toggleMegaMenu() {
      this.isMegaMenuOpen = !this.isMegaMenuOpen;
    },
    toggleSearch() {
      this.isSearchOpen = !this.isSearchOpen;
    },

    sideBarToggle(el) {
      if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        isMobile
      ) {
        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
      } else if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {
        this.changeSecondarySidebarProperties();
      } else if (this.getSideBarToggleProperties.isSideNavOpen) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        !this.getSideBarToggleProperties.isActiveSecondarySideNav
      ) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {

        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
      }
    }
  }
};
</script>



