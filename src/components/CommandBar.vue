<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="#">Encryption</b-nav-item>

          <b-nav-item-dropdown text="Encryption method" right>
            <b-dropdown-item href="#">Caesar encryption</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Mode" right>
            <b-dropdown-item href="#">Encrypt</b-dropdown-item>
            <b-dropdown-item href="#">Decrypt</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Key"
            ></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              variant="outline-primary"
              type="submit"
              >Bind key</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "command-bar"
};
</script>

<style lang="scss" scoped></style>
