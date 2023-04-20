'use client'

import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Cookies from 'js-cookie'
import InputFormField from '@app/ui/components/Form/InputFormField'

const SigninFormValidation = z.object({
  email: z
    .string({ required_error: 'Veuillez renseigner votre email' })
    .email('Merci de renseigner un email valide'),
})
type SigninFormData = z.infer<typeof SigninFormValidation>

export const EmailSigninForm = ({ error }: { error?: string }) => {
  const form = useForm<SigninFormData>({
    resolver: zodResolver(SigninFormValidation),
  })

  const onSubmit = ({ email }: SigninFormData) => {
    // Set the email in a cookie for usage in Verify page as redirections resets memory
    Cookies.set('email-signin', email, { sameSite: 'strict' })
    return signIn('email', { email })
  }
  const disabled =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful
  return (
    <form id="login-with-email" onSubmit={form.handleSubmit(onSubmit)}>
      {error ? (
        <div className="fr-fieldset__element">
          <div className="fr-alert fr-alert--error fr-alert--sm">
            <p>{error}</p>
          </div>
        </div>
      ) : null}
      <InputFormField
        control={form.control}
        path="email"
        label="Email"
        hint="Format attendu : nom@domaine.fr"
        disabled={disabled}
      />
      <ul className="fr-btns-group fr-btns-group--icon-left">
        <li>
          <button
            disabled={disabled}
            type="submit"
            className="fr-btn fr-icon-user-setting-line"
          >
            Se connecter
          </button>
        </li>
      </ul>
    </form>
  )
}
