// Ajax Form

// Vars
const form = document.getElementById('ContactForm')
const contactMessageSuccess = document.querySelector(
  '.Contact__MessageText--success'
)
const contactMessageError = document.querySelector(
  '.Contact__MessageText--error'
)

export default function () {
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   let formData = new FormData(form)
  //   fetch('/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     body: new URLSearchParams(formData).toString(),
  //   })
  //     .then(displaySuccessMessage())
  //     .catch(displayerrorMessage())
  // }

  const handleSubmit = (event) => {
    event.preventDefault()

    const myForm = event.target
    const formData = new FormData(myForm)

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(displaySuccessMessage())
      .catch(displayerrorMessage())
  }

  if (document.getElementById('ContactForm')) {
    form.addEventListener('submit', handleSubmit)
  }

  const displaySuccessMessage = () => {
    contactMessageSuccess.classList.add('Contact__MessageText--active')
    const successTimeout = setTimeout(hideSuccessMessage, 5000)
    function hideSuccessMessage() {
      contactMessageSuccess.classList.remove('Contact__MessageText--active')
      clearTimeout(successTimeout)
    }
  }

  const displayerrorMessage = () => {
    contactMessageSuccess.classList.add('Contact__MessageText--active')
    const errorTimeout = setTimeout(hideerrorMessage, 5000)
    function hideerrorMessage() {
      contactMessageError.classList.remove('Contact__MessageText--active')
      clearTimeout(errorTimeout)
    }
  }
}
