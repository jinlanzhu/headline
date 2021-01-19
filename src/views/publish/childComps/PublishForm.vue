<template>
  <div class="publish-form">
    <el-form
      :model="article"
      :rules="publishRules"
      ref="publishForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题：" prop="title">
        <el-input v-model="article.title" class="publish-name"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
        <el-tiptap
          lang="zh"
          v-model="article.content"
          :extensions="extensions"
          placeholder="请输入文章内容"
          height="320"
        />
      </el-form-item>
      <el-form-item label="封面：">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：" prop="channel_id">
        <el-select v-model="article.channel_id" placeholder="请选择频道">
          <el-option
            v-for="(item, index) in channels"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handlePublish(false)">{{
          $route.query.id ? '更新' : '发布'
        }}</el-button>
        <el-button @click="handlePublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  ElementTiptap,
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  CodeBlock,
  Blockquote,
  Indent,
  FontSize,
  FontType,
  Preview,
  Fullscreen
} from 'element-tiptap'
// import element-tiptap 样式
import 'element-tiptap/lib/index.css'

import { uploadImage } from '@/network/image.js'
export default {
  props: ['publishForm', 'article', 'channels'],
  data() {
    return {
      publishRules: {
        title: [
          { required: true, message: '标题必填', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator(rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          },
          { required: true, message: '内容必填', trigger: 'blur' }
        ],
        channel_id: [{ required: true, message: '频道必选' }]
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new Blockquote(),
        new CodeBlock(),
        new Indent(),
        new FontSize(),
        new FontType(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({
          //  uploadRequest: // 图片的上传方法，返回一个 Promise<url>
          uploadRequest(file) {
            console.log(file)
            const form = new FormData()
            console.log(form)
            form.append('image', file)
            return uploadImage(form).then(res => {
              console.log(res)
              return res.data.url
            })
          }
        }),
        new Fullscreen(),
        new Preview()
      ]
    }
  },
  components: {
    'el-tiptap': ElementTiptap
  },
  methods: {
    handlePublish(msg) {
      console.log(msg)
      this.$emit('handlePublish', msg)
    }
  }
}
</script>

<style scoped>
.publish-name {
  width: 400px;
}
</style>
