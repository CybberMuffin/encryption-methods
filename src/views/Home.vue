<template>
  <div class="home">
    <!-- <command-bar /> -->
    <upload />
    <crypto-fields />
  </div>
</template>

<script>
// @ is an alias to /src
import CryptoFields from "../components/CryptoFields";
import Upload from "../components/Upload";

export default {
  name: "home",
  components: {
    CryptoFields,
    Upload
  }
};
</script>
