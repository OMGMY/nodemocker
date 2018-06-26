/**
 * Created by jinhaidou on 2018/1/27.
 */
let vm = new Vue({
    el: ".feed_file",
    data(){
      return {
          isEdit:true,
          isFile:false,
      }
    },
    methods: {
        editSaveHandler(){
           this.isEdit = true;
           this.isFile = false;
        },
        fileOperateHandler(){
            this.isEdit = false;
            this.isFile = true;
        }
    }
})