<template>
  <div>
    <div class="plane">
      <b-row>
        <b-col class="col-7">
          <b-card title="Plain text" tag="article" bg-variant="warning">
            <b-card-text>
              <b-form-textarea
                id="plain-text"
                style="background-color: #343a40; color: #FFC107;"
                v-model="plainText"
                :state="plainText.length >= 1"
                placeholder="Enter at least 1 character"
                rows="12"
                no-resize
              ></b-form-textarea>
              <b-button @click="plainText = ''" class="mt-4">Clean</b-button>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col class="col-5">
          <b-card
            title="Encryption method"
            tag="article"
            class="ml-5 mr-5"
            bg-variant="warning"
          >
            <b-card-text>
              <b-button
                @click="modalShow = !modalShow"
                class="m-2"
                :variant="!!encryptionMethod ? 'success' : ''"
                :pill="!!encryptionMethod"
              >
                {{
                  !!encryptionMethod
                    ? encryptionMethod
                    : "Choose encryption method"
                }}
              </b-button>

              <!-- Language selection -->
              <!-- <b-dropdown
                :text="selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)"
              >
                <b-dropdown-item @click="selectedLanguage='english'">English</b-dropdown-item>
                <b-dropdown-item @click="selectedLanguage='ukranian'">Ukranian</b-dropdown-item>
              </b-dropdown>-->
              <!-- Language selection end -->

              <!-- Selection for Thrithemius -->
              <b-form-select
                prepend="Key"
                v-if="encryptionMethod === 'Thrithemius cipher'"
                v-model="selectedThrithemiusMethod"
                class="mt-2"
                style="background-color: #343a40; color: #FFC107; border: #FFC107;"
              >
                <option value="2d">2-dimensional vector</option>
                <option value="3d">3-dimensional vector</option>
                <option value="motto">Motto</option>
              </b-form-select>
              <!-- End of Selection for Thrithemius -->

              <b-input-group
                v-if="
                  encryptionMethod === 'Thrithemius cipher' &&
                    selectedThrithemiusMethod !== 'motto'
                "
                prepend="Key"
                class="mt-2"
              >
                <b-form-input
                  type="number"
                  v-model="arrayKey[0]"
                  style="background-color: #343a40; color: #FFC107; border: #FFC107;"
                ></b-form-input>
                <b-form-input
                  type="number"
                  v-model="arrayKey[1]"
                  style="background-color: #343a40; color: #FFC107; border: #FFC107;"
                ></b-form-input>
                <b-form-input
                  v-if="selectedThrithemiusMethod === '3d'"
                  type="number"
                  v-model="arrayKey[2]"
                  style="background-color: #343a40; color: #FFC107; border: #FFC107;"
                ></b-form-input>
              </b-input-group>

              <b-form-textarea
                v-else-if="encryptionMethod === 'Book cipher'"
                id="plain-text"
                style="background-color: #343a40; color: #FFC107;"
                v-model="key"
                :state="key.length >= 1"
                placeholder="Enter at least 1 character"
                rows="10"
                no-resize
              ></b-form-textarea>

              <!-- Key -->
              <b-input-group v-else prepend="Key" class="mt-2">
                <b-form-input
                  :type="keyType"
                  v-model="key"
                  style="background-color: #343a40; color: #FFC107; border: #FFC107;"
                ></b-form-input>
              </b-input-group>
              <!-- End of Key -->

              <!-- Actions -->
              <b-button class="m-2" @click="onEncrypt">Encrypt</b-button>
              <b-button class="m-2" @click="onDecrypt">Decrypt</b-button>
              <!-- <b-button class="m-2" @click="onSwap">Swap</b-button> -->
              <b-button
                class="m-2"
                @click="saveFile"
                type="button"
                id="saveLexButton"
                >Save Cipher</b-button
              >
              <b-input
                type="text"
                id="saveFile"
                name="saveFile"
                class="save-file-title"
                placeholder="name"
              />
              <!-- End of Actions -->
            </b-card-text>
          </b-card>
        </b-col>
        <!-- <b-col class="col-4">
          <b-card title="Cipher text" tag="article" bg-variant="warning">
            <b-card-text>
              <b-form-textarea
                id="cipher-text"
                style="background-color: #343a40; color: #FFC107; border: #FFC107;"
                v-model="cipherText"
                rows="8"
                no-resize
              ></b-form-textarea>
              <b-button @click="cipherText=''" class="mt-4">Clean</b-button>
            </b-card-text>
          </b-card>
        </b-col>-->
      </b-row>
    </div>

    <b-modal
      v-model="modalShow"
      header-bg-variant="dark"
      header-text-variant="warning"
      body-bg-variant="dark"
      body-text-variant="warning"
      footer-bg-variant="dark"
      footer-text-variant="warning"
    >
      <div class="d-block text-center">
        <h3>Choose method</h3>
      </div>
      <b-button
        class="m-2"
        variant="outline-warning"
        pill
        @click="onCaesarCipher"
        >Caesar cipher</b-button
      >
      <b-button
        class="m-2"
        variant="outline-warning"
        pill
        @click="onTrithemiusCipher"
        >Trithemius cipher</b-button
      >
      <b-button class="m-2" variant="outline-warning" pill @click="onXorCipher"
        >Gamma cipher</b-button
      >
      <b-button class="m-2" variant="outline-warning" pill @click="onBookCipher"
        >Book cipher</b-button
      >

      <template v-slot:modal-footer>
        <div class="w-100">
          <!-- <p class="float-left">Modal Footer Content</p> -->
          <b-button
            variant="danger"
            size="sm"
            class="float-right"
            @click="modalShow = false"
            >Close</b-button
          >
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import getAlphabet from "../utils/alphabet.js";
import bookCipher from "@/services/bookCipher.js";

