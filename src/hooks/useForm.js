export default function useForm (form) {
  const { validateFields } = form

  const formValidateFields = () =>
    new Promise((resolve, reject) => {
      validateFields((err, values) => {
        err ? reject(err) : resolve(values)
      })
    })

  return {
    formValidateFields
  }
}
