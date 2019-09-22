<template>
  <a-list size="large" rowKey="id" :loading="loading" itemLayout="vertical" :dataSource="data">
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
      <template slot="actions">
        <icon-text type="star-o" :text="item.star" />
        <icon-text type="like-o" :text="item.like" />
        <icon-text type="message" :text="item.message" />
      </template>
      <a-list-item-meta>
        <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
        <template slot="description">
          <span>
            <a-tag v-for="tag in item.tags" :key="tag.name">{{ tag.name }}</a-tag>
          </span>
        </template>
      </a-list-item-meta>
      <article-list-content
        :description="item.description"
        :owner="item.owner"
        :avatar="item.avatar"
        :href="item.href"
        :updateAt="item.updatedAt"
      />
    </a-list-item>
    <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
      <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
    </div>
  </a-list>
</template>

<script>
import { reactive, onMounted, toRefs } from '@vue/composition-api'
import { fetchUserAccountArticle } from '@/api'
import { ArticleListContent } from '@/components'
import IconText from '@/views/list/search/components/IconText'

export default {
  name: 'Article',
  components: {
    IconText,
    ArticleListContent
  },
  setup: () => {
    const loadStatus = reactive({
      loadingMore: false,
      loading: true
    })

    const data = reactive({
      data: []
    })

    onMounted(() => {
      fetchUserAccountArticle().then(res => {
        data.data = res.data.article
        loadStatus.loading = false
      })
    })

    const loadMore = () => {
      loadStatus.loadingMore = true
      fetchUserAccountArticle()
        .then(res => {
          data.data = data.data.concat(res.data.article)
        })
        .finally(() => {
          loadStatus.loadingMore = false
        })
    }

    return {
      ...toRefs(loadStatus),
      ...toRefs(data),
      loadMore
    }
  },

  methods: {}
}
</script>

<style scoped>
</style>