export default {
  name: "crypto-fields",
  data: () => ({
    key: "",
    modalShow: false,
    encryptionMethod: null,
    selectedLanguage: "english",
    selectedThrithemiusMethod: "motto",
    arrayKey: [0, 0, 0],
    gamma: ""
    // alphabet: {
    //   english: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,:;!?/@#$'\"%_\n ".split(
    //     ""
    //   ),
    //   ukranian: "абвгґдеєжзиіїйклмнопрстуфхцчшщьюяАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ.,:;!?/@#$'\"%_ \n".split(
    //     ""
    //   )
    // }
  }),
  methods: {
    onSwap() {
      this.$store.commit("swapText");
    },
    onCaesarCipher() {
      this.hideModal();
      this.encryptionMethod = "Caesar cipher";
    },
    onTrithemiusCipher() {
      this.hideModal();
      this.encryptionMethod = "Thrithemius cipher";
    },
    onXorCipher() {
      this.hideModal();
      this.encryptionMethod = "Gamma cipher";
    },
    onBookCipher() {
      this.hideModal();
      this.encryptionMethod = "Book cipher";
    },
    onEncrypt() {
      if (this.encryptionMethod === "Caesar cipher") {
        this.encryptCaesar();
      } else if (this.encryptionMethod === "Thrithemius cipher") {
        //this.encryptThrithemius();
        this.thrithemius(1);
      } else if (this.encryptionMethod === "Gamma cipher") {
        this.xor(1);
      } else if (this.encryptionMethod === "Book cipher") {
        this.$store.state.plainText = bookCipher(
          this.$store.state.plainText,
          this.key,
          1
        );
      } else {
        alert("Choose encryption method");
      }
    },
    onDecrypt() {
      if (this.encryptionMethod === "Caesar cipher") {
        this.decryptCaesar();
      } else if (this.encryptionMethod === "Thrithemius cipher") {
        //this.decryptThrithemius();
        this.thrithemius(-1);
      } else if (this.encryptionMethod === "Gamma cipher") {
        this.xor(-1);
      } else if (this.encryptionMethod === "Book cipher") {
        this.$store.state.plainText = bookCipher(
          this.$store.state.plainText,
          this.key,
          -1
        );
      } else {
        alert("Choose encryption method");
      }
    },

    encryptCaesar() {
      let alpha = this.alphabet; //this.alphabet[this.selectedLanguage];
      let shift =
        this.key < 0 ? alpha.length - (this.key % alpha.length) : this.key;
      let text = this.$store.state.plainText;
      let result = "";

      for (let ch of text) {
        if (alpha.indexOf(ch) == -1) {
          result += ch;
        } else {
          result += this.runCaesarCipher(ch, shift);
        }
      }
      //this.$store.state.cipherText = result;
      this.$store.state.plainText = result;
    },
    decryptCaesar() {
      let alpha = this.alphabet; //this.alphabet[this.selectedLanguage];
      let shift =
        this.key < 0 ? alpha.length - (this.key % alpha.length) : this.key;
      let text = this.$store.state.plainText;
      let result = "";

      for (let ch of text) {
        if (alpha.indexOf(ch) == -1) {
          result += ch;
        } else {
          result += this.runCaesarDecr(ch, shift);
        }
      }
      //this.$store.state.cipherText = result;
      this.$store.state.plainText = result;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////
    thrithemius(mode) {
      let alpha = this.alphabet; //this.alphabet[this.selectedLanguage];
      let length = alpha.length;
      let text = this.$store.state.plainText;

      let keyFunction = p => (accum, el, i) => accum + el * p ** i;

      let result = "";

      let isVigenere = this.selectedThrithemiusMethod === "motto";
      let shift;
      let res;

      for (let i in text) {
        let curCharIndex = alpha.indexOf(text[i]);
        if (curCharIndex >= 0) {
          if (isVigenere) {
            shift = alpha.indexOf(this.key[i % this.key.length]);
          } else {
            shift = this.arrayKey.reduce(keyFunction(i), 0);
          }
          if (shift < 0) shift = length + (shift % length);

          res = (length + curCharIndex + ((shift * mode) % length)) % length;

          result += alpha[res];
        } else {
          result += text[i];
        }
      }

      //this.$store.state.cipherText = result;
      this.$store.state.plainText = result;
    },

    xor(mode) {
      let alpha = this.alphabet;
      let length = alpha.length;
      let text = this.$store.state.plainText;

      let result = "";

      function generateKey(textLen) {
        let cnt = 0;
        let res = "";
        while (cnt <= textLen + 1) {
          res += alpha[Math.floor(Math.random() * (alpha.length - 1))];
          cnt++;
        }
        return res;
      }

      mode == 1 ? (this.gamma = generateKey(text.length)) : this.gamma;
      let shift;
      let res;

      this.key = this.gamma;

      for (let i in text) {
        let curCharIndex = alpha.indexOf(text[i]);
        if (curCharIndex >= 0) {
          shift = alpha.indexOf(this.gamma[i]);
          if (shift < 0) shift = length + (shift % length);

          res = (length + curCharIndex + ((shift * mode) % length)) % length;

          result += alpha[res];
          /////
        } else {
          result += text[i];
        }
      }

      //this.$store.state.cipherText = result;
      this.$store.state.plainText = result;
    },

    runCaesarCipher(ch, shift) {
      let alpha = this.alphabet; //this.alphabet[this.selectedLanguage];
      return alpha[(Number(alpha.indexOf(ch)) + Number(shift)) % alpha.length];
    },

    runCaesarDecr(ch, shift) {
      let alpha = this.alphabet; //this.alphabet[this.selectedLanguage];
      return alpha[
        (Number(alpha.indexOf(ch)) +
          Number(alpha.length) -
          (Number(shift) % alpha.length)) %
          alpha.length
      ];
    },

    saveFile() {
      // Download as a JSON file (WebAPI)
      let a = document.createElement("a");
      const file = new Blob([this.$store.state.cipherText], {
        type: "text/plain;charset=utf-8"
      });
      const val = document.getElementById("saveFile").value;
      a.href = URL.createObjectURL(file);
      a.download = val ? val + ".txt" : "cipher.txt";
      a.click();
    },

    hideModal() {
      this.modalShow = false;
    }
  },
  computed: {
    alphabet: () => getAlphabet(),

    keyType: {
      get: function() {
        if (this.encryptionMethod === "Caesar cipher") return "number";
        else if (this.encryptionMethod === "Thrithemius cipher") {
          return "text";
        } else return "text";
      }
    },
    plainText: {
      get: function() {
        return this.$store.state.plainText;
      },
      set: function(text) {
        this.$store.commit("set", { key: "plainText", value: text });
      }
    },
    cipherText: {
      get: function() {
        return this.$store.state.cipherText;
      },
      set: function(text) {
        this.$store.commit("set", { key: "cipherText", value: text });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.plane {
  margin: 100px;
}
.lang-dropdown {
  text-transform: capitalize;
}
</style>
