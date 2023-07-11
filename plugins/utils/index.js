import fileUtils from '~/plugins/utils/file-utils'

export default ({ app }, inject) => {
  inject('fileUtils', fileUtils)
}
