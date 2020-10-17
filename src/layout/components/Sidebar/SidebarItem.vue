<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
       <!-- <el-menu-item-group> -->
      <app-link v-if="onlyOneChild.title" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item popper-append-to-body :index="mark + ''" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.icon||(item.meta&&item.icon)" :title="onlyOneChild.title" />
        </el-menu-item>
      </app-link>
       <!-- </el-menu-item-group> -->
    </template>
    <el-submenu v-else ref="subMenu" :index="mark + ''" popper-append-to-body popper-class='csclass' >
      <template slot="title">
        <item v-if="item" :icon="item && item.icon" :title="item.title" />
      </template>
      <!-- {{item}}} -->
      <sidebar-item
        popper-append-to-body
        v-for="(child, i) in item.children"
        :key="i+'%'"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        :mark="mark + '-' + i"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    mark: {
      type: String
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {
      appendswitch:true
    }
  },
  
  mounted() {
    console.log(this.item)
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = (children || []).filter(item => {
        // if (item.hidden) {
        //   return false
        // } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        // }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        // console.log(true)
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        // console.log(true)
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      // console.log(false)
      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // console.log(105,routePath);
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
