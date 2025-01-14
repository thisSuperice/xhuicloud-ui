<!--
  - MIT License
  - Copyright <2021-2022>
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  - of the Software, and to permit persons to whom the Software is furnished to do so,
  - subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  - INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  - PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  - HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  - CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  - OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  - @Author: Sinda
  - @Email:  xhuicloud@163.com
  -->

<template>
  <div class="app-wrapper" :class='[$store.getters.sidebarStatus ? `openSidebar` : `closeSidebar`]'>
    <!-- 左侧菜单 -->
    <sidebar class="sidebar-container"
             :style="{ backgroundColor: variables.menuBg }"/>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <navbar/>
        <!--  标签      -->
        <tag-view/>
      </div>
      <!-- main -->
      <app-main/>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar'
import TagView from '@/components/TagView'
import AppMain from './components/AppMain.vue'
import variables from '@/styles/variables.scss'
import { ref, onUnmounted } from 'vue'
import { expiredPeriod } from '@/config'
import { checkToken } from '@/api/auth'
import store from '@/store'

const refreshTime = ref(0)

const onCreate = () => {
  refreshTime.value = setInterval(() => {
    if (store.getters.token && store.getters.refreshToken) {
      checkToken(store.getters.token).then(response => {
        const exp = response && response.data && response.data.exp
        if (exp && exp - new Date().getTime() <= expiredPeriod) {
          store.dispatch('user/refreshToken').catch(() => {
            clearInterval(refreshTime.value)
          })
        }
      })
    }
  }, expiredPeriod)
}

onCreate()

onUnmounted(() => {
  clearInterval(refreshTime.value)
})
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sidebarTransition};
}

.closeSidebar .fixed-header {
  width: calc(100% - 54px);
}

</style>
