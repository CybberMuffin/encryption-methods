<template>
  <div class="container mt-2">
    <input type="file" id="file" @change="onUpload" />
    <label for="file" class="btn">
      <span>Upload</span>
    </label>
    <div>
      <div v-if="!!selectedFile" style="color: #ffc107;">
        File name:
        <b>{{ selectedFile.name }}</b>
      </div>
      <div v-else style="color: #ffc107;">
        <b>No file chosen</b>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "upload",
  data: () => ({
    selectedFile: null
  }),

  methods: {
    onUpload(event) {
      this.selectedFile = event.target.files[0];
      const fileReader = new FileReader();

      fileReader.onload = e => this.$store.commit("setPlain", e.target.result);
      fileReader.readAsText(this.selectedFile);
    }
  }
};
</script>

<style lang="scss" scoped>
[type="file"] {
  height: 0;
  overflow: hidden;
  width: 0;
}

[type="file"] + label {
  background: #f15d22;
  border: none;
  border-radius: 5px;
  color: #ffc107;
  cursor: pointer;
  display: inline-block;
  font-family: "Poppins", sans-serif;
  font-size: inherit;
  font-weight: 600;
  margin-bottom: 1rem;
  outline: none;
  padding: 1rem 50px;
  position: relative;
  transition: all 0.3s;
  vertical-align: middle;

  &.btn {
    background-color: #ffc107;
    border-radius: 50px;
    overflow: hidden;

    span {
      display: inline-block;
      color: #343a40;
      font-size: 14px;
      vertical-align: middle;
      height: 100%;
      transition: all 0.3s;
      width: 100%;
    }

    &::before {
      color: #ffc107;
      content: "Select";
      font-size: 130%;
      height: 100%;
      left: 0;
      line-height: 2.6;
      position: absolute;
      top: -180%;
      transition: all 0.3s;
      width: 100%;
    }

    &:hover {
      background-color: darken(#ffc107, 30%);

      span {
        transform: translateY(300%);
      }

      &::before {
        top: 0;
      }
    }
  }
}
</style>
