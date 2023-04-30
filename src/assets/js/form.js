// Ajax Form

// Vars
const form = document.getElementById('ContactForm')
const contactMessage = document.querySelector('.Contact__Message')
const contactMessageSuccess = document.querySelector(
  '.Contact__MessageText--success'
)
const contactMessageError = document.querySelector(
  '.Contact__MessageText--error'
)

export default function () {
  const handleSubmit = (event) => {
    event.preventDefault()
    const myForm = event.target
    const formData = new FormData(myForm)

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then(showFormMessage(contactMessageSuccess))
      .catch(showFormMessage(contactMessageError))
  }

  if (document.getElementById('ContactForm')) {
    form.addEventListener('submit', handleSubmit)
  }

  const showFormMessage = (message) => {
    message.style.display = 'block'
    showMessageHideForm()
  }

  const showMessageHideForm = () => {
    contactMessage.classList.add('Contact__Message--active')
    form.style.display = 'none'
  }
}
