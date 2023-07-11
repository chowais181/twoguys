import swal from 'sweetalert2';
import alertt from '~/components/AlertTwo'

const delay = ms => new Promise(res => setTimeout(res, ms));

export default ({ app }, inject) => {
  inject('toast', async (obj = {}) => {

    !_.has(obj, 'icon') && _.set(obj, 'icon', 'success')
    !_.has(obj, 'title') && _.set(obj, 'title', 'success')

    await delay(300)

    swal.fire({
      toast: true,
      icon: obj.icon,
      title: obj.title,
      showConfirmButton: false,
      position: 'top-end',
      timerProgressBar: true,
      timer: 2000,
      showClass: {
        popup: 'swal2-show',
        backdrop: 'swal2-backdrop-show',
        icon: 'swal2-icon-show'
      },
      hideClass: {
        popup: 'swal2-hide',
        backdrop: 'swal2-backdrop-hide',
        icon: 'swal2-icon-hide'
      },
    })

  })

  inject('dialog', async (obj = {}) => {

    const defaults = {
      icon: "success",
      title: "success",
    }

    await delay(300)

    return swal.fire({
      ...defaults,
      ...obj
    })

  })
}

