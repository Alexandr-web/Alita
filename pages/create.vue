<template>
  <div class="page pt-90">
    <div class="container">
      <div class="page__inner">
        <div class="section">
          <div class="section">
            <h3 class="section__title">
              Новый товар
            </h3>
            <form
              class="form create__form"
              enctype="multipart/form-data"
              method="POST"
              @submit.prevent="create"
            >
              <div class="form__field">
                <label
                  class="form__label block-load-files"
                  for="files"
                  @drop="dropOnArea($event)"
                  @dragover.prevent
                  @dragenter="dragenterHandler($event)"
                >
                  <input
                    id="files"
                    class="form__file block-load-files__file"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    multiple
                    @change="loadFiles($event)"
                  >
                  <div
                    class="block-load-files__area"
                    :class="{ 'block-load-files__area--active': startDrop }"
                  >
                    <vCameraIcon :classes="['block-load-files__icon', 'ddwad']" />
                  </div>
                </label>
                <ul
                  v-if="files.length"
                  class="block-load-files__list"
                >
                  <li
                    v-for="(file, index) in files"
                    :key="index"
                    class="block-load-files__list-item"
                  >
                    <button
                      class="block-load-files__list-remove"
                      type="button"
                      @click="removeFile(index)"
                    ></button>
                    <img
                      class="block-load-files__list-image"
                      :src="file.src"
                    >
                  </li>
                </ul>
              </div>
              <div class="form__field">
                <label
                  class="form__label"
                  for="title"
                >
                  <input
                    id="title"
                    v-model.trim="validations.title.model"
                    class="form__input"
                    :class="{ 'form__input--invalid': validations.title.$invalid, }"
                    type="text"
                    placeholder="Название"
                  >
                </label>
              </div>
              <div class="form__field">
                <label
                  class="form__label"
                  for="description"
                >
                  <textarea
                    id="description"
                    v-model.trim="validations.description.model"
                    class="form__input form__textarea"
                    :class="{ 'form__input--invalid': validations.description.$invalid, }"
                    type="text"
                    placeholder="Описание"
                  ></textarea>
                </label>
              </div>
              <div class="form__field">
                <label
                  class="form__label"
                  for="price"
                >
                  <input
                    id="price"
                    v-model.trim="validations.price.model"
                    class="form__input"
                    type="text"
                    placeholder="Цена"
                  >
                </label>
              </div>
              <div class="form__field">
                <label
                  class="form__label"
                  for="category"
                >
                  <select
                    id="category"
                    v-model.trim="category"
                    class="form__select"
                  >
                    <option
                      class="form__select-option"
                      value="none"
                    >
                      Категория
                    </option>
                    <option
                      class="form__select-option"
                      value="clothing"
                    >
                      Одежда
                    </option>
                    <option
                      class="form__select-option"
                      value="electronics"
                    >
                      Электроника
                    </option>
                    <option
                      class="form__select-option"
                      value="auto"
                    >
                      Авто
                    </option>
                    <option
                      class="form__select-option"
                      value="other"
                    >
                      Другое
                    </option>
                  </select>
                </label>
              </div>
              <div class="form__submit-block">
                <button
                  class="form__submit"
                  type="submit"
                  :disabled="pending"
                >
                  Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vCameraIcon from "@/components/icons/vCameraIcon";
  import getValidNumMixin from "@/mixins/getValidNumMixin";

  export default {
    name: "CreateProductPage",
    components: { vCameraIcon, },
    mixins: [getValidNumMixin],
    layout: "default",
    data: () => ({
      pending: false,
      files: [],
      startDrop: false,
      category: "none",
      validations: {
        title: {
          rules: {
            required: true,
            maxLength: 25,
          },
          model: "",
        },
        description: {
          rules: {
            required: true,
            maxLength: 200,
          },
          model: "",
        },
        price: {
          rules: { required: true, },
          model: "",
        },
      },
    }),
    watch: {
      "validations.price.model": function (val) {
        const numStr = val.replace(/\s/g, "");

        if (!isNaN(parseInt(numStr))) {
          this.validations.price.model = this.getValidNum(numStr);
        } else {
          this.validations.price.model = "";
        }
      },
    },
    methods: {
      create() {
        if (!this.validations.$invalid && this.files.length && this.category !== "none") {
          const fd = new FormData();

          this.files.map(({ file, }) => fd.append("images", file));

          fd.append("category", this.category);
          
          Object.keys(this.validations).map((key) => {
            if (this.validations[key].model && key !== "price") {
              fd.append(key, this.validations[key].model);
            }

            if (key === "price") {
              fd.append(key, this.validations[key].model.replace(/\s/g, ""));
            }
          });
        } else {
          alert("Все данные должны быть заполнены правильно");
        }
      },
      removeFile(index) {
        this.files = this.files.filter((file, i) => i !== index);
      },
      dragenterHandler(e) {
        const target = e.target;

        if (target.closest(".block-load-files") || target.classList.contains("block-load-files")) {
          this.startDrop = true;
        }
      },
      dropOnArea(e) {
        e.preventDefault();
        
        this.startDrop = false;

        const items = e.dataTransfer.items;

        if (items) {
          [...items].map((item) => {
            if (item.kind === "file" && ["image/png", "image/jpg", "image/jpeg"].includes(item.type)) {
              const file = item.getAsFile();
              const reader = new FileReader();
              const image = {
                file,
                src: "",
              };

              reader.addEventListener("load", () => {
                this.files.push({
                  ...image,
                  src: reader.result,
                });
              });
              reader.readAsDataURL(file);
            }
          });
        }
      },
      loadFiles(e) {
        if (window.FileReader) {
          const files = e.currentTarget.files;

          if (files && files.length) {
            [...files].map((file) => {
              const reader = new FileReader();
              const image = {
                file,
                src: "",
              };

              reader.readAsDataURL(file);
              reader.addEventListener("load", () => {
                this.files.push({
                  ...image,
                  src: reader.result,
                });
              });
              reader.addEventListener("error", () => {
                alert(`Произошла ошибка при скачивании файлов: "${reader.error}"`);
                throw reader.error;
              });
            });
          }
        } else {
          alert("Ваш браузер устарел и не поддерживает FileReader, пожалуйста установите современный и повторите попытку");
        }
      },
    },
  };
</script>