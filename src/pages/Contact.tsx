import { FormEvent, useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: connect to your backend / email service
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-36 pb-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Контакты</h1>

      <div className="mt-10 max-w-lg">
        {submitted ? (
          <Card>
            <p className="text-green-700 font-medium">Сообщение отправлено! Мы свяжемся с вами в ближайшее время.</p>
          </Card>
        ) : (
          <Card>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                  Имя
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <Button type="submit">Отправить</Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}
